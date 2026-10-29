"use client";

import { useState, useEffect, useRef } from "react";
import type { SpiritId, PhosphorTheme, TerminalLine, DeadLanguage } from "../types/seance";
import { SPIRIT_PERSONAS } from "../lib/spirits/grimoire";
import { seanceEngine } from "../lib/spirits/engine";
import { spectralAudio } from "../lib/audio/spectral";
import { spectralVoice } from "../lib/audio/spectral-speech";
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Cpu, 
  RotateCcw, 
  Code2, 
  HelpCircle, 
  Share2, 
  Flame,
  Radio
} from "lucide-react";

const INITIAL_GREETING = `================================================================================
  DAEMON SÉANCE v1.0.0 — THE HAUNTED TERMINAL OF COMPUTING PAST
  Architecture: 100% Offline Airgapped Necromancy
  Current TTY:  /dev/spectral/0
================================================================================

The veil between modern silicon and the pioneers of computation wears thin.
The spirits of those who built the digital world are listening.

QUICK INVOCATIONS:
  • summon lovelace   — Commune with Ada Lovelace (1842)
  • summon turing     — Channel Alan Turing (1950)
  • summon hopper     — Awaken Grace Hopper (1952)
  • summon hamilton   — Invoke Margaret Hamilton (1969)
  • summon oracle     — Awaken the Dead Language Oracle
  • transmute <lang>  — Transmute modern code to COBOL, FORTRAN, ALGOL, BASIC
  • help              — Display full list of shell commands & spectral rituals

Type a command below or tap any spirit chip to begin the séance.
`;

