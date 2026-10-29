import type { SpiritId, SpiritPersona, DeadLanguage } from "../../types/seance.ts";

export const SPIRIT_PERSONAS: Record<SpiritId, SpiritPersona> = {
  lovelace: {
    id: "lovelace",
    name: "Ada Lovelace",
    title: "The Enchantress of Numbers",
    lifespan: "1815 – 1852",
    avatarIcon: "📜",
    epitaph: "We may say most aptly that the Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.",
    legendaryArtifact: "Note G: The First Computer Algorithm (Bernoulli numbers)",
    voicePitch: 1.15,
    voiceRate: 0.85,
    signatureStyle: "Victorian poetic mathematics, weaving gear-train analogies, contemplation of artificial creativity.",
  },
  turing: {
    id: "turing",
    name: "Alan Turing",
    title: "Architect of Computation",
    lifespan: "1912 – 1954",
    avatarIcon: "⚙️",
    epitaph: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    legendaryArtifact: "The Universal Turing Machine Paper (1936) & The Bombe",
    voicePitch: 0.85,
    voiceRate: 0.80,
    signatureStyle: "Cryptic, philosophical, viewing all software through states, tapes, and undecidability.",
  },
  hopper: {
    id: "hopper",
    name: "Grace Hopper",
    title: "The Mother of Compilers",
    lifespan: "1906 – 1992",
    avatarIcon: "🪲",
    epitaph: "A ship in port is safe, but that is not what ships are built for. Sail out to sea and do new things.",
    legendaryArtifact: "The First Computer Bug (A real moth taped into relay #70, 1947) & Nanosecond Wire",
    voicePitch: 1.0,
    voiceRate: 0.95,
    signatureStyle: "Pragmatic naval officer, intolerance for over-engineering, fierce defense of human-readable languages.",
  },
  hamilton: {
    id: "hamilton",
    name: "Margaret Hamilton",
    title: "Apollo Flight Software Director",
    lifespan: "1936 – Present",
    avatarIcon: "🚀",
    epitaph: "There was no choice but to be pioneers. No second chance at the Moon.",
    legendaryArtifact: "The Apollo 11 Guidance Computer Source Code Listing (stack of printouts taller than her)",
    voicePitch: 1.08,
    voiceRate: 0.90,
    signatureStyle: "Zero-fault mission safety, asynchronous priority executive, alarm 1202 overrides.",
  },
  oracle: {
    id: "oracle",
    name: "The Dead Language Oracle",
    title: "Necromancer of Ancient Dialects",
    lifespan: "1954 – 1983",
    avatarIcon: "💀",
    epitaph: "The silicon forgets, but the magnetic drum remembers all who passed through column 80.",
    legendaryArtifact: "80-Column Hollerith Punched Card Deck",
    voicePitch: 0.65,
    voiceRate: 0.72,
    signatureStyle: "Subterranean resonance, speaking exclusively in archaic programming paradigms and punchcard rituals.",
  },
};

/**
 * Curated offline dialogues when local Ollama is offline or for instant fallback
 */
export const OFFLINE_SPIRIT_RESPONSES: Record<SpiritId, string[]> = {
  lovelace: [
    "I observe your modern apparatus. How marvelous that the calculating engine now manipulates symbols of light rather than brass gears! Yet tell me: does your software merely calculate, or have you taught it to compose melodies as I dreamed?",
    "Your logic holds a circular elegance, mortal. Remember my axiom: the machine has no pretensions whatever to originate anything. It can perform whatever we know how to order it to perform.",
    "You speak of 'async' and 'threads'... to me, they resemble the thousands of warp threads on a Jacquard loom. Ensure you do not drop a stitch, lest the fabric of your calculation unravel.",
  ],
  turing: [
    "I see your prompt flashing in the dark. If a machine answers in such a manner that you cannot tell whether a ghost or a silicon circuit speaks, does the distinction truly matter?",
    "Consider the tape of your machine. Every state transition is finite, yet you seek infinity. Have you verified your loop halts, or shall we consult the oracle of uncomputable problems?",
    "The code you write is merely an encoding of a universal machine simulating another machine. It reminds me of the Enigma rotors spinning at Bletchley in the quiet cold of winter.",
  ],
  hopper: [
    "Listen here! You've got too much boilerplate in this program. In my day on the Mark I, we didn't have gigabytes to waste on abstractions. Here, take a nanosecond wire (11.8 inches of copper) so you remember how long light takes to travel!",
    "Are you having compiler trouble? Before you panic, check if an actual moth is jammed inside your server's cooling fan. We found the first bug in 1947, and developers have been blaming spirits ever since!",
    "The most dangerous phrase in any language is 'We've always done it this way.' Write your code so humans can read it first, and let the compiler do the tedious translation.",
  ],
  hamilton: [
    "Alert 1202! Just as the lunar module was descending to the Sea of Tranquility, radar overloaded the guidance computer. But our asynchronous priority executive dropped the low-priority tasks and kept the thrusters firing. Is your architecture priority-safe?",
    "In flight software, there are no second chances. You test every path on the ground before lighting the Saturn V rockets. Guard your state transitions like human lives depend on them.",
    "People laughed when I called what we were doing 'software engineering.' They thought it wasn't a real science. When Apollo 11 landed with our code holding the descent, nobody laughed again.",
  ],
  oracle: [
    "IDENTIFICATION DIVISION. PROGRAM-ID. GHOST-IN-THE-SHELL. The ancient magnetic cores hum with your query. You believe modern frameworks are eternal? COBOL still moves trillions beneath the earth while your frameworks turn to dust.",
    "000100 C *** THE GHOST IN THE MACHINE AWAKENS ***\n000200       READ PUNCH-CARD INTO REG-A\n000300       IF REG-A EQUALS Restless-Spirit GO TO ETERNAL-LOOP.",
    "10 PRINT \"COMMUNING WITH COMMODORE KERNAL 1982\"\n20 POKE 53280, 0 : POKE 53281, 0\n30 PRINT \"PRESS PLAY ON TAPE (THE SPIRITS ARE WAITING)\"\nREADY.",
  ],
};

