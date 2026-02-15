import { useEffect, useState } from "react";
import { Shield, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
const Presell = () => {
  const [progress, setProgress] = useState(0);

  // Google Ads tag (gtag.js) - apenas nesta página
  useEffect(() => {
    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-17820505536";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);
    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17820505536');
    `;
    document.head.appendChild(inlineScript);
    return () => {
      gtagScript.remove();
      inlineScript.remove();
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);
  const handleContinue = () => {
    window.location.href = "/vsl" + window.location.search;
  };

  // Calcula o stroke-dashoffset para o círculo (perímetro = 2 * PI * raio)
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress / 100 * circumference;
  return <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Xiaomi Logo */}
      <div className="mb-8 relative z-10">
        
      </div>

      {/* Content */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-blue-500/20">
          <Sparkles className="w-4 h-4" />
          <span>Promoção Exclusiva</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
          OFERTA <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">ESPECIAL</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg font-light">
          Preparando uma experiência exclusiva para você
        </p>
      </div>

      {/* Progress Circle */}
      <div className="w-full max-w-md mb-6 relative z-10">
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow behind circle */}
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse" />
              
              <svg className="w-36 h-36 transform -rotate-90 relative">
                <circle cx="72" cy="72" r={radius} stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-800" />
                <circle cx="72" cy="72" r={radius} stroke="url(#gradient)" strokeWidth="6" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-150" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-white">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-sky-400 rounded-full transition-all duration-150" style={{
              width: `${progress}%`
            }} />
            </div>
          </div>

          {progress < 100 ? <div className="flex items-center justify-center gap-2 text-slate-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="animate-pulse">Carregando sua oferta...</p>
            </div> : <div className="flex justify-center animate-fade-in">
              <Button onClick={handleContinue} className="group bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-400 hover:to-sky-400 text-white px-10 py-4 text-lg font-bold rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-blue-500/50">
                <span>Continuar</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>}
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-2 text-slate-400 relative z-10 mb-4">
        <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-slate-700/50">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-emerald-500" />
            <Lock className="h-4 w-4 text-emerald-500" />
          </div>
          <span className="text-sm font-medium">Ambiente 100% seguro</span>
        </div>
      </div>

      {/* Privacy & Terms Links */}
      <div className="flex items-center gap-4 relative z-10">
        <a href={"/privacidade" + window.location.search} className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
          Política de Privacidade
        </a>
        <span className="text-slate-700">|</span>
        <a href={"/termos" + window.location.search} className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
          Termos de Uso
        </a>
      </div>
    </div>;
};
export default Presell;
