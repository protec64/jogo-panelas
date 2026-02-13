import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface QuizOption {
  emoji: string;
  label: string;
}

interface QuizCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: QuizOption[];
  selectedOption?: string;
  onSelect: (option: string) => void;
}

const QuizCard = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onSelect,
}: QuizCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-card text-card-foreground rounded-3xl shadow-2xl px-6 py-8 border border-border/50">
        {/* Question Counter Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2 bg-orange/10 rounded-full px-4 py-1.5">
            <span className="text-orange font-bold text-sm">
              Pergunta {questionNumber}
            </span>
            <span className="text-muted-foreground text-sm">
              de {totalQuestions}
            </span>
          </div>
        </div>
        
        {/* Question */}
        <h2 className="text-xl md:text-2xl font-bold mb-6 leading-snug text-card-foreground">
          {question}
        </h2>
        
        {/* Options */}
        <div className="space-y-3">
          {options.map((option, index) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 group",
                "hover:border-orange hover:bg-orange/5 hover:shadow-md hover:scale-[1.02]",
                selectedOption === option.label
                  ? "border-orange bg-orange/10 shadow-md"
                  : "border-border/50 bg-card"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all",
                selectedOption === option.label
                  ? "bg-orange/20"
                  : "bg-muted group-hover:bg-orange/10"
              )}>
                {option.emoji}
              </div>
              <span className={cn(
                "flex-1 text-left font-medium transition-colors",
                selectedOption === option.label
                  ? "text-orange"
                  : "text-card-foreground"
              )}>
                {option.label}
              </span>
              {selectedOption === option.label && (
                <CheckCircle2 className="w-5 h-5 text-orange animate-scale-in" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
