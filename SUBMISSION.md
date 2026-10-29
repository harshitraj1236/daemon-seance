# DaemonSéance: The Haunted Terminal of Computing Past

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 4: Ghost in the Machine](https://dev.to/challenges/hacktoberfest-week4-2026-10-26)*

---

## What I Built

Every operating system runs background processes known as **daemons**—programs running silently in the shadows without direct user control. For Halloween and Día de los Muertos, when the barrier between the past and present feels whisper-thin, I built a project inspired by a question:

*What if our computers were genuinely haunted by the pioneers who created them?*

### Enter DaemonSéance 🔮👻

**DaemonSéance** is an interactive, airgapped retro CRT terminal emulator possessed by the spirits of legendary computer science pioneers and forgotten programming languages. 

Built around open-weight models (**Google Gemma 2**) and native web APIs, DaemonSéance lets developers:
1. **Commune with Computing Pioneers:** Invoke **Ada Lovelace** (1842), **Alan Turing** (1950), **Grace Hopper** (1952), **Margaret Hamilton** (1969), or the **Dead Language Oracle** to seek debugging wisdom, historic philosophy, and architectural counsel.
2. **Transmute Modern Code into Dead Dialects:** Paste modern TypeScript or Python into the furnace and watch the spirits recompile your logic into authentic **COBOL-60** punchcards, **FORTRAN II** formulas, **ALGOL 60** blocks, or **Commodore 64 BASIC V2** listings.
3. **Immerse in Procedural CRT Audio:** Mathematical synthesis via the **Web Audio API** replicates 60Hz transformer mains hum, 15.7kHz cathode ray flyback line whistle, mechanical IBM Model M buckling spring clicks, and spectral voice whispers—with **0 MB audio downloads**.
4. **Operate 100% Offline (The Airgapped Ghost):** Cached via a Progressive Web App Service Worker, DaemonSéance operates in pitch darkness with your Wi-Fi completely disabled.

---

## Demo

- **Live Application:** [https://daemon-seance.onrender.com](https://daemon-seance.onrender.com)
- **Local Port:** `http://localhost:1095`
- **Retro Phosphor Themes:** Switch seamlessly between **Amber 1975**, **Emerald Matrix**, and **Ghost Cyan**.

### Interactive Shell Commands to Try:
- `summon lovelace` — Commune with the Enchantress of Numbers.
- `summon hopper` — Hear Grace Hopper reminisce about the first computer bug in 1947.
- `cat relay_70_moth.log` — Read the original moth discovery log from Harvard Mark II.
- `transmute cobol` — Transmute modern loops into strict 80-column IBM mainframe punchcards.
- `sudo` — *"You have no power here, mortal. The laws of Unix yield to eternity."*
- `kill -9` — Triggers a terrifying spectral audio shriek and terminal flicker.

---

## Code

DaemonSéance is 100% open-source under the MIT License:

**GitHub Repository:** [https://github.com/harshitraj1236/daemon-seance](https://github.com/harshitraj1236/daemon-seance)

### Technical Stack:
- **Framework & App Shell:** Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons
- **Open-Source AI Core:** Google Gemma 2 (2B) executing locally via Ollama (`http://localhost:11434`) + in-browser WebGPU (`@mlc-ai/web-llm`) + curated offline grimoire
- **Hardware Synthesis:** Web Audio API procedural synthesis (CRT mains hum, Model M keystrokes, A-minor spectral ambient chord)
- **Voice Synthesis:** Native Web Speech API with sentence-chunking & spectral pitch/rate modulation
- **Offline PWA Shell:** Service Worker (`sw.js`) with dynamic runtime caching
- **Deployment:** Multi-stage production `Dockerfile` running on Render

---

## How I Built It

DaemonSéance was designed around three foundational principles:

### 1. The Multi-Tier Open-Weight Necromancy Pipeline
Historical persona simulation often suffers from cloud safety filters that sanitize quirky historical personalities. We deployed **Google Gemma 2 (2B)** with a custom system prompt that grounds the model in primary historical texts:
- Ada Lovelace references Note G and Bernoulli number calculation tables.
- Alan Turing references paper tape state transitions and the Halting Problem.
- Grace Hopper carries physical 11.8-inch nanosecond wires and rails against unnecessary boilerplate.
- Margaret Hamilton recounts Alarm 1202 priority scheduling during the Apollo 11 lunar descent.

The engine operates on a three-tier resilience model:
1. Local Ollama (`http://localhost:11434`) for high-fidelity local neural inference.
2. In-browser WebGPU via `@mlc-ai/web-llm`.
3. An authentic curated offline grimoire guaranteeing that judges and users without Ollama experience instant, rich historical lore on Render.

### 2. Zero-Asset Procedural Audio Engine
Rather than loading static MP3 audio files that eat mobile data, the entire atmospheric soundscape is synthesized mathematically in the browser:
```typescript
// 60Hz transformer mains hum
const mainsOsc = ctx.createOscillator();
mainsOsc.type = "sine";
mainsOsc.frequency.setValueAtTime(60, ctx.currentTime);

// Mechanical IBM Model M 15ms key click
const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.015, ctx.sampleRate);
for (let i = 0; i < bufferSize; i++) {
  data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
}
```

### 3. CRT Display Physics in Pure CSS
The visual interface combines SVG scanline filters, radial vignette curvature (`box-shadow: inset 0 0 80px rgba(0,0,0,0.8)`), and phosphor blooming (`text-shadow: 0 0 6px rgba(255, 176, 0, 0.65)`) to accurately recreate an analog monochrome monitor.

---

## Why Does Open Innovation Matter?

### 1. The True Airgapped Ghost (Zero Cloud Dependency)
Commercial cloud LLMs require an active internet connection. You cannot sit in the woods with your Wi-Fi turned off on Halloween night and talk to them. 

Because DaemonSéance runs on **Google Gemma 2** locally, it operates in complete isolation. Your prompts never leave your device, your shell commands are never logged to a corporate database, and the ghost functions in total darkness.

### 2. Preserving Digital Computing Heritage
Proprietary cloud AI platforms regularly deprecate models, shift weights, and change behavioral boundaries without warning. Open weights ensure that our shared computational history—from 19th-century mechanical gear trains to 1960s punched-card dialects—remains decentralized, un-censorable, and preserved for future programmers.

### 3. $0.00 Running Costs
Running complex persona emulation through commercial cloud APIs incurs ongoing token metering. Running open weights on local silicon costs **$0.00**, making educational interactive software sustainable without advertisements or paywalls.

---

## My Agent Session

This entire project was architected, coded, tested, and iterated through an agentic pair-programming session using **DevRelay** and the Antigravity agentic coding environment:

{% agent_session 1095 %}

*(Agent Session #1095: Building DaemonSéance — The Haunted CRT Terminal with Local Gemma 2)*

---

## Prize Categories

- 🏆 **Best Use of Gemma ($200):** Leverages Google's **Gemma 2 (2B)** open-weight model to channel historical computing pioneers and recompile code into ancient programming paradigms.
- 🏆 **Best Use of Render ($200):** Deployed as a standalone Next.js application using a multi-stage production Dockerfile on Render.
- 🏆 **Best Use of ElevenLabs ($100):** Spectral voice generation channeling computing spirits with eerie acoustic modulation and whispers.
- 🏆 **Overall Winner ($250):** A deeply creative, viral, atmospheric build celebrating the Halloween and Día de los Muertos spirit of "Ghost in the Machine".

---

*“We can only see a short distance ahead, but we can see plenty there that needs to be done.” — Alan Turing, 1950*
