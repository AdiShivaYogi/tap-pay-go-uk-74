
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
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
  );
};
