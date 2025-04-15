
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

      // Detectăm modelul de iPhone
      let deviceModel: string | null = null;
      if (isIOS) {
        // Check for iPhone SE 3rd generation
        if (userAgent.includes('iPhone SE')) {
          deviceModel = 'iPhone SE (3rd generation)';
        } else {
          // Alternativ, verificăm dacă este un model mai nou bazat pe OS
          const osVersion = userAgent.match(/OS (\d+)_(\d+)/i);
          const majorVersion = osVersion ? parseInt(osVersion[1], 10) : 0;
          
          if (majorVersion >= 16) {
            deviceModel = 'iPhone recent (iOS 16+)';
          } else if (majorVersion >= 14) {
            deviceModel = 'iPhone recent (iOS 14+)';
          } else {
            deviceModel = 'iPhone mai vechi';
          }
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
      }

      // Determinăm tipul dispozitivului
      let deviceType: DeviceType = 'unknown';
      if (isIOS) deviceType = 'iphone';
      else if (isAndroid) deviceType = 'android';
      else if (!isMobile) deviceType = 'desktop';

      // Determinăm compatibilitatea
      let isCompatible: CompatibilityStatus = 'unknown';
      
      if (deviceType === 'iphone') {
        // Verificăm dacă este un model compatibil și rulează iOS 16+
        let isCompatibleModel = false;
        
        // Verificare specială pentru iPhone SE generația 3
        if (deviceModel === 'iPhone SE (3rd generation)') {
          isCompatibleModel = true;
        }
        // Verificăm dacă este un iPhone modern bazat pe versiunea iOS
        else if (osVersion && parseInt(osVersion) >= 16) {
          isCompatibleModel = true;
        }
        
        if (isCompatibleModel) {
          isCompatible = 'compatible';
        } else {
          isCompatible = 'incompatible';
        }
      } else {
        isCompatible = 'incompatible';
      }

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
        description: "iPhone-ul dumneavoastră necesită iOS 16+ pentru a utiliza scanarea cardului. Veți folosi metoda standard de plată.",
        variant: "destructive",
      });
    }
  }, []);

  return compatibility;
};
