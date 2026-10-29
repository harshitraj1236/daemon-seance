export type SpiritId = "lovelace" | "turing" | "hopper" | "hamilton" | "oracle";

export type PhosphorTheme = "amber" | "emerald" | "ghost";

export type DeadLanguage = "cobol" | "fortran" | "algol" | "basic";

export type AIEngineSource = "ollama" | "webgpu" | "grimoire";

export interface SpiritPersona {
  id: SpiritId;
  name: string;
  title: string;
  lifespan: string;
  avatarIcon: string;
  epitaph: string;
  legendaryArtifact: string;
  voicePitch: number;
  voiceRate: number;
  signatureStyle: string;
}

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "spirit" | "error" | "system" | "code";
  text: string;
  timestamp: string;
  spiritId?: SpiritId;
  metadata?: {
    engine?: AIEngineSource;
    codeLang?: DeadLanguage | "modern";
  };
}

export interface TransmutationResult {
  sourceCode: string;
  targetLang: DeadLanguage;
  transmutedCode: string;
  notes: string;
  spiritIncantation: string;
  engine: AIEngineSource;
}

export interface AudioSettings {
  crtHum: boolean;
  keyboardClick: boolean;
  spectralWhisper: boolean;
  masterVolume: number;
}
