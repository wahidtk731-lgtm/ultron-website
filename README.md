# ultron-website

Official standalone landing page and distribution repository for **Ultron Assistant** — 100% Offline Android Voice Engine.

## Overview
- **Zero Cloud Dependencies:** Pure on-device speech-to-text (Vosk STT), offline intent classification, and native Android IPC.
- **Ultra-Compact APK:** 372 KB standalone binary (`UltronAssistant.apk`).
- **Interactive Simulator:** Client-side intent parsing and multi-action compound chaining playground.
- **Privacy Guaranteed:** 0 KB external telemetry, zero tracking SDKs, air-gapped capability.

## Project Structure
- `index.html` — Single-page technical showcase, architecture breakdown, interactive playground, and sideloading instructions.
- `assets/style.css` — High-performance responsive dark mode styling with zero CSS framework overhead.
- `assets/script.js` — Client-side lexical tokenizer, multi-action chained parser, modal dialogs, and checksum copy utility.
- `assets/favi.png` — Official Ultron Assistant high-resolution icon.
- `UltronAssistant.apk` — Universal Android package (`SHA-256: 2125a63373bc038eea382a5f470fab1c05b1152e1900a48598587017dfe3b423`).

## Local Development
To serve the site locally:
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080` in any web browser.

## Core Assistant Repository
See the full Python & Android assistant implementation at:
[https://github.com/wahidtk731-lgtm/ultron](https://github.com/wahidtk731-lgtm/ultron)
