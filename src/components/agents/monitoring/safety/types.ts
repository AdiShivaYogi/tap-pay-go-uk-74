
import { ReactNode } from "react";

export type RiskLevel = "scazut" | "mediu" | "ridicat";

export interface SafetySystem {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface AutoExecSystem {
  id: string;
  name: string;
  status: "activ" | "inactiv";
  healthScore: number;
}

export interface SafetyPolicy {
  name: string;
  status: "activă" | "inactivă";
}

export interface DataConnection {
  name: string;
  description: string;
  isConnected: boolean;
}

export interface MonitoringParameter {
  name: string;
  description: string;
  isEnabled: boolean;
}

export interface ImplementationProgress {
  name: string;
  progress: number;
}
