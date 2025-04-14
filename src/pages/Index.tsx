import React from 'react';
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, CreditCard, Zap, CheckCircle, Users, PiggyBank, TestTube, Lock, Sparkles, Banknote, Receipt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section with improved design */}
      <section className="relative py-20 px-4 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
        <div className="container mx-auto relative">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Lansare în curând - Program Beta
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-center max-w-4xl mx-auto leading-tight">
            Transformă-ți Telefonul într-un <span className="text-primary relative">Terminal de Plată
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/20 -z-10 rounded-full"></span>
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-center leading-relaxed">
            Acceptă plăți contactless instant ca freelancer sau afacere mică. 
            Nu ai nevoie de hardware suplimentar - doar telefonul tău și aplicația noastră.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/onboarding">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto group">
                Începe Acum 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto hover:bg-secondary/80">
                Vezi Prețurile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">De ce să alegi TapPayGo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Plăți Rapide</h3>
                <p className="text-muted-foreground">
                  Procesează plăți contactless în câteva secunde, direct de pe telefonul tău.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Securitate Avansată</h3>
                <p className="text-muted-foreground">
                  Toate tranzacțiile sunt criptate și protejate conform standardelor industriei.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Receipt className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Rapoarte Detaliate</h3>
                <p className="text-muted-foreground">
                  Urmărește toate tranzacțiile și generează rapoarte personalizate.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section with improved design */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">1</h3>
                <p className="text-muted-foreground">Utilizator Activ (Admin)</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Banknote className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">€0</h3>
                <p className="text-muted-foreground">Total Tranzacții</p>
              </CardContent>
            </Card>
            
            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 text-center">
                <PiggyBank className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">0%</h3>
                <p className="text-muted-foreground">Comision în Dezvoltare</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beta Testing Section with improved design */}
      <section className="py-20 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
        <div className="container mx-auto relative">
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center gap-2">
              <TestTube className="h-4 w-4" /> Program Beta Testing Limitat
            </span>
          </div>
          <h2 className="text-3xl font-bold text-center mb-4">Primii 20 de Utilizatori - Acces Total Gratuit</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Oferim primilor 20 de utilizatori acces complet și gratuit la toate funcționalitățile pentru a ne ajuta să îmbunătățim aplicația.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="text-primary flex justify-center mb-4">
                  <Lock className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-bold text-center">Acces Complet Gratuit</h4>
                <p className="text-center text-muted-foreground">
                  Primii 20 de utilizatori vor beneficia de acces total la toate funcționalitățile fără costuri.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="text-primary flex justify-center mb-4">
                  <Users className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-bold text-center">Feedback Valoros</h4>
                <p className="text-center text-muted-foreground">
                  Ajută-ne să îmbunătățim experiența și primești acces preferențial la versiunile viitoare.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="text-primary flex justify-center mb-4">
                  <Sparkles className="h-12 w-12" />
                </div>
                <h4 className="text-xl font-bold text-center">Ofertă Exclusivă</h4>
                <p className="text-center text-muted-foreground">
                  Locuri limitate pentru primii 20 de utilizatori. O ocazie unică de a fi parte din comunitatea noastră.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/onboarding">
              <Button size="lg" className="h-14 px-8 text-lg group">
                Înscrie-te Acum - Locuri Limitate 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section with improved design */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Shield className="h-4 w-4" /> În Dezvoltare
          </div>
          <h2 className="text-3xl font-bold mb-6">Construim Împreună</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Suntem la începutul unei călătorii. Vrem să construim ceva valoros pentru freelanceri și antreprenori mici.
            Feedback-ul tău ne ajută să creștem.
          </p>
          <Link to="/onboarding">
            <Button size="lg" className="h-12 px-8 group">
              Alătură-te Comunității 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
