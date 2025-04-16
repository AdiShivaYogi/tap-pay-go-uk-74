
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mic, User2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Agent, DEMO_RESPONSES } from "./agents-data";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

interface AgentConversationProps {
  agent: Agent;
  isListening: boolean;
}

export const AgentConversation = ({ agent, isListening }: AgentConversationProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typingIndicator, setTypingIndicator] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Simulează primirea unui mesaj de la agent
  useEffect(() => {
    if (messages.length === 0) {
      // Mesaj inițial de întâmpinare
      const initialMessage = {
        id: `agent-${Date.now()}`,
        text: `Bună! Sunt asistentul specializat pentru ${agent.name}. Cu ce te pot ajuta astăzi?`,
        sender: "agent" as const,
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages([initialMessage]);
      }, 500);
    }
  }, [agent.id]);

  // Efect pentru scroll la noi mesaje
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Efect pentru simularea ascultării active
  useEffect(() => {
    let listeningTimer: ReturnType<typeof setTimeout>;
    
    if (isListening) {
      // Simulăm primirea unui răspuns după un timp aleatoriu
      const randomTime = 5000 + Math.random() * 5000;
      listeningTimer = setTimeout(() => {
        // Alege un răspuns aleatoriu din lista de demo
        const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Simulează primirea mesajului
        const newMessage = {
          id: `agent-${Date.now()}`,
          text: randomResponse,
          sender: "agent" as const,
          timestamp: new Date()
        };
        
        setTypingIndicator(true);
        
        // Simulează tastarea
        setTimeout(() => {
          setTypingIndicator(false);
          setMessages(prev => [...prev, newMessage]);
          toast({
            title: "Răspuns primit",
            description: "Agentul a răspuns la întrebarea ta."
          });
        }, 2000);
      }, randomTime);
    }
    
    return () => clearTimeout(listeningTimer);
  }, [isListening, agent.id]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Adaugă mesajul utilizatorului
    const userMessage = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      sender: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulează tastarea agentului
    setTypingIndicator(true);
    
    // Alege un răspuns aleatoriu din lista de demo
    setTimeout(() => {
      const responses = DEMO_RESPONSES[agent.id] || ["Îmi pare rău, dar nu am un răspuns pentru această întrebare."];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage = {
        id: `agent-${Date.now()}`,
        text: randomResponse,
        sender: "agent" as const,
        timestamp: new Date()
      };
      
      setTypingIndicator(false);
      setMessages(prev => [...prev, agentMessage]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[500px] border-t">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className={message.sender === "user" ? "bg-primary/20" : `${agent.color.replace('text', 'bg')}/20`}>
                  <AvatarFallback>
                    {message.sender === "user" ? <User2 className="h-5 w-5 text-primary" /> : <agent.icon className={`h-5 w-5 ${agent.color}`} />}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`rounded-lg p-3 ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {typingIndicator && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3 max-w-[80%]">
                <Avatar className={`${agent.color.replace('text', 'bg')}/20`}>
                  <AvatarFallback>
                    <agent.icon className={`h-5 w-5 ${agent.color}`} />
                  </AvatarFallback>
                </Avatar>
                
                <div className="rounded-lg p-3 bg-muted flex items-center">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-background/80">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Button
            type="button"
            size="icon"
            variant="outline"
            className={`shrink-0 ${isListening ? 'bg-red-100 text-red-600 border-red-300' : ''}`}
            disabled={true} // Butonul e dezactivat pentru demo
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrie un mesaj sau vorbește folosind butonul de ascultare..."
            className="min-h-[44px] flex-1 resize-none"
            disabled={isListening}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          
          <Button
            type="submit"
            size="icon"
            className="shrink-0"
            disabled={isListening || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
