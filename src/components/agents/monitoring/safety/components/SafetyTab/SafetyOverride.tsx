
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

interface SafetyOverrideProps {
  safetyOverride: boolean;
  setSafetyOverride: (value: boolean) => void;
}

export const SafetyOverride: React.FC<SafetyOverrideProps> = ({
  safetyOverride,
  setSafetyOverride
}) => {
  return (
    <div className="mt-6 p-4 border rounded-lg space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Suprascrierea Măsurilor de Siguranță</h3>
          <p className="text-sm text-muted-foreground">
            Permiterea nivelurilor înalte de autonomie și dezactivarea unor măsuri de siguranță
          </p>
        </div>
        <Switch 
          checked={safetyOverride} 
          onCheckedChange={setSafetyOverride}
        />
      </div>
      
      <Alert variant="destructive" className={safetyOverride ? "opacity-100" : "opacity-50"}>
        <AlertTitle>Atenție</AlertTitle>
        <AlertDescription>
          Suprascrierea măsurilor de siguranță poate duce la comportament imprevizibil al agenților. 
          Utilizați cu precauție extremă și doar când este absolut necesar.
        </AlertDescription>
      </Alert>
    </div>
  );
};
