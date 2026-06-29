import os
import subprocess

os.chdir("/Users/paranjay/Developer/design maxxing/viewer-app")

# Step 2: Build
print("=== STEP 2: Build ===")
r = subprocess.run(["npm", "run", "build"], capture_output=True, text=True)
lines = (r.stdout + r.stderr).strip().split("\n")
for line in lines[-10:]:
    print(line)
print(f"BUILD_EXIT={r.returncode}")

# Step 3: Deploy
print("\n=== STEP 3: Deploy ===")
r2 = subprocess.run(["vercel", "--yes"], capture_output=True, text=True)
lines2 = (r2.stdout + r2.stderr).strip().split("\n")
for line in lines2[-5:]:
    print(line)
print(f"DEPLOY_EXIT={r2.returncode}")
