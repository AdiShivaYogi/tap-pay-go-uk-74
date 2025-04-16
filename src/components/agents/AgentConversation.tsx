
import { useState, useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mic, User2, Bot } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: "online" | "offline" | "busy";
}

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

const DEMO_RESPONSES: Record<string, string[]> = {
  "payment-agent": [
    "Pentru conectarea cu Stripe, primul pas este crearea unui cont pe platforma lor. Dorești să te ghidez prin acest proces?",
    "Comisioanele standard Stripe sunt de 1.4% + 0.25€ pentru carduri europene și 2.9% + 0.25€ pentru carduri non-europene.",
    "Putem implementa plăți recurente pentru abonamentele tale, acest lucru necesită să configurezi un produs și un preț în panoul Stripe.",
    "TapPayGo se integrează complet cu API-urile Stripe, inclusiv cu Events și Webhooks pentru notificări în timp real."
  ],
  "support-agent": [
    "Bună! Cu ce te pot ajuta astăzi referitor la contul tău TapPayGo?",
    "Pentru a reseta parola, te rog să accesezi pagina de autentificare și să folosești opțiunea 'Am uitat parola'.",
    "Integrarea cu sistemul tău de contabilitate se poate face prin API-ul nostru. Ai nevoie de cheile API disponibile în setările contului.",
    "Platforma noastră este conformă cu standardele PCI DSS nivel 1, ceea ce înseamnă cel mai înalt nivel de securitate pentru datele cardurilor."
  ],
  "analytics-agent": [
    "Pe baza analizei tranzacțiilor tale, observ un vârf de activitate în zilele de luni și vineri, între 10:00 și 14:00.",
    "Rata de conversie pentru pagina ta de plată este de 78%, cu 5% peste media industriei.",
    "Recomand să analizezi segmentul de clienți care folosesc dispozitive mobile - reprezintă 65% din tranzacții dar au o rată de abandon cu 8% mai mare.",
    "Pot genera un raport detaliat despre comportamentul clienților după prima tranzacție. Acest lucru te poate ajuta să optimizezi strategiile de fidelizare."
  ],
  "security-agent": [
    "Toate datele sensibile sunt criptate folosind AES-256 atât în tranzit, cât și în repaus.",
    "Recomandăm să activezi autentificarea în doi factori pentru toți utilizatorii cu acces la panoul de administrare.",
    "În ultimele 30 de zile, sistemele noastre au blocat 47 de tentative de tranzacții frauduloase pentru contul tău.",
    "Implementăm monitorizare continuă și analiză comportamentală pentru a detecta activități neobișnuite în contul tău."
  ],
  "ai-assistant": [
    "Pot să te ajut cu orice întrebare despre platforma TapPayGo. Cu ce te pot asista?",
    "API-ul nostru este documentat complet la adresa docs.tappaygo.com/api și include exemple pentru cele mai populare limbaje de programare.",
    "Procesul de onboarding pentru comercianți noi durează în general 1-3 zile lucrătoare, incluzând verificările de conformitate.",
    "Platforma noastră suportă peste 135 de monede și operează în 42 de țări din Uniunea Europeană și din afara ei."
  ]
};

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
