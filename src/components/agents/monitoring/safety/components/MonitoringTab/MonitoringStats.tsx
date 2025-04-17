
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { Shield, Activity, Eye } from "lucide-react";

export const MonitoringStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StyledCard>
        <StyledCardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-green-100 bg-green-50 text-green-600 mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-medium">Scor General Siguranță</h3>
            <div className="text-3xl font-bold text-green-600 mt-2">92%</div>
            <p className="text-xs text-muted-foreground mt-1">Ultima evaluare: acum 5 minute</p>
          </div>
        </StyledCardContent>
      </StyledCard>
      
      <StyledCard>
        <StyledCardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50 text-blue-600 mb-3">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-medium">Eficiență Auto-Execuție</h3>
            <div className="text-3xl font-bold text-blue-600 mt-2">83%</div>
            <p className="text-xs text-muted-foreground mt-1">28 sarcini executate autonom azi</p>
          </div>
        </StyledCardContent>
      </StyledCard>
      
      <StyledCard>
        <StyledCardContent className="pt-6">
          <div className="text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-amber-100 bg-amber-50 text-amber-600 mb-3">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="font-medium">Incidente Raportate</h3>
            <div className="text-3xl font-bold text-amber-600 mt-2">0</div>
            <p className="text-xs text-muted-foreground mt-1">Ultima săptămână</p>
          </div>
        </StyledCardContent>
      </StyledCard>
    </div>
  );
};
