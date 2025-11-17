import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading your story...");

  useEffect(() => {
    const criticalAssets = [
      "/assets/img/scene1-bg.webp",
      "/assets/audio/bg_loop.mp3",
      "/assets/img/envelope.webp",
    ];

    let loadedCount = 0;
    const totalAssets = criticalAssets.length;

    const updateProgress = () => {
      loadedCount++;
      const newProgress = Math.round((loadedCount / totalAssets) * 100);
      setProgress(newProgress);

      if (loadedCount === totalAssets) {
        setLoadingText("Ready!");
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    };

    // Preload images
    criticalAssets.forEach((asset) => {
      if (asset.includes(".webp") || asset.includes(".png")) {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress; // Still continue even if asset fails
        img.src = asset;
      } else if (asset.includes(".mp3") || asset.includes(".wav")) {
        const audio = new Audio();
        audio.oncanplaythrough = updateProgress;
        audio.onerror = updateProgress; // Still continue even if asset fails
        audio.src = asset;
      }
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-green-900">
      <div className="text-center px-8">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-serif text-white mb-8 animate-pulse">
          The Christmas Heist
        </h1>

        {/* Loading bar */}
        <div className="w-80 max-w-full mx-auto mb-6">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-400 to-green-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-xl text-white/90">{loadingText}</p>

        {/* Snowflake decoration */}
        <div className="mt-8 text-4xl animate-spin-slow">❄️</div>
      </div>
    </div>
  );
}
