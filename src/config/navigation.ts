
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  Book, 
  Bot, 
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
      title: "Centru de Comandă Agenți",
      href: "/agent-central-command",
      icon: Command,
      admin: true,
      highlight: true, // Adăugăm această proprietate pentru a evidenția în UI
    },
  ],
};
