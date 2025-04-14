
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, TestTube, Lock, Users, Sparkles } from "lucide-react";

export const BetaTestingSection = () => {
  return (
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <BetaFeatureCard
            icon={<Lock className="h-12 w-12" />}
            title="Acces Complet Gratuit"
            description="Primii 20 de utilizatori vor beneficia de acces total la toate funcționalitățile fără costuri."
          />
          <BetaFeatureCard
            icon={<Users className="h-12 w-12" />}
            title="Feedback Valoros"
            description="Ajută-ne să îmbunătățim experiența și primești acces preferențial la versiunile viitoare."
          />
          <BetaFeatureCard
            icon={<Sparkles className="h-12 w-12" />}
            title="Ofertă Exclusivă"
            description="Locuri limitate pentru primii 20 de utilizatori. O ocazie unică de a fi parte din comunitatea noastră."
          />
        </div>

        <div className="text-center">
          <Link to="/onboarding">
            <Button size="lg" className="h-14 px-8 text-lg group">
              Înscrie-te Acum - Locuri Limitate 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface BetaFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BetaFeatureCard = ({ icon, title, description }: BetaFeatureCardProps) => (
  <Card className="bg-card hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6 space-y-4">
      <div className="text-primary flex justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-center">{title}</h4>
      <p className="text-center text-muted-foreground">
        {description}
      </p>
    </CardContent>
  </Card>
);
