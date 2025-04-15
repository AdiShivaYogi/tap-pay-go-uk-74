
import { Layout } from "@/components/layout/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/ui/page-header";
import { FileText } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";

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
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">3. Conformitate și Securitate</h2>
                <p className="text-muted-foreground">
                  Vă angajați să:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Furnizați informații exacte și complete despre afacerea dvs.</li>
                  <li>Respectați standardele PCI-DSS când sunt aplicabile</li>
                  <li>Nu folosiți serviciul pentru activități ilegale sau interzise de Stripe</li>
                  <li>Mențineți securitatea credențialelor contului dvs.</li>
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
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">5. Activități Interzise</h2>
                <p className="text-muted-foreground">
                  Nu veți utiliza serviciul pentru:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Activități ilegale sau frauduloase</li>
                  <li>Vânzarea de bunuri sau servicii interzise de Stripe sau legile aplicabile</li>
                  <li>Încălcarea drepturilor de proprietate intelectuală</li>
                  <li>Tranzacții false sau abuzive</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">6. Dispute și Chargebacks</h2>
                <p className="text-muted-foreground">
                  În cazul unui chargeback sau dispută:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Veți coopera în investigarea disputei</li>
                  <li>Veți furniza documentația necesară în timp util</li>
                  <li>Acceptați decizia finală a băncii emitente sau Stripe</li>
                  <li>Sunteți responsabil pentru toate taxele asociate chargebacks-urilor</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">7. Protecția Datelor și GDPR</h2>
                <p className="text-muted-foreground">
                  Ne angajăm să protejăm datele dvs. personale în conformitate cu GDPR și alte legi aplicabile. 
                  Nu stocăm informații sensibile despre carduri, toate datele de plată fiind gestionate direct 
                  de Stripe prin sisteme securizate.
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
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">9. Contact</h2>
                <p className="text-muted-foreground">
                  Pentru orice întrebări legate de acești termeni sau serviciile noastre, ne puteți contacta la:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Email: support@tappaygo.com</li>
                  <li>Adresă: [Adresa Companiei]</li>
                  <li>Telefon: [Număr Telefon]</li>
                </ul>
              </div>
            </section>
          </div>
        </SectionContainer>
      </ScrollArea>
    </Layout>
  );
};

export default TermsPage;
