# ultron-website

Official standalone website and distribution portal for **Ultron Assistant** — 100% Offline Android Voice Engine.

## Overview
- **Zero Cloud Dependencies:** Pure on-device speech-to-text (Vosk STT), offline intent classification, and native Android IPC.
- **Ultra-Compact APK:** 386 KB standalone binary (`UltronAssistant.apk`).
- **Privacy Guaranteed:** 0 KB external telemetry, zero tracking SDKs, air-gapped capability.
- **Social & Updates:** Follow [@ultron._ai on Instagram](https://instagram.com/ultron._ai).

## Project Structure
- `index.html` — Sleek, responsive landing page, interactive floating HUD preview, sideloading instructions, and download portal.
- `assets/style.css` — Modern, lightweight dark mode styling with zero CSS framework bloat.
- `assets/script.js` — Client-side modal dialog controls, navigation bar transitions, and SHA-256 verification utility.
- `assets/favi.png` — Official Ultron Assistant high-resolution branding.
- `UltronAssistant.apk` — Universal Android binary v1.1.2 (`SHA-256: 4c951171e7fac981160e72ac422d9f7822920f0ade493f3ff429dfb286b109ce`).

## Local Development
To preview the website locally:
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

## Community & Links
- **Source Repository:** [wahidtk731-lgtm/ultron](https://github.com/wahidtk731-lgtm/ultron)
- **Instagram:** [@ultron._ai](https://instagram.com/ultron._ai)
