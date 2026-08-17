import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/lib/figmaTemplates.ts', 'r', encoding='utf-8') as f:
    content = f.read()

prefix = 'export const FIGMA_TEMPLATES: FigmaTemplate[] = '
start = content.find(prefix) + len(prefix)
end = content.rfind(';')
json_str = content[start:end].strip()

figma_templates = json.loads(json_str)

print(f"Analyzing {len(figma_templates)} Figma templates:")

for t in figma_templates:
    tid = t['id']
    tname = t['name']
    bg = t.get('background', {})
    bg_type = bg.get('type')
    color = bg.get('color') or (bg.get('gradient', {}).get('stops', [{}])[0].get('color') if bg.get('gradient') else '#000')
    screens_count = len(t.get('screens', []))
    
    first_screen_texts = []
    if t.get('screens'):
        for l in t['screens'][0].get('layers', []):
            if l.get('type') == 'text':
                first_screen_texts.append(l.get('content', '')[:40].replace('\n', ' '))
                
    print(f"{tid}: {tname} | bg={bg_type} ({color}) | screens={screens_count} | text={first_screen_texts[:2]}")
