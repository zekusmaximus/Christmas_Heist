import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/contexts/AppContext";

interface Scene3Props {
  onContinue: () => void;
}

export default function Scene3({ onContinue }: Scene3Props) {
  const { settings } = useApp();
  const [showMenu, setShowMenu] = useState(true);
  const [showText, setShowText] = useState(false);
  const [showTV, setShowTV] = useState(false);
  const [tvClicked, setTvClicked] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    audioManager.crossfade();
  }, []);

  const handleMenuChoice = () => {
    audioManager.playSfx("paper_rustle_open");
    setShowMenu(false);
    setShowText(true);
    setTimeout(() => {
      setShowTV(true);

      // Play VO
      audioManager.playVo("vo_husband_scene3", () => {
        setCaption("");
      });
      setCaption("This wasn't just dinner. It was ritual—our refuge.");
    }, 1000);
  };

  const handleTVClick = () => {
    if (tvClicked) {return;}
    audioManager.playSfx("tv_click");
    setTvClicked(true);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url(/assets/img/scene3-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Restaurant Name */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <h1 className="text-6xl font-serif font-bold text-white tracking-[0.3em] uppercase" style={{ 
          textShadow: "3px 3px 6px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.3)",
          fontFamily: "'Playfair Display', 'Georgia', serif",
          letterSpacing: "0.3em"
        }}>
          FLEMING&apos;S
        </h1>
      </div>

      {/* Menu choice */}
      {showMenu && (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition border-4 border-amber-900">
          <div className="text-center border-b-2 border-amber-900 pb-4 mb-6">
            <h2 className="text-3xl font-serif italic text-amber-900">Menu</h2>
          </div>
          <Button
            size="lg"
            onClick={handleMenuChoice}
            className="cursor-magnify w-full text-lg py-8 bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-900 flex flex-col items-center gap-2"
          >
            <span className="text-2xl font-semibold">Click to order</span>
            <span className="text-base font-normal">The petit filet medium-well (some pink, no red).</span>
          </Button>
        </div>
      )}

      {/* Text reveal */}
      {showText && (
        <div className="parchment-panel max-w-lg p-8 mx-4 scene-transition">
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Very early dinners at Fleming&apos;s, laughter and steak before heading home.
            </p>
          </div>

          {showTV && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                (Tap to head home and watch a new episode of Vera)
              </p>
              {!tvClicked ? (
                <div
                  className="inline-block cursor-magnify p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition"
                  onClick={handleTVClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && handleTVClick()}
                >
                  📺 Vera
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="italic text-muted-foreground">
                    &quot;Case closed... though never quite as clever as
                    you.&quot;
                  </p>
                  <Button
                    size="lg"
                    onClick={onContinue}
                    className="cursor-magnify"
                  >
                    Continue
                  </Button>
                </div>
              )}
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
