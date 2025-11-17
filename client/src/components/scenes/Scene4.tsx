import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";

interface Scene4Props {
  onContinue: () => void;
}

export default function Scene4({ onContinue }: Scene4Props) {
  const { settings } = useApp();
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [showText, setShowText] = useState(false);
  const [caption, setCaption] = useState("");
  const [pieces, setPieces] = useState([
    { id: 1, text: "🏖️ Tropical", placed: false },
    { id: 2, text: "❤️ Love", placed: false },
    { id: 3, text: "☀️ Paradise", placed: false },
    { id: 4, text: "🌴 Escape", placed: false },
  ]);

  useEffect(() => {
    audioManager.crossfade();
    audioManager.playSfx("waves_soft");
  }, []);

  const handlePuzzleSolve = () => {
    setPuzzleSolved(true);
    setTimeout(() => {
      setShowText(true);

      // Play VO
      audioManager.playVo("vo_husband_scene4", () => {
        setCaption("");
      });
      setCaption(
        "No mystery here. We were exactly where we were meant to be—living our best life."
      );
    }, 500);
  };

  const handlePieceClick = (id: number) => {
    audioManager.playSfx("paper_rustle_open");
    setPieces(prev =>
      prev.map(piece =>
        piece.id === id ? { ...piece, placed: true } : piece
      )
    );
  };

  const allPlaced = pieces.every(p => p.placed);

  useEffect(() => {
    if (allPlaced && !puzzleSolved) {
      setTimeout(() => {
        handlePuzzleSolve();
      }, 500);
    }
  }, [allPlaced, puzzleSolved]);

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene4-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!puzzleSolved ? (
        <div className="parchment-panel max-w-lg p-8 mx-4">
          <h3 className="text-2xl mb-6 text-center">
            Piece together the torn postcards
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Click each postcard piece to place it
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {pieces.map(piece => (
              <button
                key={piece.id}
                onClick={() => handlePieceClick(piece.id)}
                disabled={piece.placed}
                className={`
                  h-32 rounded-lg flex flex-col items-center justify-center text-lg font-medium
                  transition-all cursor-magnify
                  ${piece.placed 
                    ? 'bg-green-100 border-2 border-green-500 opacity-100' 
                    : 'bg-secondary/30 border-2 border-dashed border-secondary hover:bg-secondary/50'
                  }
                `}
              >
                {piece.placed ? '✓ ' : ''}{piece.text}
              </button>
            ))}
          </div>
          {!allPlaced && (
            <p className="text-center text-sm italic text-muted-foreground">
              {pieces.filter(p => p.placed).length} of {pieces.length} pieces placed
            </p>
          )}
        </div>
      ) : (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition">
          {showText && (
            <>
              <div className="space-y-4 text-lg leading-relaxed">
                <p className="font-semibold">Evidence Log:</p>
                <p>
                  Two detectives spotted at a tropical hideout before Christmas, Turks & Caicos - smiling, utterly
                  guilty of joy.
                </p>
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
