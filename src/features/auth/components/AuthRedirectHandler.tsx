
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthRedirectHandlerProps {
  locationHash: string;
  setIsLoading: (loading: boolean) => void;
}

export const AuthRedirectHandler = ({ locationHash, setIsLoading }: AuthRedirectHandlerProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (locationHash) {
        setIsLoading(true);
        
        try {
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
  }, [locationHash, navigate, setIsLoading]);

  return null;
};
