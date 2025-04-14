
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CreditCard, Receipt } from "lucide-react";

export const FeatureGrid = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">De ce să alegi TapPayGo?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<CreditCard className="h-6 w-6" />}
            title="Plăți Rapide"
            description="Procesează plăți contactless în câteva secunde, direct de pe telefonul tău."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Securitate Avansată"
            description="Toate tranzacțiile sunt criptate și protejate conform standardelor industriei."
          />
          <FeatureCard
            icon={<Receipt className="h-6 w-6" />}
            title="Rapoarte Detaliate"
            description="Urmărește toate tranzacțiile și generează rapoarte personalizate."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="bg-card hover:shadow-lg transition-shadow duration-300">
    <CardContent className="p-6 space-y-4">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);
