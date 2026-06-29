#!/usr/bin/env python3
import json
import os
import subprocess
import sys

REPO_DIR = "/Users/paranjay/Developer/design maxxing/viewer-app"
RESULT_FILE = "/Users/paranjay/Developer/design maxxing/viewer-app/push_result.txt"

os.chdir(REPO_DIR)

results = []

# Get GitHub token
token = subprocess.check_output(["gh", "auth", "token"], cwd=REPO_DIR).decode().strip()
results.append(f"Token obtained: {token[:10]}...")

# Create repo via API
import urllib.request

req = urllib.request.Request(
    "https://api.github.com/user/repos",
    data=json.dumps({"name": "design-maxxing", "public": True}).encode(),
    headers={
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
    },
)
try:
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    results.append(f"Repo URL: {data.get('html_url', 'N/A')}")
    results.append(f"Clone URL: {data.get('clone_url', 'N/A')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    results.append(f"HTTP Error {e.code}: {body}")

# Add remote
try:
    subprocess.run(
        [
            "git",
            "remote",
            "add",
            "origin",
            "https://github.com/Paranjayy/design-maxxing.git",
        ],
        cwd=REPO_DIR,
        capture_output=True,
    )
    results.append("Remote added")
except:
    results.append("Remote may already exist")

# Push
try:
    push_result = subprocess.run(
        ["git", "push", "-u", "origin", "main"],
        cwd=REPO_DIR,
        capture_output=True,
        text=True,
        timeout=600,
    )
    results.append(f"Push exit code: {push_result.returncode}")
    if push_result.stdout:
        results.append(f"Push stdout: {push_result.stdout}")
    if push_result.stderr:
        results.append(f"Push stderr: {push_result.stderr}")
except subprocess.TimeoutExpired:
    results.append("Push timed out after 600s")

# Remote -v
remotes = subprocess.run(
    ["git", "remote", "-v"], cwd=REPO_DIR, capture_output=True, text=True
)
results.append(f"Remotes:\n{remotes.stdout}")

# Log
log_result = subprocess.run(
    ["git", "log", "--oneline", "-3"], cwd=REPO_DIR, capture_output=True, text=True
)
results.append(f"Last 3 commits:\n{log_result.stdout}")

results.append("ALL_COMPLETE")

with open(RESULT_FILE, "w") as f:
    f.write("\n".join(results))

print("DONE")
