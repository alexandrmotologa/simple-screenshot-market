import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_free_template_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page1 = next((p for p in doc['children'] if 'Templates' in p['name']), doc['children'][1] if len(doc['children']) > 1 else None)

if not page1:
    print("Page 1 not found!")
    sys.exit(1)

print(f"Page Name: {page1['name']}")

for top_child in page1.get('children', []):
    bbox = top_child.get('absoluteBoundingBox')
    bbox_str = f"({bbox['width']:.0f}x{bbox['height']:.0f} at {bbox['x']:.0f},{bbox['y']:.0f})" if bbox else "no-bbox"
    print(f"\n================ Top Group [{top_child.get('type')}] '{top_child.get('name')}' id:{top_child.get('id')} {bbox_str} ================")
    
    for sub in top_child.get('children', []):
        sbox = sub.get('absoluteBoundingBox')
        sbox_str = f"({sbox['width']:.0f}x{sbox['height']:.0f} at {sbox['x']:.0f},{sbox['y']:.0f})" if sbox else "no-bbox"
        print(f"  - [{sub.get('type')}] '{sub.get('name')}' id:{sub.get('id')} {sbox_str}")
        if 'children' in sub:
            print(f"      Children count: {len(sub['children'])}")
            for c in sub['children'][:8]:
                cbox = c.get('absoluteBoundingBox')
                cbox_str = f"({cbox['width']:.0f}x{cbox['height']:.0f})" if cbox else ""
                print(f"        * [{c.get('type')}] '{c.get('name')}' id:{c.get('id')} {cbox_str}")
