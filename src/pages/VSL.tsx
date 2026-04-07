import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, ChevronDown, Shield, CheckCircle, Gift, Clock, Users, Sparkles, Award, Zap, Trophy, Package, Flame, BadgeCheck, Lock, ArrowRight } from "lucide-react";
import brandLogo from "@/assets/brinox-logo.svg";

const reviews = [{
  id: 1,
  name: "Maria Silva",
  location: "São Paulo, SP",
  date: "há 2 horas",
  rating: 5,
  text: "Gente, eu GIREI A ROLETA e ganhei o conjunto de panelas!! 🎰🍳 Achei que era brincadeira, mas o kit chegou em 5 dias, lacrado na caixa! Só paguei o frete de R$47,90. Melhor sorte da minha vida!",
  image: "https://randomuser.me/api/portraits/women/32.jpg",
  verified: true
}, {
  id: 2,
  name: "Carlos Eduardo",
  location: "Rio de Janeiro, RJ",
  date: "há 5 horas",
  rating: 5,
  text: "Fiz o quiz, girei a roleta e NÃO ACREDITO que ganhei o jogo de talheres! 🎉🔥 A roleta parou exatamente no prêmio! Produto 100% original com nota fiscal. Minha esposa achou que era golpe, agora ela quer girar também kkk",
  image: "https://randomuser.me/api/portraits/men/45.jpg",
  verified: true
}, {
  id: 3,
  name: "Ana Beatriz",
  location: "Belo Horizonte, MG",
  date: "há 8 horas",
  rating: 5,
  text: "Respondi o quiz da promoção, cliquei em GIRAR e a roleta rodou... parou no CONJUNTO DE PANELAS! 😱🎰 Chorei de emoção! Meu kit chegou hoje, qualidade incrível! Obrigada equipe!",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  verified: true
}, {
  id: 4,
  name: "Pedro Henrique",
  location: "Curitiba, PR",
  date: "há 12 horas",
  rating: 5,
  text: "Tentei a sorte na roleta depois do quiz... GANHEI NA PRIMEIRA TENTATIVA! 🎯🍳 A frigideira veio lacrada, original, com garantia de 1 ano. Ainda não acredito que só paguei o frete!",
  image: "https://randomuser.me/api/portraits/men/22.jpg",
  verified: true
}, {
  id: 5,
  name: "Juliana Costa",
  location: "Salvador, BA",
  date: "há 1 dia",
  rating: 5,
  text: "Eu girava e pensava 'não vai dar em nada'... A ROLETA PAROU NO PRÊMIO MÁXIMO! 🏆🎰 Conjunto original na minha cozinha! Já indiquei pra toda família girar também!",
  image: "https://randomuser.me/api/portraits/women/28.jpg",
  verified: true
}];

