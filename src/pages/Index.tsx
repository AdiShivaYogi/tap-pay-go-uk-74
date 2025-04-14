import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CreditCard, Zap, CheckCircle, Users, PiggyBank } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section cu design îmbunătățit */}
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

      {/* Statistics Section - Actualizată cu date mai realiste */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-muted-foreground">Utilizatori Activi în Beta</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">€5,000</h3>
              <p className="text-muted-foreground">Total Tranzacții în Dezvoltare</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <PiggyBank className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">0%</h3>
              <p className="text-muted-foreground">Comision în Perioada de Beta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Actualizată cu mărturii mai autentice */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Feedback din Comunitate</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Suntem într-o fază timpurie de dezvoltare. Iată ce spun primii noștri utilizatori.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">MF</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Mihai F.</h4>
                  <p className="text-sm text-muted-foreground">Dezvoltator Independent</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"Aplicația încă se dezvoltă, dar conceptul este promițător. Aștept cu nerăbdare versiunile viitoare."</p>
              <div className="flex mt-4 text-primary">
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">RA</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Radu A.</h4>
                  <p className="text-sm text-muted-foreground">Antreprenor Local</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"Ideea este interesantă, dar mai avem drum de parcurs. Sunt optimist cu privire la potențial."</p>
              <div className="flex mt-4 text-primary">
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">LT</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Laura T.</h4>
                  <p className="text-sm text-muted-foreground">Consultant Financiar</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">"Un concept interesant. Aștept să văd cum se va dezvolta și ce caracteristici vor fi adăugate."</p>
              <div className="flex mt-4 text-primary">
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
                <CheckCircle className="h-5 w-5 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section cu un mesaj mai realist */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield className="h-4 w-4" /> În Dezvoltare
          </div>
          <h2 className="text-3xl font-bold mb-6">Construim Împreună</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Suntem la începutul unei călătorii. Vrem să construim ceva valoros pentru freelanceri și antreprenori mici. Feedback-ul tău ne ajută să creștem.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="h-12 px-8">
              Alătură-te Comunității <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
