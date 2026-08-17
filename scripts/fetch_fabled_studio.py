import json
import urllib.request
import os
import sys
import time

sys.stdout.reconfigure(encoding='utf-8')

TOKEN = os.environ.get('FIGMA_TOKEN', '')
if not TOKEN and os.path.exists('.env.local'):
    with open('.env.local', 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('FIGMA_TOKEN='):
                TOKEN = line.strip().split('=', 1)[1]

FILE_KEY = 'zSRwr7dSpKSlCP8CEiatrk'
url = f'https://api.figma.com/v1/files/{FILE_KEY}'

print("Waiting 10s for Figma API rate limit cooldown...")
time.sleep(10)

print(f"Fetching Figma file {FILE_KEY}...")
req = urllib.request.Request(url, headers={'X-Figma-Token': TOKEN})
try:
    with urllib.request.urlopen(req) as res:
        data = json.loads(res.read().decode('utf-8'))

    out_file = 'figma_fabled_studio.json'
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"SUCCESS: Saved {out_file}, file name: {data.get('name')}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code} - {e.reason}")
    if e.headers:
        print(f"Headers: {dict(e.headers)}")
