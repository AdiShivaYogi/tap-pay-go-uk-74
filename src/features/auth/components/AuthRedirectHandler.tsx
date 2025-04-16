
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthRedirectHandlerProps {
  locationHash: string;
  setIsLoading?: (isLoading: boolean) => void;
}

export const AuthRedirectHandler = ({ 
  locationHash,
  setIsLoading = () => {} 
}: AuthRedirectHandlerProps) => {
  useEffect(() => {
    // Procesați hashul URL-ului pentru a extrage token-ul de acces după redirecționare
    if (locationHash && locationHash.includes("access_token")) {
      const hashParams = new URLSearchParams(locationHash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");
      const type = hashParams.get("type");
      
      if (accessToken && type === "recovery") {
        setIsLoading(true);
        
        // Process password recovery token
        toast({
          title: "Token de resetare valid",
          description: "Acum puteți configura o nouă parolă",
        });
        
        setIsLoading(false);
      } else if (accessToken) {
        setIsLoading(true);
        
        // Încercați să setați sesiunea pentru token-ul acces/reîmprospătare
        const establishSession = async () => {
          try {
            if (accessToken && refreshToken) {
              const { error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
              
              if (error) {
                throw error;
              }
              
              toast({
                title: "Autentificare reușită",
                description: "Sesiune stabilită cu succes",
              });
            }
          } catch (error: any) {
            console.error("Eroare la setarea sesiunii:", error);
            toast({
              title: "Eroare de autentificare",
              description: error.message || "A apărut o eroare la setarea sesiunii",
              variant: "destructive"
            });
          } finally {
            setIsLoading(false);
          }
        };
        
        establishSession();
      }
    }
  }, [locationHash, setIsLoading]);

  return null;
};
