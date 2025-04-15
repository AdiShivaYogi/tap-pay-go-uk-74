
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
          // Check for error parameters in the hash
          const hashParams = new URLSearchParams(locationHash.substring(1));
          const error = hashParams.get("error");
          const errorCode = hashParams.get("error_code");
          const errorDescription = hashParams.get("error_description");

          if (error) {
            console.error("Auth error:", { error, errorCode, errorDescription });
            
            // Handle known error types
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
          
          // No error, proceed with session check
          const { data, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            throw sessionError;
          }
          
          if (data?.session) {
            console.log("Session detected after redirect:", data.session.user.email);
            // Check if user is an admin
            const adminEmails = ['114.adrian.gheorghe@gmail.com', '727.adrian.gheorghe@gmail.com'];
            const isAdmin = 
              adminEmails.includes(data.session.user.email || '') || 
              (data.session.user.user_metadata && data.session.user.user_metadata.role === 'admin');
              
            toast({
              title: "Autentificare reușită",
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
  }, [locationHash, navigate, setIsLoading]);

  return null;
};