export default function Home() {
  const [theme, setTheme] = useState<PhosphorTheme>("amber");
  const [activeSpirit, setActiveSpirit] = useState<SpiritId>("lovelace");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "init",
      type: "system",
      text: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFlickering, setIsFlickering] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtHumEnabled, setCrtHumEnabled] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showTransmuteModal, setShowTransmuteModal] = useState(false);
  const [codeToTransmute, setCodeToTransmute] = useState("for (let i = 0; i < 10; i++) {\n  console.log('Calculating: ' + i);\n}");
  const [selectedLanguage, setSelectedLanguage] = useState<DeadLanguage>("cobol");
  const [copiedSession, setCopiedSession] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, isProcessing]);

  // Focus input automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const triggerFlicker = () => {
    setIsFlickering(true);
    setTimeout(() => setIsFlickering(false), 250);
  };

  const addLine = (line: Omit<TerminalLine, "id" | "timestamp">) => {
    const newLine: TerminalLine = {
      ...line,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
    };
    setLines((prev) => [...prev, newLine]);
  };

  // Sound toggles
  const handleToggleAudio = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (!next) {
      spectralAudio.stopCrtHum();
      spectralAudio.stopSpectralDrone();
      spectralVoice.stop();
    } else if (crtHumEnabled) {
      spectralAudio.startCrtHum(true);
    }
  };

  const handleToggleCrtHum = () => {
    const next = !crtHumEnabled;
    setCrtHumEnabled(next);
    if (next && soundEnabled) {
      spectralAudio.startCrtHum(true);
    } else {
      spectralAudio.stopCrtHum();
    }
  };

  // Spirit Summon Handler
  const handleSummon = async (spiritId: SpiritId) => {
    setActiveSpirit(spiritId);
    triggerFlicker();
    if (soundEnabled) {
      spectralAudio.playBell();
      spectralAudio.startSpectralDrone(true);
    }

    const persona = SPIRIT_PERSONAS[spiritId];
    addLine({
      type: "spirit",
      spiritId,
      text: `\n*** [SÉANCE CHAMBER: ${persona.name.toUpperCase()} HAS MANIFESTED] ***\n"${persona.epitaph}"\nLegendary Artifact: ${persona.legendaryArtifact}\n`,
    });

    if (voiceEnabled && soundEnabled) {
      spectralVoice.speak(persona.epitaph, spiritId);
    }
  };

  // Command Execution Engine
  const executeCommand = async (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    if (soundEnabled) {
      spectralAudio.playKeyClick();
    }

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    addLine({ type: "input", text: `ghost@daemon:~$ ${cmd}` });
    setInputValue("");

    const parts = cmd.split(" ");
    const root = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    switch (root) {
      case "help":
        addLine({
          type: "output",
          text: `AVAILABLE COMMANDS:
  summon <spirit>     - Summon Ada Lovelace, Turing, Hopper, Hamilton, or Oracle
  commune <message>   - Speak with the currently summoned spirit
  transmute <lang>    - Transmute code (cobol | fortran | algol | basic)
  theme <name>        - Change phosphor theme (amber | emerald | ghost)
  ls                  - List spectral relics and files
  cat <filename>      - Read ancient punched paper or guidance listings
  whoami              - Reveal your identity in the machine
  ps aux              - Inspect active daemons and wandering processes
  kill <pid>          - Exorcise a process (triggers spectral response)
  sudo                - Request superuser permissions
  history             - View invocations run in this session
  export              - Export session transcript formatted for DevRelay
  clear               - Purge the terminal display buffer`,
        });
        break;

      case "clear":
        setLines([]);
        break;

      case "summon": {
        const target = args.toLowerCase() as SpiritId;
        if (["lovelace", "turing", "hopper", "hamilton", "oracle"].includes(target)) {
          await handleSummon(target);
        } else {
          addLine({
            type: "error",
            text: `Unknown spirit "${args}". Available: lovelace, turing, hopper, hamilton, oracle`,
          });
        }
        break;
      }

      case "commune":
      case "ask":
      case "talk": {
        if (!args) {
          addLine({ type: "error", text: "Usage: commune <your question or thought>" });
          return;
        }

        setIsProcessing(true);
        triggerFlicker();
        const persona = SPIRIT_PERSONAS[activeSpirit];
        addLine({
          type: "output",
          text: `[Communing with ${persona.name} via ${args.length > 0 ? "quantum resonance" : "direct link"}...]`,
        });

        const result = await seanceEngine.communeWithSpirit(activeSpirit, args);
        setIsProcessing(false);

        addLine({
          type: "spirit",
          spiritId: activeSpirit,
          text: `${persona.avatarIcon} ${persona.name}:\n${result.response}`,
          metadata: { engine: result.engine },
        });

        if (voiceEnabled && soundEnabled) {
          spectralVoice.speak(result.response, activeSpirit);
        }
        break;
      }

      case "transmute": {
        const lang = parts[1]?.toLowerCase() as DeadLanguage;
        if (["cobol", "fortran", "algol", "basic"].includes(lang)) {
          const code = parts.slice(2).join(" ") || codeToTransmute;
          setIsProcessing(true);
          const result = await seanceEngine.transmuteCode(code, lang);
          setIsProcessing(false);

          addLine({
            type: "output",
            text: `*** ${result.spiritIncantation} ***\n${result.notes}`,
          });

          addLine({
            type: "code",
            text: result.transmutedCode,
            metadata: { codeLang: lang, engine: result.engine },
          });

          if (soundEnabled) spectralAudio.playBell();
        } else {
          setShowTransmuteModal(true);
        }
        break;
      }

      case "theme": {
        const chosen = args.toLowerCase() as PhosphorTheme;
        if (["amber", "emerald", "ghost"].includes(chosen)) {
          setTheme(chosen);
          addLine({ type: "output", text: `Phosphor reconfigured to ${chosen.toUpperCase()}.` });
        } else {
          addLine({ type: "error", text: "Available themes: amber, emerald, ghost" });
        }
        break;
      }

      case "whoami":
        addLine({
          type: "output",
          text: "mortal@spectral-terminal — a fragile node seeking wisdom across the silicon divide.",
        });
        break;

      case "ls":
        addLine({
          type: "output",
          text: `drwxr-xr-x  3 ghost  wheel   96 Oct 31  1842  analytical_engine/
-rw-r--r--  1 ada    wheel  1852 Dec 10  1843  note_g_bernoulli.punch
-rwxr-xr-x  1 alan   wheel  1950 Jun 23  1950  imitation_game.tape
-rw-r--r--  1 grace  wheel  1947 Sep 09  1947  relay_70_moth.log
-rw-r--r--  1 margo  wheel  1969 Jul 20  1969  apollo_11_alarm1202.s
-rw-r--r--  1 oracle wheel  1959 Nov 01  1959  dead_languages.carddeck`,
        });
        break;

      case "cat":
        if (args.includes("moth")) {
          addLine({
            type: "output",
            text: `[RELAY #70 LOG - SEPTEMBER 9, 1947 - HARVARD COMPUTATION LAB]
15:45 Relay #70 Panel F (moth) in relay.
First actual case of bug being found.
-- Grace Hopper taped the 2-inch moth into the logbook with the remark:
"From then on, when anything went wrong with a computer, we said it had bugs in it."`,
          });
        } else if (args.includes("apollo") || args.includes("alarm")) {
          addLine({
            type: "output",
            text: `[APOLLO GUIDANCE COMPUTER (AGC) LOG - JULY 20, 1969]
PRIORITY ALARM 1202: RADAR OVERFLOW DETECTED.
Margaret Hamilton's asynchronous executive kicks in:
Dropping low-priority telemetry tasks.
Prioritizing engine gimbal and descent thruster calculations.
RESULT: LUNAR MODULE LANDS SAFELY WITH 30 SECONDS OF FUEL REMAINING.`,
          });
        } else if (args.includes("note_g") || args.includes("bernoulli")) {
          addLine({
            type: "output",
            text: `[NOTE G BY ADA LOVELACE - 1843]
"The Analytical Engine has no pretensions whatever to originate anything.
It can follow analysis; but it has no power of anticipating any analytical relations or truths.
Its province is to assist us in making available what we are already acquainted with."`,
          });
        } else {
          addLine({
            type: "output",
            text: `Viewing ${args || "file"}: The parchment is faded, but magnetic drum pulses whisper ancient binary code.`,
          });
        }
        break;

      case "ps":
      case "ps aux":
        addLine({
          type: "output",
          text: `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1   1024   512 ?        Ss   00:00   0:01 /sbin/init
ada         42  0.0  1.8   4096  2048 tty1     S    1842   9:15 /usr/bin/jacquard-loom-engine
alan        68  0.2  2.4   8192  4096 tty2     S    1950   4:20 /bin/universal-turing-machine
grace       92  0.1  1.5   3072  1536 tty3     S    1952   8:40 /usr/bin/a0-compiler
margo      101  0.0  3.2  16384  8192 tty4     S    1969   1:20 /opt/apollo/asynchronous-executive
oracle     666  0.4  4.0  32768 16384 ttyS0    S    1959  66:06 /bin/hollerith-punchcard-daemon`,
        });
        break;

      case "kill":
      case "kill -9":
        triggerFlicker();
        if (soundEnabled) spectralAudio.playSpectralShriek();
        addLine({
          type: "error",
          text: `*** SPECTRAL INTERFERENCE DETECTED ***
You cannot slay that which has already departed this mortal plane.
The spirits rattle the virtual terminal chassis!`,
        });
        break;

      case "sudo":
        triggerFlicker();
        addLine({
          type: "error",
          text: `sudo: Permission denied.
"You have no power here, mortal. In the realm of ghosts, the laws of Unix yield to eternity."`,
        });
        break;

      case "history":
        addLine({
          type: "output",
          text: commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join("\n"),
        });
        break;

      case "export":
        setCopiedSession(true);
        navigator.clipboard?.writeText(
          `{% agent_session 1095 %}\n\n*Communing with computing pioneers in DaemonSéance (Hacktoberfest Week 4: Ghost in the Machine)*`
        );
        addLine({
          type: "output",
          text: `[COPIED TO CLIPBOARD]
DevRelay liquid tag: {% agent_session 1095 %}
Ready to paste directly into your DEV.to challenge submission post!`,
        });
        setTimeout(() => setCopiedSession(false), 3000);
        break;

      default:
        // Default: directly commune with the active spirit
        setIsProcessing(true);
        triggerFlicker();
        const activePersona = SPIRIT_PERSONAS[activeSpirit];
        const res = await seanceEngine.communeWithSpirit(activeSpirit, cmd);
        setIsProcessing(false);

        addLine({
          type: "spirit",
          spiritId: activeSpirit,
          text: `${activePersona.avatarIcon} ${activePersona.name}:\n${res.response}`,
          metadata: { engine: res.engine },
        });

        if (voiceEnabled && soundEnabled) {
          spectralVoice.speak(res.response, activeSpirit);
        }
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[commandHistory.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
      }
    } else if (soundEnabled) {
      spectralAudio.playKeyClick();
    }
  };

  // Theme styling helpers
  const getThemeColors = () => {
    switch (theme) {
      case "emerald":
        return {
          glow: "glow-emerald",
          accentText: "text-[#33ff33]",
          border: "border-[#33ff33]/40",
          cardBg: "bg-[#0A170A]",
          cursorBg: "bg-[#33ff33]",
          dimText: "text-[#33ff33]/70",
        };
      case "ghost":
        return {
          glow: "glow-ghost",
          accentText: "text-[#7df9ff]",
          border: "border-[#7df9ff]/40",
          cardBg: "bg-[#0A141A]",
          cursorBg: "bg-[#7df9ff]",
          dimText: "text-[#7df9ff]/70",
        };
      case "amber":
      default:
        return {
          glow: "glow-amber",
          accentText: "text-[#ffb000]",
          border: "border-[#ffb000]/40",
          cardBg: "bg-[#181106]",
          cursorBg: "bg-[#ffb000]",
          dimText: "text-[#ffb000]/70",
        };
    }
  };

  const colors = getThemeColors();

  return (
    <main className={`min-h-screen p-3 md:p-6 flex flex-col justify-between select-none ${colors.glow}`}>
      
      {/* Top Header / Control Console */}
      <header className="max-w-6xl mx-auto w-full mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 text-xs">
        
        {/* Brand & TTY */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-black tracking-wider uppercase">
            <Flame className="w-4 h-4 animate-pulse text-amber-500" />
            <span>DAEMON SÉANCE</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded border border-white/20 opacity-80">
              VT100
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 opacity-70 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>AIRGAPPED / OFFLINE</span>
          </div>
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Phosphor Theme Switcher */}
          <div className="flex items-center border border-white/10 rounded overflow-hidden text-[11px]">
            <button
              onClick={() => setTheme("amber")}
              className={`px-2 py-1 transition ${theme === "amber" ? "bg-[#ffb000] text-black font-bold" : "hover:bg-white/5 opacity-70"}`}
            >
              AMBER
            </button>
            <button
              onClick={() => setTheme("emerald")}
              className={`px-2 py-1 transition ${theme === "emerald" ? "bg-[#33ff33] text-black font-bold" : "hover:bg-white/5 opacity-70"}`}
            >
              EMERALD
            </button>
            <button
              onClick={() => setTheme("ghost")}
              className={`px-2 py-1 transition ${theme === "ghost" ? "bg-[#7df9ff] text-black font-bold" : "hover:bg-white/5 opacity-70"}`}
            >
              GHOST
            </button>
          </div>

          {/* Audio Toggles */}
          <button
            onClick={handleToggleAudio}
            className={`p-1.5 rounded border border-white/10 flex items-center gap-1 text-[11px] transition ${
              soundEnabled ? "bg-white/10 opacity-100" : "opacity-40"
            }`}
            title="Toggle All Sound"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={handleToggleCrtHum}
            className={`px-2 py-1 rounded border border-white/10 text-[10px] transition ${
              crtHumEnabled ? "bg-white/15 opacity-100" : "opacity-40"
            }`}
            title="CRT 60Hz Mains Hum"
          >
            CRT HUM
          </button>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`px-2 py-1 rounded border border-white/10 text-[10px] transition ${
              voiceEnabled ? "bg-white/15 opacity-100" : "opacity-40"
            }`}
            title="Spectral Voice Synthesis"
          >
            VOICE {voiceEnabled ? "ON" : "OFF"}
          </button>

          {/* Code Transmute Modal Trigger */}
          <button
            onClick={() => setShowTransmuteModal(true)}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] flex items-center gap-1.5 transition font-bold"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>TRANSMUTE</span>
          </button>
        </div>
      </header>

      {/* Spirit Quick-Summon Deck */}
      <section className="max-w-6xl mx-auto w-full mb-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="opacity-60 text-[10px] uppercase font-bold shrink-0">SUMMON SPIRIT:</span>
        {(Object.keys(SPIRIT_PERSONAS) as SpiritId[]).map((id) => {
          const spirit = SPIRIT_PERSONAS[id];
          const isSelected = activeSpirit === id;
          return (
            <button
              key={id}
              onClick={() => handleSummon(id)}
              className={`px-2.5 py-1 rounded-md border text-left shrink-0 transition flex items-center gap-1.5 ${
                isSelected
                  ? `${colors.cardBg} ${colors.border} font-bold shadow-md`
                  : "bg-black/40 border-white/10 hover:border-white/30 opacity-70"
              }`}
            >
              <span>{spirit.avatarIcon}</span>
              <span>{spirit.name}</span>
            </button>
          );
        })}
      </section>

      {/* The Main CRT Terminal Frame */}
      <div className={`max-w-6xl mx-auto w-full flex-1 rounded-xl border-4 border-[#1c1f2e] bg-[#08080C] p-4 md:p-6 shadow-2xl crt-screen crt-vignette flex flex-col justify-between overflow-hidden relative ${isFlickering ? "animate-flicker" : ""}`}>
        
        {/* Terminal Screen Content Buffer */}
        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[13px] md:text-[14px] leading-relaxed pr-2">
          {lines.map((line) => (
            <div key={line.id} className="whitespace-pre-wrap">
              {line.type === "input" && (
                <div className="font-bold opacity-90">{line.text}</div>
              )}

              {line.type === "system" && (
                <div className={`${colors.dimText} opacity-85 leading-snug`}>{line.text}</div>
              )}

              {line.type === "output" && (
                <div className="opacity-95">{line.text}</div>
              )}

              {line.type === "spirit" && (
                <div className={`p-3 rounded-md border ${colors.border} ${colors.cardBg} my-2`}>
                  <div className="font-bold tracking-wide">{line.text}</div>
                  {line.metadata?.engine && (
                    <div className="text-[10px] mt-1.5 opacity-60 flex items-center gap-1 font-sans">
                      <Cpu className="w-3 h-3" />
                      <span>Inference: {line.metadata.engine.toUpperCase()}</span>
                    </div>
                  )}
                </div>
              )}

              {line.type === "code" && (
                <div className="p-3.5 my-2 rounded-md bg-black/80 border border-white/20 font-mono text-xs overflow-x-auto text-emerald-300">
                  <div className="text-[10px] uppercase text-white/50 mb-1">
                    TARGET DIALECT: {line.metadata?.codeLang || "DEAD LANGUAGE"}
                  </div>
                  <code>{line.text}</code>
                </div>
              )}

              {line.type === "error" && (
                <div className="text-red-400 font-bold">{line.text}</div>
              )}
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 opacity-80 animate-pulse text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Channeling ethereal frequencies across column 80...</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Interactive CLI Input Line */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 font-mono text-sm">
          <span className="font-bold opacity-80 shrink-0">ghost@daemon:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            placeholder="Type a command or whisper to the spirit..."
            className="flex-1 bg-transparent border-none outline-none focus:outline-none text-inherit placeholder:opacity-40"
            autoFocus
          />
          <span className={`terminal-cursor ${colors.cursorBg}`} />
        </div>
      </div>

      {/* Code Transmutation Modal */}
      {showTransmuteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-2xl w-full rounded-xl border ${colors.border} bg-[#0c0d14] p-5 space-y-4 shadow-2xl font-mono text-xs`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-sm tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                <span>CODE TRANSMUTATION RITUAL</span>
              </h3>
              <button
                onClick={() => setShowTransmuteModal(false)}
                className="opacity-60 hover:opacity-100 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="opacity-70 leading-relaxed text-[11px]">
              Feed modern JavaScript, TypeScript, or Python into the furnace. The spirit will recompile your logic into an authentic dead computing dialect.
            </p>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold opacity-80">Modern Code Source:</label>
              <textarea
                rows={5}
                value={codeToTransmute}
                onChange={(e) => setCodeToTransmute(e.target.value)}
                className="w-full p-2.5 rounded bg-black/90 border border-white/15 focus:outline-none focus:border-white/40 font-mono text-xs"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="opacity-70 text-[11px]">Target:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as DeadLanguage)}
                  className="px-2 py-1 rounded bg-[#161824] border border-white/20 text-xs focus:outline-none"
                >
                  <option value="cobol">COBOL-60 (Mainframe Punchcards)</option>
                  <option value="fortran">FORTRAN II (IBM 704 Formula)</option>
                  <option value="algol">ALGOL 60 (European Structured)</option>
                  <option value="basic">Commodore BASIC V2 (1982)</option>
                </select>
              </div>

              <button
                onClick={async () => {
                  setShowTransmuteModal(false);
                  executeCommand(`transmute ${selectedLanguage} ${codeToTransmute}`);
                }}
                className={`px-4 py-2 rounded font-bold transition flex items-center gap-2 ${
                  theme === "emerald"
                    ? "bg-[#33ff33] text-black"
                    : theme === "ghost"
                    ? "bg-[#7df9ff] text-black"
                    : "bg-[#ffb000] text-black"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>TRANSMUTE NOW</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info & DevRelay Session Export */}
      <footer className="max-w-6xl mx-auto w-full mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] opacity-70">
        <div>
          <span>DaemonSéance — Open-Weight Computing Necromancy · 100% On-Device</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => executeCommand("help")}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Command Help</span>
          </button>

          <button
            onClick={() => executeCommand("export")}
            className="hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3 h-3" />
            <span>{copiedSession ? "Copied!" : "Export DevRelay Session"}</span>
          </button>
        </div>
      </footer>
    </main>
  );
}
