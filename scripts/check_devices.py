import json, sys
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])
frame1 = next(c for c in iphone_page["children"] if c["name"] == "1")
frame_box = frame1["absoluteBoundingBox"]
fx = frame_box["x"]
SCREEN_W = 1290

devices_group = next((c for c in frame1["children"] if c["name"] == "DEVICES"), None)
for child in devices_group.get("children", []):
    bbox = child.get("absoluteBoundingBox", {})
    x = bbox.get("x", 0) - fx
    y = bbox.get("y", 0) - frame_box["y"]
    w = bbox.get("width", 0)
    h = bbox.get("height", 0)
    cx = x + w / 2
    sidx = int(cx // SCREEN_W)
    print(f"  {child['name']}: x={x:.0f} y={y:.0f} w={w:.0f} h={h:.0f} cx={cx:.0f} -> sidx={sidx}")
