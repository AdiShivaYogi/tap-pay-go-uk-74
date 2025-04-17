
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Database } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { DataConnection } from "../../types";

interface DataSourcesProps {
  dataConnections: Record<string, boolean>;
  toggleDataConnection: (connection: string) => void;
}

export const DataSources: React.FC<DataSourcesProps> = ({
  dataConnections,
  toggleDataConnection
}) => {
  const connections: DataConnection[] = [
    { name: "Sistem Agent", description: "Date de bază despre agenți", isConnected: dataConnections.agentSystem },
    { name: "Platforma de Monitorizare", description: "Metrici de performanță", isConnected: dataConnections.monitoringPlatform },
    { name: "Motor de Analiză", description: "Indicatori și tendințe", isConnected: dataConnections.analyticsEngine },
    { name: "Framework de Siguranță", description: "Limitări și restricții", isConnected: dataConnections.safetyFramework }
  ];
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base flex items-center gap-2">
          <Database className="h-4 w-4" />
          Conectare Surse de Date
        </StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-3">
          {connections.map((connection, index) => {
            const key = Object.keys(dataConnections)[index];
            return (
              <div key={index} className="flex items-center justify-between p-2 border-b last:border-b-0">
                <div>
                  <div className="font-medium">{connection.name}</div>
                  <div className="text-sm text-muted-foreground">{connection.description}</div>
                </div>
                <Switch 
                  checked={connection.isConnected}
                  onCheckedChange={() => toggleDataConnection(key)}
                />
              </div>
            );
          })}
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
