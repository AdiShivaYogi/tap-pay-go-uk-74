
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  Map, 
  User, 
  DollarSign, 
  Info,
  CircleUserRound,
  FileCode,
  Database
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  moderatorOnly?: boolean;
  superAdminOnly?: boolean;
  hideWhenAuth?: boolean;
  showWhenAuth?: boolean;
}

export const NAVIGATION: NavigationItem[] = [
  { href: "/", label: "Acasă", icon: Home, hideWhenAuth: true },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, showWhenAuth: true },
  { href: "/reports", label: "Rapoarte", icon: FileText, showWhenAuth: true },
  { href: "/roadmap", label: "Roadmap", icon: Map, adminOnly: true },
  { href: "/admin", label: "Admin", icon: User, adminOnly: true },
  { href: "/api", label: "API", icon: FileCode, adminOnly: true },
  { href: "/backups", label: "Backups", icon: Database, adminOnly: true },
  { href: "/pricing", label: "Prețuri", icon: DollarSign },
  { href: "/about", label: "Despre", icon: Info },
  { 
    href: "/account", 
    label: "Cont", 
    icon: CircleUserRound, 
    showWhenAuth: true 
  },
];
