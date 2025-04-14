
import React from 'react';
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CreditCard, Zap, CheckCircle, Users, PiggyBank, TestTube } from "lucide-react";

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

      {/* Statistics Section - Actualizată cu date realiste */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">1</h3>
              <p className="text-muted-foreground">Utilizator Activ (Admin)</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <CreditCard className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">€0</h3>
              <p className="text-muted-foreground">Total Tranzacții</p>
            </div>
            
            <div className="bg-secondary/20 rounded-lg p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <PiggyBank className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-2">0%</h3>
              <p className="text-muted-foreground">Comision în Dezvoltare</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Testers Section - Replacing Testimonials */}
      <section className="py-20 px-4 bg-secondary/10">
        <div className="container mx-auto">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center gap-2">
              <TestTube className="h-4 w-4" /> Program Beta Testing
            </span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">Alătură-te ca Beta Tester</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Căutăm 20 de beta testeri pentru a ne ajuta să îmbunătățim aplicația. Participă la modelarea viitorului plăților mobile în România.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4 text-primary">
                <TestTube className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-bold text-center mb-2">Testare Gratuită</h4>
              <p className="text-center text-muted-foreground mb-4">
                Acces complet la toate funcționalitățile în perioada de testare, fără costuri.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4 text-primary">
                <Users className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-bold text-center mb-2">Feedback Valoros</h4>
              <p className="text-center text-muted-foreground mb-4">
                Ajută-ne să îmbunătățim experiența și primește acces preferențial la versiunile viitoare.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4 text-primary">
                <PiggyBank className="h-12 w-12" />
              </div>
              <h4 className="text-xl font-bold text-center mb-2">0% Comision</h4>
              <p className="text-center text-muted-foreground mb-4">
                Beneficiază de zero comisioane pe perioada programului de testare.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/onboarding">
              <Button size="lg" className="h-14 px-8 text-lg animate-pulse">
                Înscrie-te ca Beta Tester <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
