import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <p className="font-display text-8xl font-bold text-white/90 mb-2 tracking-tight">404</p>
        <h1 className="font-display text-2xl font-semibold text-white mb-3">Página não encontrada</h1>
        <p className="text-white/70 mb-8 leading-relaxed">
          A página que você procura não existe ou foi movida.
        </p>
        <Link to="/">
          <Button className="bg-white text-blue hover:bg-white/90 font-semibold rounded-xl px-6 py-6">
            <Home className="mr-2 h-4 w-4" />
            Voltar ao início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
