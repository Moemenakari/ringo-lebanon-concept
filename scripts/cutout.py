"""Cuts out every image listed in scripts/cutouts.json and writes web-ready WebP files to public/.

Each entry: {"src": "assets/source/...", "out": "public/....webp", "width": 600,
             "crop": [x0, y0, x1, y1] (fractions of the source, optional),
             "model": "sam" (with "box": [x0, y0, x1, y1] and "points": [[x, y, 1|0], ...], fractions of the crop)
             | "isnet-anime" | "isnet-general-use" | "u2net" | "keep" (alpha already clean)
             | "none_resize" (a plain photo, only resized)}

Mascots are cropped from the real pack photos with the anime model, which is trained on
illustrated characters. Ingredients use the general model. Runs in the Cut out workflow.
"""
import json
import os
import sys
import urllib.request
from io import BytesIO

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
jobs = json.load(open(os.path.join(ROOT, 'scripts', 'cutouts.json')))
only = set(sys.argv[1:])
sessions = {}


def sam_mask(img, prompt):
    """Segment Anything with a box and points, keeping only the decoder's best mask.

    rembg's own SAM path scales the prompt twice and ORs every candidate mask together,
    so this reuses its ONNX encoder and decoder but does the decoding step itself."""
    import cv2
    sam = session('sam')
    rgb = np.array(img.convert('RGB'))
    h, w = rgb.shape[:2]
    ih, iw = 684, 1024
    scale = min(iw / w, ih / h)
    warp = np.array([[scale, 0, 0], [0, scale, 0]], dtype=np.float64)
    resized = cv2.warpAffine(rgb, warp, (iw, ih), flags=cv2.INTER_LINEAR)
    embedding = sam.encoder.run(None, {sam.encoder.get_inputs()[0].name: resized.astype(np.float32)})[0]
    pts, labels = [], []
    for mark in prompt:
        if mark['type'] == 'rectangle':
            x0, y0, x1, y1 = mark['data']
            pts += [[x0, y0], [x1, y1]]
            labels += [2, 3]
        else:
            pts.append(mark['data'])
            labels.append(mark['label'])
    coords = (np.array(pts + [[0, 0]], dtype=np.float32) * scale)[None]
    labs = np.array(labels + [-1], dtype=np.float32)[None]
    masks, scores, _ = sam.decoder.run(None, {
        'image_embeddings': embedding,
        'point_coords': coords.astype(np.float32),
        'point_labels': labs,
        'mask_input': np.zeros((1, 1, 256, 256), dtype=np.float32),
        'has_mask_input': np.zeros(1, dtype=np.float32),
        'orig_im_size': np.array([ih, iw], dtype=np.float32),
    })
    best = masks[0, int(np.argmax(scores[0]))]
    inv = cv2.invertAffineTransform(warp)
    full = cv2.warpAffine((best > 0).astype(np.uint8) * 255, inv, (w, h), flags=cv2.INTER_LINEAR)
    return Image.fromarray(full).convert('L')


def session(model):
    if model not in sessions:
        sessions[model] = new_session(model)
    return sessions[model]


for job in jobs:
    if only and job['out'] not in only:
        continue
    if job['src'].startswith('http'):
        # Full-size originals of the licensed ingredient photos (credits in scripts/picks.json).
        req = urllib.request.Request(job['src'], headers={'User-Agent': 'RingoConceptCutout/1.0 (https://github.com/Moemenakari/ringo-lebanon-concept)'})
        src = Image.open(BytesIO(urllib.request.urlopen(req, timeout=60).read())).convert('RGBA')
        src.thumbnail((2400, 2400))
    else:
        src = Image.open(os.path.join(ROOT, job['src'])).convert('RGBA')
    if 'crop' in job:
        x0, y0, x1, y1 = job['crop']
        w, h = src.size
        src = src.crop((round(x0 * w), round(y0 * h), round(x1 * w), round(y1 * h)))
    model = job.get('model', 'isnet-general-use')
    if model == 'none_resize':
        cut = src.convert('RGB')
    elif model != 'keep':
        buf = BytesIO()
        src.convert('RGB').save(buf, 'PNG')
        if 'poly' in job:
            # A piece picked out of a pile: a hand-drawn outline (grid units 0-10 of the crop) that
            # GrabCut snaps to the real edges. Outlines are drawn on small previews; fractions scale.
            import cv2
            rgb = np.ascontiguousarray(np.array(src.convert('RGB')))
            h, w = rgb.shape[:2]
            mask = np.zeros((h, w), np.uint8)
            cv2.fillPoly(mask, [np.array([[x / 10 * w, y / 10 * h] for x, y in job['poly']], dtype=np.int32)], cv2.GC_PR_FGD)
            cv2.grabCut(rgb, mask, None, np.zeros((1, 65)), np.zeros((1, 65)), 5, cv2.GC_INIT_WITH_MASK)
            a = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
            if job.get('dropwhite'):
                # Pale paper under the pile reads as foreground to GrabCut; anything near-white goes.
                r, g, b = rgb[..., 0].astype(int), rgb[..., 1].astype(int), rgb[..., 2].astype(int)
                a[(r > 185) & (g > 185) & (b > 175) & (np.abs(r - b) < 40)] = 0
                a = cv2.morphologyEx(a, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
            n, lab, stats, _ = cv2.connectedComponentsWithStats(a)
            if n > 1:
                a = np.where(lab == 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA])), 255, 0).astype(np.uint8)
            cut = src.copy()
            cut.putalpha(Image.fromarray(a))
        elif model == 'sam':
            # Prompted segmentation: a box round the mascot plus a few points on it (fractions of the crop).
            w, h = src.size
            prompt = []
            if 'box' in job:
                bx0, by0, bx1, by1 = job['box']
                prompt.append({'type': 'rectangle', 'data': [bx0 * w, by0 * h, bx1 * w, by1 * h]})
            for fx, fy, label in job.get('points', []):
                prompt.append({'type': 'point', 'data': [fx * w, fy * h], 'label': label})
            cut = src.copy()
            cut.putalpha(sam_mask(src, prompt))
        else:
            cut = Image.open(BytesIO(remove(buf.getvalue(), session=session(model), alpha_matting=job.get('matting', False)))).convert('RGBA')
        # Pull the edge in by a pixel so no background halo survives on coloured walls.
        alpha = cut.getchannel('A').filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
        cut.putalpha(alpha)
    else:
        cut = src
    box = cut.getchannel('A').point(lambda a: 255 if a > 12 else 0).getbbox() if cut.mode == 'RGBA' else None
    if box:
        cut = cut.crop(box)
    width = job.get('width', 600)
    if cut.width > width:
        cut = cut.resize((width, round(cut.height * width / cut.width)), Image.LANCZOS)
    out = os.path.join(ROOT, job['out'])
    os.makedirs(os.path.dirname(out), exist_ok=True)
    cut.save(out, 'WEBP', quality=job.get('quality', 82), alpha_quality=90, method=6)
    print(f"ok {job['out']} {cut.size} {os.path.getsize(out) // 1024} KB")
