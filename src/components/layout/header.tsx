
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TapPayGoLogo } from "@/components/icons/logo";

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <TapPayGoLogo className="h-8 w-8 text-primary" />
            <span className="font-bold text-primary text-2xl">TapPayGo</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/pricing" className="text-sm font-medium text-foreground hover:text-primary/90">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground hover:text-primary/90">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/dashboard">
            <Button variant="default">Dashboard</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
