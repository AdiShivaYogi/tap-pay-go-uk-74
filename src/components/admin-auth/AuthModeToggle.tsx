
interface AuthModeToggleProps {
  isLoginMode: boolean;
  onToggle: () => void;
  onForgotPassword: () => void;
}

export const AuthModeToggle = ({ isLoginMode, onToggle, onForgotPassword }: AuthModeToggleProps) => (
  <div className="text-center mt-4 space-y-2">
    <button
      type="button"
      onClick={onToggle}
      className="text-sm text-primary underline"
    >
      {isLoginMode 
        ? "Nu aveți cont? Creați un cont de administrator" 
        : "Aveți deja un cont? Autentificați-vă"}
    </button>
    {isLoginMode && (
      <div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary underline"
        >
          Ați uitat parola?
        </button>
      </div>
    )}
  </div>
);
