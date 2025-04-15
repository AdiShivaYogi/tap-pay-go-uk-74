
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingFAQProps {
  faqs: FAQItem[];
}

export const PricingFAQ = ({ faqs }: PricingFAQProps) => {
  return (
    <div className="max-w-3xl mx-auto mt-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Întrebări Frecvente</h2>
        <p className="text-muted-foreground">
          Aici găsiți răspunsuri la cele mai comune întrebări
        </p>
      </div>
      
      <Card className="bg-card/50">
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};
