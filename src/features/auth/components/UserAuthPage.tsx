
import { Layout } from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { AuthRedirectHandler } from "@/features/auth/components/AuthRedirectHandler";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { AuthHeader } from "./auth-ui/AuthHeader";
import { AuthAlert } from "./auth-ui/AuthAlert";
import { AuthContent } from "./auth-ui/AuthContent";

const UserAuthPage = () => {
  const {
    isLoginMode,
    isResetMode,
    isUpdatePasswordMode,
    setIsLoginMode,
    setIsResetMode,
    setIsUpdatePasswordMode,
    cardTitle,
    cardDescription,
    location,
    navigate,
    accessToken
  } = useAuthState();

  console.log("Current auth state:", { 
    isLoginMode, 
    isResetMode,
    isUpdatePasswordMode,
    accessToken: !!accessToken
  });

  return (
    <Layout>
      <AuthRedirectHandler locationHash={location.hash} />
      <div className="container max-w-md py-8">
        <Card>
          <AuthHeader title={cardTitle} description={cardDescription} />
          <CardContent>
            {location.hash && location.hash.includes("error") && (
              <AuthAlert
                title="Eroare la procesarea linkului"
                description="Linkul de resetare a expirat sau nu este valid. Vă rugăm să solicitați un nou link de resetare."
              />
            )}
            
            {isUpdatePasswordMode && !accessToken && (
              <AuthAlert
                title="Eroare de securitate"
                description="Lipsește token-ul de autentificare. Vă rugăm să solicitați un nou link de resetare a parolei."
              />
            )}
            
            <AuthContent
              isLoginMode={isLoginMode}
              isResetMode={isResetMode}
              isUpdatePasswordMode={isUpdatePasswordMode}
              accessToken={accessToken}
              onToggleMode={() => setIsLoginMode(!isLoginMode)}
              onResetPassword={() => setIsResetMode(true)}
              onCancelReset={() => setIsResetMode(false)}
              onCancelUpdatePassword={() => {
                setIsUpdatePasswordMode(false);
                setIsLoginMode(true);
                navigate("/auth", { replace: true });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserAuthPage;
