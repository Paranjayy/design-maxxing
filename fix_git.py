import os
import subprocess

os.chdir("/tmp/viewer-app")

print("Step 1: Removing public/items from git index...")
r = subprocess.run(
    ["git", "rm", "-r", "--cached", "public/items/"], capture_output=True, text=True
)
removed = len([l for l in r.stdout.splitlines() if l.strip()])
print(f"  Removed {removed} files from git index")

print("Step 2: Staging .gitignore...")
subprocess.run(["git", "add", ".gitignore"], check=True)
print("  Done")

print("Step 3: Committing...")
r = subprocess.run(
    ["git", "commit", "-m", "Gitignore public/items (5GB re-extractable from zips)"],
    capture_output=True,
    text=True,
)
print(f"  rc={r.returncode}")
for line in r.stdout.strip().splitlines():
    print(f"  {line}")
if r.stderr:
    for line in r.stderr.strip().splitlines():
        print(f"  err: {line}")

print("Step 4: Pushing...")
r = subprocess.run(["git", "push", "origin", "main"], capture_output=True, text=True)
print(f"  rc={r.returncode}")
for line in r.stdout.strip().splitlines():
    print(f"  {line}")
if r.stderr:
    for line in r.stderr.strip().splitlines():
        print(f"  err: {line}")

print("Step 5: .git size...")
r = subprocess.run(["du", "-sh", ".git/"], capture_output=True, text=True)
print(f"  {r.stdout.strip()}")

print("Step 6: Status summary...")
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
lines = r.stdout.strip().splitlines()
print(f"  {len(lines)} files with changes")

print("=== ALL DONE ===")
