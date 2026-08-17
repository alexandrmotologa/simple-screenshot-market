import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_autolayout_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page = doc['children'][0]
main_frame = page['children'][0]
group_6442 = next((c for c in main_frame['children'] if c.get('name') == 'Group 1000006442'), None)
bg_group = next((c for c in group_6442['children'] if c.get('name') == 'Group 1000006449'), None)

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

for child in bg_group.get('children', []):
    print(f"[{child.get('type')}] '{child.get('name')}'")
    for f in child.get('fills', []):
        print(f"  Fill: {f.get('type')}")
        if f.get('type') == 'GRADIENT_LINEAR':
            for s in f.get('gradientStops', []):
                c = s.get('color', {})
                print(f"    Stop {s.get('position')}: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))}")
        elif f.get('type') == 'SOLID':
            c = f.get('color', {})
            print(f"    Solid: {rgb_to_hex(c.get('r',0), c.get('g',0), c.get('b',0))}")
