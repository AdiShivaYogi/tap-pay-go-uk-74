
interface AuthModeToggleProps {
  isLoginMode: boolean;
  onToggle: () => void;
}

export const AuthModeToggle = ({ isLoginMode, onToggle }: AuthModeToggleProps) => (
  <div className="text-center mt-4">
    <button
      type="button"
      onClick={onToggle}
      className="text-sm text-primary underline"
    >
      {isLoginMode 
        ? "Nu aveți cont? Creați un cont de administrator" 
        : "Aveți deja un cont? Autentificați-vă"}
    </button>
  </div>
);
