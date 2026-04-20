import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { usePickPerson } from "@workspace/api-client-react";
import { Loader2, Sparkles, UserCheck } from "lucide-react";
import { Decorations } from "@/components/Decorations";

export default function Home() {
  const [hasPicked, setHasPicked] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // Use the generated hook, but disable automatic fetching on mount
  // We'll trigger it manually when the button is clicked
  const { data, refetch, isFetching, isError } = usePickPerson({
    query: {
      enabled: false,
      staleTime: 0, // Always fetch fresh to keep the excitement going
    }
  });

  const handlePickSomeone = async () => {
    setIsRevealing(true);
    
    // Artificial delay to build suspense!
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const result = await refetch();
    
    if (result.isSuccess) {
      setHasPicked(true);
      fireConfetti();
    }
    
    setIsRevealing(false);
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF4D70', '#FFD13B', '#9D4EDD']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF4D70', '#FFD13B', '#9D4EDD']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const reset = () => {
    setHasPicked(false);
  };

  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center p-6 md:p-12 z-10">
      <Decorations />

      <div className="w-full max-w-3xl flex flex-col items-center justify-center z-10 relative">
        
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.2 
          }}
          className="text-center mb-12"
        >
          <motion.div 
            className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white shadow-xl shadow-primary/10 border-2 border-primary/20 text-primary"
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          >
            <Sparkles className="w-8 h-8 mr-2" />
            <span className="font-display font-bold uppercase tracking-wider">The Magic Selector</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] drop-shadow-sm">
            Who is going to lead <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">the next BA meeting</span>?
          </h1>
          <p className="mt-6 text-xl text-muted-foreground font-medium max-w-xl mx-auto">
            Let fate decide who gets to be today's hero. Don't worry, it's completely random and totally fair!
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
              {/* Decorative rings behind button */}
              <div className="absolute inset-0 -m-6 rounded-full bg-primary/5 animate-ping [animation-duration:3s]" />
              <div className="absolute inset-0 -m-2 rounded-full bg-secondary/10 animate-ping [animation-duration:2s] delay-700" />
              
              <button
                onClick={handlePickSomeone}
                disabled={isRevealing || isFetching}
                className={`
                  relative overflow-hidden group
                  px-10 py-6 md:px-14 md:py-8 
                  rounded-full font-display font-bold text-2xl md:text-3xl text-white
                  bg-gradient-to-br from-primary to-[#ff335c]
                  shadow-[0_10px_40px_-10px_rgba(255,77,112,0.6)]
                  border-[6px] border-white
                  hover:shadow-[0_20px_50px_-10px_rgba(255,77,112,0.8)] hover:-translate-y-2
                  active:translate-y-1 active:shadow-[0_5px_20px_-5px_rgba(255,77,112,0.6)]
                  transition-all duration-300 ease-out
                  disabled:opacity-80 disabled:cursor-not-allowed disabled:transform-none
                `}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
                
                <span className="relative flex items-center justify-center gap-3">
                  {(isRevealing || isFetching) ? (
                    <>
                      <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin" />
                      Consulting the Oracle...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-125 transition-transform duration-300" />
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
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 15,
                delay: 0.1 
              }}
              className="w-full max-w-xl"
            >
              <div className="
                bg-white p-8 md:p-12 rounded-[2.5rem] 
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]
                border-[8px] border-secondary/20
                flex flex-col items-center justify-center
                relative overflow-hidden
              ">
                {/* Result Card Background Effects */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />

                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-primary font-bold text-xl uppercase tracking-widest mb-4"
                >
                  And the winner is...
                </motion.span>
                
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 10, 
                    delay: 0.6 
                  }}
                  className="flex flex-col items-center gap-4"
                >
                  <h2 className="text-7xl md:text-9xl font-display font-extrabold text-foreground drop-shadow-md relative">
                    {data?.name || "Bogna"}
                    
                    {/* Emojis floating around the name */}
                    <motion.div 
                      className="absolute -top-6 -right-12 text-5xl md:text-6xl origin-bottom-left"
                      animate={{ rotate: [0, 20, 0, -20, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      {data?.emojis?.split('')[0] || "🎉"}
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-2 -left-12 text-4xl md:text-5xl origin-top-right"
                      animate={{ y: [0, -10, 0], rotate: [0, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      {data?.emojis?.split('')[1] || "✨"}
                    </motion.div>
                  </h2>
                  <div className="text-4xl mt-2 tracking-widest">
                    {data?.emojis || "🎉✨💼"}
                  </div>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  onClick={reset}
                  className="mt-12 text-muted-foreground font-bold text-lg hover:text-primary transition-colors underline decoration-2 underline-offset-4 decoration-primary/30 hover:decoration-primary"
                >
                  That can't be right... pick again!
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
