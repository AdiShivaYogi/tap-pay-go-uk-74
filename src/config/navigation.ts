
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  Book, 
  Bot, 
  Activity,
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

export interface NavigationItem {
  title: string;
  href: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  admin?: boolean;
}

// For backward compatibility until all files are updated
export const NAVIGATION: any[] = [];

export const config = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      admin: true,
    },
    {
      title: "Profil",
      href: "/profile",
      icon: User,
    },
    {
      title: "Roadmap",
      href: "/roadmap",
      icon: Book,
    },
    {
      title: "Agenți",
      href: "/agents",
      icon: Bot,
    },
    {
      title: "Administrare Agenți",
      href: "/agent-admin",
      icon: Settings,
      admin: true,
    },
    {
      title: "Monitorizare Agenți",
      href: "/agent-monitoring",
      icon: Activity,
      admin: true,
    },
  ],
};
