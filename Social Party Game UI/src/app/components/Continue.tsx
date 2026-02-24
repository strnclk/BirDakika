import { useNavigate, useLocation } from "react-router";

export function Continue() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "relax";

  const handleContinue = () => {
    navigate("/game", { state: { mode } });
  };

  const handleChangeMode = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: "#0F1220" }}>
      <div className="w-full max-w-xs space-y-6">
        {/* Message */}
        <div className="text-center mb-12">
          <p className="text-xl" style={{ color: "#FFFFFF", fontWeight: 600 }}>
            Bir tur daha?
          </p>
        </div>

        {/* Continue Button */}
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

        {/* Change Mode Button */}
        <button
          onClick={handleChangeMode}
          className="w-full h-14 rounded-2xl transition-transform active:scale-95"
          style={{
            backgroundColor: "rgba(27, 31, 59, 0.8)",
            color: "#B3B6D4",
            fontSize: "1rem",
            fontWeight: 500,
          }}
        >
          Mod değiştir
        </button>
      </div>
    </div>
  );
}