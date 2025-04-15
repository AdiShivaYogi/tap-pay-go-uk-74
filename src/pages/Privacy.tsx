
import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Shield } from "lucide-react";
import { StyledCard } from "@/components/ui/card-variants";

const PrivacyPage = () => {
  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={Shield}
            title="Politica de Confidențialitate"
            description="Ultima actualizare: 15 Aprilie 2025"
          />

          <div className="max-w-4xl mx-auto space-y-8 pb-8">
            <StyledCard variant="default" className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold">Procesarea Sigură prin Stripe</h2>
                  <p className="text-muted-foreground text-sm">
                    Pentru siguranța dvs., toate datele de plată sunt procesate și stocate direct de Stripe, 
                    lider global în procesarea plăților online.
                  </p>
                </div>
              </div>
            </StyledCard>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Introducere</h2>
                <p className="text-muted-foreground">
                  La TapPayGo, protejarea confidențialității dvs. este o prioritate. Această Politică de Confidențialitate 
                  explică modul în care colectăm, folosim și protejăm informațiile dvs. atunci când utilizați 
                  serviciile noastre de procesare a plăților.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Informații pe care le colectăm</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">2.1. Informații furnizate direct:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Informații de contact (nume, email, telefon)</li>
                    <li>Informații despre afacere (denumire, adresă, CUI)</li>
                    <li>Date despre contul bancar pentru procesarea plăților</li>
                  </ul>

                  <h3 className="text-lg font-medium">2.2. Informații despre tranzacții:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Sumele tranzacțiilor</li>
                    <li>Data și ora tranzacțiilor</li>
                    <li>Statusul tranzacțiilor</li>
                    <li>Referințe ale tranzacțiilor</li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-blue-800 font-medium">Important:</p>
                    <p className="text-blue-700 text-sm">
                      Nu colectăm și nu stocăm niciodată informații despre cardurile de credit. 
                      Toate datele sensibile sunt procesate direct de Stripe prin sisteme conforme PCI DSS.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">3. Cum folosim informațiile</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Pentru procesarea plăților prin platforma Stripe</li>
                  <li>Pentru prevenirea fraudelor și verificarea identității</li>
                  <li>Pentru raportarea și analiza tranzacțiilor</li>
                  <li>Pentru comunicarea cu dvs. despre serviciile noastre</li>
                  <li>Pentru respectarea obligațiilor legale și reglementărilor</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">4. Partajarea informațiilor</h2>
                <p className="text-muted-foreground mb-4">
                  Partajăm informații doar cu:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Stripe</strong> - procesatorul nostru de plăți, pentru procesarea tranzacțiilor
                  </li>
                  <li>
                    <strong>Autorități</strong> - când este cerut de lege sau pentru prevenirea fraudelor
                  </li>
                  <li>
                    <strong>Furnizori de servicii</strong> - care ne ajută să operăm serviciul (cu acorduri stricte de confidențialitate)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Securitatea datelor</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Implementăm măsuri stricte de securitate pentru protejarea datelor dvs.:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Criptare SSL/TLS pentru toate transmisiile de date</li>
                    <li>Autentificare multi-factor pentru accesul la cont</li>
                    <li>Monitorizare continuă pentru activități suspecte</li>
                    <li>Acces restricționat la date pe bază de roluri</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Conformitate cu GDPR</h2>
                <p className="text-muted-foreground mb-4">
                  În calitate de operator de date cu sediul în UE, respectăm GDPR și vă oferim următoarele drepturi:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Dreptul de acces la datele personale</li>
                  <li>Dreptul la rectificarea datelor</li>
                  <li>Dreptul la ștergerea datelor ("dreptul de a fi uitat")</li>
                  <li>Dreptul la restricționarea prelucrării</li>
                  <li>Dreptul la portabilitatea datelor</li>
                  <li>Dreptul de a obiecta la prelucrarea datelor</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">7. Retenția datelor</h2>
                <p className="text-muted-foreground">
                  Păstrăm datele dvs. doar atât timp cât este necesar pentru:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Furnizarea serviciilor noastre</li>
                  <li>Respectarea obligațiilor legale (de ex. păstrarea înregistrărilor financiare)</li>
                  <li>Rezolvarea disputelor</li>
                  <li>Prevenirea fraudelor</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Cookie-uri și tehnologii similare</h2>
                <p className="text-muted-foreground mb-4">
                  Folosim cookie-uri și tehnologii similare pentru:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Autentificare și securitate</li>
                  <li>Preferințe și funcționalitate</li>
                  <li>Analiză și performanță</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Contactați-ne</h2>
                <p className="text-muted-foreground">
                  Pentru orice întrebări despre această politică sau despre datele dvs., ne puteți contacta la:
                </p>
                <ul className="list-none space-y-2 text-muted-foreground mt-4">
                  <li>Email: privacy@tappaygo.com</li>
                  <li>Telefon: +44 20 1234 5678</li>
                  <li>Adresă: 123 Payment Street, London, UK, EC1A 1BB</li>
                </ul>
              </section>

              <div className="bg-muted/40 p-6 rounded-lg mt-8">
                <p className="text-sm text-center text-muted-foreground">
                  Această Politică de Confidențialitate poate fi actualizată periodic. 
                  Vă vom notifica despre orice modificări semnificative prin email sau prin notificări în aplicație. 
                  Ultima actualizare: 15 Aprilie 2025.
                </p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default PrivacyPage;
