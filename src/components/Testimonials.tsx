import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Maria S.",
    text: "O de baunilha com morango silvestre me levou direto de volta para 1985. Melhor da cidade!",
    rating: 5,
    date: "12 Mar"
  },
  {
    id: 2,
    name: "João P.",
    text: "Cremoso, as gotas belgas são gigantes e o atendimento é impecável. Virou rota obrigatória no final de semana.",
    rating: 5,
    date: "08 Jul"
  },
  {
    id: 3,
    name: "Ana Clara",
    text: "O creme de pistache... meu deus. Sem palavras, apenas peçam. A melhor coisa que já tomei.",
    rating: 5,
    date: "15 Ago"
  },
  {
    id: 4,
    name: "Carlos T.",
    text: "Igualzinho aos filmes antigos. O chantilly é fresco de verdade. Recomendo o cacau premium com caramelo.",
    rating: 4,
    date: "22 Set"
  },
  {
    id: 5,
    name: "Luiza M.",
    text: "Que experiência incrível! Parecia que eu tinha voltado no tempo. Ambiente e sabores impecáveis.",
    rating: 5,
    date: "05 Out"
  }
];

export default function Testimonials() {
  const extended = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-amber-400 border-b-4 border-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#0f172a_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
         <div className="flex flex-col items-center">
           <Quote className="w-12 h-12 text-white mb-6 drop-shadow-[2px_2px_0_#0f172a]" strokeWidth={3} />
           <h2 className="font-display text-5xl md:text-6xl text-slate-900 uppercase tracking-wide text-center drop-shadow-[2px_2px_0_#FFFBF2]">
             Coração de Ouro
           </h2>
           <p className="font-sans font-black uppercase tracking-widest text-rose-600 mt-4 bg-white px-4 py-1 border-2 border-slate-900 shadow-[4px_4px_0_#0f172a] transform -rotate-2">
             O que as ruas estão dizendo
           </p>
         </div>
       </div>

       <div className="relative pb-12 w-full overflow-hidden flex">
          <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-amber-400 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-amber-400 to-transparent z-20 pointer-events-none" />
          
          <motion.div 
             animate={{ x: ["0%", "-33.3333%"] }}
             transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
             className="flex gap-8 px-8 w-max"
          >
             {extended.map((t, idx) => (
               <div 
                 key={`${t.id}-${idx}`}
                 className="w-[280px] md:w-[350px] flex flex-col flex-shrink-0 bg-[#FFFBF2] border-4 border-slate-900 p-8 shadow-[8px_8px_0_#0f172a] hover:-translate-y-2 hover:-rotate-1 transition-transform cursor-grab active:cursor-grabbing"
               >
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-rose-600 text-slate-900" strokeWidth={2} />
                    ))}
                    {[...Array(5 - t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-slate-200 text-slate-400" strokeWidth={2} />
                    ))}
                  </div>
                  <p className="font-sans font-bold text-lg text-slate-800 leading-relaxed mb-8 flex-grow">
                    "{t.text}"
                  </p>
                  <div className="border-t-4 border-dashed border-amber-200 pt-6 mt-auto">
                    <span className="block font-sans font-black text-xl text-slate-900 uppercase tracking-widest">{t.name}</span>
                    <span className="block font-sans font-bold text-xs text-rose-600 uppercase tracking-widest mt-1">{t.date}</span>
                  </div>
               </div>
             ))}
          </motion.div>
       </div>
    </section>
  );
}
