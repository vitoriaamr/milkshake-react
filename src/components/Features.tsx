import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Features() {
  return (
    <section className="bg-rose-600 border-b-4 border-slate-900 overflow-hidden relative flex flex-col">
      {/* Pontos de fundo */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFFBF2_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>

      {/* Faixa de texto rolante */}
      <div className="bg-amber-400 border-b-4 border-slate-900 flex overflow-hidden py-4 whitespace-nowrap transform z-20">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex items-center gap-8 font-sans font-black uppercase tracking-widest text-2xl text-slate-900"
        >
          {[...Array(20)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>Sabor Inesquecível</span>
              <Star className="w-6 h-6 fill-slate-900" />
              <span>Receita Original de 1955</span>
              <Star className="w-6 h-6 fill-slate-900" />
            </span>
          ))}
        </motion.div>
      </div>
      
      <div className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="flex flex-col items-center text-center max-w-3xl"
        >
           <h2 className="font-display text-6xl md:text-7xl lg:text-[7rem] text-[#FFFBF2] drop-shadow-[5px_5px_0_#0f172a] uppercase tracking-wide leading-[0.85] mb-8">
             Nossa<br />História
           </h2>
           <p className="font-sans font-bold text-xl text-rose-100 uppercase tracking-widest leading-relaxed mb-8 border-t-4 border-b-4 border-amber-400 py-6">
             Começamos em uma pequena garagem em 1955. Nossa missão? Criar a mistura perfeita de leite cremoso e sorvete artesanal.
           </p>
           <p className="font-sans font-medium text-lg text-white mb-10">
             Mais de seis décadas depois, continuamos batendo cada copo individualmente. Sem atalhos. Sem ingredientes artificiais. O verdadeiro sabor da era de ouro dos diners americanos, bem aqui para você.
           </p>
           
           <div className="inline-flex items-center gap-4 bg-[#FFFBF2] px-8 py-4 border-4 border-slate-900 shadow-[6px_6px_0_#0f172a] transform rotate-1 hover:-rotate-1 transition-transform cursor-default">
              <span className="font-display text-4xl text-rose-600">100%</span>
              <div className="flex flex-col text-left">
                 <span className="font-sans font-black text-slate-900 uppercase tracking-widest leading-none text-lg">Garantia</span>
                 <span className="font-sans font-bold text-slate-500 uppercase tracking-widest text-xs mt-1">Artesanal</span>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
