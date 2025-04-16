
import React from 'react';
import { Bot, Star, Zap, FileCheck, BarChart2 } from "lucide-react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle } from "lucide-react";
import { AgentConversation } from "./AgentConversation";
import { Agent } from "./agents-data";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AgentRoadmapPanel } from "./AgentRoadmapPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [activeTab, setActiveTab] = React.useState<string>("conversation");
  const [agentStats, setAgentStats] = React.useState({
    tasksCompleted: 0,
    tasksInProgress: 0,
    linesOfCode: 0,
    contributionScore: 0
  });
  
  React.useEffect(() => {
    if (activeAgentData) {
      // Simulăm statistici bazate pe powerLevel-ul agentului
      const { powerLevel } = activeAgentData;
      setAgentStats({
        tasksCompleted: Math.floor(powerLevel / 2),
        tasksInProgress: Math.floor(powerLevel / 5) + 1,
        linesOfCode: powerLevel * 120,
        contributionScore: powerLevel * 10
      });
    }
  }, [activeAgentData]);
  
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
                <span>Agent {activeAgentData.name}</span>
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
            <Tabs 
              defaultValue="conversation" 
              value={activeTab}
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="conversation">Conversație</TabsTrigger>
                <TabsTrigger value="stats">Statistici Agent</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversation">
                <AgentConversation 
                  agent={activeAgentData} 
                  isListening={isListening} 
                  setRef={setConversationRef}
                />
              </TabsContent>
              
              <TabsContent value="stats">
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3 text-center">
                      <FileCheck className="h-5 w-5 mx-auto mb-1 text-green-500" />
                      <p className="text-2xl font-semibold">{agentStats.tasksCompleted}</p>
                      <p className="text-xs text-muted-foreground">Taskuri finalizate</p>
                    </div>
                    <div className="border rounded-md p-3 text-center">
                      <BarChart2 className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-2xl font-semibold">{agentStats.tasksInProgress}</p>
                      <p className="text-xs text-muted-foreground">Taskuri în progres</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-3">Contribuție totală</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Linii de cod</span>
                          <span>{agentStats.linesOfCode}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${Math.min((agentStats.linesOfCode / 2000) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Scor contribuție</span>
                          <span>{agentStats.contributionScore}</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full" 
                            style={{ width: `${Math.min((agentStats.contributionScore / 150) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="pt-2 text-xs text-center text-muted-foreground">
                        <p>Acest agent a contribuit la {Math.floor(activeAgentData.powerLevel * 1.5)}% din codebase-ul platformei</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
