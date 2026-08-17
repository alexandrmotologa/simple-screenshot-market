import json
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
for page in doc["children"]:
    print("Page:", page["name"], "| id:", page["id"])
    frames = [c for c in page["children"] if c["name"].isdigit() and 1 <= int(c["name"]) <= 5]
    for f in frames:
        bbox = f.get("absoluteBoundingBox", {})
        fills = f.get("fills", [])
        fill_color = "none"
        for fill in fills:
            if fill.get("type") == "SOLID":
                c = fill["color"]
                fill_color = "#{:02x}{:02x}{:02x}".format(int(c["r"]*255), int(c["g"]*255), int(c["b"]*255))
                break
        children_names = [ch["name"] for ch in f.get("children", [])]
        print("  Frame {}: {}x{} fill={} children={}".format(
            f["name"], int(bbox.get("width",0)), int(bbox.get("height",0)),
            fill_color, children_names[:4]))
