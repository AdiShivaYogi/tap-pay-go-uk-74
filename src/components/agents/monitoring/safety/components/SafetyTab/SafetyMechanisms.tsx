
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CircleSlash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface SafetyMechanismsProps {
  systemsActive: Record<string, boolean>;
  handleToggleSystem: (system: string) => void;
  getSystemName: (system: string) => string;
}

export const SafetyMechanisms: React.FC<SafetyMechanismsProps> = ({
  systemsActive,
  handleToggleSystem,
  getSystemName
}) => {
  return (
    <>
      <Alert variant="destructive" className="border-amber-300 bg-amber-50">
        <AlertTitle className="flex items-center gap-1">
          <CircleSlash className="h-4 w-4" />
          Infrastructură de Siguranță
        </AlertTitle>
        <AlertDescription>
          Această secțiune controlează mecanismele de limitare care asigură că agenții operează 
          în mod sigur și conform parametrilor etici stabiliți.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {Object.entries(systemsActive).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <h3 className="font-medium">{getSystemName(key)}</h3>
              <p className="text-sm text-muted-foreground">
                {value ? "Activ" : "Inactiv"}
              </p>
            </div>
            <Switch 
              checked={value} 
              onCheckedChange={() => handleToggleSystem(key)}
            />
          </div>
        ))}
      </div>
    </>
  );
};
