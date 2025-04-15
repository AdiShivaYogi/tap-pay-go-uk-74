
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { formSchema } from "@/components/admin-auth/auth-validation";

type AdminFormValues = z.infer<typeof formSchema>;

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/roadmap');
    }
  }, [user, navigate]);

  // Handle Supabase auth redirect with tokens in URL
  useEffect(() => {
    const handleAuthRedirect = async () => {
      // Check if we have a hash in the URL (for auth callbacks)
      if (location.hash) {
        setIsLoading(true);
        
        try {
          // Process the hash fragment containing auth tokens
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

  const handleSubmit = async (values: AdminFormValues) => {
    try {
      const { email, password, inviteCode } = values;
      
      setIsLoading(true);

      if (isLoginMode) {
        try {
          // Utilizăm signIn din AuthProvider pentru a gestiona starea autentificării
          await signIn(email, password);
          
          // Redirecționarea se face în AuthProvider după autentificare reușită
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
        // Admin signup
        if (inviteCode !== 'ADMIN2025') {
          throw new Error("Cod de invitație invalid");
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
        // Autentificare directă după înregistrare
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
              {isLoginMode ? "Autentificare" : "Înregistrare Admin"}
            </CardTitle>
            <CardDescription>
              {isLoginMode 
                ? "Autentificați-vă în contul dvs." 
                : "Creați un cont de administrator"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm
              isLoginMode={isLoginMode}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              formSchema={formSchema}
            />

            <AuthModeToggle
              isLoginMode={isLoginMode}
              onToggle={() => setIsLoginMode(!isLoginMode)}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserAuth;
