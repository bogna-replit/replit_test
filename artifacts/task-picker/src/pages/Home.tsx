import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { usePickPerson } from "@workspace/api-client-react";
import { Loader2, Sparkles } from "lucide-react";
import { Decorations } from "@/components/Decorations";

export default function Home() {
  const [hasPicked, setHasPicked] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const { data, refetch, isFetching, isError } = usePickPerson({
    query: {
      enabled: false,
      staleTime: 0,
    }
  });

  const handlePickSomeone = async () => {
    setIsRevealing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const result = await refetch();
    if (result.isSuccess) {
      setHasPicked(true);
      fireConfetti();
    }
    setIsRevealing(false);
  };

  const fireConfetti = () => {
    const colors = ['#c084fc', '#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];
    const duration = 3500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors,
        shapes: ['star', 'circle'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors,
        shapes: ['star', 'circle'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const reset = () => setHasPicked(false);

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 md:p-12 z-10">
      <Decorations />

      <div className="w-full max-w-3xl flex flex-col items-center justify-center z-10 relative">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center px-5 py-3 mb-6 rounded-full bg-white/80 backdrop-blur-sm shadow-xl border-2 text-primary"
            style={{ borderColor: "hsl(280 85% 62% / 0.3)" }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl mr-2">🦄</span>
            <span className="font-display font-bold uppercase tracking-wider rainbow-text">The Magic Selector</span>
            <span className="text-2xl ml-2">✨</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] drop-shadow-sm">
            Who is destined to{" "}
            <span className="rainbow-text">lead a BA meeting</span>?
          </h1>
          <p className="mt-6 text-xl text-muted-foreground font-medium max-w-xl mx-auto">
            Let the unicorn oracle decide who gets to be today's hero! 🌈✨
          </p>
        </motion.div>

        {/* Interaction Area */}
        <AnimatePresence mode="wait">
          {!hasPicked ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 -m-8 rounded-full opacity-30 animate-ping [animation-duration:3s]"
                style={{ background: "radial-gradient(circle, hsl(280 85% 62%), transparent 70%)" }} />
              <div className="absolute inset-0 -m-3 rounded-full opacity-20 animate-ping [animation-duration:2s] delay-700"
                style={{ background: "radial-gradient(circle, hsl(330 95% 65%), transparent 70%)" }} />

              <button
                onClick={handlePickSomeone}
                disabled={isRevealing || isFetching}
                className="
                  relative overflow-hidden group
                  px-10 py-6 md:px-14 md:py-8
                  rounded-full font-display font-bold text-2xl md:text-3xl text-white
                  border-[6px] border-white
                  hover:-translate-y-2 active:translate-y-1
                  transition-all duration-300 ease-out
                  disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none
                "
                style={{
                  background: "linear-gradient(135deg, #c084fc 0%, #f472b6 40%, #60a5fa 100%)",
                  boxShadow: "0 10px 40px -10px rgba(192,132,252,0.7)",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 20px 50px -10px rgba(192,132,252,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 10px 40px -10px rgba(192,132,252,0.7)")}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-full pointer-events-none" />

                <span className="relative flex items-center justify-center gap-3">
                  {(isRevealing || isFetching) ? (
                    <>
                      <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin" />
                      Consulting the Unicorn...
                    </>
                  ) : (
                    <>
                      <span className="text-3xl group-hover:scale-125 transition-transform duration-300">🦄</span>
                      Find Out!
                    </>
                  )}
                </span>
              </button>

              {isError && (
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-destructive font-bold bg-destructive/10 px-4 py-2 rounded-xl">
                  Oops! The oracle is confused. Try again!
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
              className="w-full max-w-xl"
            >
              <div
                className="p-8 md:p-12 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "3px solid",
                  borderImage: "linear-gradient(135deg, #c084fc, #f472b6, #60a5fa) 1",
                  borderRadius: "2.5rem",
                  boxShadow: "0 20px 60px -15px rgba(192,132,252,0.3)",
                }}
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-2xl opacity-30"
                  style={{ background: "radial-gradient(circle, #c084fc, #f472b6)" }} />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-2xl opacity-30"
                  style={{ background: "radial-gradient(circle, #60a5fa, #34d399)" }} />

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-bold text-xl uppercase tracking-widest mb-4 rainbow-text"
                >
                  🌈 And the winner is... 🌈
                </motion.span>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.6 }}
                  className="flex flex-col items-center gap-4"
                >
                  <h2 className="text-7xl md:text-9xl font-display font-extrabold drop-shadow-md relative rainbow-text">
                    {data?.name ?? ""}

                    <motion.div
                      className="absolute -top-6 -right-12 text-5xl md:text-6xl origin-bottom-left"
                      animate={{ rotate: [0, 20, 0, -20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      {data?.emojis?.split('')[0] ?? "🎉"}
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-12 text-4xl md:text-5xl origin-top-right"
                      animate={{ y: [0, -10, 0], rotate: [0, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      {data?.emojis?.split('')[1] ?? "✨"}
                    </motion.div>
                  </h2>

                  <div className="text-4xl mt-2 tracking-widest">
                    {data?.emojis ?? "🎉✨💼"}
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  onClick={reset}
                  className="mt-12 font-bold text-lg transition-colors underline decoration-2 underline-offset-4"
                  style={{ color: "hsl(280 85% 62%)" }}
                >
                  🦄 That can't be right... pick again!
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
