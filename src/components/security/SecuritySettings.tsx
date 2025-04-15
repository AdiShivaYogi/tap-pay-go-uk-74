
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Shield, CheckCircle2, AlertTriangle, RefreshCw, Lock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { MFASetupDialog } from "./MFASetupDialog";
import { StyledCard } from "@/components/ui/card-variants";

export const SecuritySettings = () => {
  const { user } = useAuth();
  const [isMFADialogOpen, setIsMFADialogOpen] = useState(false);
  const [isMFAEnabled, setIsMFAEnabled] = useState(false);
  const [lastSecurityScan, setLastSecurityScan] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const runSecurityScan = () => {
    setIsScanning(true);
    
    // Simulate a security scan
    setTimeout(() => {
      setLastSecurityScan(new Date().toLocaleString());
      toast({
        title: "Scanare completă",
        description: "Nu au fost găsite vulnerabilități.",
      });
      setIsScanning(false);
    }, 2000);
  };

  const toggleMFA = () => {
    if (!isMFAEnabled) {
      setIsMFADialogOpen(true);
    } else {
      // Here you would disable MFA in a real implementation
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
              Setări de Securitate
            </CardTitle>
            <CardDescription>
              Gestionați setările de securitate pentru contul dvs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* MFA Section */}
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
            
            {/* Security Scan Section */}
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-base font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Scanare de Securitate
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Verificați contul dvs. pentru probleme de securitate și vulnerabilități.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={runSecurityScan}
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Scanare...
                    </>
                  ) : (
                    "Scanează acum"
                  )}
                </Button>
              </div>
              {lastSecurityScan && (
                <div className="mt-4 text-xs text-muted-foreground">
                  Ultima scanare: {lastSecurityScan}
                </div>
              )}
            </div>
          </CardContent>
        </StyledCard>
      </div>

      {user && (
        <MFASetupDialog
          open={isMFADialogOpen}
          onOpenChange={(open) => {
            setIsMFADialogOpen(open);
            if (!open) {
              // If the dialog was closed after successful setup
              // This would be properly checked in a real implementation
              if (isMFAEnabled) {
                toast({
                  title: "MFA activat",
                  description: "Autentificarea multi-factor este acum activă.",
                });
              }
            }
          }}
          userId={user.id}
        />
      )}
    </>
  );
};
