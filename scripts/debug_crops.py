"""
debug_crops.py — visualize and apply diagram crop boxes.

Usage:
    python3 scripts/debug_crops.py

Outputs:
    public/articles/diagram-crop-debug.png  — colored overlay showing crop boxes
    public/articles/diagram-{segment}.png   — the actual cropped segment files

Adjust the CROPS dict below, re-run, and open the debug image to verify.
The ERASE list lets you blank out rectangular regions inside a crop (used to
remove circle overlap from the others-loop arc crop).
"""

from PIL import Image, ImageDraw
import numpy as np
from pathlib import Path

BASE   = Path(__file__).parent.parent / "public" / "articles"
SRC    = BASE / "diagram-handdrawn.png"

# ── Edit these to adjust crop regions ────────────────────────────────────────
# Each entry: "segment-name": (x1, y1, x2, y2)  in pixels of the source image
CROPS = {
    "top":          (195,  42, 1190,  110),
    "bottom":       (195, 445, 1190,  535),
    "me-loop":      ( 77,  58,  195,  540),
    "others-loop":  (1185,  58, 1469,  540),
}

# Erase rectangles within a crop to remove unwanted ink (e.g. circle overlap).
# Format: "segment-name": [(local_x1, local_y1, local_x2, local_y2), ...]
# "local" means relative to the crop's own top-left corner.
ERASE = {
    "others-loop": [(0, 102, 95, 372)],   # removes "others" circle right-edge overlap
}

# Debug overlay colors (R, G, B, alpha)
COLORS = {
    "top":          (255,  60,  60, 110),
    "bottom":       ( 30,  80, 255, 110),
    "me-loop":      ( 30, 180,  30, 110),
    "others-loop":  (180,  30, 200, 110),
}
# ─────────────────────────────────────────────────────────────────────────────

def main():
    img = Image.open(SRC)
    W, H = img.size
    print(f"Source image: {W}×{H}")

    # ── Save segment crops ────────────────────────────────────────────────────
    for name, box in CROPS.items():
        arr = np.array(img.crop(box), dtype=np.uint8)

        for (lx1, ly1, lx2, ly2) in ERASE.get(name, []):
            arr[ly1:ly2, lx1:lx2, 3] = 0   # set alpha to 0 (erase)

        crop_img = Image.fromarray(arr, "RGBA")
        out_path = BASE / f"diagram-{name}.png"
        crop_img.save(out_path)
        print(f"  {name}: box={box} → {crop_img.size} → {out_path.name}")

    # ── Debug overlay ─────────────────────────────────────────────────────────
    bg = Image.new("RGBA", (W, H), (255, 255, 255, 255))
    bg.paste(img, mask=img)
    debug = bg.convert("RGB")
    draw  = ImageDraw.Draw(debug, "RGBA")

    for name, box in CROPS.items():
        color = COLORS[name]
        draw.rectangle(box, fill=color)
        draw.rectangle(box, outline=color[:3], width=4)

    # Show erased zones in white so it's clear what's being removed
    for name, regions in ERASE.items():
        bx1, by1, _, _ = CROPS[name]
        for (lx1, ly1, lx2, ly2) in regions:
            draw.rectangle(
                (bx1 + lx1, by1 + ly1, bx1 + lx2, by1 + ly2),
                fill=(255, 255, 255, 200),
            )

    debug_path = BASE / "diagram-crop-debug.png"
    debug.save(debug_path)
    print(f"\nDebug image: {debug_path}")

if __name__ == "__main__":
    main()
