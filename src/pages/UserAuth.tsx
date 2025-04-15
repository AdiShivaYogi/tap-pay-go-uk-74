
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";

// Schema de validare pentru utilizatori
const userFormSchema = z.object({
  email: z.string().email("Introduceți un email valid"),
  password: z.string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserAuth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const { email, password } = values;
      
      setIsLoading(true);

      if (isLoginMode) {
        try {
          await signIn(email, password);
          navigate("/dashboard");
        } catch (error: any) {
          toast({
            title: "Eroare de autentificare",
            description: error.message || "A apărut o eroare la autentificare",
            variant: "destructive",
          });
        }
      } else {
        await handleRegistration(email, password);
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

  const handleRegistration = async (email: string, password: string) => {
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      throw signUpError;
    }

    if (data.user) {
      await signIn(email, password);
      toast({
        title: "Cont creat cu succes",
        description: "Veți fi redirectat către dashboard",
      });
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {isLoginMode ? "Autentificare" : "Înregistrare"}
            </CardTitle>
            <CardDescription>
              {isLoginMode 
                ? "Autentificați-vă în contul dvs." 
                : "Creați un cont nou"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm
              isLoginMode={isLoginMode}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              formSchema={userFormSchema}
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
