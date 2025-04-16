import React from "react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { StyledCard } from "@/components/ui/cards";
import { Shield, Check } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <Section variant="default">
        <PageHeader
          icon={Shield}
          title="Politica de confidențialitate"
          description="Cum protejăm datele tale"
        />
        
        <StyledCard className="border-primary/10">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Informații generale</h2>
            <p className="text-muted-foreground">
              Această politică de confidențialitate explică modul în care colectăm,
              utilizăm și protejăm informațiile tale personale.
            </p>
            
            <h3 className="text-lg font-medium">Ce date colectăm</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Adresa de email</li>
              <li>Numele și prenumele</li>
              <li>Informații despre dispozitiv</li>
              <li>Date de utilizare</li>
            </ul>
            
            <h3 className="text-lg font-medium">Cum folosim datele tale</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Pentru a-ți oferi serviciile</li>
              <li>Pentru a îmbunătăți aplicația</li>
              <li>Pentru a comunica cu tine</li>
              <li>Pentru a respecta legile</li>
            </ul>
            
            <h3 className="text-lg font-medium">Cum protejăm datele tale</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Criptăm datele</li>
              <li>Folosim servere securizate</li>
              <li>Limităm accesul la date</li>
              <li>Actualizăm constant securitatea</li>
            </ul>
            
            <h3 className="text-lg font-medium">Drepturile tale</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              <li>Dreptul de a accesa datele tale</li>
              <li>Dreptul de a rectifica datele tale</li>
              <li>Dreptul de a șterge datele tale</li>
              <li>Dreptul de a te opune prelucrării datelor tale</li>
            </ul>
            
            <h3 className="text-lg font-medium">Contact</h3>
            <p className="text-muted-foreground">
              Pentru orice întrebări sau solicitări legate de datele tale personale,
              ne poți contacta la adresa de email: support@tapaygo.com
            </p>
          </div>
        </StyledCard>
      </Section>
    </Layout>
  );
};

export default Privacy;
