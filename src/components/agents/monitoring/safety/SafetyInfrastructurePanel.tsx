
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { PanelHeader } from "./components/PanelHeader";
import { PanelDescription } from "./components/PanelDescription";
import { AutoLaunchContainer } from "./components/AutoLaunchContainer";
import { TabsContainer } from "./components/TabsContainer";

export const SafetyInfrastructurePanel: React.FC = () => {
  return (
    <StyledCard>
      <PanelHeader />
      
      <StyledCardContent>
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2">Infrastructură de siguranță și control execuție</h2>
          <PanelDescription />
        </div>
        
        <AutoLaunchContainer />
        <TabsContainer />
      </StyledCardContent>
    </StyledCard>
  );
};

