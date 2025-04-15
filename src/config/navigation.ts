
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  Map, 
  User, 
  DollarSign, 
  Info 
} from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  moderatorOnly?: boolean;
  superAdminOnly?: boolean; // Flag for pages that should only be visible to super admins
}

export const NAVIGATION: NavigationItem[] = [
  { href: "/", label: "Acasă", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/reports", label: "Rapoarte", icon: FileText },
  { href: "/roadmap", label: "Roadmap", icon: Map, adminOnly: true },
  { href: "/admin", label: "Admin", icon: User, adminOnly: true },
  { href: "/pricing", label: "Prețuri", icon: DollarSign },
  { href: "/about", label: "Despre", icon: Info },
];
