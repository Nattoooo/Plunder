import json
import sys
from pathlib import Path

F = Path(__file__).resolve().parent.parent / "work/_pipeline.json"
p = json.loads(F.read_text()) if F.exists() else {}
cmd = sys.argv[1]
if cmd == "set":
    fam = sys.argv[2]
    e = p.setdefault(fam, {"round": 0, "status": "drawing"})
    for kv in sys.argv[3:]:
        k, v = kv.split("=")
        e[k] = int(v) if v.isdigit() else v
    F.write_text(json.dumps(p, indent=1))
    if e.get("status") == "approved":
        a = F.parent.parent / "APPROVED.md"
        spec = json.loads((F.parent.parent / "specs.json").read_text())["families"][fam]
        line = f"- {fam} ({spec['folder']}) — round {e['round']}"
        if line not in a.read_text():
            a.write_text(a.read_text() + line + "\n")
    print(fam, e)
elif cmd == "next":
    n = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    q = [k for k, v in p.items() if v.get("status") == "queued"][:n]
    for k in q:
        p[k]["status"] = "drawing"
    F.write_text(json.dumps(p, indent=1))
    print(" ".join(q))
elif cmd == "summary":
    spec = json.loads((F.parent.parent / "specs.json").read_text())["families"]
    total = sum(len(f["sprites"]) for f in spec.values())
    done = sum(len(spec[k]["sprites"]) for k, v in p.items() if v.get("status") == "approved")
    from collections import Counter
    c = Counter(v.get("status") for v in p.values())
    print(f"sprites approved {done}/{total} ({100*done/total:.0f}%), families {dict(c)}, not started {len(spec)-len(p)}")
