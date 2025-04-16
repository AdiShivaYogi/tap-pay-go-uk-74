
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { StyledCard } from "@/components/ui/card-variants";

export const StripeFAQ = () => {
  return (
    <StyledCard className="border-primary/10">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Întrebări Frecvente</h2>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Ce comisioane percepe Stripe?</AccordionTrigger>
            <AccordionContent>
              Stripe percepe un comision de 1.4% + 0.25€ pentru cardurile europene și 2.9% + 0.25€ pentru cardurile
              non-europene. Nu există taxe ascunse sau costuri suplimentare.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Cât de repede primesc banii în contul meu?</AccordionTrigger>
            <AccordionContent>
              Plățile sunt procesate imediat, iar banii sunt transferați în contul tău bancar în 2-3 zile lucrătoare,
              în funcție de banca ta.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Este necesar să am un cont Stripe separat?</AccordionTrigger>
            <AccordionContent>
              Da, vei avea nevoie de un cont Stripe pentru a procesa plățile. Procesul de conectare este simplu 
              și îl poți realiza în câteva minute direct din această pagină.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Ce se întâmplă dacă un client contestă o plată?</AccordionTrigger>
            <AccordionContent>
              Stripe oferă un sistem integrat de gestionare a disputelor. Vei fi notificat și vei putea furniza
              dovezi pentru a rezolva disputa. TapPayGo te ajută cu informațiile necesare în acest proces.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </StyledCard>
  );
};
