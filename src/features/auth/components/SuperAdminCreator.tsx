
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const SuperAdminCreator = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createSuperAdmin = async () => {
    try {
      setIsCreating(true);
      
      const { data: users, error: userError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('email', '114.adrian.gheorghe@gmail.com')
        .limit(1);

      if (userError) {
        console.log('Error checking for existing user:', userError.message);
        throw userError;
      }
      
      const userExists = users && users.length > 0;
      
      if (userExists) {
        toast({
          title: "Contul super admin există deja",
          description: "Încercați să vă conectați cu credențialele super admin"
        });
        return;
      }

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
      setIsCreating(false);
    }
  };

  return (
    <Button 
      variant="outline"
      className="w-full mt-2" 
      onClick={createSuperAdmin}
      disabled={isCreating}
    >
      <UserPlus className="mr-2 h-4 w-4" />
      {isCreating ? "Se creează..." : "Creare cont super admin"}
    </Button>
  );
};
