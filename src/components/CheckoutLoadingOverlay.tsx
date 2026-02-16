import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface CheckoutLoadingOverlayProps {
  checkoutUrl: string;
}

const CheckoutLoadingOverlay = ({ checkoutUrl }: CheckoutLoadingOverlayProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Redirect after a short delay to let the iframe pre-load
    const timer = setTimeout(() => {
      window.location.href = checkoutUrl;
    }, 2000);
    return () => clearTimeout(timer);
  }, [checkoutUrl]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
      <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
      <p className="text-card-foreground font-semibold text-lg">Preparando seu pedido...</p>
      <p className="text-muted-foreground text-sm mt-1">Aguarde um momento</p>
      {/* Hidden iframe to pre-load checkout page */}
      <iframe
        ref={iframeRef}
        src={checkoutUrl}
        className="hidden"
        title="preload-checkout"
      />
    </div>
  );
};

export default CheckoutLoadingOverlay;
