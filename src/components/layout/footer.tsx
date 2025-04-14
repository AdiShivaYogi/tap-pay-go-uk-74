
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, MessageCircle, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-primary text-xl">TapPayGo</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Transformăm orice telefon într-un terminal de plată sigur și eficient pentru afacerea ta.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:contact@tappaygo.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Link-uri Rapide</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                Despre Noi
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Prețuri
              </Link>
              <Link to="/roadmap" className="text-sm text-muted-foreground hover:text-foreground">
                Roadmap
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Legal</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Termeni și Condiții
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Politica de Confidențialitate
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-medium text-base">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>Suport Live Chat</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+40 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>București, România</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TapPayGo. Toate drepturile rezervate.</p>
          <p>Făcut cu ❤️ în România</p>
        </div>
      </div>
    </footer>
  );
}
