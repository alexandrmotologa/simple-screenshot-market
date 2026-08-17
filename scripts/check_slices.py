import json, sys
sys.stdout.reconfigure(encoding="utf-8")
with open("figma_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)
doc = data["document"]
iphone_page = next(p for p in doc["children"] if "iPhone" in p["name"])
frame1 = next(c for c in iphone_page["children"] if c["name"] == "1")

print("Frame 1 children:")
for child in frame1["children"]:
    ct = child.get("type","")
    bbox = child.get("absoluteBoundingBox", {})
    w = int(bbox.get("width",0))
    h = int(bbox.get("height",0))
    x = int(bbox.get("x",0))
    grandchildren = [gc["name"] for gc in child.get("children", [])[:6]]
    print("  name={} type={} w={} h={} x={} children={}".format(
        child["name"], ct, w, h, x, grandchildren))
