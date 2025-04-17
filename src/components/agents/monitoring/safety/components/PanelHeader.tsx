
import React from "react";
import { StyledCardHeader, StyledCardTitle } from "@/components/ui/cards";
import { Shield, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PanelHeader: React.FC = () => {
  return (
    <StyledCardHeader>
      <StyledCardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Infrastructură de Siguranță și Control Execuție
        </div>
        <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white gap-1 flex items-center">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Noua Eră a Autonomiei</span>
        </Badge>
      </StyledCardTitle>
    </StyledCardHeader>
  );
};
