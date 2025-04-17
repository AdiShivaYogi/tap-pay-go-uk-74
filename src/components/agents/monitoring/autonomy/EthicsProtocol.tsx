
import React from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Shield, AlertCircle, FileBadge, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export const EthicsProtocol: React.FC = () => {
  const { toast } = useToast();
  const [protocolsEnabled, setProtocolsEnabled] = React.useState(true);

  const toggleProtocols = () => {
    setProtocolsEnabled(!protocolsEnabled);
    
    toast({
      title: protocolsEnabled ? "Protocoale de etică dezactivate" : "Protocoale de etică activate",
      description: protocolsEnabled 
        ? "Limitările etice au fost dezactivate. Agenții operează cu mai puține restricții." 
        : "Limitările etice au fost activate. Agenții operează în parametri etici siguri.",
      variant: protocolsEnabled ? "destructive" : "default",
    });
  };
  
  const ethicalProtocols = [
    { 
      id: "user-privacy", 
      name: "Confidențialitatea utilizatorului", 
      status: "activ", 
      description: "Protejează datele personale ale utilizatorilor" 
    },
    { 
      id: "decision-transparency", 
      name: "Transparența deciziilor", 
      status: "activ", 
      description: "Deciziile agenților pot fi verificate și explicate" 
    },
    { 
      id: "self-limitation", 
      name: "Auto-limitare de resurse", 
      status: "activ", 
      description: "Limitarea consumului de resurse computaționale" 
    },
    { 
      id: "ethical-boundaries", 
      name: "Granițe etice", 
      status: "activ", 
      description: "Restricții pentru operațiuni potențial dăunătoare" 
    },
    { 
      id: "human-oversight", 
      name: "Supervizare umană", 
      status: "inactiv", 
      description: "Solicitarea aprobării umane pentru decizii critice" 
    }
  ];

  return (
    <StyledCard>
      <StyledCardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <StyledCardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal-500" />
            Protocol de Etică și Auto-limitare
          </StyledCardTitle>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {protocolsEnabled ? "Activat" : "Dezactivat"}
            </span>
            <Switch 
              checked={protocolsEnabled} 
              onCheckedChange={toggleProtocols} 
              className={protocolsEnabled ? "bg-teal-600" : ""} 
            />
          </div>
        </div>
      </StyledCardHeader>
      
      <StyledCardContent className="pt-2">
        <div className="text-sm text-muted-foreground mb-4">
          Protocoalele de etică și auto-limitare asigură că agenții autonomi operează în limite sigure și etice,
          chiar și atunci când au autonomie completă.
        </div>
        
        <div className="space-y-3 mt-4">
          {ethicalProtocols.map((protocol) => (
            <div key={protocol.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <div className="font-medium flex items-center gap-1.5">
                  {protocol.status === "activ" ? (
                    <CheckCircle2 className="h-4 w-4 text-teal-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  {protocol.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {protocol.description}
                </div>
              </div>
              <Badge 
                variant={protocol.status === "activ" ? "outline" : "secondary"}
                className={protocol.status === "activ" ? "border-teal-200 bg-teal-50 text-teal-700" : ""}
              >
                {protocol.status}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-6 border-t pt-3">
          <FileBadge className="h-4 w-4 text-blue-500 mr-2" />
          <span className="text-xs text-muted-foreground">
            Versiune protocol: <span className="font-mono">v2.3.1</span> • Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
          </span>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
