
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Info, 
  MessageCircle, 
  Heart, 
  Clock, 
  Target, 
  Lightbulb 
} from 'lucide-react';

interface EthicalPrinciple {
  title: string;
  description: string;
  icon: React.ElementType;
}

const ethicalPrinciples: EthicalPrinciple[] = [
  {
    title: "Onestitate",
    description: "Comunicare transparentă și clară, fără exagerări sau promisiuni false.",
    icon: ShieldCheck
  },
  {
    title: "Respect",
    description: "Ascultare activă și personalizare, tratând fiecare client ca individual.",
    icon: MessageCircle
  },
  {
    title: "Empatie",
    description: "Înțelegerea perspectivelor și sentimentelor clienților, oferind suport compătimitor.",
    icon: Heart
  },
  {
    title: "Responsabilitate",
    description: "Asumare de răspundere pentru erori și utilizare de feedback pentru îmbunătățire continuă.",
    icon: Target
  },
  {
    title: "Echitate",
    description: "Tratament egal pentru toți clienții, fără discriminare sau favoritism.",
    icon: Info
  },
  {
    title: "Integritate",
    description: "Menținerea consecventă a angajamentelor și practicilor etice de marketing.",
    icon: Clock
  },
  {
    title: "Inovație și Adaptabilitate",
    description: "Deschidere la feedback și îmbunătățire continuă a comunicării.",
    icon: Lightbulb
  }
];

export const EthicalCommunicationGuide: React.FC = () => {
  return (
    <div className="space-y-6 p-6 bg-secondary/10 rounded-lg">
      <h2 className="text-2xl font-bold text-foreground mb-4">
        Principii Etice de Comunicare
      </h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
        <p className="text-blue-800">
          Sistemul nostru de mesagerie este proiectat pentru a fi <strong>non-invaziv</strong>, 
          respectând intimitatea și preferințele clienților. Comunicăm doar informații relevante, 
          la momentul potrivit, fără a perturba sau a trimite mesaje excesive.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ethicalPrinciples.map((principle, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <principle.icon className="h-6 w-6 text-primary" />
                <CardTitle>{principle.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {principle.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 text-center bg-primary/10 p-4 rounded-lg">
        <p className="text-muted-foreground italic">
          "Construim încredere prin comunicare onestă, respectuoasă și transparentă."
        </p>
      </div>
    </div>
  );
};
