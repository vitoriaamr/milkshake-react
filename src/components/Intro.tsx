import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Intro() {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    // Esconde a introdução após alguns segundos
    const timer = setTimeout(() => setShow(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-600 text-[#FFFBF2] overflow-hidden"
        >
          {/* Padrão retrô */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFFBF2_2px,transparent_2px)] [background-size:24px_24px]"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="flex flex-col items-center relative z-10 bg-[#FFFBF2] px-12 py-8 border-8 border-amber-400 shadow-[16px_16px_0_#2D2D2D] transform -rotate-2"
          >
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl sm:text-5xl tracking-tight text-slate-800 drop-shadow-[2px_2px_0_#e63946]">SHAKE</span>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
              className="h-2 bg-amber-400 mt-4 border-2 border-slate-800"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
