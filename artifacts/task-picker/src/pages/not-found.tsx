import { Link } from "wouter";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-2xl max-h-2xl bg-destructive/5 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 md:p-12 shadow-xl border-4 border-destructive/10 text-center relative z-10 flex flex-col items-center"
      >
        <motion.div 
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6"
        >
          <AlertCircle className="w-10 h-10" />
        </motion.div>
        
        <h1 className="text-4xl font-display font-extrabold text-foreground mb-4">
          404!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The management task you're looking for has vanished into the void. Let's get back to assigning tasks to Bogna.
        </p>
        
        <Link href="/" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-lg text-white bg-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
          Take Me Back
        </Link>
      </motion.div>
    </div>
  );
}
