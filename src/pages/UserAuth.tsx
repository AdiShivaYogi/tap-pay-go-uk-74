
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { ResetPasswordForm } from "@/components/admin-auth/ResetPasswordForm";
import { AuthFormValues } from "@/components/admin-auth/auth-validation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isCreatingSuperAdmin, setIsCreatingSuperAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

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
      setErrorMessage(undefined); // Reset error message
      
      console.log("Form submitted:", { email, isLoginMode, hasInviteCode: !!inviteCode });

      if (isLoginMode) {
        try {
          await signIn(email, password);
          
          console.log("Authentication successful");
          navigate("/roadmap");
        } catch (error: any) {
          console.error("Eroare la autentificare:", error);
          
          // Handle common authentication errors with user-friendly messages
          if (error.message === "Invalid login credentials") {
            setErrorMessage("Email sau parolă incorectă. Vă rugăm să încercați din nou.");
          } else if (error.message?.includes("rate limited")) {
            setErrorMessage("Prea multe încercări de autentificare. Vă rugăm să încercați mai târziu.");
          } else if (error.message?.includes("Email not confirmed")) {
            setErrorMessage("Email-ul nu a fost confirmat. Verificați email-ul pentru link-ul de confirmare.");
          } else {
            setErrorMessage(error.message || "A apărut o eroare la autentificare");
          }
          
          toast({
            title: "Eroare de autentificare",
            description: error.message || "A apărut o eroare la autentificare",
            variant: "destructive",
          });
        }
      } else {
        if (!inviteCode || inviteCode !== 'ADMIN2025') {
          setErrorMessage("Cod de invitație invalid");
          toast({
            title: "Eroare",
            description: "Cod de invitație invalid",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        
        try {
          await handleAdminRegistration(email, password);
        } catch (error: any) {
          console.error('Eroare la înregistrare:', error);
          
          // Handle registration errors
          if (error.message?.includes("User already registered")) {
            setErrorMessage("Există deja un cont cu această adresă de email.");
          } else {
            setErrorMessage(error.message || "A apărut o eroare la înregistrare");
          }
          
          toast({
            title: "Eroare",
            description: error.message || "A apărut o eroare la înregistrare",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      console.error('Eroare:', error);
      setErrorMessage(error.message || "A apărut o eroare. Vă rugăm să încercați din nou.");
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

  // When mode changes, reset error message
  useEffect(() => {
    setErrorMessage(undefined);
  }, [isLoginMode, isResetMode]);

  const createSuperAdmin = async () => {
    try {
      setIsCreatingSuperAdmin(true);
      
      // First check if the user already exists
      const { data, error: userError } = await supabase
        .from('auth.users')
        .select('email')
        .eq('email', '114.adrian.gheorghe@gmail.com')
        .limit(1);

      if (userError) {
        console.log('Error checking for existing user:', userError.message);
        throw userError;
      }
      
      // Fix: Check if data exists and has length before accessing properties
      const userExists = data && data.length > 0;
      
      if (userExists) {
        toast({
          title: "Contul super admin există deja",
          description: "Încercați să vă conectați cu credențialele super admin"
        });
        return;
      }

      // Create the super admin account
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: '114.adrian.gheorghe@gmail.com',
        password: "Alfasiomega!!!",
        options: {
          data: {
            role: 'admin'
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) throw error;
      
      toast({
        title: "Cont super admin creat",
        description: "Verificați email-ul pentru confirmarea contului sau dezactivați confirmarea în Supabase dashboard"
      });
      
    } catch (error: any) {
      console.error('Eroare la crearea super admin:', error);
      toast({
        title: "Eroare la crearea super admin",
        description: error.message || "Verificați consolă pentru detalii",
        variant: "destructive"
      });
    } finally {
      setIsCreatingSuperAdmin(false);
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
                  errorMessage={errorMessage}
                />
                <AuthModeToggle
                  isLoginMode={isLoginMode}
                  onToggle={() => setIsLoginMode(!isLoginMode)}
                  onForgotPassword={() => setIsResetMode(true)}
                />
              </>
            )}
            
            {errorMessage?.includes("Email sau parolă incorectă") && (
              <Alert className="mt-4">
                <AlertDescription>
                  Dacă încercați să vă conectați ca super admin și contul nu a fost încă creat, 
                  puteți crea contul apăsând butonul de mai jos.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline"
              className="w-full mt-2" 
              onClick={createSuperAdmin}
              disabled={isCreatingSuperAdmin}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {isCreatingSuperAdmin ? "Se creează..." : "Creare cont super admin"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default UserAuth;
