import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { ResetPasswordForm } from "@/components/admin-auth/ResetPasswordForm";
import { AuthFormValues } from "@/components/admin-auth/auth-validation";

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/roadmap');
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (location.hash) {
        setIsLoading(true);
        
        try {
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            throw error;
          }
          
          if (data?.session) {
            toast({
              title: "Autentificare reușită",
              description: "Bine ați revenit!",
            });
            navigate("/roadmap");
          }
        } catch (error: any) {
          console.error("Eroare la procesarea redirecționării:", error);
          toast({
            title: "Eroare la autentificare",
            description: error.message || "A apărut o eroare la procesarea autentificării",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuthRedirect();
  }, [location.hash, navigate]);

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      const { email, password, inviteCode } = values;
      
      setIsLoading(true);
      console.log("Form submitted:", { email, isLoginMode, hasInviteCode: !!inviteCode });

      if (isLoginMode) {
        try {
          await signIn(email, password);
          
          console.log("Authentication successful");
          navigate("/roadmap");
        } catch (error: any) {
          console.error("Eroare la autentificare:", error);
          toast({
            title: "Eroare de autentificare",
            description: error.message || "A apărut o eroare la autentificare",
            variant: "destructive",
          });
        }
      } else {
        if (!inviteCode || inviteCode !== 'ADMIN2025') {
          toast({
            title: "Eroare",
            description: "Cod de invitație invalid",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        await handleAdminRegistration(email, password);
      }
    } catch (error: any) {
      console.error('Eroare:', error);
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async ({ email }: { email: string }) => {
    try {
      setIsLoading(true);
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
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la trimiterea emailului",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminRegistration = async (email: string, password: string) => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin'
          }
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (signInError) {
          throw signInError;
        }
        
        toast({
          title: "Cont admin creat cu succes",
          description: "Veți fi redirectat către roadmap",
        });
        
        navigate("/roadmap");
      }
    } catch (error: any) {
      console.error('Eroare la înregistrare:', error);
      throw error;
    }
  };

  return (
    <Layout>
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
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
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
