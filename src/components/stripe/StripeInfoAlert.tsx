
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const StripeInfoAlert = () => {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertDescription className="text-blue-700">
        Stripe este o platformă de procesare a plăților sigură și ușor de integrat. 
        TapPayGo folosește Stripe pentru a procesa toate plățile tale în mod sigur.
      </AlertDescription>
    </Alert>
  );
};
