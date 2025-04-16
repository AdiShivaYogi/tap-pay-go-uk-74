
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  CreditCard, 
  Smartphone, 
  Zap, 
  CheckCircle2, 
  Rocket 
} from "lucide-react";
import { ThemedCard } from "@/components/ui/themed-components";
import { PageHeader, Section, Grid3Cols } from "@/components/ui/themed-components";

const AboutPage = () => {
  return (
    <Layout>
      <Section>
        <PageHeader 
          icon={Smartphone}
          title="Despre noi"
          description="Transformăm iPhone-ul în instrument de plată profesionist"
          gradient={true}
        />

        <div className="max-w-5xl mx-auto space-y-8">
          <ThemedCard className="border-primary/10">
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">TapGo: Plăți moderne, simple și sigure</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TapGo este soluția mobilă care transformă iPhone-ul tău într-un cititor de carduri complet funcțional — 
                  fără cabluri, fără terminale externe, fără bătăi de cap.
                </p>
                <p>
                  Aplicația noastră a fost creată pentru freelanceri, artiști, livratori, antreprenori locali și toți cei 
                  care muncesc pe cont propriu și vor să încaseze plăți cu cardul, oriunde s-ar afla.
                </p>
              </div>
            </div>
          </ThemedCard>

          <Section variant="alt">
            <ThemedCard variant="highlight">
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Misiunea Noastră</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Să facem plățile moderne accesibile, rapide și sigure, fără costuri ascunse și fără echipamente greoaie.
                  </p>
                  <p>
                    Folosim tehnologia Apple Tap to Pay și infrastructura de plată de la Stripe, unul dintre cei mai siguri 
                    și respectați procesatori de plăți din lume. Asta înseamnă că datele clienților tăi sunt în siguranță, 
                    iar tu poți încasa bani direct în contul tău Stripe, fără complicații legale sau financiare.
                  </p>
                </div>
              </div>
            </ThemedCard>
          </Section>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Avantajele Noastre</h2>
            <Grid3Cols>
              {[
                { 
                  icon: Smartphone, 
                  title: "Fără POS clasic", 
                  description: "Folosești doar iPhone-ul tău" 
                },
                { 
                  icon: CreditCard, 
                  title: "Încasări directe", 
                  description: "Banii merg direct în contul tău bancar" 
                },
                { 
                  icon: Zap, 
                  title: "Configurare rapidă", 
                  description: "Poți începe în doar câteva minute" 
                },
                { 
                  icon: Shield, 
                  title: "Siguranță maximă", 
                  description: "Date protejate prin Stripe" 
                },
                { 
                  icon: CheckCircle2, 
                  title: "Transparență", 
                  description: "Fără comisioane ascunse" 
                },
                { 
                  icon: Rocket, 
                  title: "Inovație", 
                  description: "Tehnologie modernă pentru antreprenori" 
                }
              ].map((feature, index) => (
                <ThemedCard key={index} variant="interactive" className="border-primary/10">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </ThemedCard>
              ))}
            </Grid3Cols>
          </div>

          <Section variant="alt">
            <ThemedCard className="border-primary/10">
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Suntem Pasionați de Inovație</h2>
                <p className="text-muted-foreground mb-6">
                  Suntem o echipă pasionată de tehnologie și inovație în fintech, și ne dorim să susținem 
                  afacerile mici și munca independentă într-un mod modern și eficient.
                </p>
                <p className="text-muted-foreground mb-6 font-semibold">
                  Fără hardware. Fără comisioane ascunse. Doar plăți simple, directe și sigure.
                </p>
                <div className="flex justify-center gap-4">
                  <Link to="/roadmap">
                    <Button variant="outline">Planul Nostru</Button>
                  </Link>
                  <Link to="/onboarding">
                    <Button>Începe Acum</Button>
                  </Link>
                </div>
              </div>
            </ThemedCard>
          </Section>
        </div>
      </Section>
    </Layout>
  );
};

export default AboutPage;
