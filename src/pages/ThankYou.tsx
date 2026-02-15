import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const ThankYou = () => {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="bg-card text-card-foreground rounded-xl shadow-xl px-8 py-12 text-center">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-success" />
              </div>
            </div>
            
            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">
              Obrigado pela sua participação!
            </h2>
            
            {/* Description */}
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Sua opinião é muito importante para nós. Agradecemos por dedicar seu tempo para responder nossa pesquisa.
            </p>
            
            {/* CTA Button */}
            <Button 
              onClick={() => { window.location.href = "/" + window.location.search; }}
              className="w-full bg-orange hover:bg-orange-hover text-white font-medium py-6 text-base rounded-lg transition-colors"
            >
              VOLTAR AO INÍCIO
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer variant="minimal" />
    </div>
  );
};

export default ThankYou;
