import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";

interface Scene6Props {
  onContinue: () => void;
}

export default function Scene6({ onContinue }: Scene6Props) {
  const { settings } = useApp();
  const [globeClicked, setGlobeClicked] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showVow, setShowVow] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    audioManager.crossfade();
    audioManager.playSfx("door_creak");
  }, []);

  const handleGlobeClick = () => {
    if (globeClicked) {return;}
    audioManager.playSfx("glass_chime");
    setTimeout(() => {
      audioManager.playSfx("snowglobe_soft_shatter");
      setGlobeClicked(true);
      setTimeout(() => {
        setShowCard(true);
        setTimeout(() => {
          setShowVow(true);

          // Play the heartfelt vow
          audioManager.playVo("vo_husband_scene6", () => {
            setCaption("");
          });
          setCaption(
            "That I still only have eyes for you every day. You're not my past or my present—you're my favorite future."
          );
        }, 2000);
      }, 1000);
    }, 300);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene6-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!showCard ? (
        <div className="text-center absolute top-1/4">
          <p className="text-2xl mb-8 text-white bg-black/70 px-8 py-4 rounded-lg font-semibold shadow-lg">
            Tap the evidence.
          </p>
          <div
            className={`cursor-magnify transition-all ${
              globeClicked ? "globe-bloom" : "hover:scale-105"
            }`}
            onClick={handleGlobeClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && handleGlobeClick()}
          >
            <div className="w-64 h-64 mx-auto bg-secondary/30 rounded-full flex items-center justify-center text-6xl border-4 border-red-500 shadow-2xl">
              💝
            </div>
          </div>
        </div>
      ) : (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="font-semibold text-center text-xl">
              Case File #1225 — The Christmas Heist
            </p>
            <p>
              <span className="font-semibold">Stolen Property:</span> One
              Husband&apos;s Heart
            </p>
            <p>
              <span className="font-semibold">Prime Suspect:</span>{" "}
              {settings.wifeName}
            </p>
          </div>

          {showVow && (
            <div className="mt-8 space-y-6">
              <div className="border-t border-border pt-6 text-lg leading-relaxed italic text-center">
                <p>That I still only have eyes for you every day.</p>
                <p className="mt-2">
                  You&apos;re not my past or my present—you&apos;re my favorite
                  future.
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="cursor-magnify"
                >
                  Continue to Epilogue
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Caption */}
      {caption && settings.audioEnabled && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-4">
          <div className="caption-text">{caption}</div>
        </div>
      )}
    </div>
  );
}
