
import React, { useState } from 'react';
import { StyledCard } from "@/components/ui/cards";
import { AgentConversation } from './AgentConversation';
import { AgentRoadmapPanel } from './roadmap/AgentRoadmapPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Sparkles, ListTodo, Clock } from "lucide-react";
import { agents } from './agents-data';
import { Badge } from '@/components/ui/badge';

interface AgentConversationControllerProps {
  activeAgentData: any | null;
  isListening: boolean;
  toggleListening: () => void;
}

export const AgentConversationController: React.FC<AgentConversationControllerProps> = ({
  activeAgentData,
  isListening,
  toggleListening
}) => {
  const [activeTab, setActiveTab] = useState<string>("conversation");
  const [hasNewMessages, setHasNewMessages] = useState(false);
  
  const handleSelectTask = async (taskId: string) => {
    // Schimbă tabul înapoi la conversație atunci când un task este selectat
    setActiveTab("conversation");
    
    // Returnează true pentru a indica că task-ul a fost asignat cu succes
    return true;
  };

  // Simulează primirea unui mesaj nou după 10 secunde
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasNewMessages(true);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reset new message indicator when switching to conversation tab
  React.useEffect(() => {
    if (activeTab === "conversation") {
      setHasNewMessages(false);
    }
  }, [activeTab]);
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50/70">
        <h3 className="text-lg font-semibold">Comunicare Agenți</h3>
        <p className="text-sm text-slate-500">Interacționați direct cu agenții autonomi</p>
      </div>
      
      <Tabs defaultValue="conversation" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 px-4 pt-3 sticky top-0 bg-white z-10">
          <TabsTrigger value="conversation" className="flex items-center gap-1.5 relative">
            <MessageCircle className="h-4 w-4" />
            Conversație
            {hasNewMessages && activeTab !== "conversation" && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">
                <span className="sr-only">Mesaje noi</span>
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4" />
            Taskuri
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            Istoric
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="conversation" className="h-full">
            {!activeAgentData ? (
              <div className="p-6 text-center h-full flex flex-col items-center justify-center">
                <MessageCircle className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">Chat asistent autonom</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Folosește acest chat pentru a interacționa direct cu agenții autonomi și pentru a solicita sarcini noi.
                </p>
                
                <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg w-full max-w-xs">
                  <h4 className="font-medium mb-2 text-sm">Sugestii întrebări:</h4>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Generează un raport de activitate</li>
                    <li>• Creează o sarcină pentru integrare API</li>
                    <li>• Ce îmbunătățiri propui pentru sistem?</li>
                  </ul>
                </div>
              </div>
            ) : (
              <AgentConversation
                agent={activeAgentData}
                isListening={isListening}
                setRef={undefined}
              />
            )}
          </TabsContent>
          
          <TabsContent value="roadmap" className="h-full overflow-auto">
            <div className="p-4">
              <h2 className="text-lg font-medium mb-4">Sarcini Disponibile</h2>
              <div className="space-y-3">
                {activeAgentData ? (
                  <AgentRoadmapPanel 
                    agentId={activeAgentData.id} 
                    onSelectTask={handleSelectTask}
                  />
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
                    <ListTodo className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-600">Selectați un agent pentru a vedea sarcinile disponibile</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="h-full overflow-auto">
            <div className="p-4">
              <h2 className="text-lg font-medium mb-4">Istoric Conversații</h2>
              <div className="space-y-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Discuție: Planificare integrare API</h3>
                      <p className="text-xs text-slate-500">Acum 2 ore</p>
                    </div>
                    <Badge variant="secondary">Finalizat</Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    Am discutat despre strategia de integrare a API-ului de plăți și am stabilit pașii necesari pentru implementare.
                  </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Discuție: Raport performanță agenți</h3>
                      <p className="text-xs text-slate-500">Ieri</p>
                    </div>
                    <Badge variant="secondary">Finalizat</Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    Am analizat performanța agenților și am generat un raport detaliat cu sugestii de optimizare.
                  </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Discuție: Planificare dezvoltare</h3>
                      <p className="text-xs text-slate-500">Acum 3 zile</p>
                    </div>
                    <Badge variant="secondary">Finalizat</Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    Am discutat despre prioritățile de dezvoltare și am stabilit un plan pentru următoarele 2 săptămâni.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
