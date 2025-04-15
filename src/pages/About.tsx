
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
    title: "Încredere și Securitate",
    description: "Securitatea datelor și confidențialitatea sunt fundația serviciului nostru. Nu compromitem niciodată siguranța utilizatorilor noștri.",
    icon: Shield
  },
  {
    title: "Transparență Totală",
    description: "Credem în comunicare deschisă și onestă. Fiecare tranzacție și cost este complet transparent.",
    icon: CheckCircle2
  },
  {
    title: "Comunitate Sustenabilă",
    description: "Construim o comunitate de utilizatori și parteneri bazată pe respect reciproc și creștere sustenabilă.",
    icon: Users
  },
  {
    title: "Impact Global",
    description: "Vizăm să facem plățile accesibile la nivel global, începând cu România și extinzându-ne treptat.",
    icon: Globe2
  },
  {
    title: "Etică în Business",
    description: "Menținem cele mai înalte standarde etice în toate aspectele activității noastre.",
    icon: Heart
  },
  {
    title: "Parteneriate de Încredere",
    description: "Colaborăm doar cu parteneri care împărtășesc valorile noastre etice și standardele de calitate.",
    icon: Handshake
  }
];

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Despre TapPayGo</h1>
            <p className="text-xl text-muted-foreground">
              Transformăm plățile mobile într-un serviciu etic, sigur și accesibil pentru toți
            </p>
          </div>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <section className="bg-primary/5 p-8 rounded-lg">
              <h2 className="text-3xl font-semibold mb-6">Misiunea Noastră</h2>
              <p className="text-lg mb-6">
                La TapPayGo, misiunea noastră este să democratizăm accesul la servicii de plată pentru freelanceri și afaceri mici, 
                oferind o soluție sigură, etică și accesibilă. Ne angajăm să:
              </p>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <span>Protejăm datele clienților cu cele mai înalte standarde de securitate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <span>Oferim transparență totală în toate operațiunile noastre</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <span>Construim relații pe termen lung bazate pe încredere</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                  <span>Inovăm constant păstrând standardele etice</span>
                </li>
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold mb-8">Valorile Noastre</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CoreValues.map((value, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg border">
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

            <section className="mt-12">
              <h2 className="text-3xl font-semibold mb-8">Angajamentul Nostru pentru Etică</h2>
              <EthicalCommunicationGuide />
            </section>

            <section className="bg-muted/30 p-8 rounded-lg mt-12">
              <h2 className="text-3xl font-semibold mb-6">Alătură-te Misiunii Noastre</h2>
              <p className="text-lg mb-6">
                Devino parte din revoluția plăților mobile etice. Împreună putem construi un viitor 
                al tranzacțiilor digitale bazat pe încredere, securitate și accesibilitate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto">
                    Începe Acum
                  </Button>
                </Link>
                <Link to="/roadmap">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Vezi Roadmap
                  </Button>
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
