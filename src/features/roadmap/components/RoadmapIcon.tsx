
import React from "react";
import { 
  ShieldCheck, FileCheck, MessagesSquare, Server, 
  BarChart2, Layers, UserCheck, BellRing, Lock,
  Webhook, Globe, Users, Code, CreditCard, 
  Activity, GitMerge, LayoutDashboard,
  FileCode2
} from "lucide-react";

// Update the IconType to include all the values used in the data files
export type IconType = 
  "security" | "documentation" | "communication" | "infrastructure" | 
  "analytics" | "architecture" | "permissions" | "notifications" | "encryption" |
  "webhook" | "globe" | "users" | "api" |
  "shield-check" | "info" | "clock" | "shield" | "bar-chart-4" | 
  "test-tube-2" | "check" | "alert-circle" | "file-text" | "banknote" | 
  "smartphone" | "database" | "cloud" | "server-crash" | "server" | 
  "server-cog" | "cloud-cog" | "network" | 
  "git-merge" | "activity" | "credit-card" | "layout-dashboard" |
  "file-code-2" | "messages-square";

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
    case "shield-check":
      return <ShieldCheck className={`${className} ${color}`} />;
    case "shield":
      return <ShieldCheck className={`${className} ${color}`} />;
    case "file-text":
      return <FileCheck className={`${className} ${color}`} />;
    case "bar-chart-4":
      return <BarChart2 className={`${className} ${color}`} />;
    case "check":
      return <CheckIcon className={`${className} ${color}`} />;
    case "banknote":
      return <BanknoteIcon className={`${className} ${color}`} />;
    case "smartphone":
      return <SmartphoneIcon className={`${className} ${color}`} />;
    case "database":
      return <DatabaseIcon className={`${className} ${color}`} />;
    case "server-cog":
      return <ServerCogIcon className={`${className} ${color}`} />;
    case "cloud-cog":
      return <CloudCogIcon className={`${className} ${color}`} />;
    case "server-crash":
      return <ServerCrashIcon className={`${className} ${color}`} />;
    case "network":
      return <NetworkIcon className={`${className} ${color}`} />;
    case "test-tube-2":
      return <TestTubeIcon className={`${className} ${color}`} />;
    case "git-merge":
      return <GitMerge className={`${className} ${color}`} />;
    case "activity":
      return <Activity className={`${className} ${color}`} />;
    case "credit-card":
      return <CreditCard className={`${className} ${color}`} />;
    case "layout-dashboard":
      return <LayoutDashboard className={`${className} ${color}`} />;
    case "file-code-2":
      return <FileCode2 className={`${className} ${color}`} />;
    case "messages-square":
      return <MessagesSquare className={`${className} ${color}`} />;
    default:
      return <FileCheck className={`${className} ${color}`} />;
  }
};

import { 
  Check as CheckIcon,
  Banknote as BanknoteIcon,
  Smartphone as SmartphoneIcon,
  Database as DatabaseIcon,
  ServerCog as ServerCogIcon,
  CloudCog as CloudCogIcon,
  ServerCrash as ServerCrashIcon,
  Network as NetworkIcon,
  TestTube as TestTubeIcon
} from "lucide-react";

