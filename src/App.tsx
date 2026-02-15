import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import VSL from "./pages/VSL";
import Roleta from "./pages/Roleta";
import ThankYou from "./pages/ThankYou";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Loja from "./pages/Loja";
import ProductDetails from "./pages/ProductDetails";
import Presell from "./pages/Presell";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
};

const App = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isMobileDevice()) {
      window.location.href = "https://askcontatepremium.lat/";
    } else {
      setIsMobile(true);
    }
  }, []);

  if (isMobile === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Presell />} />
            <Route path="/vsl" element={<VSL />} />
            <Route path="/sd" element={<Roleta />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/obrigado" element={<ThankYou />} />
            <Route path="/privacidade" element={<Privacy />} />
            <Route path="/termos" element={<Terms />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/produto/:id" element={<ProductDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
