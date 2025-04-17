
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { SafetyPolicy } from "../../types";

export const ExecutionPolicies: React.FC = () => {
  const policies: SafetyPolicy[] = [
    { name: "Verificare de risc pre-execuție", status: "activă" },
    { name: "Validare umană pentru acțiuni critice", status: "inactivă" },
    { name: "Revenire automată în caz de eroare", status: "activă" },
    { name: "Limitare resurse computaționale per agent", status: "activă" },
    { name: "Izolare execuție între agenți", status: "activă" }
  ];
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="text-base">Politici de Execuție Autonomă</StyledCardTitle>
      </StyledCardHeader>
      <StyledCardContent>
        <div className="space-y-2">
          {policies.map((policy, idx) => (
            <div key={idx} className="flex justify-between items-center p-2 border-b">
              <span>{policy.name}</span>
              <Badge variant={policy.status === "activă" ? "default" : "outline"}>
                {policy.status}
              </Badge>
            </div>
          ))}
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
