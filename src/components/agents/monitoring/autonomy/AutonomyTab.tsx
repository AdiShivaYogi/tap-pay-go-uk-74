
import React from "react";
import { StyledCard, StyledCardContent } from "@/components/ui/cards";
import { AutonomyOverviewSection } from "../AutonomyOverviewSection";
import { useSafetyPanel } from "../safety/hooks/useSafetyPanel";

export const AutonomyTab: React.FC = () => {
  const { autonomyLevel, agentsRunning } = useSafetyPanel();
  
  return (
    <StyledCard>
      <StyledCardContent className="p-6">
        <AutonomyOverviewSection 
          autonomyLevel={autonomyLevel}
          agentsRunning={agentsRunning}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-2">Acces TapPayGo API</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Agenții au acces complet la toate API-urile TapPayGo, inclusiv:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>API-uri de management al plăților</li>
                  <li>API-uri de administrare cont</li>
                  <li>API-uri pentru integrarea serviciilor</li>
                  <li>API-uri pentru raportare și analiză</li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-2">Modificare Cod Sursă</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Agenții pot modifica codul sursă al aplicației fără restricții:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Implementare automată de funcționalități</li>
                  <li>Optimizare algoritmi și procese</li>
                  <li>Refactorizare cod existent</li>
                  <li>Actualizare configurații și dependențe</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-2">Acces la Date</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Privilegii extinse pentru lucrul cu date:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Citire/scriere în baze de date</li>
                  <li>Acces la datele utilizatorilor (anonimizate)</li>
                  <li>Procesare și analiză date sensibile</li>
                  <li>Generare și exportare rapoarte</li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="font-semibold text-lg mb-2">Integrări Externe</h3>
              <div className="text-sm text-muted-foreground">
                <p className="mb-2">
                  Acces la API-uri și servicii externe:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Integrări cu sisteme de plată</li>
                  <li>Integrări cu platforme AI (Claude/Anthropic)</li>
                  <li>Servicii cloud și stocare</li>
                  <li>Acces la rețele și comunicații</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};
