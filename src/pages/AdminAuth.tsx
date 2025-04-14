
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

const ADMIN_INVITE_CODE = "TPG2025ADMIN"; // Acest cod ar trebui să fie într-un loc sigur în producție

const passwordSchema = z.string()
  .min(8, "Parola trebuie să aibă cel puțin 8 caractere")
  .regex(/[A-Z]/, "Parola trebuie să conțină cel puțin o literă mare")
  .regex(/[a-z]/, "Parola trebuie să conțină cel puțin o literă mică")
  .regex(/[0-9]/, "Parola trebuie să conțină cel puțin o cifră")
  .regex(/[!@#$%^&*()]/, "Parola trebuie să conțină cel puțin un caracter special");

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Validate invite code
      if (inviteCode !== ADMIN_INVITE_CODE) {
        toast({
          title: "Cod de invitație invalid",
          description: "Vă rugăm să verificați codul de invitație",
          variant: "destructive",
        });
        return;
      }

      // Validate password
      try {
        passwordSchema.parse(password);
      } catch (validationError) {
        if (validationError instanceof z.ZodError) {
          toast({
            title: "Parolă invalidă",
            description: validationError.errors[0].message,
            variant: "destructive",
          });
          return;
        }
      }

      // Check for existing admin
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

      // Înregistrare utilizator
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      // Adăugare rol de admin
      if (authData.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert([
            { user_id: authData.user.id, role: 'admin' }
          ]);

        if (roleError) throw roleError;

        // Autentificare automată
        await signIn(email, password);

        toast({
          title: "Cont admin creat cu succes",
          description: "Veți fi redirectat către panoul de administrare",
        });

        navigate("/admin");
      }
    } catch (error) {
      console.error('Eroare:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-md py-8">
        <Card>
          <CardHeader>
            <CardTitle>Autentificare Administrator</CardTitle>
            <CardDescription>
              Creați un cont de administrator folosind codul de invitație
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminSignUp} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email administrator"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Parolă"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
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
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Cod de invitație administrator"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Se procesează..." : "Creare cont administrator"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminAuth;
