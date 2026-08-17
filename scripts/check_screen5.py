import json, sys
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])
frame1 = next(c for c in iphone_page["children"] if c["name"] == "1")
frame_box = frame1["absoluteBoundingBox"]
fx = frame_box["x"]
fy = frame_box["y"]
fw = frame_box["width"]
SCREEN_W = 1290
SCREEN_H = 2796

print("=== SLICE NODES (define screen slots) ===")
slices = [c for c in frame1["children"] if c["type"] == "SLICE"]
for sl in sorted(slices, key=lambda s: s.get("absoluteBoundingBox",{}).get("x", 0)):
    bbox = sl.get("absoluteBoundingBox", {})
    x = bbox.get("x", 0) - fx
    y = bbox.get("y", 0) - fy
    w = bbox.get("width", 0)
    h = bbox.get("height", 0)
    sidx = int(x // SCREEN_W)
    print(f"  {sl['name']}: x={x:.0f} sidx={sidx} w={w:.0f} h={h:.0f}")

print()
print("=== DEVICES GROUP ===")
devices_group = next((c for c in frame1["children"] if c["name"] == "DEVICES"), None)
if devices_group:
    for child in devices_group.get("children", []):
        bbox = child.get("absoluteBoundingBox", {})
        x = bbox.get("x", 0) - fx
        cx = x + bbox.get("width", 0) / 2
        sidx = int(cx // SCREEN_W)
        print(f"  {child['name']}: x={x:.0f} sidx={sidx} type={child['type']}")
else:
    print("  No DEVICES group found")
