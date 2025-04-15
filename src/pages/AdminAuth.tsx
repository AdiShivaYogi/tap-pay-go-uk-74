
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ADMIN_INVITE_CODE = "TPG2025ADMIN";

const formSchema = z.object({
  email: z.string().email("Introduceți un email valid"),
  password: z.string()
    .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
    .regex(/[A-Z]/, "Parola trebuie să conțină cel puțin o literă mare")
    .regex(/[a-z]/, "Parola trebuie să conțină cel puțin o literă mică")
    .regex(/[0-9]/, "Parola trebuie să conțină cel puțin o cifră")
    .regex(/[!@#$%^&*()]/, "Parola trebuie să conțină cel puțin un caracter special"),
  inviteCode: z.string().min(1, "Codul de invitație este obligatoriu")
});

type FormValues = z.infer<typeof formSchema>;

const AdminAuth = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [lockMinutesLeft, setLockMinutesLeft] = useState(0);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      inviteCode: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
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

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    form.setValue("password", password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const { email, password, inviteCode } = values;
      
      // Verificăm status-ul contului
      const isAccountLocked = await checkLoginStatus(email);
      if (isAccountLocked) {
        toast({
          title: "Cont blocat temporar",
          description: `Prea multe încercări eșuate. Încercați din nou în ${lockMinutesLeft} minute.`,
          variant: "destructive",
        });
        return;
      }

      // Verificăm codul de invitație în toate cazurile
      if (inviteCode !== ADMIN_INVITE_CODE) {
        toast({
          title: "Cod de invitație invalid",
          description: "Vă rugăm să verificați codul de invitație",
          variant: "destructive",
        });
        return;
      }

      if (isLoginMode) {
        // Procesul de autentificare
        try {
          await signIn(email, password);
          navigate("/admin");
        } catch (error) {
          await recordFailedAttempt(email);
          throw error;
        }
      } else {
        // Procesul de înregistrare
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
      }
    } catch (error: any) {
      console.error('Eroare:', error);
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader>
            <CardTitle>{isLoginMode ? "Autentificare" : "Înregistrare"} Administrator</CardTitle>
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
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email administrator" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parolă</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Parolă" 
                          value={field.value}
                          onChange={onPasswordChange}
                        />
                      </FormControl>
                      <Progress 
                        value={passwordStrength} 
                        className="mt-2"
                        color={
                          passwordStrength < 50 
                            ? "bg-red-500" 
                            : passwordStrength < 75 
                            ? "bg-yellow-500" 
                            : "bg-green-500"
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inviteCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cod de invitație</FormLabel>
                      <FormControl>
                        <Input placeholder="Cod de invitație administrator" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Se procesează...
                    </>
                  ) : (
                    isLoginMode ? "Autentificare" : "Creare cont administrator"
                  )}
                </Button>

                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-sm text-primary underline"
                  >
                    {isLoginMode 
                      ? "Nu aveți cont? Creați un cont de administrator" 
                      : "Aveți deja un cont? Autentificați-vă"}
                  </button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminAuth;
