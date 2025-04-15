
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, MessageCircle, Phone, MapPin, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-primary text-xl">TapPayGo</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transforming every mobile device into a secure and efficient payment terminal for businesses.
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
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-base text-foreground">Descoperă</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/about" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Despre Noi
              </Link>
              <Link 
                to="/pricing" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Prețuri
              </Link>
              <Link 
                to="/roadmap" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Plan de dezvoltare
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-base text-foreground">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Termeni și Condiții
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Politică de Confidențialitate
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-base text-foreground">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>Suport Live Chat</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Londra, Regatul Unit</span>
              </div>
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
