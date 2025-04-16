
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
  Database,
  Languages,
  CreditCard,
  BarChart,
  HelpCircle,
  Settings,
  Zap,
  UserPlus,
  Terminal,
  Lock
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
  userOnly?: boolean;
  priority?: number; // Element utilizat pentru ordonare
  category?: 'primary' | 'secondary' | 'utility'; // Categorie pentru grupare
}

// Gruparea link-urilor pe categorii pentru o experiență de navigare îmbunătățită
export const NAVIGATION: NavigationItem[] = [
  // Link-uri principale pentru vizitatori neautentificați
  { href: "/", label: "Acasă", icon: Home, hideWhenAuth: true, priority: 100, category: 'primary' },
  
  // Link-uri principale pentru utilizatori autentificați
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, showWhenAuth: true, priority: 100, category: 'primary' },
  { href: "/payments", label: "Plăți", icon: CreditCard, showWhenAuth: true, userOnly: true, priority: 90, category: 'primary' },
  { href: "/reports", label: "Rapoarte", icon: FileText, showWhenAuth: true, priority: 80, category: 'primary' },
  { href: "/statistics", label: "Statistici", icon: BarChart, showWhenAuth: true, userOnly: true, priority: 70, category: 'primary' },
  
  // Link-uri pentru administrare
  { href: "/admin", label: "Admin", icon: Lock, adminOnly: true, priority: 100, category: 'secondary' },
  { href: "/roadmap", label: "Roadmap", icon: Map, adminOnly: true, priority: 90, category: 'secondary' },
  { href: "/api", label: "API", icon: FileCode, adminOnly: true, priority: 80, category: 'secondary' },
  { href: "/backups", label: "Backups", icon: Database, adminOnly: true, priority: 70, category: 'secondary' },
  { href: "/translations", label: "Traduceri", icon: Languages, adminOnly: true, priority: 60, category: 'secondary' },
  
  // Link-uri utilitare pentru toți utilizatorii
  { href: "/help", label: "Ajutor", icon: HelpCircle, userOnly: true, priority: 40, category: 'utility' },
  { href: "/pricing", label: "Prețuri", icon: DollarSign, priority: 30, category: 'utility' },
  { href: "/about", label: "Despre", icon: Info, priority: 20, category: 'utility' },
  { 
    href: "/account", 
    label: "Cont", 
    icon: CircleUserRound, 
    showWhenAuth: true,
    priority: 10,
    category: 'utility'
  },
  {
    href: "/connect-stripe",
    label: "Conectare Stripe",
    icon: Zap,
    showWhenAuth: true,
    userOnly: true,
    priority: 5,
    category: 'utility'
  }
];

// Funcție pentru obținerea link-urilor sortate după prioritate
export const getSortedNavigation = () => {
  return [...NAVIGATION].sort((a, b) => {
    return (b.priority || 0) - (a.priority || 0);
  });
};

// Funcție pentru obținerea link-urilor grupate pe categorii
export const getGroupedNavigation = () => {
  const primary = NAVIGATION.filter(item => item.category === 'primary');
  const secondary = NAVIGATION.filter(item => item.category === 'secondary');
  const utility = NAVIGATION.filter(item => item.category === 'utility');
  
  return {
    primary: primary.sort((a, b) => (b.priority || 0) - (a.priority || 0)),
    secondary: secondary.sort((a, b) => (b.priority || 0) - (a.priority || 0)),
    utility: utility.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  };
};
