import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Shield, CheckCircle2, AlertTriangle, RefreshCw, Lock, ServerCog } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { MFASetupDialog } from "./MFASetupDialog";
import { StyledCard } from "@/components/ui/card-variants";

export const SecuritySettings = () => {
  const { user } = useAuth();
  const [isMFADialogOpen, setIsMFADialogOpen] = useState(false);
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);
  const [lastSecurityScan, setLastSecurityScan] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [vulnerabilitiesFound, setVulnerabilitiesFound] = useState<string[]>([]);
  const [lastDependencyCheck, setLastDependencyCheck] = useState<string | null>(null);

  const runSecurityScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setLastSecurityScan(new Date().toLocaleString());
      const mockVulnerabilities: string[] = [];
      setVulnerabilitiesFound(mockVulnerabilities);
      
      toast({
        title: mockVulnerabilities.length ? "Vulnerabilități găsite" : "Scanare completă",
        description: mockVulnerabilities.length 
          ? `S-au găsit ${mockVulnerabilities.length} vulnerabilități.`
          : "Nu au fost găsite vulnerabilități.",
      });
      setIsScanning(false);
    }, 2000);
  };

  const checkDependencies = () => {
    setLastDependencyCheck(new Date().toLocaleString());
    toast({
      title: "Verificare dependențe",
      description: "Toate dependențele sunt la zi.",
    });
  };

  const toggleMFA = () => {
    if (!isMFAEnabled) {
      setIsMFADialogOpen(true);
    } else {
      toast({
        title: "MFA dezactivat",
        description: "Autentificarea multi-factor a fost dezactivată.",
      });
      setIsMFAEnabled(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <StyledCard variant="gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Setări de Securitate Backend
            </CardTitle>
            <CardDescription>
              Gestionați setările de securitate pentru backend și infrastructură
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Autentificare Multi-Factor (MFA)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isMFAEnabled 
                      ? "MFA este activat. Contul dvs. este protejat cu un nivel suplimentar de securitate."
                      : "Adăugați un nivel suplimentar de securitate prin verificarea identității la fiecare autentificare."}
                  </p>
                </div>
                <Button
                  variant={isMFAEnabled ? "destructive" : "default"}
                  onClick={toggleMFA}
                >
                  {isMFAEnabled ? "Dezactivează" : "Activează"}
                </Button>
              </div>
              {isMFAEnabled && (
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  MFA activat pe {user?.email}
                </div>
              )}
            </div>
            
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-medium flex items-center gap-2">
                    <ServerCog className="h-4 w-4" />
                    Scanare de Securitate Backend
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Verificați serverul și infrastructura pentru vulnerabilități.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={checkDependencies}
                  >
                    Verifică Dependențe
                  </Button>
                  <Button
                    variant="default"
                    onClick={runSecurityScan}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Scanare...
                      </>
                    ) : (
                      "Scanează Infrastructura"
                    )}
                  </Button>
                </div>
              </div>
              {lastSecurityScan && (
                <div className="mt-4 text-xs text-muted-foreground">
                  Ultima scanare de securitate: {lastSecurityScan}
                </div>
              )}
              {lastDependencyCheck && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Ultima verificare a dependențelor: {lastDependencyCheck}
                </div>
              )}
              {vulnerabilitiesFound.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                  <h4 className="text-sm font-medium text-red-800">Vulnerabilități Detectate:</h4>
                  <ul className="mt-2 space-y-1">
                    {vulnerabilitiesFound.map((vuln, idx) => (
                      <li key={idx} className="text-sm text-red-600">• {vuln}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </StyledCard>
      </div>

      {user && (
        <MFASetupDialog
          open={isMFADialogOpen}
          onOpenChange={setIsMFADialogOpen}
          userId={user.id}
        />
      )}
    </>
  );
};
