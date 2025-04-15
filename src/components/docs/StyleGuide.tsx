
import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Copy, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const StyleGuide = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    toast({
      title: "Copiat în clipboard",
      description: `${label} a fost copiat în clipboard`,
    });
    
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Style guide sections
  const containerStyles = [
    { label: "Container standard", className: "container mx-auto px-4 py-8" },
    { label: "Container centrat cu lățime maximă", className: "container mx-auto px-4 py-8 max-w-[1400px]" },
    { label: "Container pentru secțiune", className: "section-padding" },
  ];

  const layoutStyles = [
    { label: "Grid cu 2 coloane responsive", className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
    { label: "Grid cu 3 coloane responsive", className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" },
    { label: "Grid cu 4 coloane responsive", className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" },
    { label: "Flex row", className: "flex items-center gap-4" },
    { label: "Flex column", className: "flex flex-col space-y-4" },
  ];

  const spacingStyles = [
    { label: "Spațiere verticală mică", className: "space-y-2" },
    { label: "Spațiere verticală medie", className: "space-y-4" },
    { label: "Spațiere verticală mare", className: "space-y-6" },
    { label: "Spațiere verticală responsivă", className: "space-y-4 md:space-y-6 lg:space-y-8" },
    { label: "Spațiere orizontală mică", className: "space-x-2" },
    { label: "Spațiere orizontală medie", className: "space-x-4" },
    { label: "Spațiere orizontală mare", className: "space-x-6" },
    { label: "Spațiere orizontală responsivă", className: "space-x-2 md:space-x-4 lg:space-x-6" },
  ];

  const typographyStyles = [
    { label: "Titlu principal", className: "text-3xl font-bold" },
    { label: "Titlu secundar", className: "text-2xl font-semibold" },
    { label: "Titlu terțiar", className: "text-xl font-medium" },
    { label: "Subtitlu", className: "text-lg font-medium" },
    { label: "Text normal", className: "text-base" },
    { label: "Text mic", className: "text-sm" },
    { label: "Text secundar/muted", className: "text-muted-foreground" },
  ];

  const cardStyles = [
    { label: "Card standard", className: "rounded-lg border bg-card text-card-foreground shadow-sm" },
    { label: "Card cu efect hover", className: "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300" },
    { label: "Card cu accent", className: "rounded-lg border-2 border-primary/10 bg-card text-card-foreground shadow-sm" },
  ];

  const animationStyles = [
    { label: "Animație fade in", className: "animate-fade-in" },
    { label: "Tranziție la hover", className: "transition-all duration-300 hover:scale-105" },
    { label: "Tranziție pentru culori", className: "transition-colors duration-200" },
  ];
  
  const renderCopyableCode = (item: { label: string, className: string }) => (
    <div key={item.label} className="flex justify-between items-center p-3 rounded-md border bg-muted/50">
      <div className="space-y-1">
        <p className="font-medium text-sm">{item.label}</p>
        <p className="text-xs font-mono text-muted-foreground">{item.className}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => copyToClipboard(`className="${item.className}"`, item.label)}
        className="h-8 w-8 p-0"
      >
        {copiedText === item.label ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );

  return (
    <Layout>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Style Guide TapPayGo</h1>
              <p className="text-muted-foreground">
                Un ghid de stiluri pentru a asigura consistența designului în tot proiectul.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Sfat pentru dezvoltatori</h3>
                  <p className="text-sm text-muted-foreground">
                    Folosiți aceste clase consistent în toate paginile și componentele pentru a menține un design unitar.
                    Faceți click pe clase pentru a le copia direct în clipboard.
                  </p>
                </div>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="containers">
                <AccordionTrigger className="text-lg font-medium">
                  Containere
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {containerStyles.map(renderCopyableCode)}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="layout">
                <AccordionTrigger className="text-lg font-medium">
                  Layout-uri & Grid-uri
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {layoutStyles.map(renderCopyableCode)}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="spacing">
                <AccordionTrigger className="text-lg font-medium">
                  Spațiere
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {spacingStyles.map(renderCopyableCode)}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="typography">
                <AccordionTrigger className="text-lg font-medium">
                  Tipografie
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {typographyStyles.map(renderCopyableCode)}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cards">
                <AccordionTrigger className="text-lg font-medium">
                  Carduri
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {cardStyles.map(renderCopyableCode)}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="animations">
                <AccordionTrigger className="text-lg font-medium">
                  Animații
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    {animationStyles.map(renderCopyableCode)}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-6 pt-4">
              <Separator />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Exemple de Componente</h2>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Exemplu Card</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Aceasta este o componentă Card din shadcn/ui</p>
                      <div className="flex gap-2 mt-4">
                        <Button>Buton Primar</Button>
                        <Button variant="secondary">Buton Secundar</Button>
                        <Button variant="outline">Outline</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h3 className="font-medium">Badges</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="success">Success</Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Inputs</h3>
                      <Input placeholder="Introduceți text..." />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Utilizare Coerentă a Culorilor</h2>
                <p className="text-muted-foreground">
                  Pentru a menține consistență în utilizarea culorilor, folosiți variabilele de temă predefinite:
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    { name: "primary", class: "bg-primary text-primary-foreground" },
                    { name: "secondary", class: "bg-secondary text-secondary-foreground" },
                    { name: "accent", class: "bg-accent text-accent-foreground" },
                    { name: "muted", class: "bg-muted text-muted-foreground" },
                    { name: "card", class: "bg-card text-card-foreground border" },
                    { name: "destructive", class: "bg-destructive text-destructive-foreground" }
                  ].map((color) => (
                    <div 
                      key={color.name} 
                      className={`p-4 rounded-md flex items-center justify-center ${color.class}`}
                      onClick={() => copyToClipboard(color.class, color.name)}
                    >
                      <span className="font-medium text-sm">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Layout>
  );
};

export default StyleGuide;
