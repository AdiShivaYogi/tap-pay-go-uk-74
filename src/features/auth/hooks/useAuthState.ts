
import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export const useAuthState = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isUpdatePasswordMode, setIsUpdatePasswordMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const resetRequested = searchParams.get("reset") === "true";
  const updatePasswordRequested = searchParams.get("mode") === "update_password";
  const accessToken = location.state?.accessToken;

  useEffect(() => {
    // Detectăm dacă utilizatorul vine dintr-un link de resetare parolă
    if (updatePasswordRequested) {
      setIsUpdatePasswordMode(true);
      setIsResetMode(false);
      setIsLoginMode(false);
      console.log("Update password mode activated, access token available:", !!accessToken);
    } else if (resetRequested) {
      // Reset mode handling will be done in ResetPasswordContainer
    }
  }, [updatePasswordRequested, resetRequested, accessToken]);

  useEffect(() => {
    if (user) {
      console.log("User detected in UserAuth, redirecting to roadmap");
      navigate('/roadmap');
    }
  }, [user, navigate]);

  // Determină titlul și descrierea cardului în funcție de modul curent
  let cardTitle = "Autentificare";
  let cardDescription = "Autentificați-vă în contul dvs.";
  
  if (isUpdatePasswordMode) {
    cardTitle = "Setare parolă nouă";
    cardDescription = "Creați o nouă parolă pentru contul dvs.";
  } else if (isResetMode) {
    cardTitle = "Resetare parolă";
    cardDescription = "Introduceți adresa de email pentru a reseta parola";
  } else if (!isLoginMode) {
    cardTitle = "Înregistrare Admin";
    cardDescription = "Creați un cont de administrator";
  }

  return {
    isLoginMode,
    isResetMode,
    isUpdatePasswordMode,
    setIsLoginMode,
    setIsResetMode,
    setIsUpdatePasswordMode,
    cardTitle,
    cardDescription,
    location,
    navigate,
    accessToken,
    user
  };
};
