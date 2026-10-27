"""Cuts the mascots (and Ringo's own chips) out of the real pack and story art.

Background removal models can't separate a cartoon from busy pack art, so every mascot here has a
rough outline drawn by hand in scripts/mascots.json (grid units 0-10 inside a "view" crop of the
pack). GrabCut then snaps that outline to the real edges. Low-res sources are upscaled first.

Usage: pip install opencv-python-headless pillow numpy && python scripts/mascots.py [name ...]
"""
import json
import os
import sys

import cv2
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = json.load(open(os.path.join(ROOT, 'scripts', 'mascots.json')))
only = set(sys.argv[1:])

for name, j in spec.items():
    if only and name not in only:
        continue
    im = Image.open(os.path.join(ROOT, j['src'])).convert('RGBA')
    if j.get('upscale'):
        im = im.resize((im.width * j['upscale'], im.height * j['upscale']), Image.LANCZOS)
    flat = Image.new('RGBA', im.size, (255, 255, 255, 255))
    flat.alpha_composite(im)
    W, H = im.size
    vx0, vy0, vx1, vy1 = j['view']
    X0, Y0, X1, Y1 = int(vx0 * W), int(vy0 * H), int(vx1 * W), int(vy1 * H)
    rgb = np.ascontiguousarray(np.array(flat.convert('RGB'))[Y0:Y1, X0:X1])
    alpha0 = np.array(im)[Y0:Y1, X0:X1, 3]
    h, w = rgb.shape[:2]
    pts = lambda p: np.array([[x / 10 * w, y / 10 * h] for x, y in p], dtype=np.int32)

    if j.get('mode') == 'circle':
        # A round sticker: the artwork as-is inside a circle, used where cutting out would lose detail.
        cx, cy, rad = j['circle']
        a = np.zeros((h, w), np.uint8)
        cv2.circle(a, (int(cx / 10 * w), int(cy / 10 * h)), int(rad / 10 * min(w, h)), 255, -1, cv2.LINE_AA)
    elif j.get('mode') == 'feather':
        # A soft-edged crop that melts into a section of the same colour.
        a = np.zeros((h, w), np.uint8)
        cv2.ellipse(a, (w // 2, h // 2), (int(w * 0.42), int(h * 0.4)), 0, 0, 360, 255, -1)
        a = cv2.GaussianBlur(a, (0, 0), min(w, h) * 0.08)
    else:
        mask = np.zeros((h, w), np.uint8)
        cv2.fillPoly(mask, [pts(j['poly'])], cv2.GC_PR_FGD)
        r = max(4, int(min(w, h) * 0.025))
        for x, y in j.get('fg', []):
            cv2.circle(mask, tuple(pts([[x, y]])[0]), r, cv2.GC_FGD, -1)
        for x, y in j.get('bg', []):
            cv2.circle(mask, tuple(pts([[x, y]])[0]), r * 2, cv2.GC_BGD, -1)
        for poly in j.get('bgpoly', []):
            cv2.fillPoly(mask, [pts(poly)], cv2.GC_BGD)
        for poly in j.get('fgpoly', []):
            cv2.fillPoly(mask, [pts(poly)], cv2.GC_FGD)
        if j.get('grabcut', True):
            cv2.setRNGSeed(7)  # GrabCut seeds its colour models randomly; pin it so re-runs match
            cv2.grabCut(rgb, mask, None, np.zeros((1, 65)), np.zeros((1, 65)), 6, cv2.GC_INIT_WITH_MASK)
        a = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
        a = cv2.morphologyEx(a, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
        n, lab, stats, _ = cv2.connectedComponentsWithStats(a)
        if n > 1:
            a = np.where(lab == 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA])), 255, 0).astype(np.uint8)
        a = cv2.GaussianBlur(cv2.erode(a, np.ones((3, 3), np.uint8)), (3, 3), 0)
    a = np.minimum(a, alpha0)
    px = np.dstack([rgb, a])
    if j.get('dropgreen'):
        # The peanut pack's green rings sit right behind the boxer and his bag; neither has any green.
        r, g, b = (rgb[..., i].astype(int) for i in range(3))
        a = np.where((g - r > 40) & (g - b > 40), 0, a).astype(np.uint8)
        a = cv2.morphologyEx(a, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
        n, lab, stats, _ = cv2.connectedComponentsWithStats((a > 20).astype(np.uint8))
        if n > 1:
            a = np.where(lab == 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA])), a, 0).astype(np.uint8)
        px = np.dstack([rgb, a])
    if j.get('patch'):
        # The boxer's glove covers part of the bag's edge. The bag is convex, so fill its outline back
        # to the convex hull and paint just that dent with the bag's own colours around it.
        hull = np.zeros((h, w), np.uint8)
        cs, _ = cv2.findContours((a > 20).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cv2.fillPoly(hull, [cv2.convexHull(max(cs, key=cv2.contourArea))], 255)
        r, g, b = (rgb[..., i].astype(int) for i in range(3))
        stray = (r - g > 120) | ((g - r > 30) & (g - b > 30))  # glove red (the bag's brown never gets this red) and ring green
        dent = cv2.dilate((((hull > 0) & (a < 128)) | stray).astype(np.uint8) * 255, np.ones((9, 9), np.uint8)) & hull
        rgb = cv2.inpaint(rgb, dent, 12, cv2.INPAINT_TELEA)
        a = cv2.GaussianBlur(cv2.erode(hull, np.ones((3, 3), np.uint8)), (3, 3), 0)
        px = np.dstack([rgb, a])
    if j.get('dropred'):
        # The story's red background shows through between stacked chips; chips are never red.
        r, g = rgb[..., 0].astype(int), rgb[..., 1].astype(int)
        a = np.where((r - g > 70), 0, a).astype(np.uint8)
        n, lab, stats, _ = cv2.connectedComponentsWithStats((a > 20).astype(np.uint8))
        if n > 1:
            a = np.where(lab == 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA])), a, 0).astype(np.uint8)
        px = np.dstack([rgb, a])
    if j.get('mirror'):
        # The chips in Ringo's story run off the screen edge. They're symmetric, so the visible
        # half mirrored at that edge gives back the whole chip, still made of the real photo.
        px = np.concatenate([px, px[:, ::-1]], axis=1)
        a = px[..., 3]
    ys, xs = np.where(a > 10)
    out = Image.fromarray(px[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    width = j.get('width', 420)
    if out.width > width:
        out = out.resize((width, round(out.height * width / out.width)), Image.LANCZOS)
    dest = os.path.join(ROOT, j['out'])
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    out.save(dest, 'WEBP', quality=84, alpha_quality=92, method=6)
    print(f"{name}: {out.size} {os.path.getsize(dest) // 1024} KB")
