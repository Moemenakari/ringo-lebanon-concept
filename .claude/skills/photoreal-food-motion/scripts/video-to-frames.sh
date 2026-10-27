#!/usr/bin/env bash
# Turn a video (AI-generated pour, crunch burst, 3D render…) into WebP frames for a scroll sequence.
# Usage: bash video-to-frames.sh <video.mp4> <out-dir> [fps=30] [width=1280]
# Writes <out-dir>/desktop/f_001.webp… and a lighter <out-dir>/mobile/ set (half the frames, 720 px).
set -euo pipefail
in="$1"; out="$2"; fps="${3:-30}"; width="${4:-1280}"
mkdir -p "$out/desktop" "$out/mobile"
ffmpeg -loglevel error -y -i "$in" -vf "fps=${fps},scale=${width}:-2" -c:v libwebp -quality 78 "$out/desktop/f_%03d.webp"
ffmpeg -loglevel error -y -i "$in" -vf "fps=$((fps / 2)),scale=720:-2" -c:v libwebp -quality 74 "$out/mobile/f_%03d.webp"
echo "desktop: $(ls "$out/desktop" | wc -l) frames, $(du -sh "$out/desktop" | cut -f1)"
echo "mobile:  $(ls "$out/mobile" | wc -l) frames, $(du -sh "$out/mobile" | cut -f1)"
