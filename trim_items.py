#!/usr/bin/env python3
"""
Create a trimmed copy of public/items/ for deployment.
Keeps all HTML, CSS, JS, SVG files. Removes large binary assets
that bloat the deployment but aren't needed for most projects to render.
"""

import json
import os
import shutil
from pathlib import Path

BASE = Path("/Users/paranjay/Developer/design maxxing/viewer-app")
SRC = BASE / "public" / "items"
DST = BASE / "public" / "items-trimmed"
MANIFEST = BASE / "data" / "items-manifest.json"

# Clean previous trimmed copy
if DST.exists():
    shutil.rmtree(DST)
DST.mkdir(parents=True, exist_ok=True)

# Extensions to keep (HTML/CSS/JS/config/small assets)
KEEP_EXTS = {
    ".html",
    ".htm",
    ".css",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".svg",
    ".ico",
}
# Extensions to remove (heavy binaries)
REMOVE_EXTS = {".mp4", ".mov", ".avi", ".webm", ".mkv", ".glb", ".gltf", ".fbx", ".obj"}
# Size threshold for images/fonts: keep small ones, remove large ones
MAX_IMG_SIZE = 100 * 1024  # 100KB
MAX_FONT_SIZE = 50 * 1024  # 50KB
# Directories to always remove
REMOVE_DIRS = {"node_modules", ".next", "dist", "build", ".vercel", "__MACOSX", ".git"}

with open(MANIFEST) as f:
    manifest = json.load(f)

kept = 0
for item in manifest:
    src_dir = SRC / item["folderName"]
    dst_dir = DST / item["folderName"]
    if not src_dir.exists():
        continue

    dst_dir.mkdir(parents=True, exist_ok=True)

    for root, dirs, files in os.walk(src_dir):
        # Skip removed directories
        dirs[:] = [d for d in dirs if d not in REMOVE_DIRS and not d.startswith(".")]

        rel_root = Path(root).relative_to(src_dir)
        dst_root = dst_dir / rel_root

        for fname in files:
            if fname.startswith(".") and fname != ".env":
                continue

            src_file = Path(root) / fname
            ext = src_file.suffix.lower()
            fsize = src_file.stat().st_size

            # Always remove heavy binaries
            if ext in REMOVE_EXTS:
                continue

            # Always keep code/config files
            if ext in KEEP_EXTS:
                dst_file = dst_root / fname
                dst_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_file, dst_file)
                continue

            # For images: keep small ones, remove large ones
            if ext in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tiff"}:
                if fsize <= MAX_IMG_SIZE:
                    dst_file = dst_root / fname
                    dst_file.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(src_file, dst_file)
                continue

            # For fonts: keep small ones
            if ext in {".ttf", ".woff", ".woff2", ".eot", ".otf"}:
                if fsize <= MAX_FONT_SIZE:
                    dst_file = dst_root / fname
                    dst_file.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(src_file, dst_file)
                continue

            # For markdown, txt, etc: keep
            if ext in {
                ".md",
                ".txt",
                ".env",
                ".yaml",
                ".yml",
                ".toml",
                ".xml",
                ".csv",
                ".map",
            }:
                dst_file = dst_root / fname
                dst_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_file, dst_file)
                continue

            # Skip everything else (large JSON, .gz, .sample, etc.)

    # Check if the item has an index file in the trimmed copy
    if (dst_dir / item["indexFile"]).exists():
        kept += 1
    else:
        # Try to find index.html
        if (dst_dir / "index.html").exists():
            item["indexFile"] = "index.html"
            kept += 1

# Update manifest
with open(MANIFEST, "w") as f:
    json.dump(manifest, f, indent=2)

# Report
total_size = sum(f.stat().st_size for f in DST.rglob("*") if f.is_file())
print(f"Trimmed: {len(manifest)} items, {kept} with valid index")
print(f"Size: {total_size / (1024 * 1024):.1f}MB")
