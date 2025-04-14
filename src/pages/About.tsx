
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About TapPayGo</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <p className="text-lg">
                TapPayGo transformă telefonul tău într-un terminal de plată contactless, permițând freelancerilor și micilor afaceri să accepte plăți oriunde, oricând—fără hardware suplimentar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Misiunea Noastră</h2>
              <p>
                Credem că procesarea plăților trebuie să fie simplă, sigură și accesibilă tuturor. Misiunea noastră este să oferim freelancerilor și micilor afaceri instrumentele necesare pentru a încasa bani ușor, fără complexitatea și costurile sistemelor tradiționale de plată.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Securitate mai presus de toate</h2>
              <p>
                Securitatea este prioritatea noastră principală. TapPayGo este proiectat cu un principiu de securitate maximă:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Nu stocăm niciodată datele dvs. de plată sau informații financiare sensibile.
                </li>
                <li>
                  Procesarea plăților este gestionată direct prin Stripe, un furnizor de plăți conform PCI.
                </li>
                <li>
                  Singura informație stocată este ID-ul contului Stripe pentru a facilita conexiunea.
                </li>
                <li>
                  Nicio informație de plată a clientului nu este stocată pe dispozitivul sau serverele noastre.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Realizări Cheie</h2>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Am finalizat cu succes:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>✓ Integrare completă Stripe pentru procesarea plăților</li>
                  <li>✓ Design UI/UX personalizat și responsiv</li>
                  <li>✓ Sistem robust de monitorizare etică</li>
                  <li>✓ Soluție avansată de raportare cu transparență maximă</li>
                  <li>✓ Implementarea celor mai înalte standarde de securitate și confidențialitate</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cum Funcționează</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">1</div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Conectare</h3>
                  <p className="text-sm">
                    Conectează-ți rapid contul Stripe printr-un proces securizat.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">2</div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Introdu Suma</h3>
                  <p className="text-sm">
                    Specifică simplu suma pe care dorești să o încasezi.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <div className="text-2xl font-bold text-primary">3</div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Primire Plată</h3>
                  <p className="text-sm">
                    Clientul plătește instant prin atingerea cardului sau dispozitivului.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Pentru Afaceri și Dincolo</h2>
              <p>
                Deși TapPayGo este conceput primar pentru freelanceri și afaceri din UK, platforma noastră este construită să scaleze internațional. Pe măsură ce Stripe și tehnologiile de plată contactless devin disponibile în mai multe regiuni, TapPayGo va continua să se extindă pentru a servi afaceri din întreaga lume.
              </p>
            </section>

            <section className="bg-muted/30 p-6 rounded-lg mt-8">
              <h2 className="text-2xl font-semibold mb-4">Gata să începi să primești plăți?</h2>
              <p className="mb-6">
                Alătură-te miilor de freelanceri și mici afaceri care folosesc TapPayGo pentru a primi plăți oriunde.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg">Începe Acum</Button>
                </Link>
                <Link to="/roadmap">
                  <Button variant="outline" size="lg">Vizualizează Roadmap</Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
