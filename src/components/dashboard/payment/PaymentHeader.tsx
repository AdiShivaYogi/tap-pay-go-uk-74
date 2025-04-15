
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info, NfcIcon, Smartphone } from "lucide-react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";

interface PaymentHeaderProps {
  deviceCompatibility: DeviceCompatibility;
}

export const PaymentHeader = ({ deviceCompatibility }: PaymentHeaderProps) => {
  // Always show Stripe Checkout information since all devices are now incompatible
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <CardTitle className="text-2xl">Procesează o plată nouă</CardTitle>
        <CardDescription>
          Acceptă plăți în siguranță prin Stripe Checkout
        </CardDescription>
      </div>

      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-700">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            <span>Dispozitivul dumneavoastră nu este compatibil cu Tap to Pay. Veți fi redirecționat către interfața standard Stripe Checkout pentru introducerea manuală a detaliilor cardului.</span>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
