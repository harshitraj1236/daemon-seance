import test from "node:test";
import assert from "node:assert/strict";
import { SPIRIT_PERSONAS, transmuteCodeToDeadLanguage } from "../src/lib/spirits/grimoire.ts";
import { SeanceEngine } from "../src/lib/spirits/engine.ts";

const engine = new SeanceEngine();

test("Spirit Personas: verifies historical pioneers and artifacts", () => {
  const spiritIds = ["lovelace", "turing", "hopper", "hamilton", "oracle"];

  for (const id of spiritIds) {
    const spirit = SPIRIT_PERSONAS[id];
    assert.ok(spirit, `Spirit ${id} must exist in the grimoire`);
    assert.ok(spirit.name.length > 2, `${id} must have a valid historical name`);
    assert.ok(spirit.legendaryArtifact.length > 5, `${id} must have a legendary artifact`);
    assert.ok(spirit.epitaph.length > 10, `${id} must have a recorded epitaph`);
    assert.ok(spirit.voicePitch > 0 && spirit.voicePitch <= 2.0, "Voice pitch in range");
    assert.ok(spirit.voiceRate > 0 && spirit.voiceRate <= 2.0, "Voice rate in range");
  }

  // Check specific historical artifacts
  assert.ok(SPIRIT_PERSONAS.hopper.legendaryArtifact.includes("moth"));
  assert.ok(SPIRIT_PERSONAS.lovelace.legendaryArtifact.includes("Bernoulli"));
  assert.ok(SPIRIT_PERSONAS.turing.legendaryArtifact.includes("Turing Machine"));
  assert.ok(SPIRIT_PERSONAS.hamilton.legendaryArtifact.includes("Apollo"));
});

test("Transmutation Engine: produces valid COBOL-60 punchcard layout", () => {
  const result = transmuteCodeToDeadLanguage("const sum = a + b", "cobol");
  assert.ok(result.code.includes("IDENTIFICATION DIVISION"), "Must have COBOL identification division");
  assert.ok(result.code.includes("PROGRAM-ID. SEANCE-PROCEDURE"), "Must declare program id");
  assert.ok(result.code.includes("PROCEDURE DIVISION"), "Must declare procedure division");
  assert.ok(result.notes.includes("80-column"), "Must reference 80-column punchcards");
});

test("Transmutation Engine: produces valid FORTRAN II algebraic syntax", () => {
  const result = transmuteCodeToDeadLanguage("calculateEnergy()", "fortran");
  assert.ok(result.code.includes("PROGRAM SEANCE"), "Must declare FORTRAN program");
  assert.ok(result.code.includes("DO 20"), "Must contain FORTRAN DO-loop");
  assert.ok(result.code.includes("FORMAT"), "Must contain FORTRAN format statements");
});

test("Transmutation Engine: produces valid ALGOL 60 block scope", () => {
  const result = transmuteCodeToDeadLanguage("function compute()", "algol");
  assert.ok(result.code.startsWith("begin"), "ALGOL must start with begin block");
  assert.ok(result.code.endsWith("end"), "ALGOL must end with end block");
  assert.ok(result.code.includes("procedure"), "Must declare ALGOL procedure");
});

test("Transmutation Engine: produces valid Commodore 64 BASIC V2 listing", () => {
  const result = transmuteCodeToDeadLanguage("renderGraphics()", "basic");
  assert.ok(result.code.includes("10 REM"), "Must have line numbers");
  assert.ok(result.code.includes("POKE 53280,0"), "Must contain black border POKE");
  assert.ok(result.code.includes("READY."), "Must conclude with READY prompt");
});

test("SeanceEngine: retrieves offline spirit dialogues deterministically", () => {
  const response1 = engine.getOfflineResponse("lovelace", "How does software compose?");
  assert.ok(response1.length > 20, "Response must contain narrative text");

  const response2 = engine.getOfflineResponse("hopper", "debugging compiler bug");
  assert.ok(response2.length > 20, "Response must contain narrative text");

  const response3 = engine.getOfflineResponse("turing", "Can machines think?");
  assert.ok(response3.length > 20, "Response must contain narrative text");
});
