import { useEffect, useState, useRef } from "react";
import { Loader2, CheckCircle2, Sparkles, Shield, Cpu, BarChart3, Award } from "lucide-react";

// Subtle sound effects using Web Audio API
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

const playStepCompleteSound = (audioContext: AudioContext, stepIndex: number) => {
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for each step (ascending)
    const frequencies = [440, 523.25, 659.25, 783.99]; // A4, C5, E5, G5
    oscillator.frequency.value = frequencies[stepIndex] || 440;
    oscillator.type = 'sine';
    
    // Very subtle volume
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (error) {
    console.log('Audio feedback not supported');
  }
};

const playFinalSuccessSound = (audioContext: AudioContext) => {
  try {
    // Play a pleasant chord
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'triangle';
      
      const startTime = audioContext.currentTime + index * 0.05;
      gainNode.gain.setValueAtTime(0.12, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  } catch (error) {
    console.log('Audio feedback not supported');
  }
};

const analyzingSteps = [
  { 
    text: "Analisando suas respostas...", 
    subtext: "Processando dados de preferência",
    icon: BarChart3,
    duration: 1500 
  },
  { 
    text: "Verificando perfil de cliente...", 
    subtext: "Validando elegibilidade",
    icon: Shield,
    duration: 1500 
  },
  { 
    text: "Buscando recompensas disponíveis...", 
    subtext: "Consultando estoque de prêmios",
    icon: Cpu,
    duration: 1500 
  },
  { 
    text: "Confirmando elegibilidade...", 
    subtext: "Preparando resultado final",
    icon: Award,
    duration: 1500 
  },
];

interface QuizAnalyzingViewProps {
  onComplete: () => void;
}

const QuizAnalyzingView = ({ onComplete }: QuizAnalyzingViewProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showContent, setShowContent] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = createAudioContext();
    
    setTimeout(() => setShowContent(true), 100);
    
    const totalDuration = analyzingSteps.reduce((acc, step) => acc + step.duration, 0);
    
    let elapsed = 0;
    analyzingSteps.forEach((step, index) => {
      setTimeout(() => {
        // Play sound feedback when step completes
        if (audioContextRef.current) {
          if (index === analyzingSteps.length - 1) {
            playFinalSuccessSound(audioContextRef.current);
          } else {
            playStepCompleteSound(audioContextRef.current, index);
          }
        }
        
        setCompletedSteps(prev => [...prev, index]);
        if (index < analyzingSteps.length - 1) {
          setCurrentStep(index + 1);
        }
      }, elapsed + step.duration);
      
      elapsed += step.duration;
    });

    const timer = setTimeout(() => {
      onComplete();
    }, totalDuration + 800);

    return () => {
      clearTimeout(timer);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [onComplete]);

  const progress = ((completedSteps.length) / analyzingSteps.length) * 100;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className={`flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Animated Icon */}
        <div className="relative mb-8">
          {/* Outer rings */}
          <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute -inset-8 border border-purple-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
          
          {/* Main circle */}
          <div className="relative w-28 h-28">
            {/* Spinning border */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin" style={{ animationDuration: '1.5s' }} />
            
            {/* Inner glow */}
            <div className="absolute inset-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm" />
            
            {/* Icon container */}
            <div className="absolute inset-2 bg-slate-800/80 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Processando Análise
          </h1>
          <p className="text-slate-400 max-w-xs mx-auto">
            Aguarde enquanto nosso sistema analisa suas respostas
          </p>
        </div>

        {/* Progress percentage */}
        <div className="mb-6">
          <div className="relative">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md mb-8">
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full transition-all duration-500 relative"
              style={{ 
                width: `${progress}%`,
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s linear infinite'
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="w-full max-w-md space-y-3">
          {analyzingSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = completedSteps.includes(index);
            const isCurrent = index === currentStep;
            const isPending = !isCompleted && !isCurrent;
            
            return (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                  isCompleted
                    ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
                    : isCurrent
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30"
                    : "bg-slate-800/30 border border-slate-700/30 opacity-40"
                }`}
              >
                {/* Icon */}
                <div className={`relative flex-shrink-0 ${isCurrent ? 'animate-pulse' : ''}`}>
                  {isCompleted ? (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-700/50 flex items-center justify-center">
                      <StepIcon className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${
                    isCompleted ? "text-green-400" : isCurrent ? "text-white" : "text-slate-500"
                  }`}>
                    {step.text}
                  </p>
                  <p className={`text-xs truncate ${
                    isCompleted ? "text-green-400/60" : isCurrent ? "text-slate-400" : "text-slate-600"
                  }`}>
                    {step.subtext}
                  </p>
                </div>

                {/* Status indicator */}
                {isCompleted && (
                  <span className="text-xs text-green-400 font-medium">Concluído</span>
                )}
                {isCurrent && (
                  <span className="text-xs text-blue-400 font-medium animate-pulse">Processando...</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Security badge */}
        <div className="mt-8 flex items-center gap-2 text-slate-500 text-xs">
          <Shield className="w-4 h-4" />
          <span>Análise segura e criptografada</span>
        </div>
      </div>

      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default QuizAnalyzingView;
