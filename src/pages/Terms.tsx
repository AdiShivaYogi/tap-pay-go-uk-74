import React from "react";
import { Layout } from "@/components/layout/layout";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";
import { Separator } from "@/components/ui/separator";
import { StyledCard } from "@/components/ui/cards";
import { FileText, CheckCircle } from "lucide-react";

const Terms = () => {
  return (
    <Layout>
      <Section>
        <PageHeader
          icon={FileText}
          title="Termeni și condiții"
          description="Vă rugăm să citiți cu atenție termenii și condițiile noastre"
        />
        
        <StyledCard className="border-primary/10">
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Acceptarea termenilor</h2>
            <p className="text-muted-foreground">
              Prin accesarea și utilizarea TapPayGo, sunteți de acord să respectați acești termeni și condiții în
              totalitate. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciile noastre.
            </p>
            
            <Separator />
            
            <h2 className="text-xl font-semibold">Descrierea serviciilor</h2>
            <p className="text-muted-foreground">
              TapPayGo oferă o platformă pentru procesarea plăților contactless. Ne străduim să asigurăm un serviciu
              fiabil și sigur, dar nu garantăm funcționarea neîntreruptă sau lipsită de erori.
            </p>
            
            <Separator />
            
            <h2 className="text-xl font-semibold">Limitarea responsabilității</h2>
            <p className="text-muted-foreground">
              TapPayGo nu este responsabil pentru daunele directe sau indirecte rezultate din utilizarea sau
              imposibilitatea de a utiliza serviciile noastre. Responsabilitatea noastră este limitată la suma plătită
              de dvs. pentru serviciile noastre.
            </p>
            
            <Separator />
            
            <h2 className="text-xl font-semibold">Modificări ale termenilor</h2>
            <p className="text-muted-foreground">
              Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. Modificările vor fi
              publicate pe site-ul nostru și vor intra în vigoare imediat.
            </p>
            
            <Separator />
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Ultima actualizare: 15 Mai 2024
              </p>
            </div>
          </div>
        </StyledCard>
      </Section>
    </Layout>
  );
};

export default Terms;
