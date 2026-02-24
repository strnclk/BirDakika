import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Flame, Moon, Heart } from "lucide-react";

type GameMode = "relax" | "bold" | "night" | "relationship";

export function Home() {
  const [selectedMode, setSelectedMode] = useState<GameMode>("relax");
  const navigate = useNavigate();

  const modes = [
    {
      id: "relax" as GameMode,
      icon: Sparkles,
      label: "Rahat",
      description: "Eğlenceli, güvenli, sıradan",
    },
    {
      id: "bold" as GameMode,
      icon: Flame,
      label: "Cesur",
      description: "Daha kişisel",
    },
    {
      id: "night" as GameMode,
      icon: Moon,
      label: "Gece",
      description: "Absürt, şaşırtıcı",
    },
    {
      id: "relationship" as GameMode,
      icon: Heart,
      label: "İlişkiler",
      description: "Aşk, ilişki, duygular",
    },
  ];

  const handleStart = () => {
    navigate("/who", { state: { mode: selectedMode } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: "#0F1220" }}>
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-xl mb-3" style={{ color: "#FFFFFF", fontWeight: 600 }}>
          Bir Dakika
        </h1>
        <p className="text-base" style={{ color: "#B3B6D4" }}>
          Rastgele durum. 1 dakika konuş.
        </p>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full max-w-xs h-16 rounded-2xl mb-8 transition-transform active:scale-95"
        style={{
          backgroundColor: "#6C63FF",
          color: "#FFFFFF",
          fontSize: "1.125rem",
          fontWeight: 600,
        }}
      >
        Başla
      </button>

      {/* Mode Selector */}
      <div className="w-full max-w-xs space-y-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className="w-full p-4 rounded-xl flex items-center gap-4 transition-all active:scale-98"
              style={{
                backgroundColor: isSelected ? "#1B1F3B" : "rgba(27, 31, 59, 0.5)",
                border: isSelected ? "2px solid #6C63FF" : "2px solid transparent",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(108, 99, 255, 0.2)" }}
              >
                <Icon size={20} style={{ color: "#6C63FF" }} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-base mb-0.5" style={{ color: "#FFFFFF", fontWeight: 600 }}>
                  {mode.label}
                </div>
                <div className="text-sm" style={{ color: "#B3B6D4" }}>
                  {mode.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}