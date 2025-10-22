import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { audioManager } from "@/lib/audioManager";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NameInputModal() {
  const { settings, updateSettings } = useApp();
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
    // Set the wife's name
    updateSettings({ wifeName: "Ashley", audioEnabled: true });
    
    // Initialize audio on user interaction - this is crucial for browser autoplay policies
    audioManager.setEnabled(true);
    audioManager.playBgMusic();
  };

  // Only show if wife name is not set
  const shouldShow = !started && !settings.wifeName;
  
  if (!shouldShow) {
    return null;
  }

  return (
    <Dialog open={true}>
      <DialogContent
        className="parchment-panel max-w-md"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl text-center mb-2">
            The Christmas Heist of My Heart
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            A cozy romantic mystery awaits...
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Button onClick={handleStart} className="w-full" size="lg">
            Begin the Story
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
