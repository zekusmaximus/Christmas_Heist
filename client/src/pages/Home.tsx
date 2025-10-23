import { useEffect, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { audioManager } from "@/lib/audioManager";
import Snowfall from "@/components/Snowfall";
import SettingsPanel from "@/components/SettingsPanel";
import Scene1 from "@/components/scenes/Scene1";
import Scene2 from "@/components/scenes/Scene2";
import Scene3 from "@/components/scenes/Scene3";
import Scene4 from "@/components/scenes/Scene4";
import Scene5 from "@/components/scenes/Scene5";
import Scene6 from "@/components/scenes/Scene6";
import Scene7 from "@/components/scenes/Scene7";

export default function Home() {
  const { settings, currentScene, setCurrentScene, unlockScene } = useApp();
  const [showSnow, setShowSnow] = useState(true);

  // Clear localStorage on every page load to always start fresh
  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    // Enable audio manager based on settings
    audioManager.setEnabled(settings.audioEnabled);
  }, [settings.audioEnabled]);

  useEffect(() => {
    // Scene 4 is the beach - no snow
    setShowSnow(currentScene !== 4);
  }, [currentScene]);

  const handleSceneComplete = (nextScene: number) => {
    unlockScene(nextScene);
    setCurrentScene(nextScene);
  };

  const handlePlayAgain = () => {
    setCurrentScene(1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
       {/* Snowfall effect (except beach scene) */}
       {showSnow && <Snowfall />}

       {/* Settings panel */}
       <SettingsPanel />

       {/* Scene router */}
       <div className="w-full h-full">
        {currentScene === 1 && (
          <Scene1 onContinue={() => handleSceneComplete(2)} />
        )}
        {currentScene === 2 && (
          <Scene2 onContinue={() => handleSceneComplete(3)} />
        )}
        {currentScene === 3 && (
          <Scene3 onContinue={() => handleSceneComplete(4)} />
        )}
        {currentScene === 4 && (
          <Scene4 onContinue={() => handleSceneComplete(5)} />
        )}
        {currentScene === 5 && (
          <Scene5 onContinue={() => handleSceneComplete(6)} />
        )}
        {currentScene === 6 && (
          <Scene6 onContinue={() => handleSceneComplete(7)} />
        )}
        {currentScene === 7 && <Scene7 onPlayAgain={handlePlayAgain} />}
      </div>
    </div>
  );
}
