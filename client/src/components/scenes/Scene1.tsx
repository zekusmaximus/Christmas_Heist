import { useState } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";

interface Scene1Props {
  onContinue: () => void;
}

export default function Scene1({ onContinue }: Scene1Props) {
  const { settings } = useApp();
  const [started, setStarted] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [caption, setCaption] = useState(
    "Christmas Eve, 9:45 p.m. A mysterious theft has shaken the quiet town of Evergreen Hollow... and only one detective can solve it."
  );

  const handleStart = () => {
    setStarted(true);
    
    // Start background music immediately on user interaction
    if (settings.audioEnabled) {
      audioManager.setEnabled(true);
      audioManager.playBgMusic();
    }
    
    // Play intro VO
    audioManager.playVo("vo_detective_intro", () => {
      setCaption("");
    });

    // Show envelope after 3 seconds
    setTimeout(() => {
      audioManager.playSfx("letter_chime");
      setShowEnvelope(true);
    }, 3000);
  };

  const handleEnvelopeClick = () => {
    // Ensure background music is playing (in case it was blocked)
    if (settings.audioEnabled) {
      audioManager.playBgMusic();
    }
    audioManager.playSfx("paper_rustle_open");
    setShowLetter(true);
    setTimeout(() => setShowButton(true), 1000);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene1-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Start Button - shown first to enable audio */}
      {!started && (
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleStart}
            className="cursor-magnify text-2xl px-12 py-8 sparkle"
          >
            Begin the Story
          </Button>
        </div>
      )}

      {/* Caption */}
      {started && caption && settings.audioEnabled && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-4">
          <div className="caption-text">{caption}</div>
        </div>
      )}

      {/* Envelope */}
      {started && showEnvelope && !showLetter && (
        <div className="flex flex-col items-center">
          <div
            className="letter-descend cursor-magnify"
            onClick={handleEnvelopeClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && handleEnvelopeClick()}
          >
            <img
              src="/assets/img/envelope.webp"
              alt="Mysterious envelope"
              className="w-64 h-auto drop-shadow-2xl"
            />
          </div>
          <p className="mt-6 text-xl font-medium text-white bg-black/60 px-6 py-2 rounded-lg">
            Click to open the mysterious envelope
          </p>
        </div>
      )}

      {/* Letter content */}
      {started && showLetter && (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition">
          <div className="space-y-4 text-lg leading-relaxed">
            <p className="italic">&quot;My dearest detective,</p>
            <p>
              Something of great value has been stolen—priceless beyond measure,
              invisible to all but one.
            </p>
            <p>The thief was clever, kind-eyed, and utterly beautiful.</p>
            <p>Only you can solve this case.&quot;</p>
          </div>
          {showButton && (
            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                onClick={onContinue} 
                className="cursor-magnify"
              >
                Begin Investigation
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
