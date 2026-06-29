#!/bin/bash
# This script runs in background and writes results
cd "/Users/paranjay/Developer/design maxxing/viewer-app"

{
  echo "=== STEP 1: Create Repo ==="
  GH_PAGER=cat gh repo create design-maxxing --public --source=. --remote=origin --push --description "430 web dev projects animations and templates"
  echo ""
  echo "=== STEP 2: git remote -v ==="
  git remote -v
  echo ""
  echo "=== STEP 3: git log --oneline -3 ==="
  git log --oneline -3
  echo ""
  echo "=== ALL_COMPLETE ==="
} > "/Users/paranjay/Developer/design maxxing/viewer-app/FINAL_RESULTS.txt" 2>&1
