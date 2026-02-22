import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import brinoxLogo from "@/assets/brinox-logo.svg";

const SPIN_DURATION = 5000;

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
    const interval = setInterval(() => setLightPhase(prev => (prev + 1) % 3), 350);
    return () => clearInterval(interval);
  }, []);

  const segments = useMemo(() => [
    { text: "BRINOX", subtext: "GRÁTIS", color1: "#1a6bc4", color2: "#0d3f7a", accent: "#60a5fa" },
    { text: "75%", subtext: "OFF", color1: "#8b1a8b", color2: "#5c105c", accent: "#c084fc" },
    { text: "50%", subtext: "OFF", color1: "#b91c1c", color2: "#7f1d1d", accent: "#f87171" },
    { text: "TENTE", subtext: "DE NOVO", color1: "#047857", color2: "#064e3b", accent: "#34d399", isRetry: true },
    { text: "25%", subtext: "OFF", color1: "#0e7490", color2: "#164e63", accent: "#22d3ee" },
    { text: "TENTE", subtext: "DE NOVO", color1: "#9d174d", color2: "#831843", accent: "#f472b6", isRetry: true },
    { text: "5%", subtext: "OFF", color1: "#c2410c", color2: "#7c2d12", accent: "#fb923c" },
    { text: "TENTE", subtext: "DE NOVO", color1: "#3730a3", color2: "#1e1b4b", accent: "#818cf8", isRetry: true },
  ], []);

  const triggerConfetti = useCallback(() => {
    const fire = (opts: confetti.Options) => confetti({ ...opts, colors: ['#FFD700', '#FFA500', '#FF6347', '#3B82F6', '#FFFFFF', '#DAA520'] });
    fire({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    setTimeout(() => {
      fire({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0 } });
      fire({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1 } });
    }, 250);
  }, []);

  const playTick = useCallback(() => {
    if (tickAudioRef.current) { tickAudioRef.current.currentTime = 0; tickAudioRef.current.play().catch(() => {}); }
  }, []);

  useEffect(() => {
    if (!isSpinning) { if (animationRef.current) cancelAnimationFrame(animationRef.current); return; }
    const segmentAngle = 360 / 8;
    const startTime = Date.now();
    const totalRot = rotation;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const cur = totalRot * easeOut;
      const seg = Math.floor((cur % 360) / segmentAngle);
      if (seg !== lastSegmentRef.current) { playTick(); lastSegmentRef.current = seg; }
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isSpinning, rotation, playTick]);

  const handleSpin = () => {
    if (isSpinning || spinCount >= 3) return;
    setIsSpinning(true);
    lastSegmentRef.current = 0;
    const spins = 10;
    const segmentAngle = 360 / 8;
    const targetSegment = spinCount === 0 ? 3 : spinCount === 1 ? 5 : 0;
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

  const numLights = 32;
  const lightsData = useMemo(() => Array.from({ length: numLights }, (_, i) => i), []);

  // Build the wheel SVG segments
  const wheelSegments = useMemo(() => {
    const segs: JSX.Element[] = [];
    const n = segments.length;
    const angleEach = 360 / n;
    const R = 100;
    const cx = 100, cy = 100;

    segments.forEach((seg, i) => {
      const startDeg = i * angleEach - 90;
      const endDeg = startDeg + angleEach;
      const startRad = (startDeg * Math.PI) / 180;
      const endRad = (endDeg * Math.PI) / 180;

      const x1 = cx + R * Math.cos(startRad);
      const y1 = cy + R * Math.sin(startRad);
      const x2 = cx + R * Math.cos(endRad);
      const y2 = cy + R * Math.sin(endRad);

      const midDeg = startDeg + angleEach / 2;
      const midRad = (midDeg * Math.PI) / 180;

      const textR = 58;
      const tx = cx + textR * Math.cos(midRad);
      const ty = cy + textR * Math.sin(midRad);

      // Pin position (at the edge between segments)
      const pinR = 92;
      const pinX = cx + pinR * Math.cos(startRad);
      const pinY = cy + pinR * Math.sin(startRad);

      segs.push(
        <g key={i}>
          {/* Segment */}
          <path
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`}
            fill={seg.color1}
          />
          {/* Inner gradient overlay for depth */}
          <path
            d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`}
            fill="url(#segment-depth)"
          />
          {/* Subtle edge highlight */}
          <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

          {/* Metal divider pin */}
          <circle cx={pinX} cy={pinY} r="2.2" fill="url(#pin-gradient)" stroke="#8B7355" strokeWidth="0.3" />

          {/* Text */}
          <g transform={`translate(${tx}, ${ty}) rotate(${midDeg + 90})`}>
            <text textAnchor="middle" fill="#FFFFFF" fontSize={seg.isRetry ? "8" : "13"} fontWeight="900" dy="-2"
              style={{ textShadow: '0 2px 6px rgba(0,0,0,0.8)', letterSpacing: '1px' }}
              fontFamily="'Georgia', serif">
              {seg.text}
            </text>
            <text textAnchor="middle" fill={seg.accent} fontSize="6.5" fontWeight="700" dy="7"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
              fontFamily="'Georgia', serif">
              {seg.subtext}
            </text>
          </g>
        </g>
      );
    });
    return segs;
  }, [segments]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a1520 0%, #0d0a12 50%, #050308 100%)' }}>

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
        @keyframes casino-glow {
          0%, 100% { opacity: 0.3; filter: blur(30px); }
          50% { opacity: 0.6; filter: blur(40px); }
        }
        @keyframes bulb-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes btn-shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>

      {/* Casino ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(218,165,32,0.12) 0%, transparent 60%)', animation: 'casino-glow 4s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to top, rgba(139,69,19,0.06) 0%, transparent 100%)' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-2 flex flex-col items-center">
        <img src={brinoxLogo} alt="Logo" className="h-7 brightness-0 invert opacity-70" />
        <p className="text-[#c4a55a] text-[10px] tracking-[0.3em] uppercase mt-1.5 font-medium">Promoção Exclusiva</p>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-lg md:text-2xl font-bold text-white text-center mb-5 px-4" style={{ fontFamily: "'Georgia', serif" }}>
        Gire a Roleta e{" "}
        <span style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.3)' }}>Ganhe Prêmios!</span>
      </h1>

      {/* === WHEEL ASSEMBLY === */}
      <div className="relative z-10" style={{ animation: isShaking ? 'shake 0.6s ease-in-out' : 'none' }}>
        <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px]">

          {/* Outer wooden frame shadow */}
          <div className="absolute -inset-6 rounded-full" style={{
            background: 'radial-gradient(circle, transparent 55%, rgba(0,0,0,0.8) 100%)',
          }} />

          {/* Mahogany outer frame */}
          <div className="absolute -inset-4 rounded-full" style={{
            background: `
              radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, transparent 40%),
              conic-gradient(from 0deg, #5c3a1e, #8b5e3c, #6b4423, #a0714e, #5c3a1e, #7a4f30, #5c3a1e, #8b5e3c, #5c3a1e)
            `,
            boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.1), inset 0 -3px 8px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.8)',
          }} />

          {/* Brass ring */}
          <div className="absolute -inset-1 rounded-full" style={{
            background: `
              radial-gradient(circle at 35% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
              conic-gradient(from 45deg, #b8860b, #daa520, #ffd700, #daa520, #b8860b, #cd853f, #daa520, #ffd700, #daa520, #b8860b)
            `,
            boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.4)',
          }} />

          {/* Light bulbs ring - embedded in brass ring */}
          <div className="absolute -inset-3 rounded-full">
            {lightsData.map((i) => {
              const angle = (i * 360) / numLights;
              const rad = ((angle - 90) * Math.PI) / 180;
              const r = 50;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const phase = i % 3;
              const isLit = phase === lightPhase;
              return (
                <div key={i} className="absolute rounded-full" style={{
                  width: '8px', height: '8px',
                  left: `calc(${x}% - 4px)`, top: `calc(${y}% - 4px)`,
                  background: isLit
                    ? 'radial-gradient(circle at 40% 35%, #FFFBE6 0%, #FFD700 40%, #B8860B 100%)'
                    : 'radial-gradient(circle at 40% 35%, #8B7355 0%, #5c4a32 60%, #3d2e1a 100%)',
                  boxShadow: isLit
                    ? '0 0 6px 2px rgba(255,215,0,0.7), 0 0 12px 4px rgba(255,165,0,0.3), inset 0 -1px 2px rgba(139,69,19,0.4)'
                    : 'inset 0 1px 2px rgba(0,0,0,0.5), inset 0 -1px 1px rgba(255,255,255,0.05)',
                  border: isLit ? '0.5px solid rgba(255,215,0,0.6)' : '0.5px solid rgba(92,74,50,0.5)',
                  transition: 'all 0.15s ease',
                }} />
              );
            })}
          </div>

          {/* Inner dark border */}
          <div className="absolute inset-0 rounded-full" style={{
            background: '#0d0a0a',
            padding: '3px',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)',
          }}>
            {/* Thin gold inner trim */}
            <div className="w-full h-full rounded-full" style={{
              background: 'linear-gradient(145deg, #DAA520, #8B6914)',
              padding: '1.5px',
            }}>
              <div className="w-full h-full rounded-full overflow-hidden relative" style={{
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6), inset 0 0 80px rgba(0,0,0,0.3)',
              }}>
                {/* Spinning wheel */}
                <div className="w-full h-full rounded-full" style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? `transform ${SPIN_DURATION / 1000}s cubic-bezier(0.12, 0.6, 0.06, 1.00)` : 'none',
                }}>
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      {/* Depth overlay */}
                      <radialGradient id="segment-depth" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
                        <stop offset="50%" stopColor="rgba(0,0,0,0.1)" />
                        <stop offset="85%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                      </radialGradient>
                      {/* Specular highlight */}
                      <radialGradient id="specular" cx="38%" cy="30%" r="55%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </radialGradient>
                      {/* Pin metal gradient */}
                      <radialGradient id="pin-gradient" cx="35%" cy="30%">
                        <stop offset="0%" stopColor="#F5E6C8" />
                        <stop offset="40%" stopColor="#DAA520" />
                        <stop offset="100%" stopColor="#8B6914" />
                      </radialGradient>
                      {/* Center hub */}
                      <radialGradient id="hub-metal" cx="38%" cy="32%">
                        <stop offset="0%" stopColor="#F5E6C8" />
                        <stop offset="30%" stopColor="#DAA520" />
                        <stop offset="60%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#6B4F1D" />
                      </radialGradient>
                      <radialGradient id="hub-inner" cx="42%" cy="35%">
                        <stop offset="0%" stopColor="#2a2236" />
                        <stop offset="60%" stopColor="#1a1520" />
                        <stop offset="100%" stopColor="#0d0a12" />
                      </radialGradient>
                      <radialGradient id="hub-jewel" cx="40%" cy="35%">
                        <stop offset="0%" stopColor="#FFE55C" />
                        <stop offset="40%" stopColor="#FFD700" />
                        <stop offset="80%" stopColor="#B8860B" />
                        <stop offset="100%" stopColor="#8B6914" />
                      </radialGradient>
                    </defs>

                    {/* Segments */}
                    {wheelSegments}

                    {/* Full-wheel specular highlight */}
                    <circle cx="100" cy="100" r="99" fill="url(#specular)" />

                    {/* Center hub assembly */}
                    {/* Outer brass ring */}
                    <circle cx="100" cy="100" r="22" fill="url(#hub-metal)" stroke="#6B4F1D" strokeWidth="0.5" />
                    {/* Recessed dark area */}
                    <circle cx="100" cy="100" r="18" fill="url(#hub-inner)" stroke="#DAA520" strokeWidth="0.5" />
                    {/* Inner jewel/button */}
                    <circle cx="100" cy="100" r="10" fill="url(#hub-jewel)" stroke="#8B6914" strokeWidth="0.5" />
                    {/* Jewel highlight */}
                    <ellipse cx="97" cy="96" rx="4" ry="3" fill="rgba(255,255,255,0.25)" />
                    {/* Center dot */}
                    <circle cx="100" cy="100" r="2.5" fill="#6B4F1D" />
                    <circle cx="99" cy="99" r="1" fill="rgba(255,255,255,0.2)" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* POINTER / FLAPPER — casino style */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
            <svg width="48" height="60" viewBox="0 0 48 60" fill="none">
              <defs>
                <linearGradient id="ptr-main" x1="24" y1="0" x2="24" y2="60" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F5E6C8" />
                  <stop offset="30%" stopColor="#DAA520" />
                  <stop offset="70%" stopColor="#B8860B" />
                  <stop offset="100%" stopColor="#6B4F1D" />
                </linearGradient>
                <linearGradient id="ptr-highlight" x1="18" y1="5" x2="30" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
                <filter id="ptr-shadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.7)" />
                </filter>
              </defs>
              {/* Main pointer body */}
              <path d="M24 56 L6 14 Q4 8 8 5 L18 2 Q24 0 30 2 L40 5 Q44 8 42 14 Z"
                fill="url(#ptr-main)" filter="url(#ptr-shadow)" stroke="#8B6914" strokeWidth="0.8" />
              {/* Highlight reflection */}
              <path d="M24 50 L12 16 Q18 6 24 4 L24 50 Z" fill="url(#ptr-highlight)" />
              {/* Mounting screw */}
              <circle cx="24" cy="12" r="5" fill="url(#hub-metal)" stroke="#6B4F1D" strokeWidth="0.8" />
              <circle cx="24" cy="12" r="2.5" fill="#1a1520" stroke="#DAA520" strokeWidth="0.4" />
              <circle cx="23" cy="11" r="0.8" fill="rgba(255,255,255,0.3)" />
            </svg>
          </div>

          {/* Click overlay for center button */}
          <div onClick={handleSpin}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full z-20 ${
              isSpinning || spinCount >= 3 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`} />
        </div>
      </div>

      {/* SPIN BUTTON */}
      <button onClick={handleSpin} disabled={isSpinning || spinCount >= 3}
        className={`relative z-10 mt-8 px-12 py-4 text-base font-bold rounded-full transition-all transform overflow-hidden ${
          isSpinning || spinCount >= 3 ? "scale-95 cursor-not-allowed" : "hover:scale-105 active:scale-95"
        }`}
        style={{
          fontFamily: "'Georgia', serif",
          letterSpacing: '0.15em',
          color: isSpinning || spinCount >= 3 ? '#666' : '#1a1520',
          background: isSpinning || spinCount >= 3
            ? 'linear-gradient(135deg, #333, #222)'
            : 'linear-gradient(145deg, #F5E6C8, #DAA520, #B8860B)',
          boxShadow: isSpinning || spinCount >= 3
            ? 'none'
            : '0 4px 20px rgba(218,165,32,0.5), 0 0 40px rgba(218,165,32,0.15), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(139,69,19,0.3)',
          border: isSpinning || spinCount >= 3 ? '1px solid #444' : '1px solid #DAA520',
        }}>
        {/* Shine sweep */}
        {!(isSpinning || spinCount >= 3) && (
          <div className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: 'btn-shine 3s ease-in-out infinite' }} />
        )}
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            GIRANDO...
          </span>
        ) : spinCount >= 3 ? "🎉 VOCÊ GANHOU!" : spinCount >= 1 ? `🍀 TENTAR NOVAMENTE (${3 - spinCount}ª chance)` : "🎰 GIRAR AGORA"}
      </button>

      <p className="relative z-10 mt-4 text-gray-600 text-[10px] text-center max-w-xs" style={{ fontFamily: "'Georgia', serif" }}>
        Promoção válida por tempo limitado. Ao girar, você concorda com os termos da promoção.
      </p>

      {/* ===== MODALS ===== */}
      {showRetryModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="rounded-3xl p-8 max-w-md w-full border animate-scale-in"
            style={{
              background: 'linear-gradient(145deg, #1a1520, #0d0a12)',
              borderColor: 'rgba(218,165,32,0.2)',
              boxShadow: '0 0 60px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.05)',
            }}>
            <div className="text-center">
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>QUE PENA!</h2>
              <p className="text-[#DAA520] text-xl font-semibold mb-4">Você caiu em "Tente Novamente"</p>
              <div className="rounded-xl p-4 mb-6" style={{
                background: 'linear-gradient(135deg, rgba(218,165,32,0.08), rgba(5,150,105,0.08))',
                border: '1px solid rgba(218,165,32,0.15)',
              }}>
                <p className="text-gray-300 text-sm">
                  Mas não desista! Você tem direito a <span className="text-[#FFD700] font-bold">mais uma chance</span> de ganhar seu prêmio!
                </p>
              </div>
              <button onClick={handleRetry}
                className="w-full py-4 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  fontFamily: "'Georgia', serif",
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  boxShadow: '0 4px 20px rgba(5,150,105,0.3)',
                }}>
                🍀 GIRAR NOVAMENTE
              </button>
              <p className="mt-4 text-gray-500 text-xs">⚠️ Última chance disponível</p>
            </div>
          </div>
        </div>
      )}

      {showWinModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="rounded-3xl p-8 max-w-md w-full border animate-scale-in"
            style={{
              background: 'linear-gradient(145deg, #1a1520, #0d0a12)',
              borderColor: 'rgba(218,165,32,0.3)',
              boxShadow: '0 0 80px rgba(218,165,32,0.15), inset 0 1px 1px rgba(255,255,255,0.05)',
            }}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Georgia', serif" }}>PARABÉNS!</h2>
              <p className="text-[#FFD700] text-xl font-semibold mb-4">Você ganhou um Brinox GRÁTIS!</p>
              <div className="rounded-xl p-4 mb-6" style={{
                background: 'linear-gradient(135deg, rgba(218,165,32,0.08), rgba(59,130,246,0.08))',
                border: '1px solid rgba(218,165,32,0.2)',
              }}>
                <p className="text-gray-300 text-sm">
                  Complete o cadastro rápido para confirmar seu prêmio e receber seu kit de panelas Brinox.
                </p>
              </div>
              <button onClick={handleContinue}
                className="w-full py-4 font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95 overflow-hidden relative"
                style={{
                  fontFamily: "'Georgia', serif",
                  color: '#1a1520',
                  background: 'linear-gradient(145deg, #F5E6C8, #DAA520, #B8860B)',
                  boxShadow: '0 4px 20px rgba(218,165,32,0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
                }}>
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
