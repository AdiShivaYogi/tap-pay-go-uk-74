
import { ReactNode } from 'react';
import { 
  ShieldCheck, Info, ClockIcon, 
  Shield, BarChart4, TestTube2,
  Check, AlertCircle, FileText 
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
    default:
      return null;
  }
};
