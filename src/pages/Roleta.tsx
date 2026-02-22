import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import brinoxLogo from "@/assets/brinox-logo.svg";

const SPIN_DURATION = 4000;

const Roleta = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showRetryModal, setShowRetryModal] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [lightPhase, setLightPhase] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastSegmentRef = useRef<number>(0);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const loseAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    tickAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    tickAudioRef.current.volume = 0.15;
    tickAudioRef.current.load();
    winAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3');
    winAudioRef.current.volume = 0.5;
    winAudioRef.current.load();
    loseAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3');
    loseAudioRef.current.volume = 0.4;
    loseAudioRef.current.load();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLightPhase(prev => (prev + 1) % 2);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const segments = useMemo(() => [
    { text: "BRINOX", subtext: "GRÁTIS", color1: "#2563EB", color2: "#1D4ED8", icon: "🎁" },
    { text: "75%", subtext: "DESCONTO", color1: "#7C3AED", color2: "#6D28D9", icon: "💎" },
    { text: "50%", subtext: "DESCONTO", color1: "#DC2626", color2: "#B91C1C", icon: "🔥" },
    { text: "TENTE", subtext: "NOVAMENTE", color1: "#059669", color2: "#047857", icon: "🍀", isRetry: true },
    { text: "25%", subtext: "DESCONTO", color1: "#0891B2", color2: "#0E7490", icon: "⭐" },
    { text: "TENTE", subtext: "NOVAMENTE", color1: "#DB2777", color2: "#BE185D", icon: "🍀", isRetry: true },
    { text: "5%", subtext: "DESCONTO", color1: "#EA580C", color2: "#C2410C", icon: "✨" },
    { text: "TENTE", subtext: "NOVAMENTE", color1: "#4F46E5", color2: "#4338CA", icon: "🍀", isRetry: true },
  ], []);

  const triggerConfetti = useCallback(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#FFD700', '#FFA500', '#FF6347', '#3B82F6', '#FFFFFF'] });
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#FFD700', '#3B82F6', '#FFFFFF'] });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#FFD700', '#3B82F6', '#FFFFFF'] });
    }, 200);
  }, []);

  const playTick = useCallback(() => {
    if (tickAudioRef.current) {
      tickAudioRef.current.currentTime = 0;
      tickAudioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!isSpinning) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }
    const segmentAngle = 360 / 8;
    const startTime = Date.now();
    const totalRotation = rotation;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentRotation = totalRotation * easeOut;
      const normalizedRotation = currentRotation % 360;
      const currentSegment = Math.floor(normalizedRotation / segmentAngle);
      if (currentSegment !== lastSegmentRef.current) {
        playTick();
        lastSegmentRef.current = currentSegment;
      }
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isSpinning, rotation, playTick]);

  const handleSpin = () => {
    if (isSpinning || spinCount >= 3) return;
    setIsSpinning(true);
    lastSegmentRef.current = 0;
    const spins = 8;
    const segmentAngle = 360 / 8;
    let targetSegment = 0;
    if (spinCount === 0) targetSegment = 3;
    else if (spinCount === 1) targetSegment = 5;
    else targetSegment = 0;
    const desiredFinalAngle = 360 - (targetSegment * segmentAngle + segmentAngle / 2);
    const currentAngle = rotation % 360;
    const additionalRotation = (desiredFinalAngle - currentAngle + 360) % 360;
    const totalRotation = rotation + spins * 360 + additionalRotation;
    setRotation(totalRotation);
    setTimeout(() => {
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);
      if (spinCount < 2) {
        setIsShaking(true);
        if (loseAudioRef.current) { loseAudioRef.current.currentTime = 0; loseAudioRef.current.play().catch(() => {}); }
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 100]);
        setTimeout(() => { setIsShaking(false); setShowRetryModal(true); }, 600);
      } else {
        triggerConfetti();
        if (winAudioRef.current) { winAudioRef.current.currentTime = 0; winAudioRef.current.play().catch(() => {}); }
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        setShowWinModal(true);
      }
    }, SPIN_DURATION);
  };

  const handleRetry = () => setShowRetryModal(false);
  const handleContinue = () => navigate("/loja?premio=brinox");

  const numLights = 28;
  const lights = useMemo(() => Array.from({ length: numLights }, (_, i) => ({ angle: (i * 360) / numLights, index: i })), []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center justify-center px-4 py-8 overflow-hidden relative">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          10% { transform: translateX(-10px) rotate(-2deg); }
          20% { transform: translateX(10px) rotate(2deg); }
          30% { transform: translateX(-10px) rotate(-2deg); }
          40% { transform: translateX(10px) rotate(2deg); }
          50% { transform: translateX(-8px) rotate(-1deg); }
          60% { transform: translateX(8px) rotate(1deg); }
          70% { transform: translateX(-6px) rotate(-1deg); }
          80% { transform: translateX(6px) rotate(1deg); }
          90% { transform: translateX(-4px) rotate(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" 
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 w-full h-full"
          style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 50%)' }} />
        {/* Subtle star particles */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white/20 rounded-full" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animation: `glow-pulse ${2 + Math.random() * 3}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-3 flex flex-col items-center">
        <img src={brinoxLogo} alt="Logo" className="h-8 brightness-0 invert opacity-80" />
        <p className="text-gray-500 text-xs tracking-[0.2em] uppercase mt-2">Promoção Especial</p>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-xl md:text-2xl font-bold text-white text-center mb-6 px-4">
        Gire a Roleta e Ganhe seu{" "}
        <span className="text-transparent bg-clip-text" style={{
          backgroundImage: 'linear-gradient(135deg, #60A5FA, #A78BFA, #60A5FA)',
          backgroundSize: '200% auto',
          animation: 'shimmer 3s linear infinite'
        }}>Prêmio!</span>
      </h1>

      {/* Wheel Container */}
      <div className={`relative z-10`} style={{ animation: isShaking ? 'shake 0.6s ease-in-out' : 'none' }}>
        <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">

          {/* Outer glow ring */}
          <div className="absolute -inset-4 rounded-full" style={{
            background: 'conic-gradient(from 0deg, rgba(59,130,246,0.3), rgba(139,92,246,0.3), rgba(236,72,153,0.3), rgba(59,130,246,0.3))',
            filter: 'blur(20px)', animation: 'glow-pulse 3s ease-in-out infinite'
          }} />

          {/* Light bulbs ring */}
          <div className="absolute -inset-2">
            {lights.map(({ angle, index }) => {
              const isActive = index % 2 === lightPhase;
              const r = 50;
              const rad = (angle - 90) * Math.PI / 180;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              return (
                <div key={index} className="absolute rounded-full" style={{
                  width: '10px', height: '10px',
                  left: `calc(${x}% - 5px)`, top: `calc(${y}% - 5px)`,
                  background: isActive
                    ? 'radial-gradient(circle, #FFF 20%, #FFD700 60%, rgba(255,215,0,0) 100%)'
                    : 'radial-gradient(circle, rgba(255,255,255,0.3) 20%, rgba(100,100,120,0.5) 60%, transparent 100%)',
                  boxShadow: isActive ? '0 0 8px 3px rgba(255,215,0,0.6), 0 0 2px 1px rgba(255,255,255,0.8)' : 'none',
                  transition: 'all 0.2s ease',
                }} />
              );
            })}
          </div>

          {/* Chrome outer ring */}
          <div className="absolute inset-2 rounded-full" style={{
            background: 'conic-gradient(from 0deg, #888 0%, #ddd 10%, #888 20%, #ddd 30%, #888 40%, #ddd 50%, #888 60%, #ddd 70%, #888 80%, #ddd 90%, #888 100%)',
            padding: '4px',
          }}>
            {/* Dark inner border */}
            <div className="w-full h-full rounded-full bg-[#1a1a2e] p-[3px]">
              {/* Gold trim */}
              <div className="w-full h-full rounded-full" style={{
                background: 'linear-gradient(135deg, #B8860B, #DAA520, #FFD700, #DAA520, #B8860B)',
                padding: '2px',
              }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
                }}>
                  {/* Wheel SVG */}
                  <div className="w-full h-full rounded-full relative" style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? `transform ${SPIN_DURATION / 1000}s cubic-bezier(0.15, 0.60, 0.07, 1.00)` : 'none',
                  }}>
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        {segments.map((seg, i) => {
                          const angle = 360 / 8;
                          const midAngle = i * angle + angle / 2 - 90;
                          const midRad = midAngle * Math.PI / 180;
                          return (
                            <radialGradient key={`rg-${i}`} id={`rg-${i}`} cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor={seg.color1} stopOpacity="0.9" />
                              <stop offset="60%" stopColor={seg.color1} stopOpacity="1" />
                              <stop offset="100%" stopColor={seg.color2} stopOpacity="1" />
                            </radialGradient>
                          );
                        })}
                        <filter id="inner-shadow">
                          <feFlood floodColor="rgba(0,0,0,0.3)" />
                          <feComposite in2="SourceAlpha" operator="in" />
                          <feGaussianBlur stdDeviation="2" />
                          <feComposite in2="SourceAlpha" operator="in" />
                          <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {segments.map((seg, i) => {
                        const angle = 360 / 8;
                        const startAngle = i * angle - 90;
                        const endAngle = startAngle + angle;
                        const startRad = startAngle * Math.PI / 180;
                        const endRad = endAngle * Math.PI / 180;
                        const r = 100;
                        const x1 = 100 + r * Math.cos(startRad);
                        const y1 = 100 + r * Math.sin(startRad);
                        const x2 = 100 + r * Math.cos(endRad);
                        const y2 = 100 + r * Math.sin(endRad);
                        const pathData = `M 100 100 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
                        const midAngle = startAngle + angle / 2;
                        const midRad = midAngle * Math.PI / 180;
                        const textR = 62;
                        const textX = 100 + textR * Math.cos(midRad);
                        const textY = 100 + textR * Math.sin(midRad);
                        const iconR = 78;
                        const iconX = 100 + iconR * Math.cos(midRad);
                        const iconY = 100 + iconR * Math.sin(midRad);

                        return (
                          <g key={i}>
                            <path d={pathData} fill={`url(#rg-${i})`} stroke="rgba(0,0,0,0.4)" strokeWidth="0.5" filter="url(#inner-shadow)" />
                            {/* Highlight stripe */}
                            <path d={pathData} fill="url(#rg-${i})" opacity="0" />
                            {/* Divider lines (gold) */}
                            <line x1="100" y1="100" x2={x1} y2={y1} stroke="rgba(218,165,32,0.4)" strokeWidth="0.8" />
                            <g transform={`translate(${iconX}, ${iconY}) rotate(${midAngle + 90})`}>
                              <text textAnchor="middle" fontSize="10" dy="4">{seg.icon}</text>
                            </g>
                            <g transform={`translate(${textX}, ${textY}) rotate(${midAngle + 90})`}>
                              <text textAnchor="middle" fill="#FFF" fontSize={seg.isRetry ? "8" : "12"} fontWeight="900" dy="-2"
                                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)', letterSpacing: '0.5px' }}>
                                {seg.text}
                              </text>
                              <text textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="7" fontWeight="700" dy="8"
                                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                {seg.subtext}
                              </text>
                            </g>
                          </g>
                        );
                      })}

                      {/* Center metallic disc */}
                      <circle cx="100" cy="100" r="22" fill="url(#center-metal)" stroke="#DAA520" strokeWidth="1.5" />
                      <defs>
                        <radialGradient id="center-metal" cx="40%" cy="35%">
                          <stop offset="0%" stopColor="#555" />
                          <stop offset="50%" stopColor="#333" />
                          <stop offset="100%" stopColor="#1a1a1a" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center button (on top of wheel) */}
          <div onClick={handleSpin}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${
              isSpinning || spinCount >= 3 ? 'cursor-not-allowed' : 'cursor-pointer group'
            }`}>
            {!isSpinning && spinCount < 3 && (
              <div className="absolute inset-0 -m-3 rounded-full animate-ping" style={{
                background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)'
              }} />
            )}
            <div className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full transition-transform duration-200" 
              style={{
                background: 'linear-gradient(145deg, #DAA520, #B8860B, #8B6914)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3), 0 0 20px rgba(218,165,32,0.3)',
                transform: (!isSpinning && spinCount < 3) ? undefined : undefined,
              }}>
              <div className="absolute inset-[3px] rounded-full flex items-center justify-center" style={{
                background: 'linear-gradient(145deg, #2a2a3e, #1a1a2e)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
              }}>
                <div className="flex flex-col items-center">
                  <span className="text-[#FFD700] font-black text-sm md:text-base tracking-wider" style={{
                    textShadow: '0 0 10px rgba(255,215,0,0.5)'
                  }}>GIRE</span>
                  <div className="w-8 h-[2px] bg-gradient-to-r from-transparent via-[#DAA520] to-transparent mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Pointer / Marker */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30" style={{ animation: 'float 2s ease-in-out infinite' }}>
            <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
              <defs>
                <linearGradient id="pointer-grad" x1="22" y1="0" x2="22" y2="52" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <filter id="pointer-shadow" x="-4" y="-2" width="52" height="60">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.5)" />
                </filter>
              </defs>
              <path d="M22 48 L4 8 Q2 3 7 2 L37 2 Q42 3 40 8 Z" fill="url(#pointer-grad)" filter="url(#pointer-shadow)" stroke="#8B6914" strokeWidth="1" />
              <path d="M22 42 L10 10 L34 10 Z" fill="rgba(255,255,255,0.1)" />
              <circle cx="22" cy="10" r="4" fill="#1a1a2e" stroke="#FFD700" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <button onClick={handleSpin} disabled={isSpinning || spinCount >= 3}
        className={`relative z-10 mt-10 px-14 py-4 text-lg font-bold text-white rounded-full transition-all transform ${
          isSpinning || spinCount >= 3
            ? "bg-gray-700 cursor-not-allowed scale-95 text-gray-400"
            : "hover:scale-105 active:scale-95"
        }`}
        style={!(isSpinning || spinCount >= 3) ? {
          background: 'linear-gradient(135deg, #DAA520, #B8860B)',
          boxShadow: '0 4px 20px rgba(218,165,32,0.4), 0 0 40px rgba(218,165,32,0.15), inset 0 1px 1px rgba(255,255,255,0.2)',
          letterSpacing: '0.1em',
        } : { letterSpacing: '0.1em' }}>
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            GIRANDO...
          </span>
        ) : spinCount >= 3 ? "🎉 VOCÊ GANHOU!" : spinCount >= 1 ? `🍀 TENTAR NOVAMENTE (${3 - spinCount}ª chance)` : "GIRAR AGORA"}
      </button>

      <p className="relative z-10 mt-5 text-gray-600 text-xs text-center max-w-sm">
        Promoção válida por tempo limitado. Ao girar, você concorda com os termos da promoção.
      </p>

      {/* Retry Modal */}
      {showRetryModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-3xl font-bold text-white mb-2">QUE PENA!</h2>
              <p className="text-amber-400 text-xl font-semibold mb-4">Você caiu em "Tente Novamente"</p>
              <div className="rounded-xl p-4 mb-6 border border-white/10" style={{
                background: 'linear-gradient(135deg, rgba(218,165,32,0.1), rgba(139,92,246,0.1))'
              }}>
                <p className="text-gray-300 text-sm">
                  Mas não desista! Você tem direito a <span className="text-[#FFD700] font-bold">mais uma chance</span> de ganhar seu prêmio!
                </p>
              </div>
              <button onClick={handleRetry}
                className="w-full py-4 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 4px 20px rgba(5,150,105,0.3)' }}>
                🍀 GIRAR NOVAMENTE
              </button>
              <p className="mt-4 text-gray-500 text-xs">⚠️ Última chance disponível</p>
            </div>
          </div>
        </div>
      )}

      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1e] rounded-3xl p-8 max-w-md w-full border border-[#DAA520]/30 shadow-2xl animate-scale-in"
            style={{ boxShadow: '0 0 60px rgba(218,165,32,0.2)' }}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">PARABÉNS!</h2>
              <p className="text-[#FFD700] text-xl font-semibold mb-4">Você ganhou um Brinox GRÁTIS!</p>
              <div className="rounded-xl p-4 mb-6 border border-[#DAA520]/20" style={{
                background: 'linear-gradient(135deg, rgba(218,165,32,0.1), rgba(59,130,246,0.1))'
              }}>
                <p className="text-gray-300 text-sm">
                  Complete o cadastro rápido para confirmar seu prêmio e receber seu kit de panelas Brinox.
                </p>
              </div>
              <button onClick={handleContinue}
                className="w-full py-4 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:scale-[1.02] active:scale-95"
                style={{ background: 'linear-gradient(135deg, #DAA520, #B8860B)', boxShadow: '0 4px 20px rgba(218,165,32,0.4)' }}>
                RESGATAR MEU PRÊMIO →
              </button>
              <p className="mt-4 text-gray-500 text-xs">⏰ Oferta expira em 10 minutos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roleta;
