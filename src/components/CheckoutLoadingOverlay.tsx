import { Loader2 } from "lucide-react";

const CheckoutLoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in">
      <Loader2 className="w-10 h-10 text-blue animate-spin mb-4" />
      <p className="text-card-foreground font-semibold text-lg">Preparando seu pedido...</p>
      <p className="text-muted-foreground text-sm mt-1">Aguarde um momento</p>
    </div>
  );
};

export default CheckoutLoadingOverlay;
