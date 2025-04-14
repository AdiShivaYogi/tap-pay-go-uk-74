
import { ShieldCheck, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const SecurityAlert = () => {
  return (
    <div className="space-y-4 mb-6">
      <Alert className="border-green-200 bg-green-50">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Plăți Securizate prin Stripe</AlertTitle>
        <AlertDescription className="text-green-700">
          Nu stocăm niciun fel de informații bancare. 
          Toate datele sensibile sunt gestionate exclusiv de Stripe, 
          asigurând cea mai înaltă protecție pentru plățile tale.
        </AlertDescription>
      </Alert>

      <Alert>
        <Info className="h-5 w-5" />
        <AlertTitle>Transparență Totală</AlertTitle>
        <AlertDescription>
          Monitorizăm doar informații minime necesare pentru istoric, 
          fără acces la detalii personale. 
          Procesarea plăților este izolată și securizată 100% prin interfața Stripe.
        </AlertDescription>
      </Alert>
    </div>
  );
};
