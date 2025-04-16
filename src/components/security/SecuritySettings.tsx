import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { StyledCard } from "@/components/ui/cards";
import { AlertTriangle, CheckCircle2, Shield } from "lucide-react";

export const SecuritySettings = () => {
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(75);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(true);
  const [recoveryEmail, setRecoveryEmail] = useState("user@example.com");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate saving settings
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Setări salvate",
      description: "Setările de securitate au fost actualizate cu succes.",
    });
    setIsSaving(false);
  };

  return (
    <StyledCard variant="default" className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Setări de securitate</h2>
      
      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Autentificare cu doi factori</h3>
            <p className="text-sm text-muted-foreground">
              Adaugă un strat suplimentar de securitate contului tău.
            </p>
          </div>
          <Switch 
            checked={isTwoFactorAuthEnabled} 
            onCheckedChange={setIsTwoFactorAuthEnabled} 
          />
        </div>
        
        {/* Password Strength */}
        <div>
          <h3 className="text-lg font-medium">Puterea parolei</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Asigură-te că parola ta este suficient de puternică.
            </p>
            <Badge variant="secondary">{passwordStrength}%</Badge>
          </div>
          <Progress value={passwordStrength} className="mt-2" />
        </div>
        
        {/* Biometrics Authentication */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Autentificare biometrică</h3>
            <p className="text-sm text-muted-foreground">
              Utilizează amprenta sau recunoașterea facială pentru autentificare.
            </p>
          </div>
          <Switch 
            checked={isBiometricsEnabled} 
            onCheckedChange={setIsBiometricsEnabled} 
          />
        </div>
        
        {/* Recovery Email */}
        <div>
          <h3 className="text-lg font-medium">Email de recuperare</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Adaugă un email de recuperare pentru a-ți putea recupera contul în caz de nevoie.
          </p>
          <Input 
            type="email" 
            placeholder="Email de recuperare" 
            value={recoveryEmail} 
            onChange={(e) => setRecoveryEmail(e.target.value)}
          />
        </div>
        
        {/* Security Tips */}
        <div className="bg-muted/30 p-4 rounded-md border border-muted">
          <h3 className="text-md font-medium mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Sfaturi de securitate
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Nu partaja parola cu nimeni.</li>
            <li>Activează autentificarea cu doi factori.</li>
            <li>Verifică periodic activitatea contului tău.</li>
            <li>Folosește o parolă unică pentru fiecare cont.</li>
          </ul>
        </div>
        
        {/* Save Button */}
        <Button onClick={handleSaveSettings} disabled={isSaving} className="w-full">
          {isSaving ? "Se salvează..." : "Salvează setările"}
        </Button>
      </div>
    </StyledCard>
  );
};
