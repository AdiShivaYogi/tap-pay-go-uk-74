import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Shield, Globe, Lock, Flag } from "lucide-react";
import { StyledCard } from "@/components/ui/card-variants";

const PrivacyPage = () => {
  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={Shield}
            title="Politică de Confidențialitate"
            description="Ultima actualizare: 15 Aprilie 2025"
          />

          <div className="max-w-4xl mx-auto space-y-8 pb-8">
            <StyledCard variant="default" className="p-6 bg-blue-50/50 border-blue-100">
              <div className="flex items-start gap-4">
                <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-primary">Context Geografic și Juridic</h2>
                  <p className="text-muted-foreground text-sm">
                    Serviciile noastre sunt disponibile în Regatul Unit și alte țări care acceptă Stripe, 
                    respectând standardele internaționale de protecție a datelor precum GDPR și legislația britanică.
                  </p>
                </div>
              </div>
            </StyledCard>

            <StyledCard variant="default" className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold">Procesarea Securizată prin Stripe</h2>
                  <p className="text-muted-foreground text-sm">
                    Toate datele de plată sunt procesate și stocate direct de Stripe, 
                    un provider de servicii de plată autorizat de Financial Conduct Authority (FCA) din Regatul Unit.
                  </p>
                </div>
              </div>
            </StyledCard>

            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Introducere și Jurisdicție</h2>
                <p className="text-muted-foreground">
                  TapPayGo oferă servicii de procesare plăți cu respectarea strictă a legislației britanice 
                  privind protecția datelor, inclusiv Data Protection Act 2018 și UK GDPR. Serviciile noastre sunt 
                  disponibile pentru utilizatorii din Regatul Unit și alte țări care acceptă Stripe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Informații Colectate</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">2.1. Date Personale și Financiare</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Informații de contact (nume, email, telefon)</li>
                    <li>Detalii de afacere (denumire, adresă, număr de înregistrare)</li>
                    <li>Metadate tranzacții procesate prin Stripe</li>
                  </ul>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-5 w-5 text-green-600" />
                      <p className="text-green-800 font-medium">Protecție Avansată a Datelor</p>
                    </div>
                    <p className="text-green-700 text-sm">
                      Niciun card sau detalii financiare sensibile nu sunt stocate de TapPayGo. 
                      Toate informațiile sunt procesate securizat de Stripe, respectând standardele PCI DSS și 
                      reglementările FCA.
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

              <section>
                <h2 className="text-2xl font-semibold mb-3">10. Conformitate cu Reglementări Internaționale</h2>
                <p className="text-muted-foreground mb-4">
                  TapPayGo respectă standarde internaționale de protecție a datelor, inclusiv:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>UK GDPR și Data Protection Act 2018 (Regatul Unit)</li>
                  <li>General Data Protection Regulation (UE)</li>
                  <li>Standardele de securitate PCI DSS pentru tranzacții</li>
                  <li>Reglementări ale Financial Conduct Authority (FCA)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-3">11. Contact și Suport</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Flag className="h-6 w-6 text-primary" />
                  <p className="text-muted-foreground">
                    Pentru întrebări privind confidențialitatea datelor în jurisdicția britanică:
                  </p>
                </div>
                <ul className="list-none space-y-2 text-muted-foreground">
                  <li>Email: privacy@tappaygo.co.uk</li>
                  <li>Telefon: +44 20 7123 4567</li>
                  <li>Adresă: 20 Finsbury Circus, London, EC2M 7EB, United Kingdom</li>
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
