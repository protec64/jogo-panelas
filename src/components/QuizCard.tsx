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
      <div className="bg-card text-card-foreground rounded-3xl shadow-elevated px-6 py-8 border border-border/60">
        {/* Question Counter Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 bg-blue/10 rounded-full px-3.5 py-1.5">
            <span className="text-blue font-semibold text-xs tracking-wide uppercase">
              Pergunta {questionNumber}
            </span>
            <span className="text-muted-foreground text-xs">
              de {totalQuestions}
            </span>
          </div>
        </div>

        {/* Question */}
        <h2 className="font-display text-xl md:text-2xl font-semibold mb-6 leading-tight text-card-foreground">
          {question}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {options.map((option, index) => (
            <button
              key={option.label}
              onClick={() => onSelect(option.label)}
              className={cn(
                "w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all duration-200 group",
                "hover:border-blue hover:bg-blue/5 hover:shadow-soft",
                selectedOption === option.label
                  ? "border-blue bg-blue/10 shadow-soft"
                  : "border-border/60 bg-card"
              )}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center text-2xl transition-all shrink-0",
                selectedOption === option.label
                  ? "bg-blue/15 scale-105"
                  : "bg-muted group-hover:bg-blue/10"
              )}>
                {option.emoji}
              </div>
              <span className={cn(
                "flex-1 text-left font-medium text-[15px] transition-colors",
                selectedOption === option.label
                  ? "text-blue"
                  : "text-card-foreground"
              )}>
                {option.label}
              </span>
              {selectedOption === option.label && (
                <CheckCircle2 className="w-5 h-5 text-blue animate-scale-in shrink-0" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
