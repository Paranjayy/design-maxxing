#!/bin/bash
# Wrapper to run extraction silently
ln -sfn "/Users/paranjay/Developer/design maxxing" /tmp/design_maxxing 2>/dev/null
python3 /tmp/re_extract_full.py </dev/null >/dev/null 2>&1
echo "exit=$?" > /tmp/extract_status.txt
count=$(ls -d /tmp/design_maxxing/viewer-app/public/items/*/ 2>/dev/null | wc -l | tr -d ' ')
echo "items=$count" >> /tmp/extract_status.txt
if [ -f /tmp/design_maxxing/viewer-app/data/items-manifest.json ]; then
  entries=$(python3 -c "import json; print(len(json.load(open('/tmp/design_maxxing/viewer-app/data/items-manifest.json'))))")
  echo "manifest=$entries" >> /tmp/extract_status.txt
else
  echo "manifest=0" >> /tmp/extract_status.txt
fi
