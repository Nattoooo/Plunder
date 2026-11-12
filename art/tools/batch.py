import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))
import px

ROOT = px.ROOT
SPEC = json.loads((ROOT / "specs.json").read_text())
FAMS = SPEC["families"]
NOTES = SPEC["notes"]
BATCHES = ROOT / "work/_batches.json"
PIPE = ROOT / "work/_pipeline.json"
SHEET_W = 1400


def load():
    return json.loads(BATCHES.read_text())


def batch_dir(b):
    d = ROOT / "work/_batches" / b
    d.mkdir(parents=True, exist_ok=True)
    return d


def brief(b):
    bt = load()[b]
    pipe = json.loads(PIPE.read_text())
    out = [f"# Batch `{b}`", "", f"{len(bt['families'])} families. Draw every sprite listed below.", ""]
    for folder in sorted({FAMS[f]["folder"] for f in bt["families"]}):
        out += [f"## Folder `{folder}` rules", ""] + [f"- {n}" for n in NOTES.get(folder, [])] + [""]
    out += ["## Families", ""]
    for f in bt["families"]:
        work = ROOT / "work" / f
        crits = sorted(p.name for p in work.glob("critique-*.md")) if work.exists() else []
        has_src = (ROOT / "src" / f"{f}.txt").exists()
        state = "new: draw from scratch"
        if has_src:
            state = "has a drawing in art/src/" + f + ".txt"
            if crits:
                state += f"; earlier reviews: {', '.join('art/work/' + f + '/' + c for c in crits)} (fix what they raise, keep what works)"
        out += [f"### `{f}` ({state})", ""]
        for s in FAMS[f]["sprites"]:
            fixed = "fixed size" if s["fixed"] else "flexible size"
            out.append(f"- `{s['name']}` {s['w']} x {s['h']} ({fixed}): {s['desc']}")
        out.append("")
    (batch_dir(b) / "brief.md").write_text("\n".join(out))
    print(f"brief -> art/work/_batches/{b}/brief.md")


def label(im, text):
    d = ImageDraw.Draw(im)
    d.text((0, 0), text, fill=(30, 30, 30, 255))


def tile_for(name, img, folder):
    big = max(img.width, img.height)
    z = max(4, min(16, 128 // big))
    parts = [px.grid(img, z), px.context(img, folder, 1), px.context(img, folder, 3)]
    w = sum(p.width for p in parts) + 8 * (len(parts) - 1)
    h = max(p.height for p in parts) + 14
    t = Image.new("RGBA", (max(w, len(name) * 6 + 40), h), (250, 248, 242, 255))
    label(t, f"{name} {img.width}x{img.height}")
    x = 0
    for p in parts:
        t.alpha_composite(p, (x, 14))
        x += p.width + 8
    return t


def pack(tiles, width=SHEET_W, pad=14):
    rows, row, w = [], [], 0
    for t in tiles:
        if row and w + t.width > width:
            rows.append(row)
            row, w = [], 0
        row.append(t)
        w += t.width + pad
    if row:
        rows.append(row)
    H = sum(max(t.height for t in r) + pad for r in rows) + pad
    W = max(sum(t.width + pad for t in r) for r in rows) + pad
    sheet = Image.new("RGBA", (W, H), (250, 248, 242, 255))
    y = pad
    for r in rows:
        x = pad
        for t in r:
            sheet.alpha_composite(t, (x, y))
            x += t.width + pad
        y += max(t.height for t in r) + pad
    return sheet


def render(b):
    bt = load()[b]
    tiles, report = [], []
    for f in bt["families"]:
        try:
            px.main(f)
        except SystemExit:
            report.append(f"{f}: FAILED to render (see errors above)")
            continue
        folder = FAMS[f]["folder"]
        data = px.parse(ROOT / "src" / f"{f}.txt")
        for s in FAMS[f]["sprites"]:
            tiles.append(tile_for(s["name"], px.to_img(data[s["name"]]), folder))
    if tiles:
        sheets = []
        chunk, h = [], 0
        for t in tiles:
            chunk.append(t)
        sheet = pack(chunk)
        n = 1
        step = 1800
        for top in range(0, sheet.height, step):
            part = sheet.crop((0, top, sheet.width, min(sheet.height, top + step)))
            name = f"sheet-{n}.png"
            part.convert("RGB").save(batch_dir(b) / name)
            sheets.append(name)
            n += 1
        for old in batch_dir(b).glob("sheet-*.png"):
            if old.name not in sheets:
                old.unlink()
        print("sheets -> " + ", ".join(f"art/work/_batches/{b}/{s}" for s in sheets))
    print("\n".join(report) if report else "all families rendered")


def refsheet():
    pipe = json.loads(PIPE.read_text())
    tiles = []
    for f, v in pipe.items():
        if v.get("status") != "approved":
            continue
        src = ROOT / "src" / f"{f}.txt"
        if not src.exists():
            continue
        data = px.parse(src)
        for s in FAMS[f]["sprites"]:
            if s["name"] in data:
                img = px.to_img(data[s["name"]])
                z = max(3, min(10, 90 // max(img.width, img.height)))
                t = Image.new("RGBA", (max(img.width * z, len(s["name"]) * 6 + 4), img.height * z + 14), (250, 248, 242, 255))
                label(t, s["name"])
                t.alpha_composite(px.grid(img, z), (0, 14))
                tiles.append(t)
    out = ROOT / "work/_ref"
    out.mkdir(parents=True, exist_ok=True)
    pack(tiles).convert("RGB").save(out / "approved.png")
    print(f"reference -> art/work/_ref/approved.png ({len(tiles)} approved sprites)")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "brief":
        brief(sys.argv[2])
    elif cmd == "render":
        render(sys.argv[2])
    elif cmd == "refsheet":
        refsheet()
