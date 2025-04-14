
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

      // Detectăm modelul de iPhone (aproximativ)
      let deviceModel: string | null = null;
      if (isIOS) {
        // Încercăm să extragem modelul iPhone din User Agent
        const iphoneMatch = userAgent.match(/iPhone(?:\s+OS\s+(\d+))?/i);
        if (iphoneMatch) {
          // Pentru simplificare, presupunem un iPhone recent (doar pentru demonstrație)
          // În aplicațiile reale, detecția precisă a modelului este mai complexă
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

      // Determinăm compatibilitatea (simplificat)
      // În realitate, ar trebui o detecție mult mai precisă a modelului
      let isCompatible: CompatibilityStatus = 'unknown';
      if (deviceType === 'iphone' && osVersion && parseInt(osVersion) >= 16) {
        isCompatible = 'compatible';
      } else if (deviceType === 'iphone') {
        isCompatible = 'incompatible';
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

    // Arătăm un mesaj de avertizare dacă dispozitivul nu este compatibil
    if (result.isCompatible === 'incompatible') {
      toast({
        title: "Dispozitiv incompatibil cu Tap to Pay",
        description: "Aplicația necesită un iPhone cu iOS 16+ pentru a utiliza Tap to Pay. Vă rugăm să folosiți un dispozitiv compatibil.",
        variant: "destructive",
      });
    }
  }, []);

  return compatibility;
};
