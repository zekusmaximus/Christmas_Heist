import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppSettings } from "@/lib/types";

interface AppContextType {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  currentScene: number;
  setCurrentScene: (scene: number) => void;
  unlockedScenes: number[];
  unlockScene: (scene: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AppSettings = {
  audioEnabled: true,
  textSpeed: "normal",
  wifeName: "Ashley",
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [currentScene, setCurrentScene] = useState(1);
  const [unlockedScenes, setUnlockedScenes] = useState<number[]>([1]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("christmasHeistSettings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to parse settings", e);
      }
    }

    const storedUnlocked = localStorage.getItem("christmasHeistUnlocked");
    if (storedUnlocked) {
      try {
        setUnlockedScenes(JSON.parse(storedUnlocked));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to parse unlocked scenes", e);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("christmasHeistSettings", JSON.stringify(updated));
  };

  const unlockScene = (scene: number) => {
    if (!unlockedScenes.includes(scene)) {
      const updated = [...unlockedScenes, scene];
      setUnlockedScenes(updated);
      localStorage.setItem("christmasHeistUnlocked", JSON.stringify(updated));
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        currentScene,
        setCurrentScene,
        unlockedScenes,
        unlockScene,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
