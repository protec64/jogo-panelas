import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <div className="bg-card text-card-foreground rounded-3xl shadow-elevated px-8 py-12 text-center border border-border/50">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-success/20 rounded-full blur-xl" />
                <div className="relative w-20 h-20 rounded-full bg-success-light flex items-center justify-center border border-success/20">
                  <CheckCircle2 className="w-10 h-10 text-success" strokeWidth={2} />
                </div>
              </div>
            </div>

            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3 tracking-tight">
              Obrigado pela sua participação!
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed text-[15px]">
              Sua opinião é muito importante para nós. Agradecemos por dedicar seu tempo para responder nossa pesquisa.
            </p>

            <Button
              onClick={() => navigate("/")}
              className="w-full bg-blue hover:bg-blue-hover text-white font-semibold py-6 text-base rounded-xl transition-smooth group"
            >
              Voltar ao início
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>

      <Footer variant="minimal" />
    </div>
  );
};

export default ThankYou;
