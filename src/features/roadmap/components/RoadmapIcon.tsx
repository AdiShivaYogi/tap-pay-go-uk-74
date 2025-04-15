import React from "react";
import { 
  ShieldCheck, FileCheck, MessagesSquare, Server, 
  BarChart2, Layers, UserCheck, BellRing, Lock,
  Webhook, Globe, Users, Code
} from "lucide-react";

export type IconType = 
  "security" | "documentation" | "communication" | "infrastructure" | 
  "analytics" | "architecture" | "permissions" | "notifications" | "encryption" |
  "webhook" | "globe" | "users" | "api";

interface RoadmapIconProps {
  type: IconType;
  className?: string;
  color?: string;
}

export const RoadmapIcon: React.FC<RoadmapIconProps> = ({ 
  type, 
  className = "h-5 w-5", 
  color = "text-primary" 
}) => {
  switch(type) {
    case "security":
      return <ShieldCheck className={`${className} ${color}`} />;
    case "documentation":
      return <FileCheck className={`${className} ${color}`} />;
    case "communication":
      return <MessagesSquare className={`${className} ${color}`} />;
    case "infrastructure":
      return <Server className={`${className} ${color}`} />;
    case "analytics":
      return <BarChart2 className={`${className} ${color}`} />;
    case "architecture":
      return <Layers className={`${className} ${color}`} />;
    case "permissions":
      return <UserCheck className={`${className} ${color}`} />;
    case "notifications":
      return <BellRing className={`${className} ${color}`} />;
    case "encryption":
      return <Lock className={`${className} ${color}`} />;
    case "webhook":
      return <Webhook className={`${className} ${color}`} />;
    case "globe":
      return <Globe className={`${className} ${color}`} />;
    case "users":
      return <Users className={`${className} ${color}`} />;
    case "api":
      return <Code className={`${className} ${color}`} />;
    default:
      return <FileCheck className={`${className} ${color}`} />;
  }
};
