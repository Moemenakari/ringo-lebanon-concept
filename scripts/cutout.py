"""Cuts out every image listed in scripts/cutouts.json and writes web-ready WebP files to public/.

Each entry: {"src": "assets/source/...", "out": "public/....webp", "width": 600,
             "crop": [x0, y0, x1, y1] (fractions of the source, optional),
             "model": "isnet-anime" | "isnet-general-use" | "u2net" | "keep" (alpha already clean)
             | "none_resize" (a plain photo, only resized)}

Mascots are cropped from the real pack photos with the anime model, which is trained on
illustrated characters. Ingredients use the general model. Runs in the Cut out workflow.
"""
import json
import os
import sys
from io import BytesIO

from PIL import Image, ImageFilter
from rembg import new_session, remove

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
jobs = json.load(open(os.path.join(ROOT, 'scripts', 'cutouts.json')))
only = set(sys.argv[1:])
sessions = {}


def session(model):
    if model not in sessions:
        sessions[model] = new_session(model)
    return sessions[model]


for job in jobs:
    if only and job['out'] not in only:
        continue
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
