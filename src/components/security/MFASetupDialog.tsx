
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MFASetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const MFASetupDialog = ({ open, onOpenChange, userId }: MFASetupDialogProps) => {
  const [step, setStep] = useState<'intro' | 'setup' | 'verify'>('intro');
  const [otp, setOtp] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startSetup = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would call a Supabase Edge Function
      // to generate a secret key and QR code URL
      // For demo purposes, we'll simulate this
      
      // Simulated response
      setTimeout(() => {
        // This would come from your backend in a real implementation
        setSecretKey("EXAMPLEKEY123456");
        setQrCodeUrl("https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/SecureRoadmap:user@example.com?secret=EXAMPLEKEY123456&issuer=SecureRoadmap");
        setStep('setup');
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error starting MFA setup:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut configura autentificarea multi-factor.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, this would validate the OTP against the secret
      // For demo purposes, we'll accept any 6-digit code
      if (otp.length === 6) {
        // Simulate successful verification
        setTimeout(() => {
          toast({
            title: "MFA activat",
            description: "Autentificarea multi-factor a fost configurată cu succes.",
          });
          
          // In a real implementation, store this in the database
          // with a Supabase Edge Function
          
          onOpenChange(false);
          setIsLoading(false);
          setOtp("");
          setStep('intro');
        }, 1000);
      } else {
        toast({
          title: "Cod invalid",
          description: "Vă rugăm să introduceți un cod valid de 6 cifre.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Eroare",
        description: "Nu am putut verifica codul de autentificare.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Configurare autentificare multi-factor (MFA)
          </DialogTitle>
          <DialogDescription>
            Adăugați un strat suplimentar de securitate pentru contul dvs.
          </DialogDescription>
        </DialogHeader>

        {step === 'intro' && (
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Activarea MFA va necesita un cod de verificare suplimentar la fiecare autentificare.
              </AlertDescription>
            </Alert>
            <p className="text-sm">
              Pentru a configura autentificarea multi-factor, veți avea nevoie de o aplicație de autentificare precum Google Authenticator, Microsoft Authenticator sau Authy.
            </p>
            <DialogFooter>
              <Button onClick={startSetup} disabled={isLoading}>
                {isLoading ? "Se procesează..." : "Configurează MFA"}
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 'setup' && (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="border rounded p-2 bg-white">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
              </div>
              <p className="text-sm font-medium">Sau introduceți acest cod în aplicația dvs.:</p>
              <p className="font-mono bg-muted p-2 rounded select-all text-center">
                {secretKey}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Scanați codul QR cu aplicația de autentificare sau introduceți codul manual.
            </p>
            <Button 
              onClick={() => setStep('verify')} 
              className="w-full"
              disabled={isLoading}
            >
              Am scanat codul QR
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <p className="text-sm">
              Introduceți codul de verificare din aplicația dvs. de autentificare pentru a finaliza configurarea.
            </p>
            <div className="flex justify-center py-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <DialogFooter>
              <Button onClick={verifyOtp} disabled={otp.length !== 6 || isLoading} className="w-full">
                {isLoading ? "Se verifică..." : "Verifică și activează"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
