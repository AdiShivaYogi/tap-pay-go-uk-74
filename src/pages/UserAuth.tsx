
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { ResetPasswordForm } from "@/components/admin-auth/ResetPasswordForm";
import { AuthRedirectHandler } from "@/features/auth/components/AuthRedirectHandler";
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { isLoading, errorMessage, handleSubmit, setErrorMessage } = useAuthSubmit();
  const [localLoading, setLocalLoading] = useState(false);
  const resetRequested = searchParams.get("reset") === "true";

  useEffect(() => {
    if (resetRequested) {
      toast({
        title: "Email confirmat",
        description: "Acum puteți configura o nouă parolă",
      });
    }
  }, [resetRequested]);

  useEffect(() => {
    if (user) {
      console.log("User detected in UserAuth, redirecting to roadmap");
      navigate('/roadmap');
    }
  }, [user, navigate]);

  useEffect(() => {
    setErrorMessage(undefined);
  }, [isLoginMode, isResetMode, setErrorMessage]);

  const handleResetPassword = async ({ email }: { email: string }) => {
    try {
      setLocalLoading(true);
      setErrorMessage(undefined);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?reset=true`,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Email trimis",
        description: "Verificați email-ul pentru a reseta parola",
      });
      setIsResetMode(false);
    } catch (error: any) {
      console.error("Eroare la trimiterea emailului de resetare:", error);
      setErrorMessage(error.message || "A apărut o eroare la trimiterea emailului");
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la trimiterea emailului",
        variant: "destructive",
      });
    } finally {
      setLocalLoading(false);
    }
  };

  console.log("Current auth state:", { 
    isLoginMode, 
    isLoading, 
    localLoading, 
    user: user?.email 
  });

  return (
    <Layout>
      <AuthRedirectHandler locationHash={location.hash} setIsLoading={setLocalLoading} />
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {isResetMode 
                ? "Resetare parolă"
                : isLoginMode 
                  ? "Autentificare" 
                  : "Înregistrare Admin"}
            </CardTitle>
            <CardDescription>
              {isResetMode
                ? "Introduceți adresa de email pentru a reseta parola"
                : isLoginMode 
                  ? "Autentificați-vă în contul dvs." 
                  : "Creați un cont de administrator"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {location.hash && location.hash.includes("error") && (
              <Alert variant="destructive" className="mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Eroare la resetarea parolei</AlertTitle>
                <AlertDescription>
                  Linkul de resetare a expirat sau nu este valid. Vă rugăm să solicitați un nou link de resetare.
                </AlertDescription>
              </Alert>
            )}
            
            {isResetMode ? (
              <ResetPasswordForm
                onSubmit={handleResetPassword}
                onCancel={() => setIsResetMode(false)}
                isLoading={localLoading || isLoading}
              />
            ) : (
              <>
                <AuthForm
                  isLoginMode={isLoginMode}
                  onSubmit={(values) => handleSubmit(values, isLoginMode)}
                  isLoading={localLoading || isLoading}
                  errorMessage={errorMessage}
                />
                <AuthModeToggle
                  isLoginMode={isLoginMode}
                  onToggle={() => setIsLoginMode(!isLoginMode)}
                  onForgotPassword={() => setIsResetMode(true)}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserAuth;
