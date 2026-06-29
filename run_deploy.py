import os
import subprocess

os.chdir("/Users/paranjay/Developer/design maxxing/viewer-app")

print("=== STEP 3: Deploy ===", flush=True)
r = subprocess.run(["vercel", "--yes"], capture_output=True, text=True, timeout=300)
output = r.stdout + r.stderr
lines = output.strip().split("\n")
for line in lines[-5:]:
    print(line, flush=True)
print(f"DEPLOY_EXIT={r.returncode}", flush=True)
