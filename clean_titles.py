#!/usr/bin/env python3
"""Clean Codegrid/branding references from manifest titles. No deletions."""
import json, re
from pathlib import Path

mp = Path('/Users/paranjay/Developer/design maxxing/viewer-app/data/items-manifest.json')
with open(mp) as f:
    manifest = json.load(f)

changed = 0
for item in manifest:
    title = item.get('title', '')
    original = title

    # Remove "Codegrid " prefix variations
    title = re.sub(r'^Codegrid\s+', '', title)
    title = re.sub(r'^Codegrid\b', '', title)

    # Remove " - Codegrid" or " | Codegrid" suffixes
    title = re.sub(r'\s*[-|]\s*Codegrid\s*$', '', title)
    title = re.sub(r'\s+Codegrid\s*$', '', title)

    # Clean up any resulting double spaces or leading/trailing whitespace
    title = re.sub(r'\s{2,}', ' ', title).strip()

    # Title case if it was all caps
    if original.isupper() and title != original:
        title = title.title()

    if title != original:
        item['title'] = title
        changed += 1

with open(mp, 'w') as f:
    json.dump(manifest, f, indent=2)

print(f'Cleaned {changed} titles out of {len(manifest)} items')

# Show a few examples
for item in manifest[:5]:
    print(f'  {item["title"]}')
