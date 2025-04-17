
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
        <AutoLaunchContainer />
        <PanelDescription />
        <TabsContainer />
      </StyledCardContent>
    </StyledCard>
  );
};
