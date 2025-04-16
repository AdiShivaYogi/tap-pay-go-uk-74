
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LockIcon } from "lucide-react";

export const AccessRestrictionAlert = () => {
  return (
    <Alert variant="destructive">
      <AlertTitle className="flex items-center gap-2">
        <LockIcon className="h-4 w-4" /> Acces restricționat
      </AlertTitle>
      <AlertDescription>
        <p className="mb-4">
          Această pagină necesită privilegii de administrator. Contactați administratorul pentru acces.
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/">Înapoi la Pagina Principală</Link>
          </Button>
          <Button asChild>
            <Link to="/auth">Autentificare</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
