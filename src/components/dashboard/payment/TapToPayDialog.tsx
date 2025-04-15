
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, NfcIcon, ShieldCheck } from "lucide-react";

interface TapToPayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scanningStatus: 'idle' | 'scanning' | 'success' | 'error';
  setScanningStatus: (status: 'idle' | 'scanning' | 'success' | 'error') => void;
  amount: string;
  description?: string;
}

export const TapToPayDialog = ({
  open,
  onOpenChange,
  scanningStatus,
  setScanningStatus,
  amount,
  description
}: TapToPayDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scanare Card cu Tap to Pay</DialogTitle>
          <DialogDescription>
            Apropiați cardul contactless de spatele telefonului pentru a procesa plata.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          {scanningStatus === 'scanning' && (
            <>
              <div className="relative">
                <NfcIcon className="h-20 w-20 text-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
                </div>
              </div>
              <p className="text-center text-muted-foreground">
                Se scanează... Nu îndepărtați cardul de telefon.
              </p>
            </>
          )}

          {scanningStatus === 'success' && (
            <>
              <div className="relative">
                <CheckCircle className="h-20 w-20 text-green-600" />
              </div>
              <p className="text-center font-medium text-green-600">
                Plată procesată cu succes!
              </p>
              <div className="text-center">
                <p className="text-lg font-bold">£{amount}</p>
                {description && <p className="text-muted-foreground">{description}</p>}
              </div>
            </>
          )}

          {scanningStatus === 'error' && (
            <>
              <div className="relative">
                <AlertTriangle className="h-20 w-20 text-destructive" />
              </div>
              <p className="text-center font-medium text-destructive">
                Eroare la procesarea plății. Încercați din nou.
              </p>
              <Button 
                onClick={() => setScanningStatus('scanning')}
                variant="outline"
              >
                Încearcă din nou
              </Button>
            </>
          )}

          {scanningStatus === 'idle' && (
            <>
              <div className="relative">
                <NfcIcon className="h-20 w-20 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                Pregătit pentru scanare. Apropiați cardul de telefon.
              </p>
              <Button 
                onClick={() => setScanningStatus('scanning')}
                variant="outline"
              >
                Inițiază scanarea
              </Button>
            </>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Securizat prin Apple
          </Badge>
          <p className="text-sm text-muted-foreground">
            Sumă: <span className="font-medium">£{amount}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
