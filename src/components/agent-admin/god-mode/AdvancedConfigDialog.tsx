
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings2, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AutoExecutionConfig } from "@/hooks/agent-god-mode/types";
import { ModelSelector } from "./ModelSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface AdvancedConfigDialogProps {
  config: AutoExecutionConfig;
  updateConfig: (updates: Partial<AutoExecutionConfig>) => Promise<void>;
}

export function AdvancedConfigDialog({ config, updateConfig }: AdvancedConfigDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [localConfig, setLocalConfig] = React.useState<AutoExecutionConfig>(config);
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  // Sincronizează configurația locală când se modifică cea externă
  React.useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateConfig(localConfig);
      toast({
        title: "Configurație salvată",
        description: "Configurația God Mode a fost actualizată cu succes."
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu s-a putut salva configurația. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Settings2 className="h-4 w-4" /> Configurare avansată
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configurare avansată God Mode</DialogTitle>
          <DialogDescription>
            Personalizați comportamentul auto-aprobărilor și al feedback-ului generat de AI
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="preferredModel">Model AI preferat</Label>
              <ModelSelector
                value={localConfig.preferredModel}
                onChange={(value) => setLocalConfig({ ...localConfig, preferredModel: value })}
                showAnthropicDirect={true}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Modelul AI folosit pentru generarea feedback-ului automat
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="useAnthropicDirect">Utilizează Anthropic Direct</Label>
              <Switch
                id="useAnthropicDirect"
                checked={localConfig.useAnthropicDirect}
                onCheckedChange={(checked) => setLocalConfig({ ...localConfig, useAnthropicDirect: checked })}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Folosește API-ul Anthropic direct în loc de OpenRouter pentru modelele Claude
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="autonomyLevel">Nivel de autonomie: {localConfig.autonomyLevel}%</Label>
            <Slider
              id="autonomyLevel"
              value={[localConfig.autonomyLevel]}
              min={0}
              max={100}
              step={5}
              onValueChange={(values) => setLocalConfig({ ...localConfig, autonomyLevel: values[0] })}
            />
            <p className="text-sm text-muted-foreground">
              {localConfig.autonomyLevel < 30 && "Supervizare crescută - majoritatea deciziilor vor fi verificate manual"}
              {localConfig.autonomyLevel >= 30 && localConfig.autonomyLevel < 70 && "Supervizare moderată - deciziile importante vor fi verificate manual"}
              {localConfig.autonomyLevel >= 70 && "Autonomie crescută - agenții pot lua majoritatea deciziilor fără supervizare"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="feedbackStyle">Stil feedback</Label>
              <Select
                value={localConfig.feedbackStyle}
                onValueChange={(value: "constructive" | "detailed" | "brief" | "mentor") => 
                  setLocalConfig({ ...localConfig, feedbackStyle: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selectați stilul" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="constructive">Constructiv</SelectItem>
                  <SelectItem value="detailed">Detaliat</SelectItem>
                  <SelectItem value="brief">Concis</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Stilul de feedback furnizat de modelul AI
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="autoApproveThreshold">Prag auto-aprobare: {localConfig.autoApproveThreshold}%</Label>
            <Slider
              id="autoApproveThreshold"
              value={[localConfig.autoApproveThreshold]}
              min={50}
              max={100}
              step={5}
              onValueChange={(values) => setLocalConfig({ ...localConfig, autoApproveThreshold: values[0] })}
            />
            <p className="text-sm text-muted-foreground">
              Procentul minim de încredere pentru ca o propunere să fie aprobată automat
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isSaving}>
            Anulează
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-1">
            {isSaving ? (
              <>Salvare...</>
            ) : (
              <>
                <Save className="h-4 w-4" /> Salvează configurația
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
