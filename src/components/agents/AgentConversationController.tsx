
import React, { useState, useCallback } from 'react';
import { AgentConversation } from './AgentConversation';
import { AgentRoadmapPanel } from './roadmap/AgentRoadmapPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Sparkles, ListTodo, Clock, Mic, MicOff } from "lucide-react";
import { Agent, agents } from './agents-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageInput } from './conversation/MessageInput';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AgentConversationControllerProps {
  activeAgentData: Agent | null;
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
  const [messages, setMessages] = useState<{sender: 'user' | 'agent'; text: string}[]>([]);
  const { toast } = useToast();
  
  const handleSelectTask = async (taskId: string) => {
    // Schimbă tabul înapoi la conversație atunci când un task este selectat
    setActiveTab("conversation");
    
    // Add a message to the conversation
    setMessages(prev => [...prev, {
      sender: 'agent',
      text: `Task selectat: #${taskId}. Voi începe lucrul la această sarcină imediat.`
    }]);

    // Show a toast notification
    toast({
      title: "Sarcină alocată",
      description: `Agentul a primit sarcina #${taskId} și a început procesarea.`,
      duration: 3000,
    });
    
    // Returnează true pentru a indica că task-ul a fost asignat cu succes
    return true;
  };

  const handleSendMessage = useCallback((text: string) => {
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    
    // Simulate agent thinking
    setTimeout(() => {
      let response: string;
      
      if (text.toLowerCase().includes('raport')) {
        response = "Am generat un raport detaliat privind activitatea agenților din ultimele 24 ore. Performanța sistemului este optimă, fără incidente de siguranță detectate.";
      } else if (text.toLowerCase().includes('sarcină') || text.toLowerCase().includes('task')) {
        response = "Sarcină înregistrată. Am adăugat această cerere în coada de priorități și voi începe procesarea în curând.";
      } else if (text.toLowerCase().includes('îmbunătățire') || text.toLowerCase().includes('optimizare')) {
        response = "Am analizat sistemul și propun următoarele îmbunătățiri: 1) Optimizarea algoritmilor de detecție a anomaliilor, 2) Eficientizarea comunicării între agenți, 3) Implementarea unui sistem de auto-recuperare după erori.";
      } else {
        response = "Am înregistrat solicitarea ta și am început procesarea. Voi reveni cu un răspuns detaliat în scurt timp.";
      }
      
      setMessages(prev => [...prev, { sender: 'agent', text: response }]);
    }, 1000);
  }, []);

  // Simulează primirea unui mesaj nou după 10 secunde
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab !== "conversation") {
        setHasNewMessages(true);
        
        // Also add the message to the conversation so it's there when user switches tab
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'agent', 
            text: "Am detectat o oportunitate de optimizare pentru sistemul de auto-învățare. Doriți să implementez aceste modificări?" 
          }
        ]);
      }
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  // Reset new message indicator when switching to conversation tab
  React.useEffect(() => {
    if (activeTab === "conversation") {
      setHasNewMessages(false);
    }
  }, [activeTab]);

  const renderActiveAgent = () => {
    if (!activeAgentData) {
      return (
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-slate-200 rounded-full p-2">
            <MessageCircle className="h-5 w-5 text-slate-500" />
          </div>
          <div>
            <p className="font-medium">Asistent AI</p>
            <p className="text-xs text-slate-500">Sistem autonom</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex items-center space-x-2 mb-2">
        <div className={`rounded-full p-2 ${activeAgentData.bgColor || 'bg-purple-100'}`}>
          <activeAgentData.icon className={`h-5 w-5 ${activeAgentData.color}`} />
        </div>
        <div>
          <p className="font-medium">{activeAgentData.name}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500">{activeAgentData.role}</span>
            <Badge variant="outline" className="text-[10px] px-1 py-0">{activeAgentData.type}</Badge>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">Comunicare Agenți</h3>
            <p className="text-sm text-slate-500">Interacționați direct cu agenții autonomi</p>
          </div>
          
          <Button 
            variant={isListening ? "destructive" : "outline"} 
            size="sm"
            onClick={toggleListening} 
            className="flex items-center gap-1"
          >
            {isListening ? (
              <>
                <MicOff className="h-3.5 w-3.5" />
                <span>Oprește</span>
              </>
            ) : (
              <>
                <Mic className="h-3.5 w-3.5" />
                <span>Activează voce</span>
              </>
            )}
          </Button>
        </div>
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
          <TabsContent value="conversation" className="h-full flex flex-col">
            {!activeAgentData && messages.length === 0 ? (
              <ScrollArea className="flex-1">
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
              </ScrollArea>
            ) : (
              <>
                <div className="p-3 pb-0">
                  {renderActiveAgent()}
                </div>
                <ScrollArea className="flex-1 px-3 py-2">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg p-3 max-w-[80%] ${
                          message.sender === 'user' 
                            ? 'bg-purple-100 text-purple-900' 
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {message.text}
                        </div>
                      </div>
                    ))}
                    {isListening && (
                      <div className="flex justify-start">
                        <div className="rounded-lg p-3 max-w-[80%] bg-red-50 border border-red-100 text-red-700 animate-pulse flex items-center gap-2">
                          <Mic className="h-4 w-4" />
                          Se ascultă...
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
            
            <div className="p-3 border-t">
              <MessageInput 
                onSendMessage={handleSendMessage}
                isListening={isListening}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="roadmap" className="h-full overflow-auto">
            <ScrollArea className="h-full">
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
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="history" className="h-full overflow-auto">
            <ScrollArea className="h-full">
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
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
