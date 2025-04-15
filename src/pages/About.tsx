
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Heart, Handshake, Globe2, Users, CheckCircle2, LucideIcon } from "lucide-react";
import { EthicalCommunicationGuide } from "@/components/ethics/EthicalCommunicationGuide";

interface ValueProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const CoreValues: ValueProps[] = [
  {
    title: "Securitate și Confidențialitate",
    description: "Protecția datelor și siguranța utilizatorilor sunt fundamentul nostru.",
    icon: Shield
  },
  {
    title: "Transparență Totală",
    description: "Comunicare deschisă și onestă în toate tranzacțiile și serviciile noastre.",
    icon: CheckCircle2
  },
  {
    title: "Comunitate Sustenabilă",
    description: "Construim relații bazate pe respect și creștere durabilă.",
    icon: Users
  },
  {
    title: "Impact Global",
    description: "Democratizăm plățile digitale, cu accent pe România și extindere internațională.",
    icon: Globe2
  },
  {
    title: "Etică în Afaceri",
    description: "Standard ridicat de integritate în toate aspectele activității noastre.",
    icon: Heart
  },
  {
    title: "Încredere prin Colaborare",
    description: "Parteneriate bazate pe valori etice și standarde de calitate.",
    icon: Handshake
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">TapPayGo: Plăți Etice, Simple și Sigure</h1>
            <p className="text-xl text-muted-foreground">
              Transformăm plățile mobile într-o experiență accesibilă și responsabilă
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section className="bg-primary/5 p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-6">Misiunea Noastră</h2>
              <p className="text-lg mb-6">
                La TapPayGo, ne dedicăm simplificării plăților pentru freelanceri și întreprinderi mici, 
                oferind o soluție sigură, etică și transparentă.
              </p>
              <ul className="space-y-4 list-none pl-0">
                {[
                  "Protejăm datele utilizatorilor cu cele mai înalte standarde de securitate",
                  "Oferim transparență deplină în operațiunile noastre",
                  "Construim relații bazate pe încredere",
                  "Inovăm constant, respectând principiile etice"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold mb-8">Valorile Noastre Fundamentale</h2>
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

            <EthicalCommunicationGuide />

            <section className="bg-muted/30 p-8 rounded-lg mt-12 text-center">
              <h2 className="text-3xl font-semibold mb-6">Alătură-te Revoluției Plăților Digitale</h2>
              <p className="text-lg mb-6">
                Construim viitorul tranzacțiilor digitale: simplu, etic și accesibil pentru toți.
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
