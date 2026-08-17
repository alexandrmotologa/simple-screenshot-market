import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('figma_free_template_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
page1 = doc['children'][1]

top_templates = next(c for c in page1['children'] if c['name'] == 'Templates')
iphone_group = next(c for c in top_templates['children'] if c['name'] == 'iPhone')

def rgb_to_hex(r, g, b):
    return "#{:02x}{:02x}{:02x}".format(int(r*255), int(g*255), int(b*255))

print(f"Found {len(iphone_group['children'])} templates in iPhone group:")

for t_idx, template in enumerate(iphone_group.get('children', [])):
    tbox = template.get('absoluteBoundingBox', {})
    print(f"\n=================== TEMPLATE {template.get('name')} (id: {template.get('id')}) ===================")
    print(f"BBox: ({tbox.get('x')}, {tbox.get('y')}, {tbox.get('width')}x{tbox.get('height')})")
    
    # Check fills of template
    fills = template.get('fills', [])
    for f in fills:
        print(f"Template Fill: {f.get('type')}")
        if f.get('type') == 'GRADIENT_LINEAR':
            for s in f.get('gradientStops', []):
                print(f"  Stop {s.get('position')}: {rgb_to_hex(s['color']['r'], s['color']['g'], s['color']['b'])}")
        elif f.get('type') == 'SOLID':
            print(f"  Solid: {rgb_to_hex(f['color']['r'], f['color']['g'], f['color']['b'])}")
            
    # Inspect children (screens / elements)
    for c_idx, child in enumerate(template.get('children', [])):
        cbox = child.get('absoluteBoundingBox', {})
        print(f"  - Child {c_idx}: [{child.get('type')}] '{child.get('name')}' id:{child.get('id')} bbox:({cbox.get('x') - tbox.get('x',0):.0f}, {cbox.get('y') - tbox.get('y',0):.0f}, {cbox.get('width'):.0f}x{cbox.get('height'):.0f})")
        
        def dump_sub(n, indent="      "):
            ntype = n.get('type')
            nname = n.get('name')
            nbox = n.get('absoluteBoundingBox')
            if ntype == 'TEXT':
                fills = [rgb_to_hex(f['color']['r'], f['color']['g'], f['color']['b']) for f in n.get('fills', []) if f.get('type')=='SOLID']
                print(f"{indent}TEXT '{nname}': {n.get('characters')!r} | font={n.get('style',{}).get('fontFamily')} size={n.get('style',{}).get('fontSize')} color={fills}")
            elif 'mockup' in nname.lower() or 'iphone' in nname.lower() or 'phone' in nname.lower():
                print(f"{indent}MOCKUP [{ntype}] '{nname}' bbox:({nbox.get('width'):.0f}x{nbox.get('height'):.0f})")
            if 'children' in n and 'iphone' not in nname.lower() and 'mockup' not in nname.lower():
                for sub_c in n['children']:
                    dump_sub(sub_c, indent + "  ")
                    
        dump_sub(child)
