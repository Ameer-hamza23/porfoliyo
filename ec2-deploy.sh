#!/bin/bash
# Run on your EC2 instance after uploading/cloning the project
set -e

echo "Installing dependencies..."
npm ci

echo "Building Next.js (standalone)..."
npm run build

echo "Preparing standalone output..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "Starting app on port 3000..."
export PORT=3000
export HOSTNAME=0.0.0.0
node .next/standalone/server.js
