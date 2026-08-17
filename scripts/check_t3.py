import json, sys
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])

# Check template 3
frame3 = next(c for c in iphone_page["children"] if c["name"] == "3")
frame_box = frame3["absoluteBoundingBox"]
fx = frame_box["x"]
fy = frame_box["y"]

print("Frame 3 fills (global bg):", frame3.get("fills", []))
print()

# Check BACKGROUND/BACKGROUNDS group
bg_group = next((c for c in frame3["children"] if c["name"] in ("BACKGROUND", "BACKGROUNDS")), None)
print("BG group name:", bg_group.get("name", "N/A"))
print("BG group children:")
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
    rotation = child.get("rotation", 0)
    radius = child.get("cornerRadius", 0)
    print("  {} type={}: x={:.0f} y={:.0f} w={:.0f} h={:.0f} color={} rot={} radius={}".format(
        child["name"], child["type"], x, y, w, h, color, rotation, radius))
