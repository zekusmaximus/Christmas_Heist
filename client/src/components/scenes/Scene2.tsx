import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";

interface Scene2Props {
  onContinue: () => void;
}

export default function Scene2({ onContinue }: Scene2Props) {
  const { settings } = useApp();
  const [showPrompt, setShowPrompt] = useState(true);
  const [showNapkin, setShowNapkin] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    audioManager.crossfade();
  }, []);

  const handleMugClick = () => {
    audioManager.playSfx("mug_set_down");
    setShowPrompt(false);
    setShowNapkin(true);
    setTimeout(() => {
      audioManager.playSfx("napkin_unfold");
      setShowNote(true);

      // Play VO
      audioManager.playVo("vo_husband_scene2", () => {
        setCaption("");
        setShowHint(true);
      });
      setCaption(
        "Across the cafeteria at the Legislative Office Building, I couldn't stop staring."
      );
    }, 500);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene2-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Prompt */}
      {showPrompt && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-center">
          <p className="text-xl mb-4 text-white bg-black/60 px-6 py-3 rounded-lg font-medium shadow-lg">
            Tap the steaming mug.
          </p>
        </div>
      )}

      {/* Mug */}
      {!showNapkin && (
        <div
          className="cursor-magnify absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={handleMugClick}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && handleMugClick()}
        >
          <img
            src="/assets/img/mug.png"
            alt="Steaming mug"
            className="w-48 h-auto drop-shadow-2xl hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Napkin note */}
      {showNote && (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="font-semibold">Witness report:</p>
            <p>A man across the cafeteria couldn&apos;t stop staring.</p>
            <p className="italic">Offense: falling hopelessly in love.</p>
          </div>
          {showHint && (
            <>
              <p className="mt-6 text-sm text-muted-foreground italic">
                The next clue lies where warmth meets indulgence.
              </p>
              <div className="mt-6 flex justify-center">
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="cursor-magnify"
                >
                  Continue → Fleming&apos;s
                </Button>
              </div>
            </>
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
