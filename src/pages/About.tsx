
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Tool, Hammer, Lock, HandCoins, CheckCircle2, LucideIcon } from "lucide-react";

interface ValueProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const CoreValues: ValueProps[] = [
  {
    title: "Simplicitate",
    description: "Link de plată, trimitere, încasare. Atât.",
    icon: HandCoins
  },
  {
    title: "Securitate",
    description: "Nu stocăm date sensibile. Totul e gestionat de Stripe.",
    icon: Shield
  },
  {
    title: "Izolare completă",
    description: "Fiecare utilizator vede doar datele lui. Punct.",
    icon: Lock
  },
  {
    title: "Unealtă, nu platformă",
    description: "Mică, rapidă și de încredere. Fără complicații.",
    icon: Tool
  },
  {
    title: "Zero Tracking",
    description: "Nu te spionăm, nu te vindem, nu te încurcăm.",
    icon: CheckCircle2
  },
  {
    title: "Construim pentru tine",
    description: "Focus pe nevoile tale reale de business.",
    icon: Hammer
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Despre Noi</h1>
            <p className="text-xl text-muted-foreground">
              Suntem aici pentru freelanceri, creatori și mici afaceri care vor să se concentreze pe muncă, nu pe facturi, Stripe, sau taxe.
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section className="bg-primary/5 p-8 rounded-lg">
              <p className="text-lg mb-6">
                Am construit o interfață care simplifică tot: creezi un link de plată, îl trimiți clientului, 
                banii intră în contul tău. Fără să te întrebi dacă ai setat tot bine în Stripe, 
                fără griji legate de GDPR, fără integrări complicate.
              </p>
              <p className="text-lg mb-6">
                Nu stocăm date sensibile. Nu procesăm plăți. Nu ne băgăm în treaba ta.
                Totul e gestionat de Stripe, iar noi ne ocupăm doar de experiența ta.
              </p>
              <p className="text-lg">
                Nu vrem să fim o platformă.
                Vrem să fim o unealtă: mică, rapidă și de încredere.
                Unelte care nu te încurcă. Care nu te vând. Care nu te spionează.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold mb-8">Ce Ne Face Diferiți</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CoreValues.map((value, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg border hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{value.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-muted/30 p-8 rounded-lg mt-12 text-center">
              <h2 className="text-3xl font-semibold mb-6">Alătură-te Nouă</h2>
              <p className="text-lg mb-6">
                Asta construim. Dacă vrei să vii alături de noi, începe să folosești aplicația. 
                Dacă vrei să ajuți, scrie-ne.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/onboarding">
                  <Button size="lg">Începe Acum</Button>
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
