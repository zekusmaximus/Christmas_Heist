import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";
import { Download, RotateCcw } from "lucide-react";

interface Scene7Props {
  onPlayAgain: () => void;
}

export default function Scene7({ onPlayAgain }: Scene7Props) {
  const { settings } = useApp();
  const [showNote, setShowNote] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggRevealed, setEasterEggRevealed] = useState(false);

  useEffect(() => {
    audioManager.crossfade();
    setTimeout(() => setShowNote(true), 2000);
    setTimeout(() => setShowEasterEgg(true), 6000);
  }, []);

  const handleSaveEvidence = () => {
    // Generate certificate
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Load certificate template
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 800, 1000);

        // Add personalized text
        ctx.fillStyle = "#1D1D1F";
        ctx.font = '32px "Alex Brush", cursive';
        ctx.textAlign = "center";
        ctx.fillText(settings.wifeName, 400, 450);

        ctx.font = '18px "Crimson Text", serif';
        ctx.fillText(
          "That I still only have eyes for you every day.",
          400,
          550
        );
        ctx.fillText("You're not my past or my present—", 400, 580);
        ctx.fillText("you're my favorite future.", 400, 610);

        ctx.font = '14px "Crimson Text", serif';
        ctx.fillText(new Date().toLocaleDateString(), 400, 700);

        // Download
        canvas.toBlob(blob => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "christmas-heist-certificate.png";
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      };
      img.src = "/assets/img/certificate-template.png";
    }
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene7-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="parchment-panel max-w-2xl p-12 mx-4 scene-transition text-center">
        <h1 className="text-5xl mb-8">Case Closed ❤️</h1>
        <p className="text-2xl mb-8">Sentence: Lifetime together, no parole.</p>

        {showNote && (
          <div className="border-t border-border pt-8 mb-8">
            <p className="text-lg italic leading-relaxed">
              Detective&apos;s final note:
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Some hearts stay stolen forever—and that&apos;s exactly how this
              one should be.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={onPlayAgain}
            className="cursor-magnify"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Play Again
          </Button>
          <Button
            size="lg"
            onClick={handleSaveEvidence}
            className="cursor-magnify"
          >
            <Download className="mr-2 h-5 w-5" />
            Save Evidence
          </Button>
        </div>
      </div>

      {/* Easter Egg */}
      {showEasterEgg && !easterEggRevealed && (
        <div
          className="fixed bottom-8 right-8 cursor-magnify text-4xl animate-pulse"
          onClick={() => setEasterEggRevealed(true)}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && setEasterEggRevealed(true)}
        >
          <img
            src="/assets/img/snowflake-icon.png"
            alt="Secret"
            className="w-12 h-12"
          />
        </div>
      )}

      {easterEggRevealed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="parchment-panel max-w-md p-8 mx-4">
            <h3 className="text-2xl mb-4 text-center">P.S.</h3>
            <p className="text-lg leading-relaxed text-center">
              The detective&apos;s reward is eternal cuddles, cocoa, and full
              jurisdiction over the remote.
            </p>
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setEasterEggRevealed(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
