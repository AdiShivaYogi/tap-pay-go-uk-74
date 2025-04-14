
import { ReactNode } from 'react';
import { 
  ShieldCheck, Info, ClockIcon, 
  Shield, BarChart4, TestTube2,
  Check, AlertCircle, FileText,
  Banknote, Smartphone, Globe,
  Users, Webhook, Database,
  Cloud, ServerCrash, Server, 
  ServerCog, CloudCog
} from 'lucide-react';
import { IconType } from '../types';

interface RoadmapIconProps {
  iconType?: IconType;
  iconColor?: string;
}

export const RoadmapIcon = ({ iconType, iconColor = "text-gray-500" }: RoadmapIconProps): ReactNode => {
  if (!iconType) return null;

  const iconProps = {
    className: `h-5 w-5 ${iconColor}`
  };

  switch (iconType) {
    case "shield-check":
      return <ShieldCheck {...iconProps} />;
    case "info":
      return <Info {...iconProps} />;
    case "clock":
      return <ClockIcon {...iconProps} />;
    case "shield":
      return <Shield {...iconProps} />;
    case "bar-chart-4":
      return <BarChart4 {...iconProps} />;
    case "test-tube-2":
      return <TestTube2 {...iconProps} />;
    case "check":
      return <Check {...iconProps} />;
    case "alert-circle":
      return <AlertCircle {...iconProps} />;
    case "file-text":
      return <FileText {...iconProps} />;
    case "banknote":
      return <Banknote {...iconProps} />;
    case "smartphone":
      return <Smartphone {...iconProps} />;
    case "globe":
      return <Globe {...iconProps} />;
    case "users":
      return <Users {...iconProps} />;
    case "webhook":
      return <Webhook {...iconProps} />;
    case "database":
      return <Database {...iconProps} />;
    case "cloud":
      return <Cloud {...iconProps} />;
    case "server-crash":
      return <ServerCrash {...iconProps} />;
    case "server":
      return <Server {...iconProps} />;
    case "server-cog":
      return <ServerCog {...iconProps} />;
    case "cloud-cog":
      return <CloudCog {...iconProps} />;
    default:
      return null;
  }
};
