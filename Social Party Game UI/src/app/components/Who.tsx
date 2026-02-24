import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { RotateCw, Shuffle } from "lucide-react";

type SelectionMode = "needle" | "random" | null;

export function Who() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.state?.mode || "relax";
  
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  
  // Random selection states
  const [showingSuspense, setShowingSuspense] = useState(false);
  const [showingReady, setShowingReady] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;
    
    setSelectionMode("needle");
    setIsSpinning(true);
    setHasSpun(true);
    
    // Random final rotation (multiple full spins + random angle)
    const spins = 5 + Math.floor(Math.random() * 3); // 5-7 full spins
    const finalAngle = Math.floor(Math.random() * 360);
    const totalRotation = spins * 360 + finalAngle;
    
    setRotation(totalRotation);
    
    // After animation completes
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  const handleContinue = () => {
    navigate("/game", { state: { mode } });
  };

  const handleRandomSelection = () => {
    setSelectionMode("random");
    setShowingSuspense(true);
    
    // Show suspense for 3 seconds
    setTimeout(() => {
      setShowingSuspense(false);
      setShowingReady(true);
    }, 3000);
  };

  const handleReset = () => {
    setSelectionMode(null);
    setHasSpun(false);
    setShowingSuspense(false);
    setShowingReady(false);
    setRotation(0);
  };

  // Initial selection screen
  if (selectionMode === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: "#0F1220" }}>
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl mb-2" style={{ color: "#FFFFFF", fontWeight: 600 }}>
              Kim cevaplayacak?
            </h2>
            <p className="text-base" style={{ color: "#B3B6D4" }}>
              Bir yöntem seç
            </p>
          </div>

          <div className="w-full max-w-xs space-y-4">
            <button
              onClick={handleSpin}
              className="w-full h-20 rounded-2xl transition-transform active:scale-95 flex flex-col items-center justify-center gap-1"
              style={{
                backgroundColor: "#1B1F3B",
                border: "2px solid rgba(108, 99, 255, 0.3)",
              }}
            >
              <RotateCw size={24} style={{ color: "#6C63FF" }} />
              <span style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 600 }}>
                İbre Döndür
              </span>
              <span style={{ color: "#B3B6D4", fontSize: "0.75rem" }}>
                Görsel ve eğlenceli
              </span>
            </button>

            <button
              onClick={handleRandomSelection}
              className="w-full h-20 rounded-2xl transition-transform active:scale-95 flex flex-col items-center justify-center gap-1"
              style={{
                backgroundColor: "#1B1F3B",
                border: "2px solid rgba(108, 99, 255, 0.3)",
              }}
            >
              <Shuffle size={24} style={{ color: "#6C63FF" }} />
              <span style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 600 }}>
                Rastgele Seç
              </span>
              <span style={{ color: "#B3B6D4", fontSize: "0.75rem" }}>
                Hızlı ve suspense
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Needle mode
  if (selectionMode === "needle") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: "#0F1220" }}>
        <div className="w-full max-w-md flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-2xl mb-2" style={{ color: "#FFFFFF", fontWeight: 600 }}>
              Kim cevaplayacak?
            </h2>
            <p className="text-base" style={{ color: "#B3B6D4" }}>
              İbreyi döndür
            </p>
          </div>

          {/* Spinning Needle */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Circle */}
            <div
              className="absolute w-full h-full rounded-full"
              style={{
                border: "3px solid rgba(108, 99, 255, 0.3)",
                boxShadow: "0 0 30px rgba(108, 99, 255, 0.2)",
              }}
            />
            
            {/* Dots around circle */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <div
                key={angle}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "#6C63FF",
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-120px)`,
                }}
              />
            ))}
            
            {/* Center dot */}
            <div
              className="absolute w-4 h-4 rounded-full z-20"
              style={{ backgroundColor: "#6C63FF" }}
            />
            
            {/* Needle */}
            <div
              className="absolute w-1 h-28 origin-bottom"
              style={{
                backgroundColor: "#EF476F",
                bottom: "50%",
                left: "50%",
                transform: `translateX(-50%) rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
                boxShadow: isSpinning ? "0 0 20px rgba(239, 71, 111, 0.8)" : "0 0 10px rgba(239, 71, 111, 0.5)",
              }}
            >
              {/* Needle tip */}
              <div
                className="absolute w-0 h-0"
                style={{
                  top: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: "12px solid #EF476F",
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full max-w-xs space-y-3">
            {!hasSpun ? (
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full h-16 rounded-2xl transition-transform active:scale-95"
                style={{
                  backgroundColor: "#6C63FF",
                  color: "#FFFFFF",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  opacity: isSpinning ? 0.7 : 1,
                }}
              >
                {isSpinning ? "Dönüyor..." : "İbreyi Döndür"}
              </button>
            ) : (
              <>
                {!isSpinning && (
                  <>
                    <div
                      className="text-center py-3 px-4 rounded-xl mb-2"
                      style={{
                        backgroundColor: "rgba(239, 71, 111, 0.15)",
                        color: "#EF476F",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                      }}
                    >
                      Sıra sende.
                    </div>
                    
                    <button
                      onClick={handleContinue}
                      className="w-full h-14 rounded-2xl transition-transform active:scale-95"
                      style={{
                        backgroundColor: "#6C63FF",
                        color: "#FFFFFF",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      Devam
                    </button>
                    
                    <button
                      onClick={handleSpin}
                      className="w-full h-12 rounded-2xl transition-transform active:scale-95"
                      style={{
                        backgroundColor: "rgba(27, 31, 59, 0.6)",
                        color: "#B3B6D4",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        border: "1px solid rgba(108, 99, 255, 0.3)",
                      }}
                    >
                      Tekrar Döndür
                    </button>

                    <button
                      onClick={handleReset}
                      className="w-full h-10 rounded-2xl transition-transform active:scale-95"
                      style={{
                        backgroundColor: "transparent",
                        color: "#7A7D9E",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      Başa Dön
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Random selection mode
  if (selectionMode === "random") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: "#0F1220" }}>
        <div className="w-full max-w-md flex flex-col items-center gap-12">
          
          {showingSuspense && (
            <div className="text-center space-y-6 animate-pulse">
              <h2
                className="text-3xl"
                style={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                }}
              >
                Sıradaki kişi...
              </h2>
              <div className="flex justify-center gap-2">
                <div
                  className="w-3 h-3 rounded-full animate-bounce"
                  style={{
                    backgroundColor: "#6C63FF",
                    animationDelay: "0ms",
                  }}
                />
                <div
                  className="w-3 h-3 rounded-full animate-bounce"
                  style={{
                    backgroundColor: "#6C63FF",
                    animationDelay: "150ms",
                  }}
                />
                <div
                  className="w-3 h-3 rounded-full animate-bounce"
                  style={{
                    backgroundColor: "#6C63FF",
                    animationDelay: "300ms",
                  }}
                />
              </div>
            </div>
          )}

          {showingReady && (
            <>
              <div className="text-center space-y-4">
                <div
                  className="text-6xl mb-6"
                  style={{
                    color: "#EF476F",
                    fontWeight: 700,
                  }}
                >
                  👉
                </div>
                <h2
                  className="text-4xl"
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 700,
                  }}
                >
                  Hazır mısın?
                </h2>
                <p
                  className="text-base"
                  style={{
                    color: "#B3B6D4",
                    fontStyle: "italic",
                  }}
                >
                  (En sessiz, en soldaki, vb.)
                </p>
              </div>

              <div className="w-full max-w-xs space-y-3">
                <button
                  onClick={handleContinue}
                  className="w-full h-16 rounded-2xl transition-transform active:scale-95"
                  style={{
                    backgroundColor: "#6C63FF",
                    color: "#FFFFFF",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                  }}
                >
                  Devam
                </button>

                <button
                  onClick={() => {
                    setShowingSuspense(true);
                    setShowingReady(false);
                    setTimeout(() => {
                      setShowingSuspense(false);
                      setShowingReady(true);
                    }, 3000);
                  }}
                  className="w-full h-12 rounded-2xl transition-transform active:scale-95"
                  style={{
                    backgroundColor: "rgba(27, 31, 59, 0.6)",
                    color: "#B3B6D4",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    border: "1px solid rgba(108, 99, 255, 0.3)",
                  }}
                >
                  Tekrar Seç
                </button>

                <button
                  onClick={handleReset}
                  className="w-full h-10 rounded-2xl transition-transform active:scale-95"
                  style={{
                    backgroundColor: "transparent",
                    color: "#7A7D9E",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                >
                  Başa Dön
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
