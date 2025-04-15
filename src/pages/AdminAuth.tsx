
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { formSchema } from "@/components/admin-auth/auth-validation";

const ADMIN_INVITE_CODE = "TPG2025ADMIN";

type FormValues = z.infer<typeof formSchema>;

const AdminAuth = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [lockMinutesLeft, setLockMinutesLeft] = useState(0);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      const { email, password, inviteCode } = values;
      
      const isAccountLocked = await checkLoginStatus(email);
      if (isAccountLocked) {
        toast({
          title: "Cont blocat temporar",
          description: `Prea multe încercări eșuate. Încercați din nou în ${lockMinutesLeft} minute.`,
          variant: "destructive",
        });
        return;
      }

      if (inviteCode !== ADMIN_INVITE_CODE) {
        toast({
          title: "Cod de invitație invalid",
          description: "Vă rugăm să verificați codul de invitație",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);

      if (isLoginMode) {
        try {
          await signIn(email, password);
          navigate("/admin");
        } catch (error) {
          await recordFailedAttempt(email);
          throw error;
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
    const { data: existingAdmins } = await supabase
      .from('user_roles')
      .select('*')
      .eq('role', 'admin');

    if (existingAdmins && existingAdmins.length > 0) {
      toast({
        title: "Cont admin existent",
        description: "Un cont de administrator a fost deja creat.",
        variant: "destructive",
      });
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    if (data.user) {
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert([
          { user_id: data.user.id, role: 'admin' }
        ]);

      if (roleError) throw roleError;

      await signIn(email, password);
      toast({
        title: "Cont admin creat cu succes",
        description: "Veți fi redirectat către panoul de administrare",
      });
      navigate("/admin");
    }
  };

  const checkLoginStatus = async (email: string) => {
    try {
      const { data, error } = await supabase.rpc('check_login_attempts', {
        p_email: email
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setIsLocked(data[0].is_locked);
        setLockMinutesLeft(data[0].minutes_left);
        return data[0].is_locked;
      }
      return false;
    } catch (error) {
      console.error('Error checking login status:', error);
      return false;
    }
  };

  const recordFailedAttempt = async (email: string) => {
    try {
      const { data, error } = await supabase.rpc('record_failed_attempt', {
        p_email: email
      });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setIsLocked(data[0].is_locked);
        setLockMinutesLeft(data[0].minutes_left);
      }
    } catch (error) {
      console.error('Error recording failed attempt:', error);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader>
            <CardTitle>
              {isLoginMode ? "Autentificare" : "Înregistrare"} Administrator
            </CardTitle>
            <CardDescription>
              {isLoginMode 
                ? "Autentificați-vă ca administrator folosind codul de invitație" 
                : "Creați un cont de administrator folosind codul de invitație"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLocked && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Cont blocat temporar</AlertTitle>
                <AlertDescription>
                  Prea multe încercări eșuate. Vă rugăm să așteptați {lockMinutesLeft} minute înainte de a încerca din nou.
                </AlertDescription>
              </Alert>
            )}
            
            <AuthForm
              isLoginMode={isLoginMode}
              onSubmit={handleSubmit}
              isLoading={isLoading}
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

export default AdminAuth;
