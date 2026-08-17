import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_autolayout_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page = doc['children'][0]

print(f"Document Name: {data.get('name')}")
print(f"Page Name: {page['name']}")

frame = page['children'][0]
print(f"Main Frame: {frame.get('name')} (id: {frame.get('id')})")
print(f"Number of children: {len(frame.get('children', []))}")

for i, child in enumerate(frame.get('children', [])):
    bbox = child.get('absoluteBoundingBox')
    bbox_str = f"({bbox['width']:.0f}x{bbox['height']:.0f} at {bbox['x']:.0f},{bbox['y']:.0f})" if bbox else "no-bbox"
    print(f"\nChild {i}: [{child.get('type')}] '{child.get('name')}' id:{child.get('id')} {bbox_str}")
    
    # Check if this child has nested screens or sections
    if 'children' in child:
        print(f"   Sub-children ({len(child['children'])}):")
        for sub in child['children'][:12]:
            sbox = sub.get('absoluteBoundingBox')
            sbox_str = f"({sbox['width']:.0f}x{sbox['height']:.0f})" if sbox else ""
            print(f"     - [{sub.get('type')}] '{sub.get('name')}' id:{sub.get('id')} {sbox_str}")
