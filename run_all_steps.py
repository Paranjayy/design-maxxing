#!/usr/bin/env python3
import os
import subprocess
import sys

os.chdir("/Users/paranjay/Developer/design maxxing/viewer-app")
results = []


def run(label, cmd, timeout=300):
    results.append(f"\n=== {label} ===")
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        out = (r.stdout + r.stderr).strip()
        # Get last 10 lines max
        lines = out.split("\n")
        for line in lines[-10:]:
            # Remove problematic chars for display
            results.append(line)
        results.append(f"EXIT={r.returncode}")
        return r.returncode
    except Exception as e:
        results.append(f"ERROR: {e}")
        results.append("EXIT=999")
        return 999


run("STEP 3: Deploy", ["vercel", "--yes"])
run(
    "STEP 4: Git",
    [
        "bash",
        "-c",
        'git add -A && git commit -m "Strip Codegrid branding from item titles" && git push origin main',
    ],
)

with open("/tmp/all_results.txt", "w") as f:
    f.write("\n".join(results))

print("DONE")
