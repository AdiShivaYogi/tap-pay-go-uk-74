
import { Bot, Star, Zap } from "lucide-react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle } from "lucide-react";
import { AgentConversation } from "./AgentConversation";
import { Agent } from "./agents-data";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const platformValue = "1M+ €";
  
  const getValueContribution = (agent: Agent) => {
    if (agent.relevance === "core" && agent.powerLevel >= 8) {
      return `Agent strategic pentru platforma evaluată la ${platformValue}`;
    } else if (agent.relevance === "core") {
      return `Componentă critică în arhitectura platformei de ${platformValue}`;
    } else if (agent.powerLevel >= 8) {
      return `Contribuție substanțială la valoarea platformei`;
    }
    return `Rol important în ecosistemul platformei`;
  };

  // Adăugăm referința la funcțiile din conversație
  const conversationRef = React.useRef<any>(null);
  
  const setConversationRef = (ref: any) => {
    conversationRef.current = ref;
  };
  
  const handleAssignTask = async (taskId: string) => {
    if (!conversationRef.current || !conversationRef.current.assignTaskToAgent) {
      return false;
    }
    
    return await conversationRef.current.assignTaskToAgent(taskId);
  };
  
  return (
    <div className="space-y-6">
      <StyledCard>
        <StyledCardHeader>
          <StyledCardTitle className="flex items-center gap-2">
            {activeAgentData ? (
              <>
                <activeAgentData.icon className={`h-5 w-5 ${activeAgentData.color}`} />
                <span>Conversație cu {activeAgentData.name}</span>
                {activeAgentData.powerLevel >= 8 && (
                  <Badge variant="default" className="ml-2 flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5" />
                    Agent Premium
                  </Badge>
                )}
              </>
            ) : (
              <>
                <Bot className="h-5 w-5 text-muted-foreground" />
                Selectează un agent pentru a începe o conversație
              </>
            )}
          </StyledCardTitle>
          
          {activeAgentData && (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <Badge 
                  variant={
                    activeAgentData.relevance === "core" ? "default" : 
                    activeAgentData.relevance === "support" ? "outline" : "secondary"
                  }
                >
                  {activeAgentData.relevance === "core" ? "Agent Core" : 
                   activeAgentData.relevance === "support" ? "Agent Support" : "Agent Auxiliar"}
                </Badge>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 ml-2">
                        <span className="text-xs">Putere:</span>
                        <div className="bg-gray-200 h-2 w-16 rounded-full">
                          <div 
                            className={`h-full rounded-full ${
                              activeAgentData.powerLevel >= 8 ? 'bg-green-500' : 
                              activeAgentData.powerLevel >= 5 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${activeAgentData.powerLevel * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Nivel de putere: {activeAgentData.powerLevel}/10</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center text-xs text-amber-500">
                <Star className="h-3.5 w-3.5 mr-1.5 fill-amber-500" />
                <span>{getValueContribution(activeAgentData)}</span>
              </div>
            </div>
          )}
        </StyledCardHeader>
        
        <StyledCardContent className="p-0">
          {activeAgentData ? (
            <AgentConversation 
              agent={activeAgentData} 
              isListening={isListening} 
              setRef={setConversationRef}
            />
          ) : (
            <div className="flex items-center justify-center p-12 text-center text-muted-foreground border-t">
              <div>
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p>Selectează un agent din lista din stânga pentru a începe o conversație</p>
                <p className="text-sm mt-2 max-w-md mx-auto">
                  Agenții sunt esențiali pentru auto-dezvoltarea platformei 
                  TapPayGo evaluată la {platformValue} în tehnologie
                </p>
              </div>
            </div>
          )}
        </StyledCardContent>
      </StyledCard>
      
      {activeAgentData && (
        <>
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
          
          <AgentRoadmapPanel 
            agentId={activeAgentData.id}
            onSelectTask={handleAssignTask}
          />
        </>
      )}
    </div>
  );
};
