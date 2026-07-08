import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SurveyCardProps {
  onParticipate?: () => void;
}

const SurveyCard = ({ onParticipate }: SurveyCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Badge */}
      <div className="bg-badge text-badge-foreground text-center py-3 px-4 rounded-t-lg">
        <span className="text-sm font-medium tracking-wide uppercase">
          Pesquisa Disponível
        </span>
      </div>
      
      {/* Card Content */}
      <div className="bg-card text-card-foreground rounded-b-lg shadow-xl px-8 py-10">
        {/* Star Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
            <Star className="w-8 h-8 text-muted-foreground/50" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">
          Sua opinião é importante
        </h2>
        
        {/* Description */}
        <p className="text-muted-foreground text-center mb-8 leading-relaxed">
          Participe da nossa pesquisa de satisfação e nos ajude a melhorar nossos produtos e serviços.
        </p>
        
        {/* CTA Button */}
        <Button 
          onClick={onParticipate}
          className="w-full bg-blue hover:bg-blue-hover text-white font-medium py-6 text-base rounded-lg transition-colors"
        >
          PARTICIPAR
        </Button>
        
        {/* Time estimate */}
        <p className="text-muted-foreground text-center text-sm mt-4">
          Tempo estimado: 2 minutos
        </p>
      </div>
    </div>
  );
};

export default SurveyCard;
