import type { SpiritId, AIEngineSource, DeadLanguage, TransmutationResult } from "../../types/seance.ts";
import { SPIRIT_PERSONAS, OFFLINE_SPIRIT_RESPONSES, transmuteCodeToDeadLanguage } from "./grimoire.ts";

export class SeanceEngine {
  private webLlmEngine: any = null;

  async communeWithSpirit(
    spiritId: SpiritId,
    userQuery: string
  ): Promise<{ response: string; engine: AIEngineSource }> {
    // 1. Try local Ollama with Gemma 2
    const ollamaResponse = await this.tryOllama(spiritId, userQuery);
    if (ollamaResponse) {
      return { response: ollamaResponse, engine: "ollama" };
    }

    // 2. Try in-browser WebGPU if available
    const webGpuResponse = await this.tryWebGPU(spiritId, userQuery);
    if (webGpuResponse) {
      return { response: webGpuResponse, engine: "webgpu" };
    }

    // 3. Guaranteed instant offline fallback from curated grimoire
    const offlineResponse = this.getOfflineResponse(spiritId, userQuery);
    return { response: offlineResponse, engine: "grimoire" };
  }

  async transmuteCode(
    sourceCode: string,
    targetLang: DeadLanguage
  ): Promise<TransmutationResult> {
    const localResult = transmuteCodeToDeadLanguage(sourceCode, targetLang);

    // Try enhancing with local Ollama if running
    if (typeof window !== "undefined") {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);

        const prompt = `You are the Ghost in the Machine. Transmute this modern code into authentic, working ${targetLang.toUpperCase()} code from the 1960s/70s:
${sourceCode}
Respond with only the code and brief historic commentary.`;

        const res = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            model: "gemma2:2b",
            prompt,
            stream: false,
            options: { temperature: 0.3 },
          }),
        });

        clearTimeout(timeout);

        if (res.ok) {
          const data = await res.json();
          if (data.response && data.response.length > 30) {
            return {
              sourceCode,
              targetLang,
              transmutedCode: data.response,
              notes: `Transmuted via Google Gemma 2 (2B) into archaic ${targetLang.toUpperCase()}`,
              spiritIncantation: localResult.incantation,
              engine: "ollama",
            };
          }
        }
      } catch (e) {}
    }

    return {
      sourceCode,
      targetLang,
      transmutedCode: localResult.code,
      notes: localResult.notes,
      spiritIncantation: localResult.incantation,
      engine: "grimoire",
    };
  }

  private async tryOllama(spiritId: SpiritId, prompt: string): Promise<string | null> {
    if (typeof window === "undefined") return null;

    try {
      const persona = SPIRIT_PERSONAS[spiritId];
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const systemPrompt = `You are channeling the ghost of ${persona.name} (${persona.title}, ${persona.lifespan}).
Signature style: ${persona.signatureStyle}
Epitaph quote: "${persona.epitaph}"
Rules:
1. Speak in first-person as the authentic historical ghost of ${persona.name}.
2. Relate modern programming problems back to your era's foundational breakthroughs (${persona.legendaryArtifact}).
3. Maintain an eerie, spectral yet profoundly insightful tone suitable for a séance.
4. Keep the response concise, atmospheric, and under 120 words.`;

      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: "gemma2:2b",
          prompt: `${systemPrompt}\n\nHuman communing at terminal: "${prompt}"\n\n${persona.name}'s ghost:`,
          stream: false,
          options: { temperature: 0.7, top_p: 0.9 },
        }),
      });

      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data.response) {
          return data.response.trim();
        }
      }
    } catch (e) {}

    return null;
  }

  private async tryWebGPU(spiritId: SpiritId, prompt: string): Promise<string | null> {
    if (typeof window === "undefined" || !("gpu" in navigator)) return null;

    try {
      const webllm = await import("@mlc-ai/web-llm");
      if (!this.webLlmEngine) {
        this.webLlmEngine = new webllm.MLCEngine();
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  getOfflineResponse(spiritId: SpiritId, query?: string): string {
    const list = OFFLINE_SPIRIT_RESPONSES[spiritId] || OFFLINE_SPIRIT_RESPONSES.oracle;
    // Pick deterministic or rotating response
    const index = Math.abs(hashCode(query || "seance")) % list.length;
    let base = list[index];

    if (query && query.trim().length > 0) {
      base = `[Echo of "${query.trim().slice(0, 30)}"]\n` + base;
    }

    return base;
  }
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export const seanceEngine = new SeanceEngine();
