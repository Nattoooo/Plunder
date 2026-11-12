import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PAL = {}
for m in re.finditer(r"(\w): 0x([0-9a-fA-F]{6})", (ROOT.parent / "src/art/palette.ts").read_text().split("export const SHADOW")[0]):
    PAL[m.group(1)] = tuple(int(m.group(2)[i:i + 2], 16) for i in (0, 2, 4))

SPECS = json.loads((ROOT / "specs.json").read_text())["families"]

BG = {
    "characters": [("grass", (63, 148, 68)), ("sand", (207, 168, 106))],
    "nature": [("grass", (63, 148, 68)), ("sand", (207, 168, 106))],
    "buildings": [("grass", (63, 148, 68)), ("sand", (207, 168, 106))],
    "props": [("sand", (207, 168, 106)), ("water", (42, 106, 154))],
    "ship": [("water", (42, 106, 154)), ("deck", (147, 99, 58))],
    "sails": [("deck", (147, 99, 58)), ("water", (42, 106, 154))],
    "icons": [("slot", (58, 42, 58)), ("light", (216, 204, 176))],
    "effects": [("water", (42, 106, 154)), ("dark", (27, 18, 32))],
}


def parse(path):
    out, cur = {}, None
    for raw in path.read_text().splitlines():
        line = raw.rstrip()
        if line.startswith("#") or (not line and cur is None):
            continue
        m = re.match(r"==\s*([\w-]+)", line)
        if m:
            cur = m.group(1)
            out[cur] = []
        elif cur is not None and line:
            out[cur].append(line)
    return out


def to_img(rows):
    h, w = len(rows), max(len(r) for r in rows)
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    for y, r in enumerate(rows):
        for x, ch in enumerate(r):
            if ch != ".":
                im.putpixel((x, y), PAL[ch] + (255,))
    return im


def checker(w, h, s=6):
    im = Image.new("RGBA", (w, h), (205, 205, 205, 255))
    d = ImageDraw.Draw(im)
    for y in range(0, h, s):
        for x in range(0, w, s):
            if (x // s + y // s) % 2:
                d.rectangle([x, y, x + s - 1, y + s - 1], fill=(235, 235, 235, 255))
    return im


def grid(im, z):
    out = im.resize((im.width * z, im.height * z), Image.NEAREST)
    bg = checker(out.width, out.height, max(4, z // 2))
    bg.alpha_composite(out)
    if z >= 8:
        d = ImageDraw.Draw(bg)
        for x in range(0, bg.width + 1, z):
            d.line([(x, 0), (x, bg.height)], fill=(0, 0, 0, 40))
        for y in range(0, bg.height + 1, z):
            d.line([(0, y), (bg.width, y)], fill=(0, 0, 0, 40))
    return bg


def captain_ref():
    p = ROOT / "sprites/characters/captain-down-1.png"
    return Image.open(p).convert("RGBA") if p.exists() else None


def context(im, folder, scale):
    ref = captain_ref() if folder in ("characters", "nature", "buildings", "props") else None
    pad = 3
    tiles = []
    for _, col in BG[folder]:
        parts = [im] + ([ref] if ref is not None and im is not ref else [])
        w = sum(p.width for p in parts) + pad * (len(parts) + 1)
        h = max(p.height for p in parts) + pad * 2
        t = Image.new("RGBA", (w, h), col + (255,))
        x = pad
        for p in parts:
            t.alpha_composite(p, (x, h - pad - p.height))
            x += p.width + pad
        tiles.append(t.resize((t.width * scale, t.height * scale), Image.NEAREST))
    w = sum(t.width for t in tiles) + 8 * (len(tiles) - 1)
    out = Image.new("RGBA", (w, max(t.height for t in tiles)), (0, 0, 0, 0))
    x = 0
    for t in tiles:
        out.alpha_composite(t, (x, 0))
        x += t.width + 8
    return out


def tile3(im):
    out = Image.new("RGBA", (im.width * 3, im.height * 3))
    for y in range(3):
        for x in range(3):
            out.alpha_composite(im, (x * im.width, y * im.height))
    return out


def main(family):
    spec = SPECS.get(family)
    if spec is None:
        sys.exit(f"unknown family {family}")
    src = ROOT / "src" / f"{family}.txt"
    if not src.exists():
        sys.exit(f"missing {src}")
    data = parse(src)
    want = {s["name"]: s for s in spec["sprites"]}
    errors = []
    for name in want:
        if name not in data:
            errors.append(f"{name}: not drawn")
    for name, rows in data.items():
        if name not in want:
            errors.append(f"{name}: not in this family's spec")
            continue
        s = want[name]
        if len({len(r) for r in rows}) != 1:
            errors.append(f"{name}: rows have different lengths {[len(r) for r in rows]}")
            continue
        bad = sorted({c for r in rows for c in r if c != "." and c not in PAL})
        if bad:
            errors.append(f"{name}: unknown palette chars {bad}")
        w, h = len(rows[0]), len(rows)
        if s["fixed"] and (w, h) != (s["w"], s["h"]):
            errors.append(f"{name}: fixed size must be {s['w']}x{s['h']}, got {w}x{h}")
        elif (w, h) != (s["w"], s["h"]):
            print(f"note {name}: {w}x{h} (spec {s['w']}x{s['h']}, flexible)")
    if errors:
        print("ERRORS:\n" + "\n".join(errors))
        raise SystemExit(1)
    work = ROOT / "work" / family
    work.mkdir(parents=True, exist_ok=True)
    folder = spec["folder"]
    imgs = {}
    for name in want:
        im = to_img(data[name])
        out = ROOT / "sprites" / folder / f"{name}.png"
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out)
        imgs[name] = im
    biggest = max(max(i.width, i.height) for i in imgs.values())
    z = max(8, min(24, 240 // biggest))
    tiling = folder == "ship" and family in ("deck-planks", "deck-logs", "iron-bands") or family in ("lava-tile", "dock-planks")
    panels = []
    for name, im in imgs.items():
        row = [grid(im, z), context(im, folder, 1), context(im, folder, 3)]
        if tiling:
            row.append(grid(tile3(im), max(4, z // 2)))
        panels.append((name, row))
    lab = 14
    W = max(sum(p.width for p in row) + 16 * len(row) for _, row in panels) + 16
    H = sum(max(p.height for p in row) + lab + 16 for _, row in panels) + 16
    sheet = Image.new("RGBA", (W, H), (250, 248, 242, 255))
    d = ImageDraw.Draw(sheet)
    y = 8
    for name, row in panels:
        s = want[name]
        d.text((8, y), f"{name}  {imgs[name].width}x{imgs[name].height}  |  zoom x{z}  |  in context x1 and x3", fill=(30, 30, 30, 255))
        y += lab
        x = 8
        for p in row:
            sheet.alpha_composite(p, (x, y))
            x += p.width + 16
        y += max(p.height for p in row) + 16
    sheet.convert("RGB").save(work / "preview.png")
    if len(imgs) > 1:
        strip = Image.new("RGBA", (sum(i.width for i in imgs.values()) + 2 * (len(imgs) + 1), max(i.height for i in imgs.values()) + 4), (0, 0, 0, 0))
        x = 2
        for im in imgs.values():
            strip.alpha_composite(im, (x, strip.height - 2 - im.height))
            x += im.width + 2
        grid(strip, z).convert("RGB").save(work / "family.png")
    print(f"ok: {len(imgs)} sprite(s) -> art/sprites/{folder}/, preview -> art/work/{family}/preview.png")


if __name__ == "__main__":
    main(sys.argv[1])
