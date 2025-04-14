
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CreditCard, Zap, CheckCircle, Users, PiggyBank } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with improved design */}
      <section className="py-20 px-4 md:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Plăți contactless, simplu și rapid
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Transformă-ți Telefonul în <span className="text-primary">Terminal de Plată</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Acceptă plăți contactless instant ca freelancer sau afacere mică. Nu ai nevoie de hardware suplimentar - doar telefonul tău.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/onboarding">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto animate-pulse">
                Începe Acum <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                Vezi Prețurile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section - New */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">2,500+</h3>
              <p className="text-muted-foreground">Utilizatori Activi</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">€1M+</h3>
              <p className="text-muted-foreground">Tranzacții Procesate</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <PiggyBank className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1.5%</h3>
              <p className="text-muted-foreground">Comision Minim</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with improved layout */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Cum Funcționează</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            În trei pași simpli, transformă telefonul tău într-un terminal de plată complet funcțional
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Conectare cu Stripe</h3>
              <p className="text-muted-foreground">Conectează-ți contul Stripe în siguranță. Nu stocăm niciodată cheile sau datele sensibile.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Introducere Sumă</h3>
              <p className="text-muted-foreground">Introdu suma pe care dorești să o primești, în deplină siguranță.</p>
            </div>
            
            <div className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-200">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Acceptă Plata</h3>
              <p className="text-muted-foreground">Apropie cardul clientului de telefon și primește plata instant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Ce Spun Clienții Noștri</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Descopera experiențele utilizatorilor noștri cu TapPayGo
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">AM</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Alex Mureșan</h4>
                  <p className="text-sm text-muted-foreground">Freelancer</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"Aplicația mi-a simplificat enorm procesul de încasare. Acum pot accepta plăți oriunde m-aș afla."</p>
              <div className="flex mt-4 text-primary">
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">IP</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Ioana Popescu</h4>
                  <p className="text-sm text-muted-foreground">Proprietară Cafenea</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"TapPayGo ne-a ajutat să ne modernizăm afacerea fără a investi în POS-uri costisitoare. Recomand cu încredere!"</p>
              <div className="flex mt-4 text-primary">
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">MD</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Mihai Dumitrescu</h4>
                  <p className="text-sm text-muted-foreground">Antreprenor</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"Securitatea și simplitatea sunt punctele forte ale acestei aplicații. Procesul de onboarding a fost foarte rapid."</p>
              <div className="flex mt-4 text-primary">
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section with improved CTA */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield className="h-4 w-4" /> 100% Securizat
          </div>
          <h2 className="text-3xl font-bold mb-6">Gata să începi să accepți plăți?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Alătură-te miilor de freelanceri și afaceri mici care folosesc TapPayGo pentru a accepta plăți oriunde.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="h-12 px-8 animate-pulse">
              Începe Gratuit <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
