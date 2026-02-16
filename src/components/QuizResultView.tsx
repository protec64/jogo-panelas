import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Star, CheckCircle2, Clock, ArrowRight, Trophy, Shield, Truck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import TestimonialsSection from "@/components/TestimonialsSection";

const playCelebrationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const duration = 0.15;
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      const startTime = audioContext.currentTime + index * duration;
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    });

    setTimeout(() => {
      const chordFreqs = [523.25, 659.25, 783.99];
      chordFreqs.forEach(freq => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.value = freq;
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.2, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        osc.start();
        osc.stop(audioContext.currentTime + 0.5);
      });
    }, notes.length * duration * 1000);
  } catch (error) {
    console.log('Audio not supported');
  }
};

const triggerVibration = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate([100, 50, 100, 50, 200]);
  }
};

const QuizResultView = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState({
    minutes: 14,
    seconds: 59
  });

  useEffect(() => {
    playCelebrationSound();
    triggerVibration();

    const colorPalettes = [
      ['#3B82F6', '#38BDF8', '#FFFFFF'],
      ['#60A5FA', '#06B6D4', '#0EA5E9'],
      ['#2563EB', '#3B82F6', '#60A5FA'],
      ['#06D6A0', '#118AB2', '#073B4C'],
      ['#38BDF8', '#0284C7', '#0369A1']
    ];

    const burstConfetti = () => {
      const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
    };
    burstConfetti();
    setTimeout(burstConfetti, 300);

    const starBurst = () => {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
      const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      confetti({ ...defaults, particleCount: 30, origin: { x: 0.5, y: 0.5 }, colors });
      confetti({ ...defaults, particleCount: 20, origin: { x: 0.3, y: 0.4 }, colors });
      confetti({ ...defaults, particleCount: 20, origin: { x: 0.7, y: 0.4 }, colors });
    };
    setTimeout(starBurst, 600);

    const duration = 4000;
    const end = Date.now() + duration;
    
    const frame = () => {
      const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors, shapes: ['circle', 'square'], scalar: 1.2 });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors, shapes: ['circle', 'square'], scalar: 1.2 });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    const fireworkInterval = setInterval(() => {
      const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const x = 0.2 + Math.random() * 0.6;
      const y = 0.2 + Math.random() * 0.3;
      confetti({ particleCount: 50, startVelocity: 25, spread: 360, origin: { x, y }, colors, ticks: 50, gravity: 0.8, decay: 0.94, shapes: ['circle'] });
    }, 800);

    setTimeout(() => clearInterval(fireworkInterval), 4000);
    setTimeout(() => setShowContent(true), 500);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        else if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-6 relative z-10 overflow-y-auto">
        {/* Winner Badge - Compact */}
        <div className={`transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full blur-md opacity-60 animate-pulse" />
              <div className="relative bg-gradient-to-r from-sky-400 via-blue-500 to-blue-600 p-2.5 rounded-full">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-left">
              <p className="text-blue-400 font-bold text-xs uppercase tracking-widest">🎉 Parabéns!</p>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Você Foi <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Selecionado!</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Prize Card */}
        <div className={`w-full max-w-md transition-all duration-700 delay-300 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-500 rounded-3xl blur opacity-30" />
            
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }} />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-3">
                    <Gift className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Prêmio Exclusivo</span>
                  </div>
                  <h2 className="text-white text-2xl font-bold">Conjunto Brinox Premium</h2>
                  <p className="text-white/90 text-sm mt-1">5 Peças • Cerâmico • Antiaderente</p>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative bg-gradient-to-b from-slate-50 to-white p-6">
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    100% GRÁTIS
                  </div>
                </div>
                <img 
                  src="https://images.tcdn.com.br/img/img_prod/650396/conjunto_de_panelas_brinox_ceramic_life_smart_plus_5_pecas_vermelho_4791_3_20201015172356.jpg" 
                  alt="Conjunto Brinox Premium" 
                  className="h-56 w-full object-contain drop-shadow-xl" 
                />
              </div>

              {/* Benefits */}
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-100">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Produto Novinho em Folha</p>
                      <p className="text-xs text-slate-500">Original com nota fiscal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Garantia de 1 Ano</p>
                      <p className="text-xs text-slate-500">Cobertura total inclusa</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className="bg-blue-500/10 p-2 rounded-lg">
                      <Truck className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Pague Apenas o Envio</p>
                      <p className="text-xs text-slate-500">Entrega em todo Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Urgency Timer */}
              <div className="mx-6 my-4">
                <div className="bg-gradient-to-r from-red-50 to-blue-50 border border-red-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-xl">
                        <Clock className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-red-700 text-xs font-medium">Oferta expira em</p>
                        <p className="text-red-600 text-2xl font-bold tabular-nums">
                          {String(countdown.minutes).padStart(2, '0')}:{String(countdown.seconds).padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-500 text-xs">Restam apenas</p>
                      <p className="text-blue-500 font-bold text-lg">3 unidades</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6 pt-2">
                <Button 
                  onClick={() => navigate("/loja")} 
                  className="w-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white font-bold py-7 rounded-2xl text-lg shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Resgatar Meu Prêmio Agora
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <p className="text-slate-500 text-xs">Seus dados estão protegidos e seguros</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Elements */}
        <div className={`mt-8 transition-all duration-700 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-slate-400 text-sm text-center">
              Avaliação <span className="text-white font-semibold">4.9/5</span> • Mais de <span className="text-white font-semibold">50.000</span> ganhadores
            </p>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {['M', 'J', 'A', 'P'].map((letter, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-slate-800"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs">+127 pessoas resgataram hoje</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <TestimonialsSection show={showContent} />
      </main>
    </div>
  );
};

export default QuizResultView;
