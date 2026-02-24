import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const CARD_CONTENT = {
  relax: [
    "Aldığın bir riske ne kadar memnun olduğunu anlat.",
    "Hayatın bir film olsaydı, adı ne olurdu?",
    "Aldığın en iyi tavsiye neydi?",
    "Kendinden gerçekten gurur duyduğun bir anı paylaş.",
    "Sınırsız zamanın olsaydı hangi hobi ile uğraşırdın?",
    "En son ne zaman kontrolünü kaybedercesine güldün?",
    "Geçmişe dönüp bir şeyi değiştirebilseydin ne olurdu?",
    "Seni en çok mutlu eden küçük şey nedir?",
    "Kendinle gurur duyduğun küçük bir şey söyle.",
    "Bugün bu masada seni şaşırtan biri oldu mu?",
    "Birinin seni gerçekten dinlediğini en son ne zaman hissettin?",
    "Hayatında şu an en çok neye ihtiyacın var?",
  ],
  bold: [
    "En utanç verici anını anlat.",
    "Kimseye hiç söylemediğin bir şey nedir?",
    "Bir konuda fikrin tamamen değiştiği bir zamanı anlat.",
    "İnsanların senin hakkında anlamasını istediğin şey nedir?",
    "Yendiğin bir korkuyu paylaş.",
    "Hayatındaki en büyük pişmanlığın ne?",
    "Kendini en savunmasız hissettiğin an ne zaman oldu?",
    "Yaptığın en çılgın şey neydi?",
    "İnsanların senin hakkında yanlış bildiği bir şey ne?",
    "En çok hangi özelliğin yüzünden yanlış anlaşılıyorsun?",
    "Hayatında en zor söylediğin 'hayır' neydi?",
    "Birine kırıldığında genelde ne yaparsın: susar mısın, patlar mısın?",
    "Kendinle ilgili değiştirmek isteyip değiştiremediğin bir şey?",
    "Güçlü mü görünmek, anlaşılmak mı? Hangisi senin için daha önemli?",
    "Bu masada senden en farklı olduğunu düşündüğün kişi kim?",
    "Hayatında 'keşke daha erken fark etseydim' dediğin bir şey?",
    "İnsanların senden beklentisi seni yoruyor mu?",
    "En son ne zaman bir şeyi sırf ayıp olmasın diye yaptın?",
    "Bu masada biri seni yanlış tanıyor mu? (İsim vermeden)",
    "Birine 'beni kırdın' demekten neden kaçınırız sence?",
    "Sence insanlar seni seviyor mu, yoksa alıştı mı?",
    "En çok hangi konuda savunmaya geçiyorsun?",
    "Kendine son zamanlarda haksızlık yaptığın bir an?",
  ],
  night: [
    "Sadece tek bir kelimeyle cevap ver.",
    "5 saniyelik sessizlikten sonra konuşmaya başla.",
    "Bir hikaye anlat ama en heyecanlı yerde dur.",
    "Tüm cevabını kafiyeli konuş.",
    "Buradasın. 1 dakikan var. Ayın aslında peynirden yapılmış olduğunu açıkla.",
    "Sadece sorularla cevap ver.",
    "Her cümleden sonra 'ama değil' de.",
    "Konuşurken gözlerini kimseye dikme.",
  ],
  relationship: [
    "İlk aşkını anlat. Ne oldu?",
    "Bir ilişkide en önemli şey senin için ne?",
    "Red edildiğin bir anı paylaş.",
    "Aşık olduğunu nasıl anlarsın?",
    "Bir ilişkide asla affetmeyeceğin şey nedir?",
    "İdeal bir randevunu tarif et.",
    "Aşkın var mı? Yoksa neden yok?",
    "Birini etkilemek için yaptığın en komik şey neydi?",
    "Kalbini kıran kişiye şimdi ne söylerdin?",
    "Aşkta en büyük hatanı anlat.",
    "Bugün burada olmasaydın, nerede olmayı isterdin?",
  ],
};

const SNARKY_COMMENTS = [
  "Buna cevap veremeyen çok oldu 😌",
  "Yalan söylüyorsan sorun yok, biz de inanmayacağız.",
  "Bu soru ortamı biraz karıştırabilir.",
  "Hazır mısın? Çünkü bu zor olabilir.",
  "Dürüst ol. Hadi, ne kaybedersin ki?",
  "60 saniye çok mu uzun geldi? Üzgünüm 🤷",
  "Bu soruyu ben de merak ediyordum açıkçası.",
  "Sessizlik de bir cevaptır aslında...",
  "İlginç... Çok ilginç...",
  "Bunu duymak isteyenler var gibi 👀",
  "Tamam, dinliyoruz. Devam et.",
  "Bu soru masadaki herkesi ilgilendiriyor.",
  "Kaçış yok. 1 dakika senindir.",
  "Ortam ısınıyor gibi 🔥",
  "Eh, birinin söylemesi lazımdı.",
  "Rahat ol, sadece bir oyun... belki.",
  "Herkes seni izliyor. Baskı yok yani.",
  "Düşünmen için çok vaktin yok.",
  "Bu cevap efsane olacak hissediyorum.",
  "Kısa kesmek yasak bu arada.",
];

