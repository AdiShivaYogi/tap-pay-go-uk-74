
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ADMIN_INVITE_CODE = "TPG2025ADMIN"; // Acest cod ar trebui să fie într-un loc sigur în producție

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleAdminSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      if (inviteCode !== ADMIN_INVITE_CODE) {
        toast({
          title: "Cod de invitație invalid",
          description: "Vă rugăm să verificați codul de invitație",
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
          description: "Vă rugăm să vă autentificați pentru a continua",
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
