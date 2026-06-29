#!/bin/bash
cd "/Users/paranjay/Developer/design maxxing/viewer-app"

echo "DEPLOYING" > /tmp/status.txt

# Deploy
vercel --yes > /tmp/vercel_out.txt 2>&1
echo "VERCEL_EXIT=$?" >> /tmp/status.txt

# Git
git add -A > /tmp/git_out.txt 2>&1
git commit -m "Strip Codegrid branding from item titles" >> /tmp/git_out.txt 2>&1
echo "COMMIT_EXIT=$?" >> /tmp/status.txt
git push origin main >> /tmp/git_out.txt 2>&1
echo "PUSH_EXIT=$?" >> /tmp/status.txt

echo "DONE" >> /tmp/status.txt
