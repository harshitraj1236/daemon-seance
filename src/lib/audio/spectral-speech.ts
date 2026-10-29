import type { SpiritId } from "../../types/seance";

export class SpectralVoiceNarrator {
  private isSpeaking = false;
  private currentUtteranceIndex = 0;
  private sentences: string[] = [];

  speak(
    text: string,
    spiritId: SpiritId = "oracle",
    onDone?: () => void
  ): void {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onDone) onDone();
      return;
    }

    this.stop();

    // Clean markdown code blocks from speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, "Code block manifested in terminal.")
      .replace(/[*_#`]/g, "")
      .trim();

    if (!cleanText) {
      if (onDone) onDone();
      return;
    }

    const matches = cleanText.match(/[^.!?\n]+[.!?\n]+/g);
    this.sentences = matches && matches.length > 0 ? matches : [cleanText];
    this.currentUtteranceIndex = 0;
    this.isSpeaking = true;

    this.playNext(spiritId, onDone);
  }

  private playNext(spiritId: SpiritId, onDone?: () => void): void {
    if (!this.isSpeaking || this.currentUtteranceIndex >= this.sentences.length) {
      this.isSpeaking = false;
      if (onDone) onDone();
      return;
    }

    const sentence = this.sentences[this.currentUtteranceIndex].trim();
    if (!sentence) {
      this.currentUtteranceIndex++;
      this.playNext(spiritId, onDone);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(sentence);

    // Apply spectral voice modulation per spirit
    switch (spiritId) {
      case "lovelace":
        utterance.pitch = 1.15;
        utterance.rate = 0.85;
        break;
      case "turing":
        utterance.pitch = 0.85;
        utterance.rate = 0.80;
        break;
      case "hopper":
        utterance.pitch = 1.0;
        utterance.rate = 0.95;
        break;
      case "hamilton":
        utterance.pitch = 1.08;
        utterance.rate = 0.90;
        break;
      case "oracle":
      default:
        utterance.pitch = 0.65; // Ghostly subterranean drone
        utterance.rate = 0.72;
        break;
    }

    // Try finding matching voice
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (spiritId === "lovelace" || spiritId === "hopper" || spiritId === "hamilton") {
          utterance.voice =
            voices.find((v) => /female|samantha|serena|victoria|karen/i.test(v.name)) ||
            voices[0];
        } else {
          utterance.voice =
            voices.find((v) => /male|daniel|david|guy|alex/i.test(v.name)) || voices[0];
        }
      }
    }

    utterance.onend = () => {
      this.currentUtteranceIndex++;
      setTimeout(() => this.playNext(spiritId, onDone), 300);
    };

    utterance.onerror = () => {
      this.currentUtteranceIndex++;
      this.playNext(spiritId, onDone);
    };

    window.speechSynthesis.speak(utterance);
  }

  stop(): void {
    this.isSpeaking = false;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  get active(): boolean {
    return this.isSpeaking;
  }
}

export const spectralVoice = new SpectralVoiceNarrator();
