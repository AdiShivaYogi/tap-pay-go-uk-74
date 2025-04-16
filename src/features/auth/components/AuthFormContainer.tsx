
import { useAuthSubmit } from "@/features/auth/hooks/useAuthSubmit";
import { AuthForm } from "@/components/admin-auth/AuthForm";
import { AuthModeToggle } from "@/components/admin-auth/AuthModeToggle";
import { useState, useEffect } from "react";

interface AuthFormContainerProps {
  isLoginMode: boolean;
  onToggleMode: () => void;
  onResetPassword: () => void;
}

export const AuthFormContainer = ({ 
  isLoginMode, 
  onToggleMode, 
  onResetPassword 
}: AuthFormContainerProps) => {
  const { isLoading, errorMessage, handleSubmit, setErrorMessage } = useAuthSubmit();

  // Reset error message when login mode changes
  useEffect(() => {
    setErrorMessage(undefined);
  }, [isLoginMode, setErrorMessage]);

  return (
    <>
      <AuthForm
        isLoginMode={isLoginMode}
        onSubmit={(values) => handleSubmit(values, isLoginMode)}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <AuthModeToggle
        isLoginMode={isLoginMode}
        onToggle={onToggleMode}
        onForgotPassword={onResetPassword}
      />
    </>
  );
};