export function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = (location.state?.mode as keyof typeof CARD_CONTENT) || "relax";
  
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [currentCard, setCurrentCard] = useState(() => {
    const cards = CARD_CONTENT[mode];
    return cards[Math.floor(Math.random() * cards.length)];
  });
  const [snarkyComment, setSnarkyComment] = useState(() => {
    return SNARKY_COMMENTS[Math.floor(Math.random() * SNARKY_COMMENTS.length)];
  });
  const [cannotPass, setCannotPass] = useState(() => {
    // 10% chance of "cannot pass" round
    return Math.random() < 0.1;
  });

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const isLastSeconds = timeLeft <= 5 && timeLeft > 0;

  const handleContinue = () => {
    navigate("/continue", { state: { mode } });
  };

  const handleSkip = () => {
    // Get new random card and comment
    const cards = CARD_CONTENT[mode];
    const newCard = cards[Math.floor(Math.random() * cards.length)];
    const newComment = SNARKY_COMMENTS[Math.floor(Math.random() * SNARKY_COMMENTS.length)];
    const newCannotPass = Math.random() < 0.1;
    
    setCurrentCard(newCard);
    setSnarkyComment(newComment);
    setCannotPass(newCannotPass);
    setTimeLeft(60);
    setIsTimeUp(false);
  };

  const handlePass = () => {
    handleSkip();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-12" style={{ backgroundColor: "#0F1220" }}>
      {/* Timer */}
      <div className="w-full flex justify-center">
        <div
          className="text-6xl transition-colors duration-300"
          style={{
            color: isLastSeconds ? "#FFB703" : "#6C63FF",
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {timeLeft}
        </div>
      </div>

      {/* Card with Snarky Comment */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-4">
        {/* Cannot Pass Badge (if applicable) */}
        {cannotPass && !isTimeUp && (
          <div
            className="text-center px-4 py-2 rounded-full animate-pulse"
            style={{
              backgroundColor: "rgba(239, 71, 111, 0.2)",
              color: "#EF476F",
              fontSize: "0.875rem",
              fontWeight: 600,
              border: "1px solid rgba(239, 71, 111, 0.4)",
            }}
          >
            ⚠️ Bu soru pas geçilemez.
          </div>
        )}

        {/* Snarky Comment Above Card */}
        {!cannotPass && (
          <div
            className="text-center px-4 py-2 rounded-full"
            style={{
              backgroundColor: "rgba(108, 99, 255, 0.15)",
              color: "#B3B6D4",
              fontSize: "0.875rem",
              fontStyle: "italic",
            }}
          >
            {snarkyComment}
          </div>
        )}

        {/* Card */}
        <div
          className="w-full rounded-3xl p-8 shadow-2xl"
          style={{
            backgroundColor: "#1B1F3B",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            opacity: isTimeUp ? 0.7 : 1,
            transition: "opacity 0.3s",
            border: cannotPass ? "2px solid rgba(239, 71, 111, 0.3)" : "none",
          }}
        >
          <p
            className="text-center leading-relaxed"
            style={{
              color: "#FFFFFF",
              fontSize: "1.375rem",
              fontWeight: 500,
              lineHeight: 1.6,
            }}
          >
            {currentCard}
          </p>
        </div>

        {/* Pass hint (only if can pass and not time up) */}
        {!cannotPass && !isTimeUp && (
          <p
            className="text-center text-xs"
            style={{
              color: "rgba(179, 182, 212, 0.6)",
              fontStyle: "italic",
            }}
          >
            Pas geçebilirsin. Kimse açıklama istemez.
          </p>
        )}
      </div>

      {/* Bottom Section */}
      <div className="w-full flex flex-col items-center gap-3">
        {isTimeUp ? (
          <>
            <p className="text-base mb-1" style={{ color: "#EF476F", fontWeight: 600 }}>
              Süre doldu.
            </p>
            <button
              onClick={handleContinue}
              className="w-full max-w-xs h-14 rounded-2xl transition-transform active:scale-95"
              style={{
                backgroundColor: "#6C63FF",
                color: "#FFFFFF",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              Devam
            </button>
          </>
        ) : (
          <div className="w-full max-w-xs flex gap-3">
            {!cannotPass && (
              <button
                onClick={handlePass}
                className="flex-1 h-12 rounded-2xl transition-transform active:scale-95"
                style={{
                  backgroundColor: "rgba(27, 31, 59, 0.6)",
                  color: "#B3B6D4",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  border: "1px solid rgba(108, 99, 255, 0.3)",
                }}
              >
                Pas Geç
              </button>
            )}
            <button
              onClick={handleSkip}
              className="flex-1 h-12 rounded-2xl transition-transform active:scale-95"
              style={{
                backgroundColor: "rgba(27, 31, 59, 0.6)",
                color: "#B3B6D4",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "1px solid rgba(108, 99, 255, 0.3)",
              }}
            >
              Başka Soru
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
