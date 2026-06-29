import os
import subprocess

os.chdir("/Users/paranjay/Developer/design maxxing/viewer-app")

print("=== STEP 3: Deploy ===")
r = subprocess.run(["vercel", "--yes"], capture_output=True, text=True, timeout=300)
output = r.stdout + r.stderr
lines = output.strip().split("\n")
for line in lines[-5:]:
    print(line)
print(f"DEPLOY_EXIT={r.returncode}")

print("\n=== STEP 4: Git ===")
r2 = subprocess.run(
    [
        "bash",
        "-c",
        'git add -A && git commit -m "Strip Codegrid branding from item titles" && git push origin main',
    ],
    capture_output=True,
    text=True,
    timeout=60,
)
output2 = r2.stdout + r2.stderr
lines2 = output2.strip().split("\n")
for line in lines2[-5:]:
    print(line)
print(f"GIT_EXIT={r2.returncode}")
