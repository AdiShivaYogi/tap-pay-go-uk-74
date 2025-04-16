
import React from 'react';
import { StyledCardContent } from "@/components/ui/cards";
import { Separator } from "@/components/ui/separator";

export const PanelFooter: React.FC = () => {
  return (
    <>
      <Separator className="my-4" />
      
      <div className="text-sm text-muted-foreground">
        <p>
          Atribuiți taskuri agentului pentru a-l ajuta să lucreze autonom la dezvoltarea platformei. 
          Agenții pot face progres în timp ce dumneavoastră vă odihniți.
        </p>
      </div>
    </>
  );
};
