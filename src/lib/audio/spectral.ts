/**
 * Procedural Spectral Audio Engine (Web Audio API)
 * Generates authentic retro CRT terminal sounds, mechanical keyboard clicks,
 * and eerie spectral drones mathematically without downloading MP3/WAV assets.
 */

export class SpectralAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private crtGain: GainNode | null = null;
  private droneGain: GainNode | null = null;
  private crtOscillators: OscillatorNode[] = [];
  private droneOscillators: OscillatorNode[] = [];
  private isMuted = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.crtGain = this.ctx.createGain();
        this.crtGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        this.crtGain.connect(this.masterGain);

        this.droneGain = this.ctx.createGain();
        this.droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.droneGain.connect(this.masterGain);
      } catch (e) {
        console.warn("[SpectralAudio] Failed to initialize AudioContext:", e);
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Continuous retro CRT hum (60Hz power transformer hum + faint 15.7kHz flyback line whistle)
   */
  startCrtHum(enabled = true): void {
    const ctx = this.getAudioContext();
    if (!ctx || !this.crtGain || !enabled) return;

    this.stopCrtHum();

    try {
      // 60Hz transformer mains hum
      const mainsOsc = ctx.createOscillator();
      mainsOsc.type = "sine";
      mainsOsc.frequency.setValueAtTime(60, ctx.currentTime);

      const mainsGain = ctx.createGain();
      mainsGain.gain.setValueAtTime(0.7, ctx.currentTime);
      mainsOsc.connect(mainsGain);
      mainsGain.connect(this.crtGain);
      mainsOsc.start();
      this.crtOscillators.push(mainsOsc);

      // Subtle 120Hz second harmonic
      const harmonicOsc = ctx.createOscillator();
      harmonicOsc.type = "triangle";
      harmonicOsc.frequency.setValueAtTime(120, ctx.currentTime);

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.2, ctx.currentTime);
      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(this.crtGain);
      harmonicOsc.start();
      this.crtOscillators.push(harmonicOsc);
    } catch (e) {}
  }

  stopCrtHum(): void {
    for (const osc of this.crtOscillators) {
      try {
        osc.stop();
      } catch (e) {}
    }
    this.crtOscillators = [];
  }

  /**
   * Eerie spectral background chord (A minor dark ambient pad with subtle detuning)
   */
  startSpectralDrone(enabled = true): void {
    const ctx = this.getAudioContext();
    if (!ctx || !this.droneGain || !enabled) return;

    this.stopSpectralDrone();

    try {
      // A minor triad: A2 (110Hz), C3 (130.81Hz), E3 (164.81Hz), plus A3 shimmer (220Hz)
      const freqs = [110, 130.81, 164.81, 220];

      for (const freq of freqs) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // LFO subtle vibrato for supernatural shivering feel
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        this.droneOscillators.push(lfo);

        osc.connect(this.droneGain);
        osc.start();
        this.droneOscillators.push(osc);
      }
    } catch (e) {}
  }

  stopSpectralDrone(): void {
    for (const osc of this.droneOscillators) {
      try {
        osc.stop();
      } catch (e) {}
    }
    this.droneOscillators = [];
  }

  /**
   * Mechanical IBM Model M keyboard click on keystroke
   */
  playKeyClick(enabled = true): void {
    if (!enabled || this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.015; // 15ms click
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(2.5, now);

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0.08, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);

      noiseSource.connect(filter);
      filter.connect(clickGain);
      clickGain.connect(this.masterGain);

      noiseSource.start(now);
    } catch (e) {}
  }

  /**
   * Terminal return bell ping
   */
  playBell(enabled = true): void {
    if (!enabled || this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1244.5, now); // D#6 retro bell

      const bellGain = ctx.createGain();
      bellGain.gain.setValueAtTime(0.06, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(bellGain);
      bellGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  /**
   * Terrifying spectral shriek on `kill` or exorcise command
   */
  playSpectralShriek(): void {
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.7);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.linearRampToValueAtTime(300, now + 0.7);

      const shriekGain = ctx.createGain();
      shriekGain.gain.setValueAtTime(0.15, now);
      shriekGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(filter);
      filter.connect(shriekGain);
      shriekGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch (e) {}
  }

  setVolume(vol: number): void {
    if (!this.masterGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, vol));
    this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.5, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

export const spectralAudio = new SpectralAudioEngine();
