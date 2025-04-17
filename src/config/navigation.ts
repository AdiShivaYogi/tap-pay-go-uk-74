import { 
  LayoutDashboard, 
  Settings, 
  User, 
  Book, 
  Bot, 
  Activity,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  admin?: boolean;
}

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
