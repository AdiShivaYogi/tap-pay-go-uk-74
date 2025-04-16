
import React, { useState } from "react";
import { StyledCard, StyledCardHeader, StyledCardTitle, StyledCardContent } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/types-extension";

interface CodeProposalsTabProps {
  proposals: any[];
  onApproveProposal: (proposalId: string) => Promise<void>;
  onRejectProposal: (proposalId: string, reason?: string) => Promise<void>;
}

export const CodeProposalsTab = ({ 
  proposals, 
  onApproveProposal, 
  onRejectProposal 
}: CodeProposalsTabProps) => {
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  
  const renderProposalsList = () => {
    if (proposals.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Nu există propuneri de cod în așteptare de la agenți.
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-2 pr-2">
        {proposals.map((proposal) => (
          <div 
            key={proposal.id}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedProposal?.id === proposal.id 
              ? "bg-primary/10 border-primary/30" 
              : "hover:bg-muted"
            }`}
            onClick={() => setSelectedProposal(proposal)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Code size={16} />
                <span className="font-medium truncate max-w-[200px]">
                  {JSON.parse(proposal.proposed_files).join(', ')}
                </span>
              </div>
              <Badge variant="outline">{proposal.agent_id}</Badge>
            </div>
            
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {proposal.created_at ? new Date(proposal.created_at).toLocaleString() : "Data necunoscută"}
            </p>
          </div>
        ))}
      </div>
    );
  };
  
  const renderProposalDetails = () => {
    if (!selectedProposal) {
      return (
        <div className="text-center py-12">
          <Code size={32} className="mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            Selectați o propunere de cod pentru a vedea detaliile.
          </p>
        </div>
      );
    }
    
    const proposedFiles = JSON.parse(selectedProposal.proposed_files);
    const proposedCode = JSON.parse(selectedProposal.proposed_code);
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Propunere de la agentul {selectedProposal.agent_id}</h3>
          <p className="text-sm text-muted-foreground">
            Creată la {new Date(selectedProposal.created_at).toLocaleString()}
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Motivație:</h4>
          <p className="text-sm p-3 bg-muted rounded-md">{selectedProposal.motivation}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Fișiere propuse ({proposedFiles.length}):</h4>
          <div className="flex flex-wrap gap-2">
            {proposedFiles.map((file: string, index: number) => (
              <Badge key={index} variant="outline">{file}</Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-1">Cod propus:</h4>
          <Tabs defaultValue={proposedFiles[0]} className="w-full">
            <TabsList className="w-full overflow-auto">
              {proposedFiles.map((file: string, index: number) => (
                <TabsTrigger key={index} value={file} className="text-xs">
                  {file.split('/').pop()}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {proposedFiles.map((file: string, index: number) => (
              <TabsContent key={index} value={file}>
                <ScrollArea className="h-[300px] w-full rounded-md border">
                  <pre className="p-4 text-xs">
                    <code>{proposedCode[file]}</code>
                  </pre>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex-1 mr-2">
            <input
              type="text"
              placeholder="Motiv respingere (opțional)"
              className="w-full p-2 text-sm border rounded-md"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => {
                onRejectProposal(selectedProposal.id, rejectionReason);
                setRejectionReason('');
              }}
            >
              <X size={16} />
              Respinge
            </Button>
            
            <Button 
              size="sm"
              className="flex items-center gap-1"
              onClick={() => onApproveProposal(selectedProposal.id)}
            >
              <Check size={16} />
              Aprobă
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <StyledCard>
      <StyledCardHeader>
        <StyledCardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Propuneri de cod de la agenți
        </StyledCardTitle>
      </StyledCardHeader>
      
      <StyledCardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 border-r pr-4">
            <h3 className="text-sm font-medium mb-2">Propuneri în așteptare</h3>
            {renderProposalsList()}
          </div>
          
          <div className="lg:col-span-2">
            {renderProposalDetails()}
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
