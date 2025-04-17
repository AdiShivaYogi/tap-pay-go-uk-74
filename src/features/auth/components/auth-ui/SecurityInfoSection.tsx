
import { Shield, Info } from "lucide-react";

export const SecurityInfoSection = () => {
  return (
    <div className="mt-6 p-4 bg-primary-foreground/50 border border-primary/10 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Informații de securitate</h3>
      </div>
      
      <div className="text-xs space-y-1 text-muted-foreground">
        <p className="flex items-start gap-1">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>Dacă întâmpinați probleme la autentificare, verificați corectitudinea datelor introduse.</span>
        </p>
        <p className="flex items-start gap-1">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>Pentru utilizatorii noi, trebuie să creați un cont folosind codul de invitație.</span>
        </p>
        <p className="flex items-start gap-1">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>După 5 încercări eșuate, contul va fi blocat temporar pentru 15 minute.</span>
        </p>
      </div>
    </div>
  );
};
