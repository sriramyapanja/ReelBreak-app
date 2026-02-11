# ReelBreak preview – open in browser

## Option 1: Local server (recommended)

In a terminal, run:

```bash
cd /Users/rams/ReelBreak/preview
chmod +x serve.sh
./serve.sh
```

Then open in your browser: **http://localhost:8765**

Stop the server with `Ctrl+C`.

---

## Option 2: Open the file directly

1. In Finder, go to **ReelBreak** → **preview**.
2. Right‑click **index.html** → **Open With** → **Chrome** (or Safari, Firefox).

Or in Terminal:

```bash
open /Users/rams/ReelBreak/preview/index.html
```

---

If a link still doesn’t open, use Option 1 (the server); it avoids `file://` issues.
