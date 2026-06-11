import { motion } from 'motion/react';
import { Star, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartOrder: () => void;
}

export default function Hero({ onStartOrder }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-[#FFFBF2] flex items-center border-b-4 border-slate-900">
      {/* Padrão de piso retrô */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full h-full flex flex-col lg:flex-row items-center py-12 lg:py-0">
        
        {/* Coluna esquerda - Texto */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 pt-10 lg:pt-0"
        >
          <div className="inline-block bg-amber-400 border-4 border-slate-900 border-b-8 px-6 py-2 transform -rotate-2 mb-6">
            <span className="font-sans font-black uppercase tracking-widest text-slate-900 text-lg sm:text-xl">
              A Receita Original de 1955
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-[8rem] text-rose-600 leading-[0.9] tracking-tight mb-8 drop-shadow-[4px_4px_0_#0f172a] relative">
            <motion.div 
              className="absolute -top-12 -left-8 text-amber-400 hidden lg:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-16 h-16 fill-amber-400" />
            </motion.div>
            SHAKE
          </h1>
          
          <div className="max-w-xl border-y-4 border-slate-900 py-6 mb-12 bg-[#FFFBF2] relative">
             <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
             <p className="text-lg sm:text-xl text-slate-800 font-sans font-bold leading-relaxed tracking-wider uppercase pl-6">
              A verdadeira experiência vintage de milkshakes. Cremosos, perfeitos, feitos na hora só para você com ingredientes fresquinhos.
            </p>
          </div>
          
          <button 
            onClick={onStartOrder} 
            className="group flex items-center gap-4 bg-rose-600 text-[#FFFBF2] font-black px-10 py-5 text-xl uppercase tracking-widest border-4 border-slate-900 hover:bg-amber-400 hover:text-slate-900 transition-all shadow-[8px_8px_0_#0f172a] hover:shadow-[4px_4px_0_#0f172a] hover:translate-x-1 hover:translate-y-1"
          >
            Monte o Seu Shake
            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
          </button>
        </motion.div>

        {/* Coluna direita - Imagem */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
           className="w-full lg:w-1/2 mt-16 lg:mt-0 relative hidden md:block"
        >
          {/* Fundo decorativo em arco */}
          <div className="absolute inset-0 bg-amber-400 border-4 border-slate-900 rounded-t-[200px] transform rotate-3 translate-x-4 shadow-[12px_12px_0_#0f172a]"></div>
          
          <div className="relative z-10 bg-white border-4 border-slate-900 rounded-t-[200px] overflow-hidden aspect-[4/5] max-h-[600px] mx-auto w-full max-w-md">
            <img 
              src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800" 
              alt="Milkshake vintage de morango"
              className="w-full h-full object-cover"
            />
            {/* Borda interna simulando uma moldura */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          </div>

          <motion.div 
            className="absolute -bottom-8 -right-8 text-rose-500 origin-center z-20"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-24 h-24 fill-rose-500 stroke-slate-900 stroke-[2px]" />
          </motion.div>

          {/* Selo flutuante */}
          <motion.div
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-16 -left-8 lg:left-0 z-20 bg-white border-4 border-slate-900 rounded-full w-32 h-32 flex flex-col items-center justify-center transform -rotate-12 shadow-[6px_6px_0_#0f172a]"
          >
            <span className="font-display text-4xl text-rose-600 drop-shadow-[1px_1px_0_#2D2D2D]">100%</span>
            <span className="font-sans font-black uppercase text-xs tracking-widest text-slate-800">Cremoso</span>
          </motion.div>

        </motion.div>
        
      </div>
    </section>
  );
}
