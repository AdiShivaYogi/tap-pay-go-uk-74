
import React from 'react';
import { Code, Database, Globe, Lock, Server, Settings, Share2, Shield, BarChart2, Layers } from "lucide-react";

export interface RoadmapIconProps {
  categoryType?: string;
  className?: string;
}

export const RoadmapIcon: React.FC<RoadmapIconProps> = ({ categoryType = 'default', className = 'h-4 w-4' }) => {
  const getIcon = () => {
    switch (categoryType.toLowerCase()) {
      case 'security':
        return <Shield className={className} />;
      case 'infrastructure':
        return <Server className={className} />;
      case 'product':
        return <Layers className={className} />;
      case 'integration':
        return <Share2 className={className} />;
      case 'devops':
        return <Settings className={className} />;
      case 'monitoring':
        return <BarChart2 className={className} />;
      case 'database':
        return <Database className={className} />;
      case 'ui':
        return <Layers className={className} />;
      case 'localization':
        return <Globe className={className} />;
      case 'payments':
        return <Database className={className} />;
      default:
        return <Code className={className} />;
    }
  };

  return getIcon();
};
