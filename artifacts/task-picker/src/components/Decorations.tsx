import { motion } from "framer-motion";

export function Decorations() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top right blob */}
      <motion.div
        className="absolute -top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-secondary/20 blur-3xl mix-blend-multiply"
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Bottom left blob */}
      <motion.div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-3xl mix-blend-multiply"
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Floating accent blob */}
      <motion.div
        className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-accent/10 blur-3xl mix-blend-multiply"
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Playful shapes scattered around */}
      <FloatingShape type="circle" color="bg-primary/30" size="w-8 h-8" initial={{ top: '15%', left: '15%' }} delay={0} />
      <FloatingShape type="square" color="bg-secondary/40" size="w-12 h-12" initial={{ top: '25%', right: '20%' }} delay={1.5} />
      <FloatingShape type="triangle" color="bg-accent/30" size="w-10 h-10" initial={{ bottom: '20%', left: '25%' }} delay={3} />
      <FloatingShape type="circle" color="bg-primary/20" size="w-16 h-16" initial={{ bottom: '15%', right: '15%' }} delay={4.5} />
    </div>
  );
}

function FloatingShape({ 
  type, 
  color, 
  size, 
  initial, 
  delay 
}: { 
  type: 'circle' | 'square' | 'triangle'; 
  color: string; 
  size: string; 
  initial: any; 
  delay: number 
}) {
  const shapeClass = 
    type === 'circle' ? 'rounded-full' : 
    type === 'square' ? 'rounded-xl rotate-12' : 
    'rounded-lg [clip-path:polygon(50%_0%,0%_100%,100%_100%)] rotate-45';

  return (
    <motion.div
      className={`absolute ${color} ${size} ${shapeClass} backdrop-blur-sm`}
      style={initial}
      animate={{
        y: [-15, 15, -15],
        rotate: type === 'circle' ? 0 : [0, 15, -15, 0],
      }}
      transition={{
        duration: 5 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    />
  );
}
