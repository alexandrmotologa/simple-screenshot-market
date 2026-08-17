import json, sys
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])
SCREEN_W = 1290

# Check T6 (missing screens 1 and 10) and T7 (missing screen 1)
for tn_str, missing_sidxs in [("6", [0, 9]), ("7", [0])]:
    frame = next(c for c in iphone_page["children"] if c["name"] == tn_str)
    fb = frame["absoluteBoundingBox"]
    fx, fy = fb["x"], fb["y"]
    
    texts_group = next((c for c in frame["children"] if c["name"] == "TEXTS"), None)
    print(f"\n=== Template {tn_str} - Texts in missing screens ===")
    if texts_group:
        for child in texts_group.get("children", []):
            if child.get("type") == "TEXT":
                bbox = child.get("absoluteBoundingBox", {})
                x = bbox.get("x",0) - fx
                cx = x + bbox.get("width",0)/2
                sidx = int(cx // SCREEN_W)
                if sidx in missing_sidxs:
                    print(f"  Screen {sidx+1}: TEXT '{child.get('characters','')[:40]}'")
            elif child.get("type") in ("GROUP","FRAME"):
                for sub in child.get("children",[]):
                    if sub.get("type") == "TEXT":
                        bbox = sub.get("absoluteBoundingBox", {})
                        x = bbox.get("x",0) - fx
                        cx = x + bbox.get("width",0)/2
                        sidx = int(cx // SCREEN_W)
                        if sidx in missing_sidxs:
                            print(f"  Screen {sidx+1}: TEXT '{sub.get('characters','')[:40]}'")
