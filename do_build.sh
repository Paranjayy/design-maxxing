#!/bin/bash
cd "/Users/paranjay/Developer/design maxxing/viewer-app"
npm run build > /tmp/build_output.txt 2>&1
echo "BUILD_EXIT=$?" > /tmp/build_exit.txt
