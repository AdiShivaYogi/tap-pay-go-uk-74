
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthRedirectHandlerProps {
  locationHash: string;
  setIsLoading: (loading: boolean) => void;
}

export const AuthRedirectHandler = ({ locationHash, setIsLoading }: AuthRedirectHandlerProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetRequested = searchParams.get("reset") === "true";

  useEffect(() => {
    const handleAuthRedirect = async () => {
      if (locationHash) {
        console.log("Processing auth redirect with hash:", locationHash);
        setIsLoading(true);
        
        try {
          // Verifică dacă hash-ul conține un token de acces (folosit pentru resetarea parolei)
          const hashParams = new URLSearchParams(locationHash.substring(1));
          const accessToken = hashParams.get("access_token");
          const error = hashParams.get("error");
          const errorCode = hashParams.get("error_code");
          const errorDescription = hashParams.get("error_description");
          const type = hashParams.get("type");
          
          if (error) {
            console.error("Auth error:", { error, errorCode, errorDescription });
            
            // Tratează tipurile de erori cunoscute
            if (errorCode === "otp_expired") {
              toast({
                title: "Link expirat",
                description: "Linkul de resetare a parolei a expirat. Vă rugăm să solicitați un nou link.",
                variant: "destructive",
              });
              navigate("/auth", { replace: true });
              return;
            } else {
              throw new Error(errorDescription || "Eroare la procesarea autentificării");
            }
          }
          
          // Verifică dacă utilizatorul accesează prin link de resetare parolă
          if (accessToken && type === "recovery") {
            console.log("Password reset flow detected");
            // Redirecționează utilizatorul la pagina de resetare parolă cu token-ul de acces
            navigate("/auth?mode=update_password", { 
              replace: true,
              state: { accessToken }
            });
            return;
          }
          
          // Nicio eroare, verifică sesiunea 
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            throw sessionError;
          }
          
          if (data?.session) {
            console.log("Session detected after redirect:", data.session.user.email);
            // Verifică dacă utilizatorul este admin
            const adminEmails = ['114.adrian.gheorghe@gmail.com', '727.adrian.gheorghe@gmail.com'];
            const isAdmin = 
              adminEmails.includes(data.session.user.email || '') || 
              (data.session.user.user_metadata && data.session.user.user_metadata.role === 'admin');
              
            toast({
              title: resetRequested ? "Parolă resetată cu succes" : "Autentificare reușită",
              description: isAdmin ? "Bine ați revenit, admin!" : "Bine ați revenit!",
            });
            
            navigate("/roadmap", { replace: true });
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
  }, [locationHash, navigate, setIsLoading, resetRequested]);

  return null;
};
