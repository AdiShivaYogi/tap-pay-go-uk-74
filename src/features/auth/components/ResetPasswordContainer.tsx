
import { useState } from "react";
import { ResetPasswordForm, ResetFormValues } from "@/components/admin-auth/reset-password/ResetPasswordForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { RequestResetValues } from "@/components/admin-auth/reset-password/RequestResetForm";
import { UpdatePasswordValues } from "@/components/admin-auth/reset-password/UpdatePasswordForm";

interface ResetPasswordContainerProps {
  mode: "request" | "update";
  accessToken?: string;
  onCancel: () => void;
}

export const ResetPasswordContainer = ({ 
  mode, 
  accessToken, 
  onCancel 
}: ResetPasswordContainerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  
  const handleResetPassword = async (values: RequestResetValues) => {
    try {
      setIsLoading(true);
      setErrorMessage(undefined);
      
      // Utilizăm URL-ul curent al aplicației pentru redirecționare
      const currentUrl = window.location.origin;
      
      console.log(`Sending password reset email with redirect URL: ${currentUrl}/auth?reset=true`);
      
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${currentUrl}/auth?reset=true`,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Email trimis",
        description: "Verificați email-ul pentru a reseta parola",
      });
      onCancel(); // Close reset form and go back to login
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

  const handleUpdatePassword = async (values: UpdatePasswordValues) => {
    try {
      setIsLoading(true);
      setErrorMessage(undefined);
      
      if (!accessToken) {
        throw new Error("Lipsește token-ul de acces pentru resetarea parolei");
      }
      
      console.log("Updating password with access token");
      
      const { error } = await supabase.auth.updateUser({ 
        password: values.password
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Parolă actualizată",
        description: "Parola dvs. a fost actualizată cu succes. Acum vă puteți autentifica.",
        variant: "default"
      });
      
      onCancel(); // Close update form and go back to login
      
    } catch (error: any) {
      console.error("Eroare la actualizarea parolei:", error);
      setErrorMessage(error.message || "A apărut o eroare la actualizarea parolei");
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la actualizarea parolei",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: ResetFormValues) => {
    if ('email' in values) {
      await handleResetPassword(values as RequestResetValues);
    } else {
      await handleUpdatePassword(values as UpdatePasswordValues);
    }
  };

  return (
    <ResetPasswordForm
      mode={mode}
      accessToken={accessToken}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};
