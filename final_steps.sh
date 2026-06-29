#!/bin/bash
exec > /tmp/final_results.txt 2>&1
cd "/Users/paranjay/Developer/design maxxing/viewer-app"

echo "STEP3_START"
vercel --yes
echo "STEP3_EXIT=$?"
echo "STEP3_END"

echo "STEP4_START"
git add -A
git commit -m "Strip Codegrid branding from item titles"
git push origin main
echo "STEP4_EXIT=$?"
echo "STEP4_END"
