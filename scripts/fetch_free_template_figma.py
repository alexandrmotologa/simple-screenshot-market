import json
import urllib.request
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get('FIGMA_TOKEN', '')
if not TOKEN and os.path.exists('.env.local'):
    with open('.env.local', 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('FIGMA_TOKEN='):
                TOKEN = line.strip().split('=', 1)[1]

FILE_KEY = os.environ.get('FIGMA_FILE_KEY', 'u5fKAwbai4KxkxMoredC8d')

url = f'https://api.figma.com/v1/files/{FILE_KEY}'
print(f"Fetching Figma file {FILE_KEY}...")

req = urllib.request.Request(url, headers={'X-Figma-Token': TOKEN})
with urllib.request.urlopen(req) as res:
    data = json.loads(res.read().decode('utf-8'))

out_file = 'figma_free_template_data.json'
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Saved {out_file}, file name: {data.get('name')}")
