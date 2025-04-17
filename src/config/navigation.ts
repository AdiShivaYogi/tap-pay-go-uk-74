
import { 
  LayoutDashboard, 
  Settings, 
  User, 
  Book, 
  Bot, 
  Command,
  Info,
  CreditCard,
  FileText,
  Shield,
  HelpCircle,
  Home,
  BrainCircuit
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

export interface NavigationItem {
  title: string;
  href: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  admin?: boolean;
  highlight?: boolean;
  newUser?: boolean; // Flag pentru a marca elementele destinate noilor utilizatori
}

// Pentru compatibilitate cu codul existent până când toate fișierele sunt actualizate
export const NAVIGATION: NavigationItem[] = [];

export const config = {
  mainNav: [
    {
      title: "Acasă",
      href: "/",
      icon: Home,
      newUser: true
    },
    {
      title: "Despre Noi",
      href: "/about",
      icon: Info,
      newUser: true
    },
    {
      title: "Prețuri",
      href: "/pricing",
      icon: CreditCard,
      newUser: true
    },
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
      icon: BrainCircuit,
      admin: true,
      highlight: true,
    },
  ],
  
  // Adăugăm o secțiune dedicată pentru linkuri footer importante
  footerNav: [
    {
      title: "Termeni și Condiții",
      href: "/terms",
      icon: FileText,
      newUser: true
    },
    {
      title: "Confidențialitate",
      href: "/privacy",
      icon: Shield,
      newUser: true
    },
    {
      title: "Ajutor",
      href: "/help",
      icon: HelpCircle,
      newUser: true
    }
  ]
};
