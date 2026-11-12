import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import px

ROOT = px.ROOT
OUT = ROOT.parent / "src/art/redraw.ts"


def main():
    pipe = json.loads((ROOT / "work/_pipeline.json").read_text())
    rows = {}
    for fam, st in pipe.items():
        if st.get("status") != "approved":
            continue
        src = ROOT / "src" / f"{fam}.txt"
        if not src.exists():
            continue
        data = px.parse(src)
        for s in px.SPECS[fam]["sprites"]:
            if s["name"] in data:
                rows[s["name"]] = data[s["name"]]
    body = ",\n".join(f"  '{k}': [{', '.join(repr(r) for r in v)}]" for k, v in sorted(rows.items()))
    OUT.write_text(
        "import { art, Art } from './palette';\n\n"
        "const SCALE = 2;\n\n"
        f"const ROWS: Record<string, string[]> = {{\n{body}\n}};\n\n"
        "const cache = new Map<string, Art>();\n\n"
        "function grow(rows: string[]): string[] {\n"
        "  const out: string[] = [];\n"
        "  for (const r of rows) {\n"
        "    const wide = r.split('').map((c) => c.repeat(SCALE)).join('');\n"
        "    for (let i = 0; i < SCALE; i++) out.push(wide);\n"
        "  }\n"
        "  return out;\n"
        "}\n\n"
        "export function rd(name: string, fallback: Art): Art {\n"
        "  const r = ROWS[name];\n"
        "  if (!r) return fallback;\n"
        "  let a = cache.get(name);\n"
        "  if (!a) {\n"
        "    a = art(grow(r));\n"
        "    cache.set(name, a);\n"
        "  }\n"
        "  return a;\n"
        "}\n\n"
        "export function rdList(names: string[], fallback: Art[]): Art[] {\n"
        "  return fallback.map((a, i) => rd(names[Math.min(i, names.length - 1)], a));\n"
        "}\n"
    )
    print(f"{len(rows)} sprites -> src/art/redraw.ts")


if __name__ == "__main__":
    main()
