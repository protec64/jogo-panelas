import { Star, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SurveyCardProps {
  onParticipate?: () => void;
}

const SurveyCard = ({ onParticipate }: SurveyCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      {/* Badge */}
      <div className="bg-badge text-badge-foreground text-center py-3 px-4 rounded-t-2xl">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase">
          Pesquisa Disponível
        </span>
      </div>

      {/* Card Content */}
      <div className="bg-card text-card-foreground rounded-b-2xl shadow-elevated px-8 py-10 border-x border-b border-border/50">
        {/* Star Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue/10 rounded-full blur-lg" />
            <div className="relative w-16 h-16 rounded-full bg-blue-soft border border-blue/20 flex items-center justify-center">
              <Star className="w-7 h-7 text-blue fill-blue/30" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        <h2 className="font-display text-2xl md:text-[26px] font-semibold text-center mb-3 tracking-tight">
          Sua opinião é importante
        </h2>

        <p className="text-muted-foreground text-center mb-8 leading-relaxed text-[15px]">
          Participe da nossa pesquisa de satisfação e nos ajude a melhorar nossos produtos e serviços.
        </p>

        <Button
          onClick={onParticipate}
          className="w-full bg-blue hover:bg-blue-hover text-white font-semibold py-6 text-base rounded-xl transition-smooth group shadow-soft"
        >
          Participar da pesquisa
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mt-5">
          <Clock className="w-3.5 h-3.5" />
          <span>Tempo estimado: 2 minutos</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;
