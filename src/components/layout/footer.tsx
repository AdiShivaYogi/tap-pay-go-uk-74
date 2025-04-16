
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useUserRole } from "@/hooks/use-user-role";
import { Mail, Github, Linkedin, MessageCircle, Phone, MapPin, Heart, CreditCard, HelpCircle, Shield, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();

  // Link-uri diferite în funcție de rolul utilizatorului
  const getFooterLinks = () => {
    // Link-uri comune pentru toți
    const commonLinks = [
      { to: "/about", label: "Despre Noi" },
      { to: "/pricing", label: "Prețuri" }
    ];
    
    // Link-uri pentru utilizatori autentificați
    const authLinks = [
      { to: "/help", label: "Ajutor" },
      { to: "/account", label: "Contul meu" }
    ];
    
    // Link-uri pentru admin
    const adminLinks = [
      { to: "/admin", label: "Admin" },
      { to: "/roadmap", label: "Plan de dezvoltare" },
      { to: "/api", label: "API" }
    ];
    
    // Returnăm link-urile corespunzătoare
    if (isAdmin) {
      return [...commonLinks, ...authLinks, ...adminLinks];
    } else if (user) {
      return [...commonLinks, ...authLinks];
    } else {
      return [...commonLinks, { to: "/auth", label: "Autentificare" }];
    }
  };

  // Componente de acțiune pentru footer, în funcție de tipul utilizatorului
  const getFooterAction = () => {
    if (!user) {
      return (
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Link to="/auth">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Autentificare
            </Button>
          </Link>
          <Link to="/connect-stripe">
            <Button variant="default" size="sm" className="w-full sm:w-auto">
              <CreditCard className="mr-2 h-4 w-4" />
              Începe să primești plăți
            </Button>
          </Link>
        </div>
      );
    } else if (!user.stripeConnected) {
      return (
        <div className="mt-4">
          <Link to="/connect-stripe">
            <Button variant="default" size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Conectează Stripe
            </Button>
          </Link>
        </div>
      );
    }
    
    return null;
  };

  return (
    <footer className="w-full border-t bg-background/90 backdrop-blur-sm">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-primary text-xl">TapPayGo</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transformăm orice dispozitiv mobil într-un terminal de plată sigur și eficient pentru business-uri.
            </p>
            <div className="flex space-x-4">
              <a 
                href="mailto:contact@tappaygo.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/tappaygo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/tappaygo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            {/* Acțiune footer */}
            {getFooterAction()}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-base text-foreground">Link-uri Rapide</h4>
            <nav className="flex flex-col space-y-2">
              {getFooterLinks().map((link, index) => (
                <Link 
                  key={index}
                  to={link.to} 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Resurse */}
          <div className="space-y-4">
            <h4 className="font-medium text-base text-foreground">Resurse</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                <FileText className="h-3.5 w-3.5 mr-2" />
                Termeni și Condiții
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                <Shield className="h-3.5 w-3.5 mr-2" />
                Politică de Confidențialitate
              </Link>
              <Link 
                to="/help" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
              >
                <HelpCircle className="h-3.5 w-3.5 mr-2" />
                Întrebări Frecvente
              </Link>
              {user && (
                <a 
                  href="https://stripe.com/docs" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                >
                  <CreditCard className="h-3.5 w-3.5 mr-2" />
                  Documentație Stripe
                </a>
              )}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-base text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span>Suport Live Chat</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Londra, Regatul Unit</span>
              </div>
              {isAdmin && (
                <div className="pt-2">
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Panoul Admin
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="flex items-center">
            &copy; {new Date().getFullYear()} TapPayGo. Toate drepturile rezervate.
          </p>
          <p className="flex items-center">
            Realizat cu <Heart className="h-4 w-4 text-red-500 mx-1" fill="#ef4444" /> în Marea Britanie
          </p>
        </div>
      </div>
    </footer>
  );
}
