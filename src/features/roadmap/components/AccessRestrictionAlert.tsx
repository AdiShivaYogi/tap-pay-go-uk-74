
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LockIcon } from "lucide-react";

interface AccessRestrictionAlertProps {
  role: string | null;
}

export const AccessRestrictionAlert = ({ role }: AccessRestrictionAlertProps) => (
  <div className="container py-12">
    <Alert variant="destructive" className="mb-6">
      <AlertTitle className="flex items-center gap-2">
        <LockIcon className="h-4 w-4" /> Acces restricționat
      </AlertTitle>
      <AlertDescription>
        <p className="mb-4">
          Această pagină necesită privilegii de administrator. Rolul tău actual: <strong>{role || 'user'}</strong>
        </p>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/">Înapoi la Pagina Principală</Link>
          </Button>
          <Button asChild>
            <Link to="/admin-auth">Autentificare administrator</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  </div>
);
