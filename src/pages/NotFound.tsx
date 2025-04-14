
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold mb-6 text-primary">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Oops! Pagina nu a fost găsită</p>
          <p className="text-gray-500 mb-8">
            Calea <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code> nu există în aplicație.
          </p>
          <Button asChild size="lg">
            <Link to="/">Înapoi la Pagina Principală</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
