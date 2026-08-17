import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_autolayout_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page = doc['children'][0]
main_frame = page['children'][0]
group_6442 = next((c for c in main_frame['children'] if c.get('name') == 'Group 1000006442'), None)

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

slices = [c for c in group_6442.get('children', []) if c.get('type') == 'SLICE']
slices.sort(key=lambda s: s['absoluteBoundingBox']['x'])

print(f"Found {len(slices)} screens/slices in Group 1000006442:")
for i, s in enumerate(slices):
    sbox = s['absoluteBoundingBox']
    print(f"\n=================== SCREEN {i+1} ({s['name']}) ===================")
    print(f"Screen bounds: x={sbox['x']}, y={sbox['y']}, {sbox['width']}x{sbox['height']}")
    
    # Find all mockups, texts, shapes overlapping with this screen slice
    for item in group_6442.get('children', []):
        if item.get('type') == 'SLICE':
            continue
        ibox = item.get('absoluteBoundingBox')
        if not ibox:
            continue
        
        # Check overlap
        overlap_x = min(ibox['x'] + ibox['width'], sbox['x'] + sbox['width']) - max(ibox['x'], sbox['x'])
        overlap_y = min(ibox['y'] + ibox['height'], sbox['y'] + sbox['height']) - max(ibox['y'], sbox['y'])
        
        if overlap_x > 20 and overlap_y > 20:
            local_x = ibox['x'] - sbox['x']
            local_y = ibox['y'] - sbox['y']
            print(f"  - [{item.get('type')}] '{item.get('name')}' id:{item.get('id')}")
            print(f"      local pos: (x={local_x:.1f}, y={local_y:.1f}, w={ibox['width']:.1f}, h={ibox['height']:.1f})")
            if item.get('type') == 'TEXT':
                print(f"      Text: {item.get('characters')!r}")
                print(f"      Style: {item.get('style')}")
            if 'iPhone Mockup' in item.get('name', ''):
                rt = item.get('relativeTransform')
                print(f"      Mockup Transform: {rt}")
                fills = item.get('fills', [])
                for f in fills:
                    if f.get('type') == 'GRADIENT_LINEAR':
                        for st in f.get('gradientStops', []):
                            print(f"        Stop {st.get('position')}: {rgb_to_hex(st['color']['r'], st['color']['g'], st['color']['b'])}")
                    elif f.get('type') == 'SOLID':
                        print(f"        Solid: {rgb_to_hex(f['color']['r'], f['color']['g'], f['color']['b'])}")
