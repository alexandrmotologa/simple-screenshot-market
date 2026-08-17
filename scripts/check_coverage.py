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
total_screens = int(fw / SCREEN_W)
print(f"Frame x={fx} y={fy} w={fw} screens={total_screens}")

bg_group = next((c for c in frame1["children"] if c["name"] in ("BACKGROUND", "BACKGROUNDS")), None)

for child in bg_group.get("children", []):
    bbox = child.get("absoluteBoundingBox", {})
    x = bbox.get("x", 0) - fx
    y = bbox.get("y", 0) - fy
    w = bbox.get("width", 0)
    h = bbox.get("height", 0)
    fills = child.get("fills", [])
    color = "none"
    for fill in fills:
        if fill.get("type") == "SOLID":
            c = fill.get("color", {})
            color = "#{:02x}{:02x}{:02x}".format(int(c.get("r",0)*255), int(c.get("g",0)*255), int(c.get("b",0)*255))
            break
    print(f"\n{child['name']}: x={x:.0f} y={y:.0f} w={w:.0f} h={h:.0f} fill={color}")
    for sidx in range(total_screens):
        slot_x = sidx * SCREEN_W
        overlap_x = min(x + w, slot_x + SCREEN_W) - max(x, slot_x)
        overlap_y = min(y + h, SCREEN_H) - max(y, 0)
        if overlap_x <= 0 or overlap_y <= 0:
            continue
        coverage = (overlap_x * overlap_y) / (SCREEN_W * SCREEN_H)
        print(f"  Screen {sidx}: overlap_x={overlap_x:.0f} overlap_y={overlap_y:.0f} coverage={coverage:.2%}")
