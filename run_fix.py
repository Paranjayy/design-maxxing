import subprocess, os

os.chdir("/tmp/viewer-app")

# Step 1: Remove from git index
print("Removing from git index...")
result = subprocess.run(
    ["git", "rm", "-r", "--cached", "public/items/"],
    capture_output=True, text=True
)
print(f"Removed {len(result.stdout.splitlines())} files")

# Step 2: Stage .gitignore
subprocess.run(["git", "add", ".gitignore"], check=True)
print("Staged .gitignore")

# Step 3: Commit
result = subprocess.run(
    ["git", "commit", "-m", "Gitignore public/items (5GB re-extractable from zips)"],
    capture_output=True, text=True
)
print(f"Commit: {result.stdout.strip()}")
if result.returncode != 0:
    print(f"Commit stderr: {result.stderr.strip()}")

# Step 4: Push
result = subprocess.run(
    ["git", "push", "origin", "main"],
    capture_output=True, text=True
)
print(f"Push stdout: {result.stdout.strip()}")
if result.returncode != 0:
    print(f"Push stderr: {result.stderr.strip()}")

# Step 5: Check .git size
result = subprocess.run(["du", "-sh", ".git/"], capture_output=True, text=True)
print(f".git size: {result.stdout.strip()}")

# Step 6: Status
result = subprocess.run(["git", "status", "--short"], capture_output=True, text=True)
status_lines = result.stdout.strip().splitlines()
print(f"Untracked/changed files: {len(status_lines)}")
for line in status_lines[:10]:
    print(f"  {line}")

print("=== DONE ===")
