// src/services/musicBox.js

class MusicBoxSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.noteIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(freq, duration = 2.5) {
    if (!this.ctx || freq <= 0) return;
    const now = this.ctx.currentTime;

    // Harmonic partials for a metallic music-box tinkle
    const partials = [
      { ratio: 1.0, gain: 0.6, decay: 2.2 },
      { ratio: 2.756, gain: 0.25, decay: 3.5 },
      { ratio: 5.404, gain: 0.18, decay: 5.0 },
      { ratio: 8.933, gain: 0.12, decay: 7.0 }
    ];

    partials.forEach(({ ratio, gain, decay }) => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * ratio, now);

      gainNode.gain.setValueAtTime(gain * 0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration / (decay * 0.4));

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  startMelody() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const N = {
      REST: 0,
      Eb4: 311.13, F4: 349.23, G4: 392.00, Ab4: 415.30, Bb4: 466.16,
      C5: 523.25, D5: 587.33, Eb5: 622.25, F5: 698.46, G5: 783.99,
      Ab5: 830.61, Bb5: 932.33, C6: 1046.50
    };

    const notes = [
      [N.G4, 600], [N.G4, 600], [N.Bb4, 1200],
      [N.G4, 600], [N.G4, 600], [N.Bb4, 1200],
      [N.G4, 400], [N.Bb4, 400], [N.Eb5, 800], [N.D5, 400], [N.C5, 400],
      [N.C5, 800], [N.Bb4, 1600],
      [N.F4, 400], [N.G4, 400], [N.Ab4, 800], [N.F4, 400], [N.G4, 400],
      [N.Ab4, 800], [N.F4, 400], [N.Ab4, 400], [N.D5, 800], [N.C5, 400],
      [N.Bb4, 800], [N.G4, 400], [N.Eb4, 400], [N.G4, 800],
      [N.F4, 1600], [N.REST, 400],
      [N.Eb4, 400], [N.Eb5, 1200], [N.C5, 600], [N.Ab4, 600],
      [N.Bb4, 1200], [N.G4, 600], [N.Eb4, 600],
      [N.Ab4, 400], [N.Bb4, 400], [N.C5, 800], [N.Bb4, 400], [N.Ab4, 400],
      [N.Bb4, 1600], [N.Eb4, 400],
      [N.Eb5, 1200], [N.C5, 600], [N.Ab4, 600],
      [N.Bb4, 1200], [N.G4, 600], [N.Eb4, 600],
      [N.Ab4, 400], [N.G4, 400], [N.F4, 800], [N.Bb4, 800],
      [N.Eb4, 2000]
    ];

    let current = 0;
    const playNext = () => {
      if (!this.isPlaying) return;
      const [freq, duration] = notes[current];
      if (freq > 0) {
        this.playChime(freq);
      }
      current = (current + 1) % notes.length;
      this.timer = setTimeout(playNext, duration);
    };

    playNext();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

export const musicBoxSynth = new MusicBoxSynthesizer();
