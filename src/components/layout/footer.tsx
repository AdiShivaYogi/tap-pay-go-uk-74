
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-primary text-xl">TapPayGo</h3>
          <p className="text-sm text-muted-foreground">
            Accept contactless payments with your phone
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-sm">Company</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-sm">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="container border-t py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} TapPayGo. All rights reserved.
      </div>
    </footer>
  );
}
