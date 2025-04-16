
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
import { SecurityAlert } from "@/components/security/SecurityAlert";
import { Info, AlertTriangle } from "lucide-react";

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isUpdatePasswordMode, setIsUpdatePasswordMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { isLoading, errorMessage, handleSubmit, setErrorMessage } = useAuthSubmit();
  const [localLoading, setLocalLoading] = useState(false);
  const resetRequested = searchParams.get("reset") === "true";
  const updatePasswordRequested = searchParams.get("mode") === "update_password";
  const accessToken = location.state?.accessToken;

  useEffect(() => {
    // Detectăm dacă utilizatorul vine dintr-un link de resetare parolă
    if (updatePasswordRequested) {
      setIsUpdatePasswordMode(true);
      setIsResetMode(false);
      setIsLoginMode(false);
      console.log("Update password mode activated, access token available:", !!accessToken);
    } else if (resetRequested) {
      toast({
        title: "Email confirmat",
        description: "Acum puteți configura o nouă parolă",
      });
    }
  }, [updatePasswordRequested, resetRequested, accessToken]);

  useEffect(() => {
    if (user) {
      console.log("User detected in UserAuth, redirecting to roadmap");
      navigate('/roadmap');
    }
  }, [user, navigate]);

  useEffect(() => {
    setErrorMessage(undefined);
  }, [isLoginMode, isResetMode, isUpdatePasswordMode, setErrorMessage]);

  const handleResetPassword = async ({ email }: { email: string }) => {
    try {
      setLocalLoading(true);
      setErrorMessage(undefined);
      
      // Utilizăm URL-ul curent al aplicației pentru redirecționare
      const currentUrl = window.location.origin;
      
      console.log(`Sending password reset email with redirect URL: ${currentUrl}/auth?reset=true`);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${currentUrl}/auth?reset=true`,
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

  const handleUpdatePassword = async ({ password }: { password: string, confirmPassword: string }) => {
    try {
      setLocalLoading(true);
      setErrorMessage(undefined);
      
      if (!accessToken) {
        throw new Error("Lipsește token-ul de acces pentru resetarea parolei");
      }
      
      console.log("Updating password with access token");
      
      const { error } = await supabase.auth.updateUser({ 
        password: password
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Parolă actualizată",
        description: "Parola dvs. a fost actualizată cu succes. Acum vă puteți autentifica.",
        variant: "default"
      });
      
      // Redirecționează către pagina de autentificare
      setIsUpdatePasswordMode(false);
      setIsLoginMode(true);
      
      // Elimină parametrii din URL pentru a evita confuzii
      navigate("/auth", { replace: true });
      
    } catch (error: any) {
      console.error("Eroare la actualizarea parolei:", error);
      setErrorMessage(error.message || "A apărut o eroare la actualizarea parolei");
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la actualizarea parolei",
        variant: "destructive",
      });
    } finally {
      setLocalLoading(false);
    }
  };

  // Determină titlul și descrierea cardului în funcție de modul curent
  let cardTitle = "Autentificare";
  let cardDescription = "Autentificați-vă în contul dvs.";
  
  if (isUpdatePasswordMode) {
    cardTitle = "Setare parolă nouă";
    cardDescription = "Creați o nouă parolă pentru contul dvs.";
  } else if (isResetMode) {
    cardTitle = "Resetare parolă";
    cardDescription = "Introduceți adresa de email pentru a reseta parola";
  } else if (!isLoginMode) {
    cardTitle = "Înregistrare Admin";
    cardDescription = "Creați un cont de administrator";
  }

  console.log("Current auth state:", { 
    isLoginMode, 
    isResetMode,
    isUpdatePasswordMode,
    isLoading, 
    localLoading, 
    user: user?.email,
    accessToken: !!accessToken
  });

  return (
    <Layout>
      <AuthRedirectHandler locationHash={location.hash} setIsLoading={setLocalLoading} />
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            {location.hash && location.hash.includes("error") && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Eroare la procesarea linkului</AlertTitle>
                <AlertDescription>
                  Linkul de resetare a expirat sau nu este valid. Vă rugăm să solicitați un nou link de resetare.
                </AlertDescription>
              </Alert>
            )}
            
            {isUpdatePasswordMode && !accessToken && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Eroare de securitate</AlertTitle>
                <AlertDescription>
                  Lipsește token-ul de autentificare. Vă rugăm să solicitați un nou link de resetare a parolei.
                </AlertDescription>
              </Alert>
            )}
            
            {isUpdatePasswordMode && accessToken ? (
              <ResetPasswordForm
                mode="update"
                accessToken={accessToken}
                onSubmit={handleUpdatePassword}
                onCancel={() => {
                  setIsUpdatePasswordMode(false);
                  setIsLoginMode(true);
                  navigate("/auth", { replace: true });
                }}
                isLoading={localLoading || isLoading}
              />
            ) : isResetMode ? (
              <ResetPasswordForm
                mode="request"
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
            
            {isLoginMode && !isResetMode && !isUpdatePasswordMode && (
              <div className="mt-6">
                <SecurityAlert />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserAuth;
