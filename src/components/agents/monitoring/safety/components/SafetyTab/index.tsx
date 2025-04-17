
import React from "react";
import { SafetyMechanisms } from "./SafetyMechanisms";
import { SafetyOverride } from "./SafetyOverride";
import { EmergencyStop } from "./EmergencyStop";

interface SafetyTabProps {
  systemsActive: Record<string, boolean>;
  safetyOverride: boolean;
  handleToggleSystem: (system: string) => void;
  getSystemName: (system: string) => string;
  setSafetyOverride: (value: boolean) => void;
  handleEmergencyStop: () => void;
}

export const SafetyTab: React.FC<SafetyTabProps> = ({
  systemsActive,
  safetyOverride,
  handleToggleSystem,
  getSystemName,
  setSafetyOverride,
  handleEmergencyStop
}) => {
  return (
    <div className="space-y-4">
      <SafetyMechanisms 
        systemsActive={systemsActive}
        handleToggleSystem={handleToggleSystem}
        getSystemName={getSystemName}
      />
      
      <SafetyOverride 
        safetyOverride={safetyOverride}
        setSafetyOverride={setSafetyOverride}
      />
      
      <EmergencyStop handleEmergencyStop={handleEmergencyStop} />
    </div>
  );
};
