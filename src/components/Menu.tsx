import { motion } from 'motion/react';
import { shakes } from '../data';
import { MousePointerClick, Star, Sparkles } from 'lucide-react';
import { Shake } from '../types';

interface MenuProps {
  onAddToCart?: (shake: Shake) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  return (
    <section id="menu" className="py-24 bg-[#FFFBF2] relative border-b-4 border-slate-900 overflow-hidden">
      {/* Padrão de pontos de fundo */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#0f172a_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-amber-400 border-4 border-slate-900 px-6 py-2 mb-6 shadow-[4px_4px_0_#0f172a] transform -rotate-2"
          >
            <span className="font-sans font-black uppercase tracking-widest text-slate-900 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Os Clássicos da Casa
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-6xl md:text-7xl text-slate-900 uppercase tracking-wide mb-6 drop-shadow-[3px_3px_0_#fef08a]"
          >
            Mais Pedidos
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {shakes.slice(0, 2).map((shake, index) => (
            <motion.div 
              key={shake.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-white border-4 border-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center shadow-[6px_6px_0_#0f172a] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#0f172a] transition-all group"
            >
              {/* Miniatura circular */}
              <div className="shrink-0 relative mx-auto sm:mx-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-100 shadow-[4px_4px_0_#0f172a]">
                  <img 
                    src={shake.image} 
                    alt={shake.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                </div>
                {/* Selo vintage */}
                <div className="absolute -bottom-2 -right-2 bg-rose-600 p-2 border-4 border-slate-900 shadow-[2px_2px_0_#0f172a] transform rotate-12 group-hover:rotate-[24deg] transition-transform">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
              </div>

              <div className="flex flex-col flex-grow w-full">
                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
                   <h3 className="font-display text-3xl text-slate-900 uppercase tracking-widest leading-none mb-2 sm:mb-0 group-hover:text-amber-500 transition-colors">
                     {shake.name}
                   </h3>
                   <div className="hidden sm:block flex-grow border-b-4 border-dotted border-slate-300 mx-4 relative top-[-6px]"></div>
                   <span className="font-display text-3xl text-rose-600 shrink-0">
                     R$ {shake.price.toFixed(2).replace('.', ',')}
                   </span>
                 </div>
                 
                 <p className="font-sans text-slate-600 font-medium leading-relaxed mb-6">
                   {shake.description}
                 </p>
                 
                 <div className="flex justify-start">
                   <button 
                     onClick={() => onAddToCart && onAddToCart(shake)}
                     className="flex items-center gap-2 text-sm font-black uppercase tracking-widest bg-slate-900 text-white px-5 py-3 border-4 border-slate-900 hover:bg-amber-400 hover:text-slate-900 transition-colors shadow-[4px_4px_0_#0f172a_inset] hover:shadow-none"
                   >
                     <MousePointerClick strokeWidth={2.5} className="w-4 h-4" />
                     Pedir Esse
                   </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
