
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Banknote, PiggyBank } from "lucide-react";

export const StatsSection = () => {
  return (
    <section className="py-16 px-4 bg-secondary/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<Users className="h-10 w-10 text-primary mx-auto mb-4" />}
            value="1"
            label="Utilizator Activ (Admin)"
          />
          <StatCard
            icon={<Banknote className="h-10 w-10 text-primary mx-auto mb-4" />}
            value="€0"
            label="Total Tranzacții"
          />
          <StatCard
            icon={<PiggyBank className="h-10 w-10 text-primary mx-auto mb-4" />}
            value="0%"
            label="Comision în Dezvoltare"
          />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300">
    <CardContent className="p-8 text-center">
      {icon}
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </CardContent>
  </Card>
);
