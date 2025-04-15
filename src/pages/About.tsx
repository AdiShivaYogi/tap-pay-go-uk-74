
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Hammer, Lock, HandCoins, CheckCircle2, Zap } from "lucide-react";
import { StyledCard } from "@/components/ui/card-variants";

interface ValueProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CoreValues: ValueProps[] = [
  {
    title: "Simplitate",
    description: "Generarea link-urilor de plată profesionale cu minim de efort.",
    icon: HandCoins
  },
  {
    title: "Securitate",
    description: "Protecție maximă prin infrastructura Stripe.",
    icon: Shield
  },
  {
    title: "Confidențialitate",
    description: "Datele dvs. rămân strict confidențiale, întotdeauna.",
    icon: Lock
  },
  {
    title: "Eficiență",
    description: "Soluție rapidă și precisă pentru procesarea plăților.",
    icon: Zap
  },
  {
    title: "Transparență",
    description: "Fără taxe ascunse, fără tracking de date, fără complicații.",
    icon: CheckCircle2
  },
  {
    title: "Focus pe Business",
    description: "Construim instrumente care vă amplifică productivitatea.",
    icon: Hammer
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header section with gradient background */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">Despre Noi</h1>
            <p className="text-muted-foreground">
              Simplificăm procesele financiare pentru freelanceri, creatori și afaceri mici din UK.
            </p>
          </div>

          <div className="space-y-8">
            {/* Mission section */}
            <StyledCard className="border-primary/10">
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Misiunea Noastră</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Construim pentru freelanceri, creatori și afaceri mici care vor să se concentreze pe munca lor — 
                    nu pe facturi, configurare Stripe sau confuzie fiscală.
                  </p>
                  <p>
                    Aplicația noastră vă oferă o interfață simplă: creați un link de plată, îl trimiteți clientului, 
                    iar banii ajung direct în contul dvs. Fără probleme tehnice. Fără griji legate de stocarea datelor.
                    Fără complexitate inutilă.
                  </p>
                  <p>
                    Nu stocăm date sensibile. Nu procesăm plăți. Nu vă stăm în cale.
                    Stripe se ocupă de tot ce înseamnă securitate și conformitate. Noi vă oferim doar interfața pentru a merge mai repede.
                  </p>
                </div>
              </div>
            </StyledCard>

            {/* Core Values section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Principiile Noastre</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CoreValues.map((value, index) => (
                  <StyledCard key={index} className="border-primary/10">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <value.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{value.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </StyledCard>
                ))}
              </div>
            </div>

            {/* CTA section */}
            <StyledCard className="border-primary/10">
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Alătură-te Comunității Noastre</h2>
                <p className="text-muted-foreground mb-6">
                  Nu încercăm să fim o platformă. Construim un instrument: ușor, de încredere, 
                  invizibil când trebuie să fie. Dacă vi se pare util — folosiți-l.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/roadmap">
                    <Button variant="outline">Vezi Planul de Dezvoltare</Button>
                  </Link>
                  <Link to="/onboarding">
                    <Button>Începe Acum</Button>
                  </Link>
                </div>
              </div>
            </StyledCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
