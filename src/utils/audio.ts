// Pure Web Audio API Sound Generator & Synthesizer
// Completely self-contained, zero external files, zero load latency.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscs: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private ambientInterval: number | null = null;
  private isMuted: boolean = false;
  private currentMode: 'off' | 'ambient' | 'digital' = 'off';
  private volume: number = 0.5;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.initContext();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
      };

      window.addEventListener('pointerdown', unlockAudio, { once: false, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: false, passive: true });
      window.addEventListener('touchstart', unlockAudio, { once: false, passive: true });
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volume,
        this.ctx.currentTime
      );
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        muted ? 0 : this.volume,
        this.ctx.currentTime
      );
    }
  }

  // --- UI Sound Effects ---

  /**
   * High-tech hover blip: Audible dual-tone micro-chirp
   */
  public playHover() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.exponentialRampToValueAtTime(1050, t + 0.045);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(1360, t);
      oscHarmonic.frequency.exponentialRampToValueAtTime(2100, t + 0.045);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      oscHarmonic.start(t);
      osc.stop(t + 0.05);
      oscHarmonic.stop(t + 0.05);
    } catch {
      // Audio safely handled
    }
  }

  /**
   * Satisfying mechanical high-tech click
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1500, t);
      osc1.frequency.exponentialRampToValueAtTime(320, t + 0.07);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(280, t);
      osc2.frequency.exponentialRampToValueAtTime(80, t + 0.07);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.075);
      osc2.stop(t + 0.075);
    } catch {
      // Audio safely handled
    }
  }

  /**
   * Navigation switch / tab selector tone
   */
  public playNavSwitch() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(1100, t + 0.09);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.095);
    } catch {
      // Audio safely handled
    }
  }

  /**
   * Hologram modal power-up / open sound
   */
  public playModalOpen() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(320, t);
      osc1.frequency.exponentialRampToValueAtTime(960, t + 0.16);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(480, t);
      osc2.frequency.exponentialRampToValueAtTime(1440, t + 0.16);

      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.18);
      osc2.stop(t + 0.18);
    } catch {
      // Audio safely handled
    }
  }

  /**
   * Ascending luminous quad-tone success chime
   */
  public playSuccess() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Audio safely handled
    }
  }

  /**
   * Futuristic telemetry sweep / scan
   */
  public playTelemetry() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.12);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.13);
    } catch {
      // Safe
    }
  }

  // --- Ambient Background Synth Engine ---

  public setAudioMode(mode: 'off' | 'ambient' | 'digital') {
    this.currentMode = mode;
    this.stopAmbient();

    if (mode === 'off') return;

    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 1.5);
    this.ambientGain.connect(this.masterGain);

    if (mode === 'ambient') {
      // Subtle & Silent Digital Minimalism Ambient Loop
      // Deep sub-harmonic minimalist chord structure:
      // Eb2 (77.78Hz sub-bed), Bb2 (116.54Hz fundamental), F3 (174.61Hz ninth), C4 (261.63Hz tenth)
      const freqs = [77.78, 116.54, 174.61, 261.63];
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.028, this.ctx.currentTime + 3.0); // Extremely subtle, gentle floor

      freqs.forEach((freq, i) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const pan = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        // Pure clean sine wave for zero distortion & utmost minimalism
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Lowpass filter steep cutoff to produce deep, soothing velvety texture
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180 + i * 30, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.7, this.ctx.currentTime);

        // Ultra-slow breathing LFO (0.025Hz - 0.05Hz, full 20-40s breath cycles)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.025 + i * 0.012, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(12, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc.connect(filter);
        if (pan) {
          pan.pan.setValueAtTime(i % 2 === 0 ? -0.2 : 0.2, this.ctx.currentTime);
          filter.connect(pan);
          pan.connect(this.ambientGain);
        } else {
          filter.connect(this.ambientGain);
        }

        osc.start();
        lfo.start();
        this.ambientOscs.push(osc);
        this.ambientOscs.push(lfo);
      });
    } else if (mode === 'digital') {
      // Soft Cosmic Ambient Pulsation
      // Pentatonic calming notes: F3 (174.6Hz), A3 (220Hz), C4 (261.6Hz), E4 (329.6Hz), A4 (440Hz)
      const freqs = [174.61, 220.0, 261.63, 329.63, 440.0];
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2.0);

      freqs.forEach((freq, i) => {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        const pan = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1 + i * 0.04, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(6, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320 + i * 50, this.ctx.currentTime);
        filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

        osc.connect(filter);
        if (pan) {
          pan.pan.setValueAtTime(i % 2 === 0 ? -0.25 : 0.25, this.ctx.currentTime);
          filter.connect(pan);
          pan.connect(this.ambientGain);
        } else {
          filter.connect(this.ambientGain);
        }

        lfo.start();
        osc.start();
        this.ambientOscs.push(osc);
        this.ambientOscs.push(lfo);
      });
    }
  }

  private stopAmbient() {
    this.ambientOscs.forEach((node) => {
      try {
        if ('stop' in node) node.stop();
        node.disconnect();
      } catch {
        // Safe disconnect
      }
    });
    this.ambientOscs = [];
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {
        // Safe
      }
      this.ambientGain = null;
    }
  }
}

export const soundEngine = new SoundEngine();
