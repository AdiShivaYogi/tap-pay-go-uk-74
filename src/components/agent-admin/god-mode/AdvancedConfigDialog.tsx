
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";
import { AutoExecutionConfig } from "@/hooks/agent-god-mode/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvancedConfigDialogProps {
  config: AutoExecutionConfig;
  updateConfig: (updates: Partial<AutoExecutionConfig>) => Promise<void>;
}

export const AdvancedConfigDialog = ({ config, updateConfig }: AdvancedConfigDialogProps) => {
  const [localConfig, setLocalConfig] = React.useState<AutoExecutionConfig>({ ...config });
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  // Sincronizează state-ul local când configurația se schimbă
  React.useEffect(() => {
    setLocalConfig({ ...config });
  }, [config]);

  const handleChange = (key: keyof AutoExecutionConfig, value: any) => {
    setLocalConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await updateConfig(localConfig);
    setIsSaving(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 px-2">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Setări avansate</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Setări avansate God Mode</DialogTitle>
          <DialogDescription>
            Configurați parametrii pentru auto-execuție și feedback agent inteligent
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="autonomyLevel">Nivel autonomie agent: {localConfig.autonomyLevel}%</Label>
            <Slider
              id="autonomyLevel"
              min={50}
              max={100}
              step={5}
              value={[localConfig.autonomyLevel]}
              onValueChange={(value) => handleChange('autonomyLevel', value[0])}
            />
            <span className="text-xs text-muted-foreground">
              Un nivel mai ridicat permite agenților să ia decizii mai independente.
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="autoApproveThreshold">Prag aprobare automată: {localConfig.autoApproveThreshold}%</Label>
            <Slider
              id="autoApproveThreshold"
              min={60}
              max={100}
              step={5}
              value={[localConfig.autoApproveThreshold]}
              onValueChange={(value) => handleChange('autoApproveThreshold', value[0])}
            />
            <span className="text-xs text-muted-foreground">
              Propunerile care depășesc acest scor de încredere vor fi aprobate automat.
            </span>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="useAnthropicDirect">Folosește Anthropic Direct API</Label>
            <Switch
              id="useAnthropicDirect"
              checked={localConfig.useAnthropicDirect}
              onCheckedChange={(checked) => handleChange('useAnthropicDirect', checked)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="preferredModel">Model preferat</Label>
            <Select 
              value={localConfig.preferredModel} 
              onValueChange={(value) => handleChange('preferredModel', value as "anthropic" | "claude" | "deepseek")}
            >
              <SelectTrigger id="preferredModel">
                <SelectValue placeholder="Selectează model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anthropic">Claude (Anthropic Direct)</SelectItem>
                <SelectItem value="claude">Claude (OpenRouter)</SelectItem>
                <SelectItem value="deepseek">DeepSeek</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="feedbackStyle">Stil feedback</Label>
            <Select 
              value={localConfig.feedbackStyle} 
              onValueChange={(value) => handleChange('feedbackStyle', value as "constructive" | "detailed" | "concise")}
            >
              <SelectTrigger id="feedbackStyle">
                <SelectValue placeholder="Selectează stil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="constructive">Constructiv</SelectItem>
                <SelectItem value="detailed">Detaliat</SelectItem>
                <SelectItem value="concise">Concis</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Anulează</Button>
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? 'Se salvează...' : 'Salvează setările'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
