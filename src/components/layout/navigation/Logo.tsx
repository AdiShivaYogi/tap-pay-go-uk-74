
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img src="/favicon.ico" alt="Logo" className="h-8 w-8" />
      <span className="font-semibold text-primary">TapPayGo</span>
    </Link>
  );
}
