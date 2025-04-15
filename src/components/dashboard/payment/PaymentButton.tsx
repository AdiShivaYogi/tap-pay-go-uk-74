
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2, NfcIcon, ShieldCheck } from "lucide-react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";

interface PaymentButtonProps {
  isProcessing: boolean;
  deviceCompatibility: DeviceCompatibility;
  amount: string;
  onClick: () => void;
}

export const PaymentButton = ({ 
  isProcessing, 
  deviceCompatibility, 
  amount,
  onClick 
}: PaymentButtonProps) => {
  return (
    <div className="pt-4">
      <Button 
        onClick={onClick}
        size="lg" 
        className="w-full h-16 text-lg gap-3"
        disabled={isProcessing || !amount}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Se procesează...
          </>
        ) : deviceCompatibility.isCompatible === 'compatible' ? (
          <>
            <NfcIcon className="h-5 w-5" />
            Scanează cardul cu Tap to Pay
          </>
        ) : (
          <>
            <CreditCard className="h-5 w-5" />
            Procesează plata prin Stripe
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4" />
        <span>Plăți securizate prin {deviceCompatibility.isCompatible === 'compatible' ? 
          "Apple Tap to Pay" : 
          "Stripe Checkout"}</span>
      </div>
    </div>
  );
};
