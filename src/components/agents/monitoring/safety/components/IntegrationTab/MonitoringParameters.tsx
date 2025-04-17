
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { BarChart4 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { MonitoringParameter } from "../../types";

interface MonitoringParametersProps {
  monitoringParameters: Record<string, boolean>;
  toggleMonitoringParameter: (parameter: string) => void;
}

export const MonitoringParameters: React.FC<MonitoringParametersProps> = ({
  monitoringParameters,
  toggleMonitoringParameter
}) => {
  const parameters: MonitoringParameter[] = [
    { name: "Niveluri de Autonomie", description: "Definire parametri specifici", isEnabled: monitoringParameters.autonomyLevels },
    { name: "Utilizare Resurse", description: "Consum CPU/memorie/stocare", isEnabled: monitoringParameters.resourceUsage },
    { name: "Calitatea Deciziilor", description: "Metrici pentru evaluare", isEnabled: monitoringParameters.decisionQuality },
    { name: "Progres Învățare", description: "Rate de îmbunătățire", isEnabled: monitoringParameters.learningProgress }
  ];
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base flex items-center gap-2">
          <BarChart4 className="h-4 w-4" />
          Parametri de Monitorizare
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-3">
          {parameters.map((parameter, index) => {
            const key = Object.keys(monitoringParameters)[index];
            return (
              <div key={index} className="flex items-center justify-between p-2 border-b last:border-b-0">
                <div>
                  <div className="font-medium">{parameter.name}</div>
                  <div className="text-sm text-muted-foreground">{parameter.description}</div>
                </div>
                <Switch 
                  checked={parameter.isEnabled}
                  onCheckedChange={() => toggleMonitoringParameter(key)}
                />
              </div>
            );
          })}
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
