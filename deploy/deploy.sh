#!/usr/bin/env bash
# Run this inside the container to pull the latest site content and rebuild it.
# Usage: bash deploy/deploy.sh
set -euo pipefail

REPO_DIR="/opt/portfolio-tailwind"

cd "$REPO_DIR"
echo "Pulling latest changes..."
git pull origin main

echo "Installing dependencies..."
npm ci

echo "Building..."
npm run build

echo "Done. nginx serves dist/ directly, so no reload needed unless you changed nginx.conf itself."
