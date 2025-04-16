
import React from 'react';
import { 
  Code, Lock, CreditCard, Activity, Server, Layout, 
  Settings, Layers, Package, Users, CheckCircle, Search, Zap
} from "lucide-react";
import { RoadmapIconType } from '../types';

export interface RoadmapIconProps {
  type: RoadmapIconType;
  color: string;
}

export const RoadmapIcon: React.FC<RoadmapIconProps> = ({ type, color }) => {
  const iconProps = {
    className: `h-5 w-5 ${color}`,
  };

  switch (type) {
    case "code":
      return <Code {...iconProps} />;
    case "security":
      return <Lock {...iconProps} />;
    case "payment":
      return <CreditCard {...iconProps} />;
    case "monitoring":
      return <Activity {...iconProps} />;
    case "infrastructure":
      return <Server {...iconProps} />;
    case "ui":
      return <Layout {...iconProps} />;
    case "settings":
      return <Settings {...iconProps} />;
    case "integration":
      return <Layers {...iconProps} />;
    case "product":
      return <Package {...iconProps} />;
    case "partnership":
      return <Users {...iconProps} />;
    case "check":
      return <CheckCircle {...iconProps} />;
    case "search":
      return <Search {...iconProps} />;
    case "zap":
      return <Zap {...iconProps} />;
    case "banknote":
      return <CreditCard {...iconProps} />;
    case "users":
      return <Users {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
};
