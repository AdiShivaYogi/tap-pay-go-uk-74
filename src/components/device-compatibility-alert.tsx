
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, HelpCircle, CreditCard, Smartphone } from "lucide-react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";

interface DeviceCompatibilityAlertProps {
  compatibility: DeviceCompatibility;
}

export function DeviceCompatibilityAlert({ compatibility }: DeviceCompatibilityAlertProps) {
  if (compatibility.isCompatible === 'compatible') {
    return (
      <Alert className="bg-blue-50 border-blue-200">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Dispozitiv Compatibil Parțial</AlertTitle>
        <AlertDescription className="text-blue-700">
          <div className="space-y-2">
            <p>Dispozitivul dumneavoastră este compatibil pentru procesarea plăților, dar nu pentru scanarea cardului fizic (Tap to Pay).</p>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Veți fi redirecționat către interfața de plată Stripe pentru introducerea manuală a detaliilor cardului.</span>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    );
  }
  
  if (compatibility.isCompatible === 'incompatible') {
    return (
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Limitări dispozitiv</AlertTitle>
        <AlertDescription className="text-amber-700">
          {compatibility.deviceType === 'iphone' ? (
            <>
              <p>Telefonul dumneavoastră iPhone necesită iOS 16+ și model recent (iPhone XS sau mai nou) pentru a utiliza Tap to Pay.</p>
              <div className="flex items-center gap-2 mt-2">
                <Smartphone className="h-5 w-5" />
                <span>Veți fi redirecționat către interfața standard de plată Stripe.</span>
              </div>
            </>
          ) : compatibility.deviceType === 'android' ? (
            <>
              <p>Dispozitivele Android nu sunt compatibile cu Tap to Pay în această versiune a aplicației.</p>
              <div className="flex items-center gap-2 mt-2">
                <Smartphone className="h-5 w-5" />
                <span>Veți folosi interfața standard de plată Stripe.</span>
              </div>
            </>
          ) : (
            <>
              <p>Tap to Pay necesită un iPhone cu iOS 16+ și model recent.</p>
              <div className="flex items-center gap-2 mt-2">
                <Smartphone className="h-5 w-5" />
                <span>Veți folosi metoda standard de plată prin Stripe.</span>
              </div>
            </>
          )}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert>
      <HelpCircle className="h-4 w-4" />
      <AlertTitle>Compatibilitate necunoscută</AlertTitle>
      <AlertDescription>
        <p>Nu am putut determina compatibilitatea dispozitivului.</p>
        <div className="flex items-center gap-2 mt-2">
          <CreditCard className="h-5 w-5" />
          <span>Veți fi redirecționat către interfața standard de plată Stripe.</span>
        </div>
      </AlertDescription>
    </Alert>
  );
}
