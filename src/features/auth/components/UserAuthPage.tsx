
import { Layout } from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { AuthRedirectHandler } from "@/features/auth/components/AuthRedirectHandler";
import { useAuthState } from "@/features/auth/hooks/useAuthState";
import { AuthHeader } from "./auth-ui/AuthHeader";
import { AuthAlert } from "./auth-ui/AuthAlert";
import { AuthContent } from "./auth-ui/AuthContent";
import { Section, PageHeader } from "@/components/ui/themed-components";
import { LogIn } from "lucide-react";

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

  return (
    <Layout>
      <AuthRedirectHandler locationHash={location.hash} />
      <Section>
        <div className="container max-w-md">
          <PageHeader 
            icon={LogIn}
            title="Autentificare"
            description="Conectează-te pentru a accesa toate funcționalitățile"
            gradient={true}
          />
          
          <Card className="border-primary/10 shadow-lg">
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
      </Section>
    </Layout>
  );
};

export default UserAuthPage;
