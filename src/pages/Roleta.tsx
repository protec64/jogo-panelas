import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import brinoxLogo from "@/assets/brinox-logo.svg";

const SPIN_DURATION = 3500; // 3.5 seconds spin

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

  // Preload all sounds once
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

  // Optimized lights - slower interval to reduce re-renders
  useEffect(() => {
    const interval = setInterval(() => {
      setLightPhase(prev => (prev + 1) % 2);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const segments = useMemo(() => [
    { text: "BRINOX", subtext: "GRÁTIS", color: "#3B82F6", gradient: "from-blue-400 to-blue-600" },
    { text: "75%", subtext: "DESCONTO", color: "#9B59B6", gradient: "from-purple-500 to-purple-700" },
    { text: "50%", subtext: "DESCONTO", color: "#E74C3C", gradient: "from-red-500 to-red-700" },
    { text: "TENTE", subtext: "NOVAMENTE", color: "#27AE60", gradient: "from-green-500 to-green-700", isRetry: true },
    { text: "25%", subtext: "DESCONTO", color: "#0EA5E9", gradient: "from-sky-500 to-sky-700" },
    { text: "TENTE", subtext: "NOVAMENTE", color: "#E91E63", gradient: "from-pink-500 to-pink-700", isRetry: true },
    { text: "5%", subtext: "DESCONTO", color: "#00BCD4", gradient: "from-cyan-400 to-cyan-600" },
    { text: "TENTE", subtext: "NOVAMENTE", color: "#2563EB", gradient: "from-blue-500 to-blue-700", isRetry: true },
  ], []);

  const triggerConfetti = useCallback(() => {
    // Single burst instead of continuous animation - much lighter
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#38BDF8', '#FFFFFF']
    });
    
    // Second burst after a small delay
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3B82F6', '#38BDF8', '#FFFFFF']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3B82F6', '#38BDF8', '#FFFFFF']
      });
    }, 200);
  }, []);

  // Play tick sound - reuse preloaded audio
  const playTick = useCallback(() => {
    if (tickAudioRef.current) {
      tickAudioRef.current.currentTime = 0;
      tickAudioRef.current.play().catch(() => {});
    }
  }, []);

  // Tick sound effect during spin
  useEffect(() => {
    if (!isSpinning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, rotation, playTick]);

  const handleSpin = () => {
    if (isSpinning || spinCount >= 3) return;

    setIsSpinning(true);
    lastSegmentRef.current = 0;

    const spins = 8;
    const segmentAngle = 360 / 8;
    
    // First spin: land on "TENTE NOVAMENTE" (segment 3 - green)
    // Second spin: land on "TENTE NOVAMENTE" (segment 5 - pink)
    // Third spin: land on "BRINOX GRÁTIS" (segment 0)
    let targetSegment = 0;
    if (spinCount === 0) {
      targetSegment = 3; // Green "TENTE NOVAMENTE"
    } else if (spinCount === 1) {
      targetSegment = 5; // Pink "TENTE NOVAMENTE"
    } else {
      targetSegment = 0; // "BRINOX GRÁTIS"
    }
    
    // Calculate the exact angle to land on the target segment's center
    // The pointer is at the top (-90° in SVG), segment centers are at (index * 45 + 22.5) degrees from top
    const desiredFinalAngle = 360 - (targetSegment * segmentAngle + segmentAngle / 2);
    const currentAngle = rotation % 360;
    const additionalRotation = (desiredFinalAngle - currentAngle + 360) % 360;
    const totalRotation = rotation + spins * 360 + additionalRotation;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinCount(prev => prev + 1);

      if (spinCount < 2) {
        // First or second spin - shake and show retry modal
        setIsShaking(true);
        
        // Play preloaded lose sound
        if (loseAudioRef.current) {
          loseAudioRef.current.currentTime = 0;
          loseAudioRef.current.play().catch(() => {});
        }

        // Vibrate for lose
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100, 50, 100]);
        }
        
        setTimeout(() => {
          setIsShaking(false);
          setShowRetryModal(true);
        }, 600);
      } else {
        // Third spin - winner! Show modal immediately
        triggerConfetti();
        
        // Play preloaded win sound
        if (winAudioRef.current) {
          winAudioRef.current.currentTime = 0;
          winAudioRef.current.play().catch(() => {});
        }

        // Vibrate if supported
        if (navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }

        // Show modal immediately - no delay!
        setShowWinModal(true);
      }
    }, SPIN_DURATION);
  };

  const handleRetry = () => {
    setShowRetryModal(false);
  };

  const handleContinue = () => {
    navigate("/loja?premio=brinox");
  };

  // Generate lights around the wheel - optimized with useMemo pattern
  const lights = useMemo(() => {
    const result = [];
    const numLights = 24;
    for (let i = 0; i < numLights; i++) {
      const angle = (i * 360) / numLights;
      result.push({ angle, index: i });
    }
    return result;
  }, []);

  const generateLights = () => {
    return lights.map(({ angle, index }) => {
      // Alternate pattern based on phase
      const isActive = (index % 2 === lightPhase);
      return (
        <div
          key={index}
          className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full ${
            isActive 
              ? 'bg-sky-300 shadow-[0_0_10px_4px_rgba(56,189,248,0.8)]' 
              : 'bg-blue-600/50'
          }`}
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${angle}deg) translateY(-170px) translateX(-50%)`,
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Brinox Logo */}
      <div className="relative z-10 mb-4 flex flex-col items-center">
        <img src={brinoxLogo} alt="Brinox" className="h-8 brightness-0 invert" />
        <p className="text-gray-400 text-sm text-center mt-2">Promoção Especial</p>
      </div>

      {/* Title */}
      <h1 className="relative z-10 text-xl md:text-3xl font-bold text-white text-center mb-8 px-4">
        Gire a Roleta e Ganhe seu{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
          Produto Brinox!
        </span>
      </h1>

      {/* Roulette Container */}
      <div 
        className={`relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] z-10 ${
          isShaking ? 'animate-[shake_0.6s_ease-in-out]' : ''
        }`}
        style={{
          animation: isShaking ? 'shake 0.6s ease-in-out' : 'none',
        }}
      >
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
        `}</style>
        {/* Animated lights */}
        <div className="absolute inset-0">
          {generateLights()}
        </div>

        {/* Outer decorative ring */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 p-1 shadow-[0_0_40px_rgba(59,130,246,0.4)]">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-gray-900 p-1">
            <div className="w-full h-full rounded-full border-4 border-blue-600/50 overflow-hidden">
              {/* Wheel */}
              <div
                className="w-full h-full rounded-full relative"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning 
                    ? `transform ${SPIN_DURATION / 1000}s cubic-bezier(0.17, 0.67, 0.08, 0.99)` 
                    : 'none',
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    {segments.map((segment, index) => (
                      <linearGradient key={`grad-${index}`} id={`segment-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={segment.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={segment.color} stopOpacity="0.7" />
                      </linearGradient>
                    ))}
                  </defs>
                  {segments.map((segment, index) => {
                    const angle = 360 / segments.length;
                    const startAngle = index * angle - 90;
                    const endAngle = startAngle + angle;
                    
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    
                    const x1 = 50 + 50 * Math.cos(startRad);
                    const y1 = 50 + 50 * Math.sin(startRad);
                    const x2 = 50 + 50 * Math.cos(endRad);
                    const y2 = 50 + 50 * Math.sin(endRad);
                    
                    const largeArc = angle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`;
                    
                    const midAngle = startAngle + angle / 2;
                    const midRad = (midAngle * Math.PI) / 180;
                    const textRadius = 32;
                    const textX = 50 + textRadius * Math.cos(midRad);
                    const textY = 50 + textRadius * Math.sin(midRad);
                    
                    return (
                      <g key={index}>
                        <path 
                          d={pathData} 
                          fill={`url(#segment-gradient-${index})`}
                          stroke="#1a1a1a"
                          strokeWidth="0.3"
                        />
                        <g transform={`translate(${textX}, ${textY}) rotate(${midAngle + 90})`}>
                          <text
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize={segment.isRetry ? "4" : "6"}
                            fontWeight="bold"
                            dy="-1"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                          >
                            {segment.text}
                          </text>
                          <text
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="3.5"
                            fontWeight="bold"
                            dy="4"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                          >
                            {segment.subtext}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Center hub - clickable */}
        <div 
          onClick={handleSpin}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 z-20 ${
            isSpinning || spinCount >= 3 ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:scale-110 transition-transform'
          }`}
        >
          {/* Pulse ring animation */}
          {!isSpinning && spinCount < 3 && (
            <>
              <div className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping" />
              <div className="absolute -inset-2 rounded-full bg-blue-500/20 animate-pulse" />
            </>
          )}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-sky-400 via-blue-500 to-blue-600 p-1 shadow-xl">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center border-2 border-blue-500/50">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-inner ${
                !isSpinning && spinCount < 3 ? 'animate-pulse' : ''
              }`}>
                <span className="text-white font-bold text-sm md:text-base tracking-wider">GIRE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
          <div className="relative">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[35px] border-t-blue-500 drop-shadow-lg" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[25px] border-t-sky-400" />
          </div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning || spinCount >= 3}
        className={`relative z-10 mt-10 px-16 py-5 text-xl font-bold text-white rounded-full transition-all shadow-2xl transform ${
          isSpinning || spinCount >= 3
            ? "bg-gray-600 cursor-not-allowed scale-95"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        }`}
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            GIRANDO...
          </span>
        ) : spinCount >= 3 ? (
          "🎉 VOCÊ GANHOU!"
        ) : spinCount >= 1 ? (
          `🍀 TENTAR NOVAMENTE (${3 - spinCount}ª chance)`
        ) : (
          "GIRAR AGORA"
        )}
      </button>

      {/* Disclaimer */}
      <p className="relative z-10 mt-6 text-gray-500 text-xs text-center max-w-sm">
        Promoção válida por tempo limitado. Ao girar, você concorda com os termos da promoção.
      </p>

      {/* Retry Modal */}
      {showRetryModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8 max-w-md w-full border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)] animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-3xl font-bold text-white mb-2">QUE PENA!</h2>
              <p className="text-green-400 text-xl font-semibold mb-4">Você caiu em "Tente Novamente"</p>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 mb-6 border border-green-500/30">
                <p className="text-gray-300 text-sm">
                  Mas não desista! Você tem direito a <span className="text-sky-400 font-bold">mais uma chance</span> de ganhar seu produto Brinox!
                </p>
              </div>
              <button
                onClick={handleRetry}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-green-500/30"
              >
                🍀 GIRAR NOVAMENTE
              </button>
              <p className="mt-4 text-gray-500 text-xs">
                ⚠️ Última chance disponível
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Win Modal */}
      {showWinModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-8 max-w-md w-full border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">PARABÉNS!</h2>
              <p className="text-sky-400 text-xl font-semibold mb-4">Você ganhou um Brinox GRÁTIS!</p>
              <div className="bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-xl p-4 mb-6 border border-blue-500/30">
                <p className="text-gray-300 text-sm">
                  Complete o cadastro rápido para confirmar seu prêmio e receber seu kit de panelas Brinox.
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
              >
                RESGATAR MEU PRÊMIO →
              </button>
              <p className="mt-4 text-gray-500 text-xs">
                ⏰ Oferta expira em 10 minutos
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roleta;
