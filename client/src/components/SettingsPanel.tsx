import { Settings } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { audioManager } from "@/lib/audioManager";

export default function SettingsPanel() {
  const { settings, updateSettings } = useApp();
  const [open, setOpen] = useState(false);

  const handleAudioToggle = (enabled: boolean) => {
    updateSettings({ audioEnabled: enabled });
    audioManager.setEnabled(enabled);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="parchment-panel max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="audio-toggle" className="text-base">
              Audio Enabled
            </Label>
            <Switch
              id="audio-toggle"
              checked={settings.audioEnabled}
              onCheckedChange={handleAudioToggle}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="text-speed" className="text-base">
              Text Speed
            </Label>
            <Select
              value={settings.textSpeed}
              onValueChange={(value: "slow" | "normal" | "fast") =>
                updateSettings({ textSpeed: value })
              }
            >
              <SelectTrigger id="text-speed">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <Button
              variant="destructive"
              className="w-full text-white"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              Reset Story & Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
