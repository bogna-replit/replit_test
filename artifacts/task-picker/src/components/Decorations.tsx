import { motion } from "framer-motion";

export function Decorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dreamy background blobs */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(192,132,252,0.25) 0%, rgba(244,114,182,0.15) 100%)" }}
        animate={{ x: [0, 30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(96,165,250,0.2) 0%, rgba(52,211,153,0.15) 100%)" }}
        animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[30%] left-[20%] w-[35vw] h-[35vw] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(244,114,182,0.12) 100%)" }}
        animate={{ x: [0, 50, 0], y: [0, 50, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Rainbow arc */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-[50%] opacity-10"
        style={{
          background: "conic-gradient(from 180deg, #f87171, #fb923c, #fbbf24, #34d399, #60a5fa, #a78bfa, #f472b6, #f87171)",
          filter: "blur(30px)",
        }}
      />

      {/* Floating stars */}
      <Star size={28} color="#c084fc" style={{ top: '10%', left: '8%' }} delay={0} />
      <Star size={18} color="#f472b6" style={{ top: '18%', left: '30%' }} delay={0.7} />
      <Star size={22} color="#60a5fa" style={{ top: '12%', right: '20%' }} delay={1.4} />
      <Star size={16} color="#fbbf24" style={{ top: '35%', right: '8%' }} delay={0.3} />
      <Star size={24} color="#34d399" style={{ bottom: '25%', left: '10%' }} delay={2} />
      <Star size={20} color="#a78bfa" style={{ bottom: '15%', right: '25%' }} delay={1} />
      <Star size={14} color="#f472b6" style={{ bottom: '35%', right: '12%' }} delay={2.5} />
      <Star size={26} color="#fbbf24" style={{ top: '55%', left: '5%' }} delay={1.8} />

      {/* Floating sparkle dots */}
      <Sparkle style={{ top: '22%', right: '35%' }} delay={0.5} color="#c084fc" />
      <Sparkle style={{ bottom: '30%', left: '28%' }} delay={1.2} color="#f472b6" />
      <Sparkle style={{ top: '65%', right: '18%' }} delay={2.2} color="#60a5fa" />
      <Sparkle style={{ top: '45%', left: '40%' }} delay={3} color="#fbbf24" />
    </div>
  );
}

function Star({ size, color, style, delay }: { size: number; color: string; style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ ...style, width: size, height: size }}
      animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    </motion.div>
  );
}

function Sparkle({ style, delay, color }: { style: React.CSSProperties; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute w-3 h-3 rounded-full"
      style={{ ...style, backgroundColor: color, boxShadow: `0 0 8px 2px ${color}` }}
      animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0.2, 0.8] }}
      transition={{ duration: 2 + delay * 0.3, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}
