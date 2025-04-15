
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { ResetPasswordForm } from "@/components/admin-auth/ResetPasswordForm";
import { AuthRedirectHandler } from "@/features/auth/components/AuthRedirectHandler";
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { isLoading, errorMessage, handleSubmit, setErrorMessage } = useAuthSubmit();

  useEffect(() => {
    if (user) {
      navigate('/roadmap');
    }
  }, [user, navigate]);

  useEffect(() => {
    setErrorMessage(undefined);
  }, [isLoginMode, isResetMode, setErrorMessage]);

  const handleResetPassword = async ({ email }: { email: string }) => {
    try {
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
    }
  };

  return (
    <Layout>
      <AuthRedirectHandler locationHash={location.hash} setIsLoading={() => {}} />
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
            {isResetMode ? (
              <ResetPasswordForm
                onSubmit={handleResetPassword}
                onCancel={() => setIsResetMode(false)}
                isLoading={isLoading}
              />
            ) : (
              <>
                <AuthForm
                  isLoginMode={isLoginMode}
                  onSubmit={(values) => handleSubmit(values, isLoginMode)}
                  isLoading={isLoading}
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