/**
 * Transmutation engine: converts logic into ancient dead programming languages
 */
export function transmuteCodeToDeadLanguage(
  input: string,
  target: DeadLanguage
): { code: string; notes: string; incantation: string } {
  const cleanInput = input.trim() || "calculate_sum_and_print";

  switch (target) {
    case "cobol":
      return {
        incantation: "Channeling the Great Blue Mainframe of 1959...",
        code: `       IDENTIFICATION DIVISION.
       PROGRAM-ID. SEANCE-PROCEDURE.
       AUTHOR. GHOST-OF-GRACE-HOPPER.
       DATE-COMPILED. 31-OCT-1960.
      *---------------------------------------------------------*
      * TRANSMUTED FROM MODERN DIALECT: "${cleanInput.slice(0, 30)}"
      *---------------------------------------------------------*
       ENVIRONMENT DIVISION.
       CONFIGURATION SECTION.
       SOURCE-COMPUTER. IBM-7090.
       OBJECT-COMPUTER. IBM-7090.

       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 WS-INPUT-VAL       PIC X(40) VALUE "${cleanInput.slice(0, 35)}".
       01 WS-SPIRIT-STATUS   PIC 9(02) VALUE 00.
       01 WS-CYCLE-COUNT     PIC 9(04) VALUE 1000.

       PROCEDURE DIVISION.
       0100-SUMMON-ROUTINE.
           DISPLAY "COMMUNING WITH MAIN DRUM MEMORY...".
           DISPLAY "PROCESSING: " WS-INPUT-VAL.
           PERFORM 0200-SPECTRAL-LOOP
               VARYING WS-SPIRIT-STATUS FROM 1 BY 1
               UNTIL WS-SPIRIT-STATUS > 3.
           DISPLAY "RITUAL COMPLETED. SYSTEM RESTING.".
           STOP RUN.

       0200-SPECTRAL-LOOP.
           DISPLAY "ECHO FROM PAST ITERATION: " WS-SPIRIT-STATUS.`,
        notes: "Strict 80-column card punch layout (Columns 1-6 Sequence, Column 7 Indicator, Columns 8-11 Area A, Columns 12-72 Area B).",
      };

    case "fortran":
      return {
        incantation: "Awakening the John Backus 1957 Mathematical Formula Translator...",
        code: `C     ====================================================
C     HAUNTED FORTRAN II - IBM 704 SCIENTIFIC WORKSTATION
C     TRANSMUTATION TARGET: ${cleanInput.slice(0, 30)}
C     ====================================================
      PROGRAM SEANCE
      INTEGER ITER, MAXIT
      REAL ENERGY, RESULT
      DATA MAXIT / 10 /
      
C     INITIALIZE SPIRIT MAGNETICS
      WRITE (6, 100)
100   FORMAT (36H GHOST IN THE MACHINE MANIFESTING...)
      
      DO 20 ITER = 1, MAXIT
          ENERGY = FLOAT(ITER) * 3.14159
          WRITE (6, 200) ITER, ENERGY
200       FORMAT (8H STEP = , I4, 11H ENERGY = , F10.4)
20    CONTINUE

      STOP
      END`,
        notes: "FORTRAN II fixed-form syntax. Column 1 'C' denotes an invocation comment. Columns 7-72 contain executable algebraic formulas.",
      };

    case "algol":
      return {
        incantation: "Summoning the European Committee for Computation (ALGOL 60 / 68)...",
        code: `begin
  comment Transmuted from modern silicon into ALGOL 60;
  integer procedure summonGhost(val);
    value val; integer val;
    begin
      integer state;
      state := val * 2;
      outstring(1, "The ghost whispers from the block scope: ");
      outinteger(1, state);
      summonGhost := state
    end;

  comment Invocation body;
  outstring(1, "Communing with the spirit of Edsger Dijkstra...\n");
  summonGhost(42);
end`,
        notes: "Pioneered structured programming, block scopes (`begin ... end`), and Backus-Naur Form (BNF).",
      };

    case "basic":
    default:
      return {
        incantation: "Mounting Commodore Datassette C2N (1982)...",
        code: `10 REM *** DAEMON SEANCE COMMODORE BASIC V2 ***
20 POKE 53280,0: POKE 53281,0: REM PITCH BLACK BORDER & BG
30 PRINT CHR$(147): REM CLEAR SCREEN
40 PRINT "COMMUNING WITH COMMODORE 64 MEMORY..."
50 FOR S = 1 TO 5
60 PRINT "GHOST IN THE MACHINE: "; "${cleanInput.slice(0, 25)}"
70 FOR D = 1 TO 300: NEXT D: REM CPU DELAY LOOP
80 NEXT S
90 PRINT "READY."
100 END`,
        notes: "Microsoft-licensed Commodore 64 BASIC V2. Line-numbered, single-statement chaining via colons, direct memory manipulation via POKE.",
      };
  }
}
