
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Hammer, Lock, HandCoins, CheckCircle2, Zap } from "lucide-react";

interface ValueProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CoreValues: ValueProps[] = [
  {
    title: "Simplitate",
    description: "Generăm link-uri de plată profesionale și simple.",
    icon: HandCoins
  },
  {
    title: "Securitate",
    description: "Protecție maximă prin utilizarea infrastructurii Stripe.",
    icon: Shield
  },
  {
    title: "Izolare Completă",
    description: "Datele fiecărui utilizator rămân strict confidențiale.",
    icon: Lock
  },
  {
    title: "Eficiență",
    description: "Soluție rapidă și precisă pentru procesarea plăților.",
    icon: Zap
  },
  {
    title: "Transparență",
    description: "Fără ascunzișuri, fără date tracking, fără complicații.",
    icon: CheckCircle2
  },
  {
    title: "Focused pe Business",
    description: "Construim instrumente care amplifică productivitatea ta.",
    icon: Hammer
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Misiunea Noastră</h1>
            <p className="text-xl text-muted-foreground">
              Simplificăm procesele financiare pentru freelanceri, creatori și antreprenori.
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section className="bg-primary/5 p-8 rounded-lg">
              <p className="text-lg mb-6">
                Am conceput o soluție care transformă gestionarea plăților într-un proces fluid și eficient. 
                Generezi un link de plată, îl trimiți clientului, iar banii ajung direct în contul tău.
              </p>
              <p className="text-lg mb-6">
                Eliminăm complexitatea: nicio configurare complicată Stripe, 
                nicio îngrijorare legată de GDPR, fără integrări tehnice complicate.
              </p>
              <p className="text-lg">
                Suntem un instrument, nu o platformă: focused, rapid și de încredere. 
                Construim pentru a simplifica, nu pentru a complica.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold mb-8">Principiile Noastre</h2>
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
              <h2 className="text-3xl font-semibold mb-6">Alătură-te Comunității</h2>
              <p className="text-lg mb-6">
                Suntem dedicați să oferim unelte care transformă munca ta în profit. 
                Începe acum și descoperă simplitatea gestionării financiare.
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
