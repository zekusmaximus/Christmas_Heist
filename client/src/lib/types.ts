export interface SceneData {
  id: number;
  title: string;
  background: string;
  hasSnow: boolean;
}

export interface AppSettings {
  audioEnabled: boolean;
  textSpeed: "slow" | "normal" | "fast";
  wifeName: string;
}

export interface AudioManager {
  playBgMusic: () => void;
  stopBgMusic: () => void;
  playSfx: (sfxName: string) => void;
  playVo: (voName: string) => void;
  setVolume: (volume: number) => void;
}
