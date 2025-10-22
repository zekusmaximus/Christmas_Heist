class AudioManagerClass {
  private bgMusic: HTMLAudioElement | null = null;
  private currentSfx: HTMLAudioElement | null = null;
  private currentVo: HTMLAudioElement | null = null;
  private volume: number = 0.7;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      this.bgMusic = new Audio("/assets/audio/bg_loop.wav");
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
      // eslint-disable-next-line no-console
      console.log('BG Music blocked - enabled:', this.enabled, 'bgMusic exists:', !!this.bgMusic);
      return;
    }
    // eslint-disable-next-line no-console
    console.log('🎵 Playing background music');
    const playPromise = this.bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // eslint-disable-next-line no-console
        console.error('BG Music play failed:', err);
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
      // eslint-disable-next-line no-console
      console.log('SFX blocked - audio disabled');
      return;
    }
    // eslint-disable-next-line no-console
    console.log('🔊 Playing SFX:', sfxName);
    try {
      this.currentSfx?.pause();
      // Check if this is the dog bark - use .wav instead of .mp3
      const extension = sfxName === 'dog_bark_soft' ? 'wav' : 'mp3';
      this.currentSfx = new Audio(`/assets/audio/${sfxName}.${extension}`);
      this.currentSfx.volume = 0.25; // SFX quiet so they don't overpower VO
      const playPromise = this.currentSfx.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // eslint-disable-next-line no-console
          console.error('SFX play failed:', sfxName, err);
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('SFX creation failed:', sfxName, err);
    }
  }

  playVo(voName: string, onEnd?: () => void) {
    if (!this.enabled) {
      // eslint-disable-next-line no-console
      console.log('VO blocked - audio disabled');
      onEnd?.();
      return;
    }
    // eslint-disable-next-line no-console
    console.log('🎙️ Playing VO:', voName);
    try {
      this.currentVo?.pause();
      this.currentVo = new Audio(`/assets/audio/${voName}.wav`);
      this.currentVo.volume = 0.85; // VO loud and clear - highest priority
      if (onEnd) {
        this.currentVo.onended = onEnd;
      }
      const playPromise = this.currentVo.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // eslint-disable-next-line no-console
          console.error('VO play failed:', voName, err);
          onEnd?.();
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('VO creation failed:', voName, err);
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
