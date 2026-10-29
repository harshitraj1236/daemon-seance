# DaemonSéance 🔮👻

> An airgapped retro CRT terminal channeling the ghosts of computing pioneers and ancient dead languages with local open-weight AI.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org/)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Procedural%20CRT-emerald)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![100% Offline](https://img.shields.io/badge/Offline-Airgapped-amber)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Gemma 2](https://img.shields.io/badge/Google-Gemma%202%20(2B)-purple)](https://ai.google.dev/gemma)

*Built for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26).*

---

## What is DaemonSéance?

Every Unix operating system runs background processes called **daemons**—programs that run silently in the shadows without user intervention. This Halloween and Día de los Muertos, the veil between modern silicon and the origins of computation has worn thin.

**DaemonSéance** is an interactive, airgapped retro CRT terminal emulator possessed by the ghosts of computing history. You can execute real shell utilities, invoke legendary pioneers, listen to procedural electromagnetic CRT hums and spectral whispers, and transmute modern TypeScript/Python into archaic punchcard languages like **COBOL-60**, **FORTRAN II**, **ALGOL 68**, and **Commodore 64 BASIC**.

---

## Key Features

### 1. Authentic Retro CRT Terminal Interface
- **VT100 & IBM 3270 Aesthetics:** Complete with scanline overlays, glass curvature vignette, phosphor blooming, and a blinking terminal block cursor.
- **Switchable Phosphor Themes:**
  - 🟡 **Amber 1975** (Classic VT220 amber glow)
  - 🟢 **Emerald Matrix** (IBM 3270 green phosphor)
  - 🔵 **Ghost Cyan** (Electric spectral glow)
- **Interactive Unix Shell:** Supports standard commands (`ls`, `whoami`, `ps aux`, `kill`, `cat`, `history`, `clear`) alongside spectral rituals (`summon`, `commune`, `transmute`, `theme`).
- **Interactive Easter Eggs:**
  - `sudo` $\to$ *"You have no power here, mortal. The laws of Unix yield to eternity."*
  - `kill -9` $\to$ Triggers a terrifying spectral audio shriek and chassis vibration.
  - `cat relay_70_moth.log` $\to$ Reads Grace Hopper's original 1947 Harvard Mark II moth discovery log.

### 2. The Séance Chamber: Summoning Pioneers
Commune with authentic neural personas powered by **Google Gemma 2**:
- 📜 **Ada Lovelace (1842):** *The Enchantress of Numbers.* Views modern code through the lens of Charles Babbage's Analytical Engine and Jacquard loom weaving cards.
- ⚙️ **Alan Turing (1950):** *Architect of Computation.* Evaluates algorithms via state machines, finite tapes, and the uncomputability of the Halting Problem.
- 🪲 **Grace Hopper (1952):** *The Mother of Compilers.* Direct naval wit, carrying nanosecond copper wires, teaching zero-boilerplate development.
- 🚀 **Margaret Hamilton (1969):** *Apollo Flight Software Director.* Explains asynchronous priority executive architectures that prevented Apollo 11's 1202 computer overload during lunar descent.
- 💀 **The Dead Language Oracle:** Recompiles modern logic into authentic archaic syntax.

### 3. Procedural Spectral Audio Engine (0 MB Assets)
Synthesizes retro terminal hardware sounds mathematically via the native **Web Audio API**:
- **CRT 60Hz Transformer Mains Hum:** Warm analog electrical hum.
- **15.7 kHz Flyback Line Whistle:** Subtle high-frequency cathode whistle.
- **Mechanical IBM Model M Keystrokes:** Organic 15ms acoustic clicks on every key press.
- **Eerie A-Minor Ambient Chord:** Drifting spectral pad with supernatural LFO vibrato.
- **Spectral Voice Synthesis:** Sentence-chunked speech with modulated rate, pitch, and voice characteristics.

### 4. Code Transmutation Ritual
Paste modern JavaScript, TypeScript, or Python and transmute it into authentic historic code:
- **COBOL-60:** Strict 80-column punchcard columns (`IDENTIFICATION DIVISION`, `PROCEDURE DIVISION`).
- **FORTRAN II:** Fixed-form algebraic formulas for the IBM 704 scientific computer.
- **ALGOL 60:** Pioneering block-structured language with `begin ... end` scopes.
- **Commodore 64 BASIC V2 (1982):** Line-numbered code with memory `POKE` routines.

---

## Why Open Innovation Matters

### 1. The True Airgapped Ghost (Zero Cloud Dependency)
Commercial cloud AI requires an active internet connection that logs prompts, tracks IP addresses, and meters token costs. By deploying **Google Gemma 2** locally via Ollama and WebGPU, DaemonSéance operates in **pitch darkness with Wi-Fi disabled**. You can commune with computing history entirely offline on your laptop.

### 2. Preserving Digital Computing Heritage
Proprietary cloud models frequently deprecate checkpoints, alter personas unpredictably, or refuse to generate obscure historical syntax. Open-weight models ensure that historical computing lore, archaic programming paradigms, and the legacy of early computing pioneers remain decentralized, auditable, and accessible to future generations forever.

### 3. $0.00 Infinite Execution Economics
Running multi-turn historical roleplay through closed cloud APIs incurs continuous metered billing. Running open weights locally costs **$0.00**, making DaemonSéance a permanent, free, ad-free educational tool.

---

## Project Structure

```text
daemon-seance/
├── src/
│   ├── app/
│   │   ├── globals.css         # CRT scanlines, vignette, and phosphor glow styles
│   │   ├── layout.tsx          # PWA metadata, service worker registration
│   │   └── page.tsx            # Interactive CRT terminal & séance chamber
│   ├── lib/
│   │   ├── audio/
│   │   │   ├── spectral.ts     # Procedural Web Audio API (CRT hum, Model M click)
│   │   │   └── spectral-speech.ts # Sentence-chunked spectral voice narrator
│   │   └── spirits/
│   │       ├── grimoire.ts     # Historical personas, lore, and transmutation templates
│   │       └── engine.ts       # Multi-tier Gemma 2 (Ollama / WebGPU / Grimoire)
│   └── types/
│       └── seance.ts           # Type contracts for spirits, themes, and transmutations
├── public/
│   ├── icon.svg                # Ghost in CRT monitor vector icon
│   ├── manifest.json           # PWA standalone manifest
│   └── sw.js                   # Precache & dynamic runtime caching service worker
├── tests/
│   └── seance.test.mjs         # Native Node.js test runner suite (6/6 tests)
├── Dockerfile                  # Multi-stage production container on port 1095
├── render.yaml                 # Render cloud web service configuration
├── package.json                # Dependencies and npm scripts (port 1095)
└── tsconfig.json               # Next.js 14 bundler configuration
```

---

## Getting Started

### Prerequisites
- Node.js >= 18.17.0
- npm >= 9.0.0
- *(Optional)* [Ollama](https://ollama.com/) running `gemma2:2b` locally for neural inference

### Installation

```bash
git clone https://github.com/harshitraj1236/daemon-seance.git
cd daemon-seance
npm install
```

### Local Development

To start the local development server on port **1095**:

```bash
npm run dev
```

Open [http://localhost:1095](http://localhost:1095) in your browser.

### Running Tests

Run the built-in Node.js test suite with zero test dependencies:

```bash
npm test
```

### Production Build

```bash
npm run build
npm start
```

---

## Docker & Render Deployment

DaemonSéance is ready for deployment on **Render**:

```bash
docker build -t daemon-seance .
docker run -p 1095:1095 daemon-seance
```

---

## License

This project is licensed under the [MIT License](LICENSE).
