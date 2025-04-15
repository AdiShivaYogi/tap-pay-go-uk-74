
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PaymentHeader } from "./payment/PaymentHeader";
import { PaymentInputs } from "./payment/PaymentInputs";
import { PaymentButton } from "./payment/PaymentButton";
import { TapToPayDialog } from "./payment/TapToPayDialog";
import { StyledCard } from "@/components/ui/card-variants";
import { Nfc as NfcIcon } from "lucide-react";

interface PaymentFormProps {
  deviceCompatibility: DeviceCompatibility;
}

export const PaymentForm = ({ deviceCompatibility }: PaymentFormProps) => {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showTapToPayDialog, setShowTapToPayDialog] = useState<boolean>(false);
  const [scanningStatus, setScanningStatus] = useState<'idle' | 'scanning' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (showTapToPayDialog && scanningStatus === 'scanning') {
      timer = setTimeout(() => {
        setScanningStatus('success');
        
        setTimeout(() => {
          setShowTapToPayDialog(false);
          toast({
            title: "Plată procesată cu succes",
            description: `Suma de £${amount} a fost procesată prin Tap to Pay.`,
          });
          setIsProcessing(false);
          setAmount("");
          setDescription("");
          setScanningStatus('idle');
        }, 2000);
      }, 5000);
    }
    
    return () => clearTimeout(timer);
  }, [showTapToPayDialog, scanningStatus, amount]);

  const handlePayment = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Sumă invalidă",
        description: "Te rugăm să introduci o sumă validă mai mare decât zero.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (deviceCompatibility.isCompatible === 'compatible') {
        setShowTapToPayDialog(true);
        setScanningStatus('scanning');
      } else {
        const { data, error } = await supabase.functions.invoke('create-payment', {
          body: { 
            amount: parseFloat(amount),
            description: description || "Plată"
          }
        });

        if (error) throw error;
        if (!data.url) throw new Error('Nu s-a putut obține URL-ul de plată');

        toast({
          title: "Redirecționare către plată",
          description: "Veți fi redirectat către Stripe Checkout pentru completarea plății.",
          variant: "default"
        });

        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Eroare la procesarea plății:', error);
      toast({
        title: "Eroare la procesare",
        description: "A apărut o eroare la procesarea plății. Te rugăm să încerci din nou.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <>
      <StyledCard
        variant="default"
        icon={NfcIcon}
        className="border-2 border-primary/10"
      >
        <CardHeader>
          <PaymentHeader deviceCompatibility={deviceCompatibility} />
        </CardHeader>

        <CardContent className="space-y-6">
          <PaymentInputs
            amount={amount}
            setAmount={setAmount}
            description={description}
            setDescription={setDescription}
          />

          <PaymentButton
            isProcessing={isProcessing}
            deviceCompatibility={deviceCompatibility}
            amount={amount}
            onClick={handlePayment}
          />
        </CardContent>
      </StyledCard>

      <TapToPayDialog
        open={showTapToPayDialog}
        onOpenChange={setShowTapToPayDialog}
        scanningStatus={scanningStatus}
        setScanningStatus={setScanningStatus}
        amount={amount}
        description={description}
      />
    </>
  );
};
