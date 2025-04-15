
import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/ui/page-header";
import { FileText, Shield, CreditCard, Scale, AlertCircle } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { StyledCard } from "@/components/ui/card-variants";

const TermsPage = () => {
  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <SectionContainer>
          <PageHeader
            icon={FileText}
            title="Termeni și Condiții"
            description="Ultima actualizare: 15 Aprilie 2025"
          />

          <div className="max-w-4xl mx-auto space-y-8 pb-8">
            <StyledCard variant="default" className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold">Conformitate și Securitate</h2>
                  <p className="text-muted-foreground text-sm">
                    TapPayGo este o platformă conformă cu standardele financiare europene și internaționale
                  </p>
                </div>
              </div>
            </StyledCard>

            <section className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">1. Introducere</h2>
                <p className="text-muted-foreground">
                  Bun venit la TapPayGo. Acești Termeni și Condiții guvernează utilizarea aplicației și site-ului web TapPayGo 
                  (colectiv denumite "Serviciul"). Utilizând Serviciul nostru, sunteți de acord cu acești termeni.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">2. Procesarea Plăților</h2>
                <p className="text-muted-foreground">
                  Serviciile de procesare a plăților pentru TapPayGo sunt furnizate de Stripe și sunt supuse 
                  Acordului de Servicii Stripe Connected Account, care include Termenii Serviciului Stripe 
                  (colectiv, "Termenii Serviciului Stripe"). Prin acceptarea acestor termeni sau continuarea 
                  utilizării TapPayGo, sunteți de acord să fiți legat de Termenii Serviciului Stripe, care pot 
                  fi modificați de Stripe periodic.
                </p>
                <p className="text-muted-foreground">
                  <strong>Important:</strong> TapPayGo nu stochează, procesează sau transmite direct informații despre carduri de 
                  credit. Toate datele sensibile sunt gestionate exclusiv de Stripe prin sisteme conforme PCI DSS.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-primary" />
                  3. Obligațiile Comerciantului
                </h2>
                <p className="text-muted-foreground">
                  Vă angajați să:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Furnizați informații exacte și complete despre afacerea dvs.</li>
                  <li>Respectați standardele PCI-DSS când sunt aplicabile</li>
                  <li>Nu folosiți serviciul pentru activități ilegale sau interzise de Stripe</li>
                  <li>Mențineți securitatea credențialelor contului dvs.</li>
                  <li>Oferiți informații clare clienților despre bunurile și serviciile comercializate</li>
                  <li>Răspundeți prompt la reclamații și solicitări de rambursare</li>
                  <li>Respectați toate legile aplicabile privind comerțul electronic și protecția consumatorilor</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">4. Structura Comisioanelor</h2>
                <p className="text-muted-foreground">
                  Toate comisioanele sunt transparente și includ:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Plan Pay-as-you-go:</strong> Fără abonament lunar. 
                    Comision de 1.0% + 0.20£ per tranzacție.
                  </li>
                  <li>
                    <strong>Plan Lunar (14.99£/lună):</strong> Comision redus de 
                    0.7% + 0.15£ per tranzacție.
                  </li>
                  <li>
                    <strong>Plan Lifetime (1,840£ plată unică):</strong> Comision minim de 
                    0.5% + 0.10£ per tranzacție.
                  </li>
                </ul>
                <p className="text-muted-foreground">
                  Comisioanele Stripe standard se aplică suplimentar față de comisioanele TapPayGo. Consultați
                  <a href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> pagina de prețuri Stripe </a>
                  pentru detalii actualizate despre tarifele lor.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-primary" />
                  5. Activități Interzise
                </h2>
                <p className="text-muted-foreground">
                  Nu veți utiliza serviciul pentru:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Activități ilegale sau frauduloase</li>
                  <li>Vânzarea de bunuri sau servicii interzise de Stripe sau legile aplicabile</li>
                  <li>Jocuri de noroc sau loterii neautorizate</li>
                  <li>Încălcarea drepturilor de proprietate intelectuală</li>
                  <li>Tranzacții false sau abuzive</li>
                  <li>Finanțări participative nereglementate sau scheme piramidale</li>
                  <li>Produse contrafăcute sau bunuri furate</li>
                  <li>Servicii pentru adulți sau conținut pornografic</li>
                  <li>Vânzarea de tutun, alcool sau medicamente fără autorizațiile necesare</li>
                  <li>Orice activitate care încalcă <a href="https://stripe.com/legal/restricted-businesses" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">politica Stripe privind afacerile restricționate</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Scale className="h-6 w-6 text-primary" />
                  6. Dispute și Chargebacks
                </h2>
                <p className="text-muted-foreground">
                  În cazul unui chargeback sau dispută:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Veți coopera în investigarea disputei</li>
                  <li>Veți furniza documentația necesară în timp util (maxim 7 zile de la solicitare)</li>
                  <li>Acceptați decizia finală a băncii emitente sau Stripe</li>
                  <li>Sunteți responsabil pentru toate taxele asociate chargebacks-urilor</li>
                  <li>TapPayGo își rezervă dreptul de a suspenda conturile cu un număr excesiv de chargebacks</li>
                </ul>
                <p className="text-muted-foreground">
                  Recomandăm implementarea unor politici clare de returnare și rambursare și comunicarea acestora clienților dvs.
                  pentru a minimiza riscul de dispute.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Protecția Datelor și GDPR</h2>
                <p className="text-muted-foreground">
                  Ne angajăm să protejăm datele dvs. personale în conformitate cu GDPR și alte legi aplicabile. 
                  Nu stocăm informații sensibile despre carduri, toate datele de plată fiind gestionate direct 
                  de Stripe prin sisteme securizate.
                </p>
                <p className="text-muted-foreground">
                  Datele colectate și scopurile prelucrării:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Date de identificare (nume, email) - pentru autentificare și comunicare</li>
                  <li>Date de tranzacționare (sumă, descriere) - pentru procesarea plăților</li>
                  <li>Date statistice anonimizate - pentru îmbunătățirea serviciului</li>
                </ul>
                <p className="text-muted-foreground">
                  Pentru mai multe detalii, consultați <a href="/privacy" className="text-primary hover:underline">Politica noastră de Confidențialitate</a>.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">8. Încetare</h2>
                <p className="text-muted-foreground">
                  Ne rezervăm dreptul de a suspenda sau încheia accesul la serviciu în cazul:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Încălcării acestor termeni</li>
                  <li>Activității suspecte sau frauduloase</li>
                  <li>La cererea Stripe sau a autorităților competente</li>
                  <li>Neplății comisioanelor datorate</li>
                  <li>Unui număr excesiv de dispute sau chargebacks (rata peste 1%)</li>
                  <li>Utilizării serviciului pentru activități interzise</li>
                </ul>
                <p className="text-muted-foreground">
                  În cazul încetării relației contractuale, veți avea acces la datele dvs. pentru export timp de 30 de zile.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Limitarea Răspunderii</h2>
                <p className="text-muted-foreground">
                  TapPayGo acționează doar ca intermediar între dvs. și Stripe pentru procesarea plăților. În limita permisă de lege:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Nu ne asumăm răspunderea pentru pierderi directe, indirecte sau incidentale rezultate din utilizarea serviciului</li>
                  <li>Răspunderea noastră totală este limitată la valoarea comisioanelor plătite în ultimele 3 luni</li>
                  <li>Nu garantăm funcționarea neîntreruptă sau fără erori a serviciului</li>
                </ul>
                <p className="text-muted-foreground">
                  Această limitare de răspundere nu se aplică în cazul neglijenței grave sau conduitei intenționat frauduloase.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">10. Contact</h2>
                <p className="text-muted-foreground">
                  Pentru orice întrebări legate de acești termeni sau serviciile noastre, ne puteți contacta la:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Email: support@tappaygo.com</li>
                  <li>Adresă: 123 Payment Street, London, UK, EC1A 1BB</li>
                  <li>Telefon: +44 20 1234 5678</li>
                </ul>
                <p className="text-muted-foreground">
                  Timpul de răspuns standard pentru solicitări este de 1-2 zile lucrătoare.
                </p>
              </div>

              <div className="bg-muted/40 p-6 rounded-lg mt-8">
                <p className="text-sm text-center text-muted-foreground">
                  Acești termeni și condiții sunt guvernați de legile din Regatul Unit și reprezintă întregul acord între dvs. și TapPayGo 
                  privind utilizarea serviciului. Ultima actualizare: 15 Aprilie 2025.
                </p>
              </div>
            </section>
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default TermsPage;
