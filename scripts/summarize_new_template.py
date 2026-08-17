import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('new_figma_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
screenshots_page = next((p for p in doc['children'] if 'screenshots' in p['name']), None)

print("SUMMARY OF ALL 10 SCREENS IN NEW FIGMA TEMPLATE:")
for child in screenshots_page.get('children', []):
    if child.get('name') in [str(i) for i in range(1, 11)]:
        name = child.get('name')
        bbox = child.get('absoluteBoundingBox')
        fills = child.get('fills', [])
        bg_fill = fills[0] if fills else None
        
        texts = []
        mockups = []
        other = []
        
        def walk(n):
            if n.get('type') == 'TEXT':
                texts.append((n.get('name'), n.get('characters'), n.get('style', {}).get('fontSize'), n.get('style', {}).get('fontFamily'), n.get('absoluteBoundingBox')))
            elif 'iphone' in n.get('name', '').lower() or 'android' in n.get('name', '').lower() or 'phone' in n.get('name', '').lower() or 'zoom' in n.get('name', '').lower():
                mockups.append((n.get('name'), n.get('type'), n.get('absoluteBoundingBox'), n.get('relativeTransform')))
            elif n.get('type') == 'INSTANCE' and 'flag' in n.get('name', '').lower():
                other.append(('flag', n.get('absoluteBoundingBox')))
            if 'children' in n and 'iphone' not in n.get('name', '').lower() and 'android' not in n.get('name', '').lower():
                for c in n['children']:
                    walk(c)
        
        for c in child.get('children', []):
            walk(c)
            
        print(f"\n--- Screen {name} (bbox: {bbox['width']:.0f}x{bbox['height']:.0f} at {bbox['x']:.0f},{bbox['y']:.0f}) ---")
        print(f"Background: {bg_fill.get('type') if bg_fill else 'none'} color={bg_fill.get('color') if bg_fill else ''}")
        print("Texts:")
        for t in texts:
            print(f"  - [{t[0]}] '{t[1]}' (font: {t[3]} {t[2]}px, bbox: {t[4]})")
        print("Mockup/Device elements:")
        for m in mockups:
            print(f"  - [{m[0]}] ({m[1]}) bbox: {m[2]}")
        if other:
            print(f"Other elements: {len(other)} items (e.g. flags)")
