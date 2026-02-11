#!/bin/bash
# Serve the ReelBreak preview at http://localhost:8765
# Open that URL in your browser to view the app.

cd "$(dirname "$0")"
PORT=8765

echo "ReelBreak preview server"
echo "Open in your browser: http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

if command -v python3 &>/dev/null; then
  python3 -m http.server "$PORT"
elif command -v python &>/dev/null; then
  python -m http.server "$PORT"
else
  echo "Python not found. Open index.html directly in your browser:"
  echo "  file://$(pwd)/index.html"
  exit 1
fi