const VSL = () => {
  const navigate = useNavigate();
  const [onlineUsers, setOnlineUsers] = useState(1247);
  const [remainingSpots, setRemainingSpots] = useState(23);

  const handleParticipate = () => {
    navigate("/sd");
  };

  // Simulate online users and spots fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => Math.max(1100, prev + Math.floor(Math.random() * 7) - 3));
      setRemainingSpots(prev => Math.max(5, prev - (Math.random() > 0.7 ? 1 : 0)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Load Vturb player script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/822b40d4-cbe3-4cfb-b071-1fb6b2561def/players/69ccace912f1a486e4190b09/v4/player.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Ambient background effects - hidden on mobile for performance */}
      <div className="fixed inset-0 pointer-events-none hidden md:block">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Floating particles - reduced on mobile */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden sm:block">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Urgency Bar - Fixed Top */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 py-2 px-2 sm:px-4 shadow-lg shadow-blue-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm relative">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 animate-pulse" />
          <span className="font-bold text-white">ATENÇÃO:</span>
          <span className="text-white/90 hidden xs:inline">Restam apenas</span>
          <span className="bg-white text-blue-600 font-black px-1.5 sm:px-2 py-0.5 rounded text-xs sm:text-sm">{remainingSpots}</span>
          <span className="text-white/90">vagas!</span>
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300 animate-pulse" />
        </div>
      </div>

      {/* Live Counter Bar */}
      <div className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 py-2 sm:py-3 px-2 sm:px-4 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 sm:gap-6 md:gap-10 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="relative">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full animate-ping absolute" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full relative" />
            </div>
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
            <span className="font-semibold text-white">{onlineUsers.toLocaleString()}</span>
            <span className="text-slate-400 hidden sm:inline">assistindo</span>
          </div>
          <div className="h-3 sm:h-4 w-px bg-slate-600" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-sky-400">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="font-medium text-xs sm:text-sm">Oferta limitada</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 md:py-12">
        {/* Premium Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity animate-pulse hidden sm:block" />
            <div className="relative inline-flex items-center gap-2 sm:gap-3 bg-slate-900/90 backdrop-blur-sm text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-blue-500/30">
              <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-blue-300 bg-clip-text text-transparent font-semibold">
                Promoção Oficial
              </span>
              <img src={brandLogo} alt="Logo" className="h-4 sm:h-5" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight mb-2 sm:mb-3 px-2">
            Descubra Como Ganhar um{" "}
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
              Kit de Cozinha Premium
            </span>{" "}
            Original
          </h1>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg font-light px-4">
            Assista o vídeo e participe da promoção exclusiva
          </p>
        </div>

        {/* Video Section with Premium Frame */}
        <div className="relative mb-5 sm:mb-8">
          {/* Glow effects - reduced on mobile */}
          <div className="absolute -inset-3 sm:-inset-6 bg-gradient-to-r from-blue-500/20 via-sky-500/30 to-blue-500/20 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl animate-pulse hidden sm:block" />
          <div className="absolute -inset-1.5 sm:-inset-3 bg-gradient-to-r from-blue-500/30 via-sky-500/40 to-blue-500/30 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl hidden sm:block" />
          
          {/* Premium border frame */}
          <div className="relative p-[2px] sm:p-[3px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 via-sky-400 to-blue-500 shadow-xl sm:shadow-2xl shadow-blue-500/20">
            <div className="bg-slate-950 rounded-xl sm:rounded-2xl overflow-hidden">
              <div dangerouslySetInnerHTML={{
                __html: `<vturb-smartplayer id="vid-697e978d6300fb8f8edef138" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>`
              }} />
            </div>
          </div>
          
          {/* Decorative corners - hidden on mobile */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400/60 rounded-tl-lg hidden sm:block" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-blue-400/60 rounded-tr-lg hidden sm:block" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-blue-400/60 rounded-bl-lg hidden sm:block" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400/60 rounded-br-lg hidden sm:block" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 border border-white/5 text-center">
            <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 mx-auto mb-0.5 sm:mb-1" />
            <p className="text-white text-[9px] sm:text-[10px] md:text-xs font-medium">Original</p>
            <p className="text-slate-500 text-[8px] sm:text-[9px] md:text-[10px] hidden xs:block">Lacrado</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 border border-white/5 text-center">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 mx-auto mb-0.5 sm:mb-1" />
            <p className="text-white text-[9px] sm:text-[10px] md:text-xs font-medium">Garantia</p>
            <p className="text-slate-500 text-[8px] sm:text-[9px] md:text-[10px] hidden xs:block">1 ano</p>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 border border-white/5 text-center">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 mx-auto mb-0.5 sm:mb-1" />
            <p className="text-white text-[9px] sm:text-[10px] md:text-xs font-medium">Envio Rápido</p>
            <p className="text-slate-500 text-[8px] sm:text-[9px] md:text-[10px] hidden xs:block">Brasil</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block group">
            {/* Outer glow */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-emerald-500/40 via-green-500/50 to-emerald-500/40 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
            
            {/* Pulse ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg sm:rounded-xl animate-ping opacity-20" />
            
            <button onClick={handleParticipate} className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-400 text-white font-black text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl shadow-green-500/40 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide sm:tracking-wider flex items-center gap-2 sm:gap-3">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Quero Participar</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          
          <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-1.5 text-slate-400">
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
              <span>100% Seguro</span>
            </div>
            <div className="h-2.5 sm:h-3 w-px bg-slate-700" />
            <div className="flex items-center gap-1 sm:gap-1.5 text-slate-400">
              <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
              <span>Sem compromisso</span>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof Ticker */}
      <div className="bg-slate-900/80 border-y border-white/5 py-2 sm:py-3 overflow-hidden">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 sm:gap-8 mx-2 sm:mx-4">
              <span className="text-slate-400 text-xs sm:text-sm">🎉 Maria de SP ganhou</span>
              <span className="text-blue-400">•</span>
              <span className="text-slate-400 text-xs sm:text-sm">🏆 Carlos do RJ resgatou</span>
              <span className="text-blue-400">•</span>
              <span className="text-slate-400 text-xs sm:text-sm">🍳 Ana de MG recebeu!</span>
              <span className="text-blue-400">•</span>
              <span className="text-slate-400 text-xs sm:text-sm">🔥 +7.632 ganhadores</span>
              <span className="text-blue-400">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <section className="relative bg-gradient-to-b from-slate-900/50 to-slate-950 py-8 sm:py-14 md:py-18 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          {/* Reviews Header */}
          <div className="text-center mb-6 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Depoimentos Verificados
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5 sm:mb-2">
              Quem <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">participou</span> e ganhou
            </h2>
            <p className="text-slate-400 font-light text-xs sm:text-sm">Confira os depoimentos de quem já resgatou seu prêmio</p>
          </div>

          {/* Rating Card */}
          <div className="relative mb-5 sm:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-blue-500/10 rounded-xl sm:rounded-2xl blur-xl hidden sm:block" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              {/* Rating */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-0.5 sm:gap-1">
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">4.9</span>
                    <span className="text-lg sm:text-xl text-slate-500">/5</span>
                  </div>
                  <div className="flex mt-1.5 sm:mt-2 justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-amber-400/50 fill-amber-400/50"} drop-shadow-lg`} />)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 sm:mt-2 font-light">7.632 avaliações</p>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                <button className="bg-gradient-to-r from-blue-500 to-sky-500 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/30">
                  Tudo (7,6mil)
                </button>
                <button className="bg-white/5 border border-white/10 text-slate-300 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-white/10 transition-all">
                  Com Mídia
                </button>
                <button className="bg-white/5 border border-white/10 text-slate-300 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-1">
                  Estrela <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-3 sm:space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="group relative bg-slate-900/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-3.5 sm:p-5 border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                {/* Hover glow - hidden on mobile */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
                
                {/* User Info */}
                <div className="relative flex items-start gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full opacity-50 blur-sm hidden sm:block" />
                    <img src={review.image} alt={review.name} className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-white/20" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm sm:text-base">{review.name}</span>
                      {review.verified && (
                        <span className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-emerald-400 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium border border-emerald-500/20">
                          <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          Verificado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500 mt-0.5">
                      <span>{review.location}</span>
                      <span className="text-slate-700">•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-2 sm:mb-3">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${star <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />)}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{review.text}</p>
              </div>
            ))}

            {/* More Reviews Button */}
            <div className="text-center pt-3 sm:pt-4">
              <button className="group inline-flex items-center gap-1.5 sm:gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors text-xs sm:text-sm">
                <span>+7.632 outras avaliações</span>
                <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-950 text-white py-8 sm:py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          {/* Logo */}
          <div className="flex justify-center mb-5 sm:mb-8">
            <img src={brandLogo} alt="Logo" className="h-6 sm:h-8 brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
          </div>

          {/* Trust Badges */}
          <div className="text-center mb-5 sm:mb-8">
            <p className="text-slate-500 text-[10px] sm:text-xs mb-3 sm:mb-4 font-light tracking-wide uppercase">Promoção certificada</p>
            <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg backdrop-blur-sm border border-white/10">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Norton</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg backdrop-blur-sm border border-white/10">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Google Safe</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg backdrop-blur-sm border border-white/10">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 fill-emerald-400" />
                <span className="text-[10px] sm:text-xs text-slate-300 font-medium">Reclame Aqui</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Link to="/privacidade" className="text-slate-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">
              Privacidade
            </Link>
            <span className="text-slate-600">|</span>
            <Link to="/termos" className="text-slate-400 hover:text-blue-400 transition-colors text-xs sm:text-sm">
              Termos
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-[10px] sm:text-xs text-slate-600 border-t border-white/5 pt-4 sm:pt-6 px-2">
            <p>
              © 2026 Kit Panelas Brasil | CNPJ: 35.527.587/0001-12
            </p>
          </div>
        </div>
      </footer>

      {/* Custom animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default VSL;
