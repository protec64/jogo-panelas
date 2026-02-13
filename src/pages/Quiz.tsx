import { useState, useCallback } from "react";
import { Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import QuizCard from "@/components/QuizCard";
import ProgressDots from "@/components/ProgressDots";
import QuizAnalyzingView from "@/components/QuizAnalyzingView";
import QuizResultView from "@/components/QuizResultView";

const questions = [
  {
    id: 1,
    question: "Como você avalia sua experiência com compras online?",
    options: [
      { emoji: "🌟", label: "Excelente" },
      { emoji: "👍", label: "Boa" },
      { emoji: "😐", label: "Regular" },
      { emoji: "🔧", label: "Poderia melhorar" },
    ],
  },
  {
    id: 2,
    question: "Qual fator mais influencia sua decisão de compra?",
    options: [
      { emoji: "💰", label: "Preço" },
      { emoji: "⭐", label: "Qualidade" },
      { emoji: "🚚", label: "Frete grátis" },
      { emoji: "💳", label: "Parcelamento" },
    ],
  },
  {
    id: 3,
    question: "Com que frequência você faz compras online?",
    options: [
      { emoji: "📅", label: "Semanalmente" },
      { emoji: "📆", label: "Mensalmente" },
      { emoji: "🗓️", label: "Raramente" },
      { emoji: "🆕", label: "Primeira vez" },
    ],
  },
  {
    id: 4,
    question: "Como você prefere receber ofertas e promoções?",
    options: [
      { emoji: "📧", label: "E-mail" },
      { emoji: "📱", label: "SMS" },
      { emoji: "💬", label: "WhatsApp" },
      { emoji: "📲", label: "App" },
    ],
  },
  {
    id: 5,
    question: "O que você mais valoriza em um atendimento?",
    options: [
      { emoji: "⚡", label: "Rapidez" },
      { emoji: "🎯", label: "Eficiência" },
      { emoji: "😊", label: "Simpatia" },
      { emoji: "🔄", label: "Resolução" },
    ],
  },
  {
    id: 6,
    question: "Você recomendaria nossos serviços para amigos?",
    options: [
      { emoji: "💯", label: "Com certeza" },
      { emoji: "👍", label: "Provavelmente" },
      { emoji: "🤔", label: "Talvez" },
      { emoji: "❌", label: "Não" },
    ],
  },
];

type QuizPhase = 'questions' | 'analyzing' | 'result';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [phase, setPhase] = useState<QuizPhase>('questions');

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setPhase('analyzing');
      }
    }, 300);
  };

  const handleAnalyzingComplete = useCallback(() => {
    setPhase('result');
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Render analyzing phase
  if (phase === 'analyzing') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <QuizAnalyzingView onComplete={handleAnalyzingComplete} />
      </div>
    );
  }

  // Render result phase
  if (phase === 'result') {
    return (
      <div className="min-h-screen flex flex-col">
        <QuizResultView />
      </div>
    );
  }

  // Render questions phase
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header Badge */}
      <div className="pt-6 pb-2 flex justify-center">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Pesquisa Especial</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-white/70 text-xs mb-2">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* Progress Dots */}
        <ProgressDots 
          total={questions.length} 
          current={currentQuestion} 
        />
        
        {/* Quiz Card */}
        <QuizCard
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selectedOption={answers[currentQuestion]}
          onSelect={handleSelect}
        />
        
        {/* Helper Text */}
        <p className="text-white/60 text-sm mt-6 animate-pulse">
          Toque para selecionar sua resposta
        </p>
      </main>
      
      {/* Footer */}
      <Footer variant="minimal" />
    </div>
  );
};

export default Quiz;
