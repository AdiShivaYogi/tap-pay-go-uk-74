
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { AutoExecutionConfig } from "@/hooks/agent-god-mode/types";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AdvancedConfigDialogProps {
  config: AutoExecutionConfig;
  updateConfig: (updates: Partial<AutoExecutionConfig>) => Promise<void>;
}

export function AdvancedConfigDialog({ config, updateConfig }: AdvancedConfigDialogProps) {
  const [open, setOpen] = useState(false);
  const [localConfig, setLocalConfig] = useState<AutoExecutionConfig>({...config});
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = async () => {
    setIsSaving(true);
    await updateConfig(localConfig);
    setIsSaving(false);
    setOpen(false);
  };
  
  const handleChange = (key: keyof AutoExecutionConfig, value: any) => {
    setLocalConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="border-amber-200">
          <Settings2 className="h-4 w-4 text-amber-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurare Avansată God Mode</DialogTitle>
          <DialogDescription>
            Personalizează comportamentul God Mode și setările de autonomie pentru agenți.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Nivel de autonomie ({localConfig.autonomyLevel}%)</Label>
            <Slider 
              min={20} 
              max={100}
              step={5}
              value={[localConfig.autonomyLevel]}
              onValueChange={(value) => handleChange("autonomyLevel", value[0])}
              className="py-4"
            />
            <p className="text-xs text-muted-foreground">
              {localConfig.autonomyLevel < 50 ? 'Autonomie limitată - supervizare manuală frecventă' : 
               localConfig.autonomyLevel < 80 ? 'Autonomie moderată - supervizare periodică' : 
               'Autonomie ridicată - supervizare minimală'}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Prag de auto-aprobare ({localConfig.autoApproveThreshold}%)</Label>
            <Slider 
              min={50} 
              max={95}
              step={5}
              value={[localConfig.autoApproveThreshold]}
              onValueChange={(value) => handleChange("autoApproveThreshold", value[0])}
              className="py-4"
            />
            <p className="text-xs text-muted-foreground">
              Pragul minim de încredere pentru aprobarea automată a propunerilor
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Stil feedback</Label>
            <RadioGroup 
              value={localConfig.feedbackStyle} 
              onValueChange={(value) => handleChange("feedbackStyle", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="constructive" id="constructive" />
                <label htmlFor="constructive">Constructiv</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="direct" />
                <label htmlFor="direct">Direct</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="instructional" id="instructional" />
                <label htmlFor="instructional">Instructiv</label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Anulează</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Se salvează...' : 'Salvează configurația'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
