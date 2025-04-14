
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, HelpCircle } from "lucide-react";
import { DeviceCompatibility } from "@/hooks/use-device-compatibility";

interface DeviceCompatibilityAlertProps {
  compatibility: DeviceCompatibility;
}

export function DeviceCompatibilityAlert({ compatibility }: DeviceCompatibilityAlertProps) {
  if (compatibility.isCompatible === 'compatible') {
    return (
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-800">Dispozitiv compatibil</AlertTitle>
        <AlertDescription className="text-green-700">
          Dispozitivul dumneavoastră este compatibil cu Tap to Pay pentru acceptarea plăților contactless.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (compatibility.isCompatible === 'incompatible') {
    return (
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800">Dispozitiv incompatibil</AlertTitle>
        <AlertDescription className="text-amber-700">
          {compatibility.deviceType === 'iphone' ? (
            <>
              Telefonul dumneavoastră iPhone necesită iOS 16+ și model recent (iPhone XS sau mai nou) pentru a utiliza Tap to Pay. 
              Actualizați dispozitivul sau folosiți un iPhone compatibil.
            </>
          ) : compatibility.deviceType === 'android' ? (
            <>
              Dispozitivele Android nu sunt compatibile momentan cu Tap to Pay. 
              Vă rugăm să folosiți un iPhone cu iOS 16+ și model recent.
            </>
          ) : (
            <>
              Tap to Pay necesită un iPhone cu iOS 16+ și model recent. 
              Vă rugăm să folosiți un dispozitiv mobil compatibil.
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
        Nu am putut determina dacă dispozitivul dumneavoastră este compatibil cu Tap to Pay. 
        Pentru cea mai bună experiență, folosiți un iPhone cu iOS 16+.
      </AlertDescription>
    </Alert>
  );
}
