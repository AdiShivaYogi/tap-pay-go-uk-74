
import React from "react";
import { AlertTriangle, BadgeInfo } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GodModeAlertsProps {
  isGodModeEnabled: boolean;
}

export const GodModeAlerts = ({ isGodModeEnabled }: GodModeAlertsProps) => {
  return (
    <>
      {isGodModeEnabled && (
        <Alert variant="default" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            God Mode este activ! Toate propunerile pentru care generezi feedback vor fi aprobate automat.
          </AlertDescription>
        </Alert>
      )}
      
      {!isGodModeEnabled && (
        <Alert variant="default" className="mb-4">
          <BadgeInfo className="h-4 w-4" />
          <AlertDescription>
            God Mode este inactiv. Propunerile vor primi feedback pentru îmbunătățire, dar vor necesita aprobare manuală.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
