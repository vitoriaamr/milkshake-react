import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-[#FFFBF2] pt-24 pb-12 border-t-8 border-rose-600 relative overflow-hidden">
      {/* Faixas retrô */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-amber-400"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-center md:text-left">
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-1 mb-6">
              <span className="font-display text-4xl text-amber-400 tracking-tight">
                SHAKE
              </span>
            </div>
            <p className="font-sans font-medium text-lg max-w-sm mb-10 leading-relaxed text-slate-300">
              A verdadeira experiência vintage de milkshakes. A mesma receita de 1955.
            </p>
            <div className="flex gap-2 text-amber-400">
              <Sparkles className="w-5 h-5" />
              <Sparkles className="w-5 h-5" />
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans font-black tracking-widest text-rose-600 text-sm uppercase mb-8 drop-shadow-[1px_1px_0_#2D2D2D]">Menu</h4>
            <ul className="space-y-4 font-sans text-lg font-bold">
              <li><a href="#builder" className="hover:text-amber-400 transition-colors">Montador de Shake</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">A História</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Cardápio Clássico</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-sans font-black tracking-widest text-rose-600 text-sm uppercase mb-8 drop-shadow-[1px_1px_0_#2D2D2D]">Horários</h4>
            <ul className="space-y-4 font-sans text-lg font-bold w-full max-w-[200px]">
              <li className="flex justify-between border-b-2 border-slate-700 border-dashed pb-2">
                <span>Seg - Sex</span> <span className="text-amber-400">12h - 22h</span>
              </li>
              <li className="flex justify-between border-b-2 border-slate-700 border-dashed pb-2">
                <span>Sáb - Dom</span> <span className="text-amber-400">10h - 24h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t-4 border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-sans font-black text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} SHAKE. TODO O DIREITO RESERVADO.
          </p>
          <div className="flex gap-8 font-sans font-black text-xs tracking-widest uppercase text-slate-400">
            <a href="#" className="hover:text-amber-400 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-amber-400 transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
