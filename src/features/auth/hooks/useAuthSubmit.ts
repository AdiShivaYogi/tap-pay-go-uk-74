
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

  // Admin email reference list
  const adminEmails = ['114.adrian.gheorghe@gmail.com', '727.adrian.gheorghe@gmail.com'];

  const handleSubmit = async (values: AuthFormValues, isLoginMode: boolean) => {
    try {
      const { email, password, inviteCode } = values;
      
      setIsLoading(true);
      setErrorMessage(undefined);
      
      console.log("Form submitted:", { email, isLoginMode, hasInviteCode: !!inviteCode });

      if (isLoginMode) {
        try {
          // Try to authenticate with the special admin email directly
          if (adminEmails.includes(email)) {
            console.log("Attempting admin login with email:", email);
          }
          
          await signIn(email, password);
          
          console.log("Authentication successful");
          navigate("/roadmap");
        } catch (error: any) {
          console.error("Eroare la autentificare:", error);
          
          if (typeof error === 'object' && error !== null && 'message' in error) {
            const errorMsg = error.message as string;
            
            if (errorMsg.includes("Invalid login credentials")) {
              setErrorMessage("Email sau parolă incorectă. Vă rugăm să încercați din nou.");
            } else if (errorMsg.includes("rate limited")) {
              setErrorMessage("Prea multe încercări de autentificare. Vă rugăm să încercați mai târziu.");
            } else if (errorMsg.includes("Email not confirmed")) {
              setErrorMessage("Email-ul nu a fost confirmat. Verificați email-ul pentru link-ul de confirmare.");
            } else {
              setErrorMessage(errorMsg || "A apărut o eroare la autentificare");
            }
          } else {
            setErrorMessage("A apărut o eroare la autentificare");
          }
          
          toast({
            title: "Eroare de autentificare",
            description: error.message || "A apărut o eroare la autentificare",
            variant: "destructive",
          });
        }
      } else {
        // Handle registration logic - first check if admin already exists
        try {
          // Check if trying to register with an email that is already in the admin list
          if (adminEmails.includes(email)) {
            setErrorMessage("Acest email este deja înregistrat ca administrator. Vă rugăm să vă autentificați.");
            toast({
              title: "Email admin existent",
              description: "Acest email este deja înregistrat ca administrator",
              variant: "destructive",
            });
            return;
          }
          
          // Check invite code validity
          const validInviteCodes = ['ADMIN2025', 'SUPERADMIN2025'];
          if (!validInviteCodes.includes(inviteCode || '')) {
            setErrorMessage("Cod de invitație invalid");
            toast({
              title: "Eroare",
              description: "Cod de invitație invalid",
              variant: "destructive",
            });
            return;
          }
          
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
