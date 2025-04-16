
import { SecurityAlert } from "@/components/security/SecurityAlert";
import { AuthFormContainer } from "@/features/auth/components/AuthFormContainer";
import { ResetPasswordContainer } from "@/features/auth/components/ResetPasswordContainer";

interface AuthContentProps {
  isLoginMode: boolean;
  isResetMode: boolean;
  isUpdatePasswordMode: boolean;
  accessToken?: string;
  onToggleMode: () => void;
  onResetPassword: () => void;
  onCancelReset: () => void;
  onCancelUpdatePassword: () => void;
}

export const AuthContent = ({
  isLoginMode,
  isResetMode,
  isUpdatePasswordMode,
  accessToken,
  onToggleMode,
  onResetPassword,
  onCancelReset,
  onCancelUpdatePassword
}: AuthContentProps) => {
  if (isUpdatePasswordMode && accessToken) {
    return (
      <ResetPasswordContainer 
        mode="update"
        accessToken={accessToken}
        onCancel={onCancelUpdatePassword}
      />
    );
  }
  
  if (isResetMode) {
    return (
      <ResetPasswordContainer
        mode="request"
        onCancel={onCancelReset}
      />
    );
  }
  
  return (
    <>
      <AuthFormContainer
        isLoginMode={isLoginMode}
        onToggleMode={onToggleMode}
        onResetPassword={onResetPassword}
      />
      
      {isLoginMode && !isResetMode && !isUpdatePasswordMode && (
        <div className="mt-6">
          <SecurityAlert />
        </div>
      )}
    </>
  );
};
