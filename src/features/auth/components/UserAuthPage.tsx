
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { AuthRedirectHandler } from "@/features/auth/components/AuthRedirectHandler";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { AuthFormContainer } from "@/features/auth/components/AuthFormContainer";
import { SecurityAlert } from "@/components/security/SecurityAlert";
import { ResetPasswordContainer } from "@/features/auth/components/ResetPasswordContainer";

const UserAuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isUpdatePasswordMode, setIsUpdatePasswordMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
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
      // Reset mode handling will be done in ResetPasswordContainer
    }
  }, [updatePasswordRequested, resetRequested, accessToken]);

  useEffect(() => {
    if (user) {
      console.log("User detected in UserAuth, redirecting to roadmap");
      navigate('/roadmap');
    }
  }, [user, navigate]);

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
    user: user?.email,
    accessToken: !!accessToken
  });

  return (
    <Layout>
      <AuthRedirectHandler locationHash={location.hash} />
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
              <ResetPasswordContainer 
                mode="update"
                accessToken={accessToken}
                onCancel={() => {
                  setIsUpdatePasswordMode(false);
                  setIsLoginMode(true);
                  navigate("/auth", { replace: true });
                }}
              />
            ) : isResetMode ? (
              <ResetPasswordContainer
                mode="request"
                onCancel={() => setIsResetMode(false)}
              />
            ) : (
              <AuthFormContainer
                isLoginMode={isLoginMode}
                onToggleMode={() => setIsLoginMode(!isLoginMode)}
                onResetPassword={() => setIsResetMode(true)}
              />
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

export default UserAuthPage;
