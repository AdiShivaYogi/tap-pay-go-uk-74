
import { Bot } from "lucide-react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle } from "lucide-react";
import { AgentConversation } from "./AgentConversation";
import { Agent } from "./agents-data";

interface AgentConversationControllerProps {
  activeAgentData: Agent | null;
  isListening: boolean;
  toggleListening: () => void;
}

export const AgentConversationController = ({ 
  activeAgentData, 
  isListening, 
  toggleListening 
}: AgentConversationControllerProps) => {
  return (
    <div className="space-y-6">
      <StyledCard>
        <StyledCardHeader>
          <StyledCardTitle className="flex items-center gap-2">
            {activeAgentData ? (
              <>
                <activeAgentData.icon className={`h-5 w-5 ${activeAgentData.color}`} />
                Conversație cu {activeAgentData.name}
              </>
            ) : (
              <>
                <Bot className="h-5 w-5 text-muted-foreground" />
                Selectează un agent pentru a începe o conversație
              </>
            )}
          </StyledCardTitle>
        </StyledCardHeader>
        <StyledCardContent className="p-0">
          {activeAgentData ? (
            <AgentConversation agent={activeAgentData} isListening={isListening} />
          ) : (
            <div className="flex items-center justify-center p-12 text-center text-muted-foreground border-t">
              <div>
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Selectează un agent din lista din stânga pentru a începe o conversație</p>
              </div>
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
      
      {activeAgentData && (
        <div className="flex justify-center">
          <Button 
            onClick={toggleListening}
            size="lg" 
            className={`w-64 gap-2 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
          >
            {isListening ? (
              <>
                <PauseCircle className="h-5 w-5" />
                Oprește Ascultarea
              </>
            ) : (
              <>
                <PlayCircle className="h-5 w-5" />
                Începe Conversația
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
