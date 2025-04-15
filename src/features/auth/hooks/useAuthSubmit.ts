
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { AuthFormValues } from "@/components/admin-auth/auth-validation";

export const useAuthSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (values: AuthFormValues, isLoginMode: boolean) => {
    try {
      const { email, password, inviteCode } = values;
      
      setIsLoading(true);
      setErrorMessage(undefined);
      
      console.log("Form submitted:", { email, isLoginMode, hasInviteCode: !!inviteCode });

      if (isLoginMode) {
        try {
          await signIn(email, password);
          
          console.log("Authentication successful");
          navigate("/roadmap");
        } catch (error: any) {
          console.error("Eroare la autentificare:", error);
          
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
          return;
        }
        
        try {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                role: 'admin'
              }
            }
          });

          if (signUpError) throw signUpError;

          if (signUpData.user) {
            const { error: signInError } = await supabase.auth.signInWithPassword({ 
              email, 
              password 
            });
            
            if (signInError) throw signInError;
            
            toast({
              title: "Cont admin creat cu succes",
              description: "Veți fi redirectat către roadmap",
            });
            
            navigate("/roadmap");
          }
        } catch (error: any) {
          console.error('Eroare la înregistrare:', error);
          
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

  return {
    isLoading,
    errorMessage,
    handleSubmit,
    setErrorMessage
  };
};
