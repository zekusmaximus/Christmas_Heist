class AudioManagerClass {
  private bgMusic: HTMLAudioElement | null = null;
  private currentSfx: HTMLAudioElement | null = null;
  private currentVo: HTMLAudioElement | null = null;
  private volume: number = 0.7;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.bgMusic = new Audio("/assets/audio/bg_loop.mp3");
      this.bgMusic.loop = true;
      this.bgMusic.volume = 0.15; // BG music very quiet so VO is clear
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopBgMusic();
      this.currentSfx?.pause();
      this.currentVo?.pause();
    }
  }

  playBgMusic() {
    if (!this.enabled || !this.bgMusic) {
      return;
    }
    const playPromise = this.bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently handle autoplay failures
      });
    }
  }

  stopBgMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
    }
  }

  playSfx(sfxName: string) {
    if (!this.enabled) {
      return;
    }
    try {
      this.currentSfx?.pause();
      // Check if this is the dog bark - use .wav instead of .mp3
      const extension = sfxName === 'dog_bark_soft' ? 'wav' : 'mp3';
      this.currentSfx = new Audio(`/assets/audio/${sfxName}.${extension}`);
      this.currentSfx.volume = 0.25; // SFX quiet so they don't overpower VO
      const playPromise = this.currentSfx.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle playback failures
        });
      }
    } catch {
      // Silently handle audio creation failures
    }
  }

  playVo(voName: string, onEnd?: () => void) {
    if (!this.enabled) {
      onEnd?.();
      return;
    }
    try {
      this.currentVo?.pause();
      this.currentVo = new Audio(`/assets/audio/${voName}.wav`);
      this.currentVo.volume = 0.85; // VO loud and clear - highest priority
      if (onEnd) {
        this.currentVo.onended = onEnd;
      }
      const playPromise = this.currentVo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Silently handle playback failures
          onEnd?.();
        });
      }
    } catch {
      // Silently handle audio creation failures
      onEnd?.();
    }
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.bgMusic) {
      this.bgMusic.volume = 0.15; // Keep BG music consistently quiet
    }
  }

  crossfade(duration: number = 800) {
    // Simple crossfade effect
    if (!this.bgMusic) {return;}
    const original = this.bgMusic.volume;
    this.bgMusic.volume = 0;
    const steps = 20;
    const increment = original / steps;
    const interval = duration / steps;

    let step = 0;
    const fadeIn = setInterval(() => {
      if (step >= steps || !this.bgMusic) {
        clearInterval(fadeIn);
        return;
      }
      this.bgMusic.volume = Math.min(original, this.bgMusic.volume + increment);
      step++;
    }, interval);
  }
}

export const audioManager = new AudioManagerClass();
