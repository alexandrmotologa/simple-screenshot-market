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
sw = 1290.0

fills = frame1.get("fills", [])
for f in fills:
    if f.get("type") == "SOLID":
        c = f["color"]
        r,g,b = int(c["r"]*255), int(c["g"]*255), int(c["b"]*255)
        print("Frame 1 fill: #{:02x}{:02x}{:02x}".format(r,g,b))
        break

bg_group = next((c for c in frame1["children"] if c["name"] in ("BACKGROUND", "BACKGROUNDS")), None)
print("BG group shapes:")
for child in bg_group.get("children", []):
    bbox = child.get("absoluteBoundingBox", {})
    if bbox:
        x = bbox["x"] - fx
        y = bbox["y"] - fy
        w = bbox["width"]
        h = bbox["height"]
        cx = x + w/2
        sidx = int(max(0, min(9, cx // sw)))
        cfills = child.get("fills", [])
        color = "none"
        for fill in cfills:
            if fill.get("type") == "SOLID":
                c = fill["color"]
                r,g,b = int(c["r"]*255), int(c["g"]*255), int(c["b"]*255)
                color = "#{:02x}{:02x}{:02x}".format(r,g,b)
                break
        print("  {}: screen={}, pos=({:.0f},{:.0f}), size={:.0f}x{:.0f}, color={}".format(
            child["name"], sidx, x, y, w, h, color))
