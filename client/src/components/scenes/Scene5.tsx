import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";

interface Scene5Props {
  onContinue: () => void;
}

export default function Scene5({ onContinue }: Scene5Props) {
  const { settings } = useApp();
  const [stocking1Clicked, setStocking1Clicked] = useState(false);
  const [stocking2Clicked, setStocking2Clicked] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    audioManager.crossfade();
    audioManager.playSfx("fire_crackle_loop");
  }, []);

  useEffect(() => {
    if (stocking1Clicked && stocking2Clicked && !showScroll) {
      audioManager.playSfx("dog_bark_soft");
      setTimeout(() => {
        setShowScroll(true);

        // Play VO
        audioManager.playVo("vo_husband_scene5", () => {
          setCaption("");
        });
        setCaption(
          "No alibi could hide the truth—I love the life we built here."
        );
      }, 500);
    }
  }, [stocking1Clicked, stocking2Clicked, showScroll]);

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene5-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!showScroll ? (
        <div className="parchment-panel max-w-lg p-8 mx-4">
          <h3 className="text-2xl mb-6 text-center text-white bg-black/60 px-6 py-3 rounded-lg">
            Tap both stockings to proceed
          </h3>
          <div className="flex gap-8 justify-center mb-6">
            <div
              className={`cursor-magnify text-6xl transition-transform ${
                stocking1Clicked ? "opacity-50" : "hover:scale-110"
              }`}
              onClick={() => {
                if (!stocking1Clicked) {
                  audioManager.playSfx("stocking_jingle");
                  setStocking1Clicked(true);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" && !stocking1Clicked) {
                  audioManager.playSfx("stocking_jingle");
                  setStocking1Clicked(true);
                }
              }}
            >
              🧦
              <div className="text-sm text-center mt-2">Rigatoni</div>
            </div>
            <div
              className={`cursor-magnify text-6xl transition-transform ${
                stocking2Clicked ? "opacity-50" : "hover:scale-110"
              }`}
              onClick={() => {
                if (!stocking2Clicked) {
                  audioManager.playSfx("stocking_jingle");
                  setStocking2Clicked(true);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === "Enter" && !stocking2Clicked) {
                  audioManager.playSfx("stocking_jingle");
                  setStocking2Clicked(true);
                }
              }}
            >
              🧦
              <div className="text-sm text-center mt-2">Cannoli</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="font-semibold">Case Log 47B:</p>
            <p>
              Two hardworking American Patriots sighted in their dream home.
            </p>
            <p>Accomplices: Rigatoni & Cannoli.</p>
            <p className="italic">Evidence of happiness: overwhelming.</p>
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={onContinue}
              className="cursor-magnify"
            >
              Continue
            </Button>
          </div>
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
