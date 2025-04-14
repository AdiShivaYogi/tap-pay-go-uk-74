
import { ShieldCheck, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const SecurityAlert = () => {
  return (
    <div className="space-y-4 mb-6">
      <Alert className="border-green-200 bg-green-50">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Plăți Securizate prin Stripe</AlertTitle>
        <AlertDescription className="text-green-700">
          Toate plățile sunt procesate direct și securizat prin Stripe. 
          Nu stocăm niciodată informații despre carduri sau alte date sensibile.
        </AlertDescription>
      </Alert>

      <Alert>
        <Info className="h-5 w-5" />
        <AlertTitle>Transparență Totală</AlertTitle>
        <AlertDescription>
          Monitorizăm doar informații minime necesare pentru istoricul tranzacțiilor,
          fără acces la detalii sensibile despre plăți. Datele sunt izolate și
          gestionate exclusiv prin interfața securizată Stripe.
        </AlertDescription>
      </Alert>
    </div>
  );
};
