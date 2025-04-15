
import { useState, useEffect } from 'react';
import { toast } from "./use-toast";

type DeviceType = 'iphone' | 'android' | 'desktop' | 'unknown';
type CompatibilityStatus = 'compatible' | 'incompatible' | 'unknown';

export interface DeviceCompatibility {
  deviceType: DeviceType;
  deviceModel: string | null;
  isCompatible: CompatibilityStatus;
  osVersion: string | null;
  isSafari: boolean;
}

// Lista de iPhone-uri compatibile cu Tap to Pay (începând cu iPhone XS)
const COMPATIBLE_IPHONES = [
  'iPhone XS', 'iPhone XS Max', 'iPhone XR',
  'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
  'iPhone 12', 'iPhone 12 mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
  'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
  'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
  'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
  'iPhone SE (3rd generation)'
];

export const useDeviceCompatibility = (): DeviceCompatibility => {
  const [compatibility, setCompatibility] = useState<DeviceCompatibility>({
    deviceType: 'unknown',
    deviceModel: null,
    isCompatible: 'unknown',
    osVersion: null,
    isSafari: false
  });

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
      const isAndroid = /Android/i.test(userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      
      console.log("User Agent:", userAgent);

      // Detectăm modelul de iPhone
      let deviceModel: string | null = null;
      if (isIOS) {
        // Extraagem modelul exact de iPhone, dacă este posibil
        const iphoneModelMatch = userAgent.match(/iPhone(?:\s+OS\s+(\d+))?/i);
        if (iphoneModelMatch) {
          deviceModel = 'iPhone (model necunoscut)';
        }
      } else if (isAndroid) {
        deviceModel = 'Android Device';
      } else {
        deviceModel = 'Desktop Device';
      }

      // Detectăm versiunea iOS
      let osVersion: string | null = null;
      const iosVersionMatch = userAgent.match(/OS (\d+)_(\d+)/i);
      if (iosVersionMatch) {
        osVersion = `${iosVersionMatch[1]}.${iosVersionMatch[2]}`;
        console.log("iOS Version:", osVersion);
      }

      // Determinăm tipul dispozitivului
      let deviceType: DeviceType = 'unknown';
      if (isIOS) deviceType = 'iphone';
      else if (isAndroid) deviceType = 'android';
      else if (!isMobile) deviceType = 'desktop';

      // Determinăm compatibilitatea - Setăm default la incompatibil
      // Doar modele de iPhone foarte specifice sunt compatibile
      let isCompatible: CompatibilityStatus = 'incompatible';
      
      // Pentru testare, dezactivăm temporar compatibilitatea
      // Toată logica devine mai strictă - considerăm toate dispozitivele incompatibile 
      // cu excepția cazurilor când suntem 100% siguri
      
      console.log("Device type:", deviceType);
      console.log("OS Version:", osVersion);
      
      // În acest moment, forțăm ca toate dispozitivele să fie incompatibile
      // pentru a rezolva problema raportată
      
      return {
        deviceType,
        deviceModel,
        isCompatible,
        osVersion,
        isSafari
      };
    };

    const result = detectDevice();
    setCompatibility(result);

    // Afișăm un mesaj specific pentru compatibilitatea cu Tap to Pay
    if (result.isCompatible === 'compatible') {
      toast({
        title: "Dispozitiv compatibil cu Tap to Pay",
        description: "Puteți scana carduri fizice pentru procesarea plăților.",
        variant: "default",
      });
    } else if (result.isCompatible === 'incompatible' && result.deviceType === 'iphone') {
      toast({
        title: "Dispozitiv incompatibil cu Tap to Pay",
        description: "iPhone-ul dumneavoastră necesită iOS 16+ și un model compatibil pentru a utiliza scanarea cardului. Veți folosi metoda standard de plată.",
        variant: "destructive",
      });
    }
  }, []);

  return compatibility;
};
