import { Menu as MenuIcon, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'builder') => void;
  currentPage: string;
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ onNavigate, currentPage, cartCount, onCartClick }: NavbarProps) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      className="fixed top-0 w-full z-50 bg-[#FFFBF2] border-b-4 border-slate-900 shadow-[0_4px_0_#e63946]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logotipo */}
          <div 
            className="flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onNavigate('home')}
          >
            <span className="font-display text-4xl text-slate-800 tracking-tight">
              SHAKE
            </span>
          </div>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => onNavigate('home')}
              className={`font-sans font-black text-lg uppercase tracking-widest transition-colors ${
                currentPage === 'home' ? 'text-rose-600' : 'text-slate-800 hover:text-rose-600'
              }`}
            >
              Início
            </button>
            <button 
              onClick={() => onNavigate('builder')}
              className={`font-sans font-black text-lg flex items-center gap-2 uppercase tracking-widest group transition-colors ${
                currentPage === 'builder' ? 'text-rose-600' : 'text-slate-800 hover:text-amber-500'
              }`}
            >
              <Star className={`w-5 h-5 transition-transform duration-500 fill-amber-400 group-hover:rotate-180 ${currentPage === 'builder' ? 'text-amber-400 rotate-180' : 'text-amber-400'}`} /> 
              Montar
            </button>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-6">
            <button 
              className="relative p-2 text-slate-900 transition-colors cursor-pointer group"
              onClick={onCartClick}
            >
              <ShoppingBag className="w-8 h-8 hover:scale-110 transition-transform" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-400 text-slate-900 border-2 border-slate-900 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-slate-900 cursor-pointer">
              <MenuIcon className="w-8 h-8" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
