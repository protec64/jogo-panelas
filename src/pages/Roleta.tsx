import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import brinoxLogo from "@/assets/brinox-logo.svg";

const SPIN_DURATION = 4500;

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
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const loseAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  useEffect(() => {
    winAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    winAudioRef.current.volume = 0.5;
    winAudioRef.current.load();
    loseAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3');
    loseAudioRef.current.volume = 0.4;
    loseAudioRef.current.load();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setLightPhase(prev => (prev + 1) % 2), 450);
    return () => clearInterval(interval);
  }, []);

  const segments = useMemo(() => [
    { text: "GRÁTIS", subtext: "KIT COMPLETO", color1: "#2563EB", color2: "#1E40AF", accent: "#93C5FD" },
    { text: "75%", subtext: "DESCONTO", color1: "#0F172A", color2: "#1E293B", accent: "#94A3B8" },
    { text: "50%", subtext: "DESCONTO", color1: "#2563EB", color2: "#1E40AF", accent: "#93C5FD" },
    { text: "TENTE", subtext: "DE NOVO", color1: "#0F172A", color2: "#1E293B", accent: "#64748B", isRetry: true },
    { text: "25%", subtext: "DESCONTO", color1: "#2563EB", color2: "#1E40AF", accent: "#93C5FD" },
    { text: "TENTE", subtext: "DE NOVO", color1: "#0F172A", color2: "#1E293B", accent: "#64748B", isRetry: true },
    { text: "5%", subtext: "DESCONTO", color1: "#2563EB", color2: "#1E40AF", accent: "#93C5FD" },
    { text: "TENTE", subtext: "DE NOVO", color1: "#0F172A", color2: "#1E293B", accent: "#64748B", isRetry: true },
  ], []);

  const triggerConfetti = useCallback(() => {
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#3B82F6', '#60A5FA', '#93C5FD', '#FFFFFF', '#DBEAFE'] });
    setTimeout(() => {
      confetti({ particleCount: 70, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#3B82F6', '#60A5FA', '#FFFFFF'] });
      confetti({ particleCount: 70, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#3B82F6', '#60A5FA', '#FFFFFF'] });
    }, 250);
  }, []);

  const playTick = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.012;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const decay = Math.exp(-i / (bufferSize * 0.12));
        data[i] = (Math.random() * 2 - 1) * decay * 0.5;
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 4000;
      bp.Q.value = 3;
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 1000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
      src.connect(bp);
      bp.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      src.start(now);
      src.stop(now + 0.02);
    } catch (e) {}
  }, [getAudioCtx]);

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

  const numLights = 24;
  const lightsData = useMemo(() => Array.from({ length: numLights }, (_, i) => i), []);

  const wheelSegments = useMemo(() => {
    const segs: JSX.Element[] = [];
    const angleEach = 360 / 8;
    const R = 100, cx = 100, cy = 100;

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
      const textR = 60;
      const tx = cx + textR * Math.cos(midRad);
      const ty = cy + textR * Math.sin(midRad);
      const pinR = 93;
      const pinX = cx + pinR * Math.cos(startRad);
      const pinY = cy + pinR * Math.sin(startRad);

      segs.push(
        <g key={i}>
          <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`} fill={seg.color1} />
          <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`} fill="url(#seg-depth)" />
          <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
          {/* Small metallic pin at edge */}
          <circle cx={pinX} cy={pinY} r="2" fill="url(#pin-grad)" stroke="rgba(148,163,184,0.3)" strokeWidth="0.3" />
          <g transform={`translate(${tx}, ${ty}) rotate(${midDeg + 90})`}>
            <text textAnchor="middle" fill="#FFF" fontSize={seg.isRetry ? "7.5" : "13"} fontWeight="800" dy="-2"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
              {seg.text}
            </text>
            <text textAnchor="middle" fill={seg.accent} fontSize="6" fontWeight="600" dy="7"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}>
              {seg.subtext}
            </text>
          </g>
        </g>
      );
    });
    return segs;
  }, [segments]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-3 py-4 sm:py-6 overflow-hidden relative"
      style={{ background: 'linear-gradient(180deg, #0B1120 0%, #0F172A 40%, #111827 100%)' }}>

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
        @keyframes soft-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes btn-shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
        }
      `}</style>

      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 60%)', animation: 'soft-glow 5s ease-in-out infinite' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-2 sm:mb-3 flex flex-col items-center">
        <img src={brinoxLogo} alt="Logo" className="h-6 sm:h-8 brightness-0 invert opacity-80" />
        <p className="text-blue-300/50 text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mt-1 sm:mt-2 font-medium">Promoção Exclusiva</p>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-base sm:text-xl md:text-2xl font-bold text-white text-center mb-3 sm:mb-6 px-2">
        Gire a roleta e{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">ganhe prêmios incríveis!</span>
      </h1>

      {/* === WHEEL === */}
      <div className="relative z-10" style={{ animation: isShaking ? 'shake 0.6s ease-in-out' : 'none' }}>
        <div className="relative w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] md:w-[400px] md:h-[400px]">

          {/* Outer shadow/glow */}
          <div className="absolute -inset-6 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.12) 40%, transparent 70%)',
            filter: 'blur(10px)',
          }} />

          {/* Chrome outer ring */}
          <div className="absolute -inset-3 rounded-full" style={{
            background: 'conic-gradient(from 0deg, #334155, #64748B, #94A3B8, #64748B, #334155, #64748B, #94A3B8, #64748B, #334155)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.4)',
          }} />

          {/* Light dots ring */}
          <div className="absolute -inset-3 rounded-full">
            {lightsData.map((i) => {
              const angle = (i * 360) / numLights;
              const rad = ((angle - 90) * Math.PI) / 180;
              const r = 50;
              const x = 50 + r * Math.cos(rad);
              const y = 50 + r * Math.sin(rad);
              const isLit = i % 2 === lightPhase;
              return (
                <div key={i} className="absolute rounded-full" style={{
                  width: '5px', height: '5px',
                  left: `calc(${x}% - 2.5px)`, top: `calc(${y}% - 2.5px)`,
                  background: isLit
                    ? 'radial-gradient(circle, #DBEAFE 0%, #60A5FA 50%, #3B82F6 100%)'
                    : 'radial-gradient(circle, #475569 0%, #334155 100%)',
                  boxShadow: isLit
                    ? '0 0 6px 2px rgba(96,165,250,0.5), 0 0 12px 4px rgba(59,130,246,0.2)'
                    : 'inset 0 1px 2px rgba(0,0,0,0.4)',
                  transition: 'all 0.2s ease',
                }} />
              );
            })}
          </div>

          {/* Dark inner bezel */}
          <div className="absolute -inset-0.5 rounded-full" style={{
            background: '#0F172A',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
          }} />

          {/* Thin blue accent ring */}
          <div className="absolute inset-0 rounded-full" style={{
            background: 'linear-gradient(145deg, #3B82F6, #1D4ED8)',
            padding: '2px',
          }}>
            <div className="w-full h-full rounded-full overflow-hidden relative" style={{
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
            }}>
              {/* Spinning wheel */}
              <div className="w-full h-full rounded-full" style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? `transform ${SPIN_DURATION / 1000}s cubic-bezier(0.12, 0.6, 0.06, 1.00)` : 'none',
              }}>
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <radialGradient id="seg-depth" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
                      <stop offset="50%" stopColor="rgba(0,0,0,0.05)" />
                      <stop offset="85%" stopColor="rgba(0,0,0,0)" />
                      <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
                    </radialGradient>
                    <radialGradient id="specular" cx="38%" cy="28%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </radialGradient>
                    <radialGradient id="pin-grad" cx="35%" cy="30%">
                      <stop offset="0%" stopColor="#CBD5E1" />
                      <stop offset="50%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#475569" />
                    </radialGradient>
                    <radialGradient id="hub-outer" cx="40%" cy="35%">
                      <stop offset="0%" stopColor="#CBD5E1" />
                      <stop offset="40%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#334155" />
                    </radialGradient>
                    <radialGradient id="hub-inner" cx="42%" cy="35%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </radialGradient>
                    <radialGradient id="hub-center" cx="40%" cy="35%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </radialGradient>
                  </defs>

                  {wheelSegments}

                  <circle cx="100" cy="100" r="99" fill="url(#specular)" />

                  {/* Center hub */}
                  <circle cx="100" cy="100" r="20" fill="url(#hub-outer)" stroke="#475569" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="16" fill="url(#hub-inner)" stroke="#64748B" strokeWidth="0.4" />
                  <circle cx="100" cy="100" r="9" fill="url(#hub-center)" stroke="#1E40AF" strokeWidth="0.4" />
                  <ellipse cx="97" cy="96" rx="3.5" ry="2.5" fill="rgba(255,255,255,0.2)" />
                  <circle cx="100" cy="100" r="2" fill="#1E40AF" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pointer — sleek modern triangle */}
          <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-30">
            <svg width="28" height="38" viewBox="0 0 36 48" fill="none" className="sm:w-[36px] sm:h-[48px]">
              <defs>
                <linearGradient id="ptr-g" x1="18" y1="0" x2="18" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#CBD5E1" />
                  <stop offset="40%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
                <filter id="ptr-s">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.6)" />
                </filter>
              </defs>
              <path d="M18 44 L4 10 Q2 4 8 3 L28 3 Q34 4 32 10 Z"
                fill="url(#ptr-g)" filter="url(#ptr-s)" stroke="#64748B" strokeWidth="0.6" />
              <path d="M18 38 L9 12 Q14 5 18 4 L18 38 Z" fill="rgba(255,255,255,0.12)" />
              <circle cx="18" cy="9" r="3.5" fill="#0F172A" stroke="#94A3B8" strokeWidth="0.6" />
              <circle cx="18" cy="9" r="1.5" fill="#3B82F6" />
            </svg>
          </div>

          {/* Click overlay */}
          <div onClick={handleSpin}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full z-20 ${
              isSpinning || spinCount >= 3 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`} />

          {/* Pulse effect on center when idle */}
          {!isSpinning && spinCount < 3 && (
            <div className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full z-15 pointer-events-none"
              style={{ animation: 'pulse-ring 2s ease-out infinite' }}>
              <div className="w-full h-full rounded-full bg-blue-500/30" />
            </div>
          )}
        </div>
      </div>

      {/* SPIN BUTTON */}
      <button onClick={handleSpin} disabled={isSpinning || spinCount >= 3}
        className={`relative z-10 mt-5 sm:mt-8 px-10 sm:px-14 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-2xl transition-all transform overflow-hidden ${
          isSpinning || spinCount >= 3 ? "scale-95 cursor-not-allowed" : "hover:scale-105 active:scale-95"
        }`}
        style={{
          letterSpacing: '0.1em',
          color: '#FFF',
          background: isSpinning || spinCount >= 3
            ? 'linear-gradient(135deg, #1E293B, #0F172A)'
            : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
          boxShadow: isSpinning || spinCount >= 3
            ? 'none'
            : '0 4px 20px rgba(37,99,235,0.4), 0 0 40px rgba(37,99,235,0.1), inset 0 1px 1px rgba(255,255,255,0.15)',
          border: isSpinning || spinCount >= 3 ? '1px solid #334155' : '1px solid rgba(96,165,250,0.3)',
        }}>
        {!(isSpinning || spinCount >= 3) && (
          <div className="absolute top-0 h-full w-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
        ) : spinCount >= 3 ? "🎉 VOCÊ GANHOU!" : spinCount >= 1 ? `TENTAR NOVAMENTE (${3 - spinCount}ª chance)` : "GIRAR AGORA"}
      </button>

      <p className="relative z-10 mt-3 sm:mt-4 text-slate-500 text-[9px] sm:text-[10px] text-center max-w-xs px-4">
        Promoção válida por tempo limitado. Ao girar, você concorda com os termos da promoção.
      </p>

      {/* ===== MODALS ===== */}
      {showRetryModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 sm:p-8 max-w-md w-full border animate-scale-in"
            style={{
              background: 'linear-gradient(145deg, #1E293B, #0F172A)',
              borderColor: 'rgba(100,116,139,0.2)',
              boxShadow: '0 0 60px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.05)',
            }}>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">😢</div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Que pena!</h2>
              <p className="text-blue-400 text-lg font-semibold mb-4">Você caiu em "Tente Novamente"</p>
              <div className="rounded-xl p-4 mb-6" style={{
                background: 'rgba(37,99,235,0.08)',
                border: '1px solid rgba(59,130,246,0.15)',
              }}>
                <p className="text-slate-300 text-sm">
                  Mas não desista! Você tem direito a <span className="text-blue-400 font-bold">mais uma chance</span> de ganhar seu prêmio!
                </p>
              </div>
              <button onClick={handleRetry}
                className="w-full py-4 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
                }}>
                GIRAR NOVAMENTE
              </button>
              <p className="mt-4 text-slate-500 text-xs">⚠️ Última chance disponível</p>
            </div>
          </div>
        </div>
      )}

      {showWinModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 sm:p-8 max-w-md w-full border animate-scale-in"
            style={{
              background: 'linear-gradient(145deg, #1E293B, #0F172A)',
              borderColor: 'rgba(59,130,246,0.3)',
              boxShadow: '0 0 80px rgba(37,99,235,0.12), inset 0 1px 1px rgba(255,255,255,0.05)',
            }}>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Parabéns!</h2>
              <p className="text-blue-400 text-lg sm:text-xl font-semibold mb-4">Você ganhou um Kit GRÁTIS!</p>
              <div className="rounded-xl p-4 mb-6" style={{
                background: 'rgba(37,99,235,0.08)',
                border: '1px solid rgba(59,130,246,0.2)',
              }}>
                <p className="text-slate-300 text-sm">
                  Complete o cadastro rápido para confirmar seu prêmio e receber seu kit de panelas Brinox.
                </p>
              </div>
              <button onClick={handleContinue}
                className="w-full py-4 text-white font-bold text-lg rounded-xl transition-all hover:scale-[1.02] active:scale-95 overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
                }}>
                RESGATAR MEU PRÊMIO →
              </button>
              <p className="mt-4 text-slate-500 text-xs">⏰ Oferta expira em 10 minutos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roleta;
