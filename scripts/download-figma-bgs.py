import json
import urllib.request
import os
import time

TOKEN = os.environ.get('FIGMA_TOKEN', '')
FILE_KEY = os.environ.get('FIGMA_FILE_KEY', 'o523zJU0jtXpgrtk2DSiJH')

with open('figma_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

doc = data['document']
iphone_page = next(p for p in doc['children'] if 'iPhone' in p['name'])

# Extract frames 1 to 27
frames = {}
for child in iphone_page['children']:
    if child['name'].isdigit() and 1 <= int(child['name']) <= 27:
        frames[int(child['name'])] = child

background_ids = {}
for template_num, frame in frames.items():
    bg = next((c for c in frame['children'] if c['name'] in ['BACKGROUND', 'BACKGROUNDS']), None)
    if bg:
        background_ids[template_num] = bg['id']

print(f"Found {len(background_ids)} backgrounds to download.")

# Request SVG URLs
ids_str = ",".join(background_ids.values())
url = f"https://api.figma.com/v1/images/{FILE_KEY}?ids={ids_str}&format=svg"
req = urllib.request.Request(url, headers={'X-Figma-Token': TOKEN})
print("Requesting SVG URLs...")
with urllib.request.urlopen(req) as response:
    images_res = json.loads(response.read().decode())
    
if 'err' in images_res and images_res['err']:
    print("Error:", images_res['err'])
else:
    images = images_res['images']
    os.makedirs('public/templates', exist_ok=True)
    for template_num, bg_id in background_ids.items():
        img_url = images.get(bg_id)
        if img_url:
            print(f"Downloading SVG for template {template_num}...")
            svg_req = urllib.request.Request(img_url)
            with urllib.request.urlopen(svg_req) as svg_res:
                svg_data = svg_res.read()
                out_path = f"public/templates/figma-template-{template_num}.svg"
                with open(out_path, 'wb') as f:
                    f.write(svg_data)
        else:
            print(f"Missing URL for template {template_num}")

print("Backgrounds downloaded successfully.")
