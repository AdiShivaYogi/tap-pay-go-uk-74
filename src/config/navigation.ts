
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  Book, 
  Bot, 
  Activity,
  Command
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

export interface NavigationItem {
  title: string;
  href: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  admin?: boolean;
}

// Pentru compatibilitate cu codul existent până când toate fișierele sunt actualizate
export const NAVIGATION: NavigationItem[] = [];

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
      title: "Management Agenți",
      href: "/agent-management",
      icon: Command,
      admin: true,
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
