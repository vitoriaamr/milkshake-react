import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ingredients } from '../data';
import { Check, Plus, Receipt, ChevronRight, Package, X, Sparkles, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface BuilderProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  viewState: 'builder' | 'cart' | 'success';
  setViewState: React.Dispatch<React.SetStateAction<'builder' | 'cart' | 'success'>>;
}

export default function Builder({ cart, setCart, viewState, setViewState }: BuilderProps) {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedMixins, setSelectedMixins] = useState<string[]>([]);
  const [selectedSyrups, setSelectedSyrups] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<'base' | 'mixin' | 'syrup' | 'topping'>('base');
  
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  const tabs = [
    { id: 'base', label: '1. A Base' },
    { id: 'mixin', label: '2. Texturas' },
    { id: 'syrup', label: '3. Caldas' },
    { id: 'topping', label: '4. Toppings' },
  ] as const;

  const handleSurpriseMe = () => {
    const bases = ingredients.filter(i => i.category === 'base');
    const mixins = ingredients.filter(i => i.category === 'mixin');
    const syrups = ingredients.filter(i => i.category === 'syrup');
    const toppings = ingredients.filter(i => i.category === 'topping');

    const randomBase = bases[Math.floor(Math.random() * bases.length)];
    const randomMixins = mixins.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1).map(i => i.id);
    const randomSyrups = syrups.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1).map(i => i.id);
    const randomToppings = toppings.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 1).map(i => i.id);

    setSelectedBase(randomBase.id);
    setSelectedMixins(randomMixins);
    setSelectedSyrups(randomSyrups);
    setSelectedToppings(randomToppings);
    setActiveTab('base');
  };

  const currentIngredients = useMemo(() => 
    ingredients.filter(ing => ing.category === activeTab),
  [activeTab]);

  const toggleSelection = (id: string, category: string) => {
    if (category === 'base') {
      setSelectedBase(id);
      setActiveTab('mixin');
    } else if (category === 'mixin') {
      setSelectedMixins(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else if (category === 'syrup') {
      setSelectedSyrups(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    } else if (category === 'topping') {
      setSelectedToppings(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    }
  };

  const isSelected = (id: string, category: string) => {
    if (category === 'base') return selectedBase === id;
    if (category === 'mixin') return selectedMixins.includes(id);
    if (category === 'syrup') return selectedSyrups.includes(id);
    if (category === 'topping') return selectedToppings.includes(id);
    return false;
  };

  const selectedItemsDetails = useMemo(() => {
    const items = [];
    if (selectedBase) items.push(ingredients.find(i => i.id === selectedBase)!);
    selectedMixins.forEach(id => items.push(ingredients.find(i => i.id === id)!));
    selectedSyrups.forEach(id => items.push(ingredients.find(i => i.id === id)!));
    selectedToppings.forEach(id => items.push(ingredients.find(i => i.id === id)!));
    return items;
  }, [selectedBase, selectedMixins, selectedSyrups, selectedToppings]);

  const totalPrice = useMemo(() => 
    selectedItemsDetails.reduce((sum, item) => sum + item.price, 0),
  [selectedItemsDetails]);

  const getCartTotal = () => cart.reduce((sum, item) => sum + item.price, 0);

  const resetBuilder = () => {
    setSelectedBase(null);
    setSelectedMixins([]);
    setSelectedSyrups([]);
    setSelectedToppings([]);
    setActiveTab('base');
  };

  const addToCart = () => {
    if (!selectedBase) return;
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      base: selectedBase,
      mixins: selectedMixins,
      syrups: selectedSyrups,
      toppings: selectedToppings,
      price: totalPrice,
      details: selectedItemsDetails
    };
    setCart([...cart, newItem]);
    resetBuilder();
    setViewState('cart');
    setIsMobileCartOpen(false);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    if (cart.length === 1) {
      setViewState('builder');
    }
  };

  const currentLiquidColor = selectedItemsDetails.find(i => i.category === 'base')?.color || 'bg-slate-200';

  if (viewState === 'success') {
    return (
      <div className="py-24 lg:py-32 bg-[#FFFBF2] min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="bg-white border-4 border-slate-900 p-12 shadow-[16px_16px_0_#0f172a]"
          >
            <div className="w-24 h-24 bg-amber-400 border-4 border-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[6px_6px_0_#0f172a]">
              <Package className="w-12 h-12 text-slate-900" strokeWidth={2.5} />
            </div>
            <h2 className="font-display text-5xl md:text-6xl text-rose-600 mb-6 uppercase tracking-wide drop-shadow-[3px_3px_0_#2D2D2D]">Pedido Anotado!</h2>
            <div className="max-w-lg mx-auto border-y-4 border-slate-900 py-4 mb-10 bg-[#FFFBF2]">
              <p className="font-sans font-bold text-xl uppercase tracking-widest text-slate-800">
                Aguarde o chamado. Seu pedido está na batedeira!
              </p>
            </div>
            
            <button
              onClick={() => {
                setViewState('builder');
                setCart([]);
                resetBuilder();
              }}
              className="inline-block bg-slate-900 text-white font-black px-12 py-5 text-xl uppercase tracking-widest border-4 border-slate-900 hover:bg-rose-600 transition-colors shadow-[8px_8px_0_#FFFBF2_inset]"
            >
              Fazer Novo Pedido
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (viewState === 'cart') {
    return (
      <div className="py-24 lg:py-32 bg-[#FFFBF2] min-h-[70vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-4 border-slate-900 p-8 shadow-[12px_12px_0_#0f172a] transform -rotate-1"
          >
            <div className="flex items-center justify-center gap-4 mb-10 border-b-4 border-slate-900 pb-6">
              <ShoppingBag className="w-10 h-10 text-rose-600" strokeWidth={2.5} />
              <h2 className="font-display text-5xl text-slate-900 uppercase tracking-wide">Seu Carrinho</h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-sans font-bold text-slate-500 uppercase tracking-widest mb-8">
                  Seu carrinho está vazio
                </p>
                <button
                  onClick={() => setViewState('builder')}
                  className="bg-amber-400 border-4 border-slate-900 px-8 py-4 font-black uppercase tracking-widest shadow-[6px_6px_0_#0f172a] hover:bg-rose-600 hover:text-white transition-colors"
                >
                  Montar um Shake
                </button>
              </div>
            ) : (
              <div className="space-y-6 mb-12">
                <AnimatePresence>
                  {cart.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="border-4 border-slate-900 p-6 bg-[#FFFBF2] flex flex-col md:flex-row justify-between md:items-center gap-6"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-display text-2xl text-slate-900 uppercase">Shake #{index + 1}</span>
                          <span className="bg-rose-600 text-white font-sans font-black text-xs uppercase px-2 py-1 rounded-sm tracking-widest">
                            Personalizado
                          </span>
                        </div>
                        <p className="font-sans font-medium text-slate-600 text-sm">
                          {item.details.map(d => d.name).join(', ')}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0 border-t-2 md:border-t-0 border-slate-200 border-dashed pt-4 md:pt-0">
                        <span className="font-display text-3xl text-rose-600">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="bg-white border-2 border-slate-900 p-2 text-slate-500 hover:text-white hover:bg-slate-900 transition-colors rounded-lg flex items-center justify-center w-12 h-12 shrink-0 group relative overflow-hidden"
                          title="Apagar Pedido"
                        >
                          <Trash2 strokeWidth={2.5} className="w-5 h-5 absolute z-10" />
                          <span className="absolute inset-0 bg-rose-600 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100 z-0" />
                          <Trash2 strokeWidth={2.5} className="w-5 h-5 absolute z-20 text-transparent group-hover:text-white transition-colors duration-300" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <div className="border-t-4 border-slate-900 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                   <span className="font-sans font-black text-2xl uppercase tracking-widest text-slate-900">Total do Pedido</span>
                   <span className="font-display text-5xl text-rose-600 drop-shadow-[2px_2px_0_#2D2D2D]">
                     R$ {getCartTotal().toFixed(2).replace('.', ',')}
                   </span>
                </div>
              </div>
            )}

            {cart.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => setViewState('builder')}
                  className="flex-1 py-4 font-black text-lg uppercase tracking-widest border-4 border-slate-900 bg-white text-slate-900 hover:bg-amber-400 transition-colors shadow-[4px_4px_0_#0f172a]"
                >
                  Adicionar Mais
                </button>
                <button
                  onClick={() => setViewState('success')}
                  className="flex-1 py-4 font-black text-lg uppercase tracking-widest border-4 border-slate-900 bg-rose-600 text-white hover:bg-slate-900 transition-colors shadow-[4px_4px_0_#0f172a] flex items-center justify-center gap-2"
                >
                  Pagar
                  <Receipt strokeWidth={3} className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  const renderReceipt = () => (
    <>
      <div className="relative w-32 h-56 mx-auto mb-6 flex flex-col justify-end items-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: selectedBase ? 1 : 0 }}
          className="absolute top-0 right-4 w-3 h-32 border-2 border-slate-900 z-0 origin-bottom"
          style={{ 
            transform: 'rotate(15deg)',
            background: 'repeating-linear-gradient(45deg, #e11d48, #e11d48 10px, #ffffff 10px, #ffffff 20px)'
          }}
        />
        <div className="relative w-full h-48 border-4 border-slate-900 rounded-b-[2rem] bg-white overflow-hidden flex flex-col-reverse shadow-[4px_0_0_#0f172a] z-10 p-1">
          <AnimatePresence>
            {selectedBase && (
              <motion.div
                 initial={{ height: "0%" }}
                 animate={{ height: `${Math.min(50 + (selectedItemsDetails.length - 1) * 10, 100)}%` }}
                 exit={{ height: "0%" }}
                 className={`relative w-full rounded-b-[1.75rem] ${currentLiquidColor} transition-all duration-700 ease-in-out`}
              >
                 <div className="absolute top-0 left-2 w-2 h-full bg-white/30 rounded-full"></div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute top-2 right-2 w-3 h-3/4 bg-white/50 rounded-full z-20 pointer-events-none"></div>
          {!selectedBase && (
            <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-sans font-bold uppercase tracking-widest text-sm text-center px-4">
              Vazio
            </div>
          )}
        </div>
        <div className="w-16 h-4 border-4 border-slate-900 border-t-0 bg-white z-0 flex rounded-b-lg mb-1 shadow-[4px_4px_0_#0f172a]" />
        <div className="w-24 h-4 border-4 border-slate-900 bg-slate-100 z-0 rounded-t-lg shadow-[4px_4px_0_#0f172a]" />
      </div>

      <div className="flex items-center gap-3 mb-6 border-b-4 border-slate-900 pb-4">
        <Receipt className="w-6 h-6 text-rose-600" strokeWidth={2.5} />
        <h3 className="font-display text-3xl text-slate-900 uppercase">A Conta</h3>
      </div>

      <div className="space-y-3 min-h-[120px] mb-6 font-sans font-bold">
        {selectedItemsDetails.length === 0 ? (
          <p className="text-slate-400 text-center py-4 text-sm">
            Sua seleção aparecerá aqui.
          </p>
        ) : (
          <AnimatePresence>
            {selectedItemsDetails.map((item, index) => (
              <motion.div 
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex justify-between items-start border-b-2 border-slate-100 border-dashed pb-2"
              >
                <div className="flex flex-col">
                  <span className="text-slate-900 text-sm uppercase">{item.name}</span>
                  <span className="text-[10px] text-rose-600 uppercase tracking-widest">{item.category}</span>
                </div>
                <span className="text-slate-900 text-sm">
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="border-t-4 border-slate-900 pt-4 mb-6 mt-auto">
        <div className="flex justify-between items-center text-slate-900">
          <span className="font-sans font-black text-lg uppercase tracking-widest">Total</span>
          <motion.span 
            key={totalPrice}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="font-display text-3xl text-rose-600 drop-shadow-[1px_1px_0_#2D2D2D]"
          >
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </motion.span>
        </div>
      </div>

      <button 
        disabled={!selectedBase}
        onClick={addToCart}
        className={`w-full py-4 font-black text-lg uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border-4 ${
          selectedBase 
            ? 'bg-rose-600 border-slate-900 text-white shadow-[6px_6px_0_#0f172a] hover:bg-amber-400 hover:text-slate-900 hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#0f172a]' 
            : 'bg-slate-200 border-slate-300 text-slate-400 cursor-not-allowed'
        }`}
      >
        <ShoppingBag strokeWidth={3} className="w-5 h-5 mr-1" />
        Adicionar
      </button>
      
      {cart.length > 0 && (
         <button 
            onClick={() => setViewState('cart')}
            className="w-full py-3 mt-4 font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border-4 bg-white border-slate-900 text-slate-900 shadow-[4px_4px_0_#0f172a] hover:bg-slate-100"
         >
            Ver Carrinho ({cart.length})
         </button>
      )}
    </>
  );

  return (
    <div className="py-12 lg:py-20 bg-[#FFFBF2] pb-32 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-2xl mx-auto bg-amber-400 border-4 border-slate-900 p-8 shadow-[8px_8px_0_#0f172a] transform -rotate-1">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl font-medium mb-4 text-slate-900 tracking-wider uppercase drop-shadow-[2px_2px_0_#FFFBF2]"
          >
            A Máquina do Sabor
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-800 font-sans font-bold uppercase tracking-wider mb-8"
          >
            Escolha as peças e nós montamos sua obra de arte.
          </motion.p>
          <motion.button
            onClick={handleSurpriseMe}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-rose-600 text-white font-black px-6 py-3 uppercase tracking-widest border-4 border-slate-900 shadow-[4px_4px_0_#0f172a] hover:bg-slate-900 hover:text-white hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_#0f172a] transition-all"
          >
            <Sparkles className="w-5 h-5" strokeWidth={2.5} />
            Me Surpreenda
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Controles do montador */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="flex overflow-x-auto pb-4 mb-12 gap-4 scrollbar-hide border-b-4 border-slate-900">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-6 py-4 font-sans font-bold text-lg tracking-widest uppercase transition-all relative border-4 border-b-0 border-slate-900 rounded-t-xl ${
                    activeTab === tab.id 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                  {currentIngredients.map((item) => {
                    const selected = isSelected(item.id, activeTab);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleSelection(item.id, activeTab)}
                        className={`group cursor-pointer rounded-xl border-4 p-6 flex flex-col justify-between min-h-[160px] transition-all duration-300 ${
                          selected 
                            ? 'border-slate-900 bg-amber-50 shadow-[8px_8px_0_#0f172a]' 
                            : 'border-slate-900 bg-white shadow-[4px_4px_0_#0f172a] hover:shadow-[6px_6px_0_#0f172a] hover:-translate-y-1 hover:-translate-x-1'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <h4 className={`font-display text-2xl pr-8 transition-colors ${selected ? 'text-rose-600' : 'text-slate-900'}`}>
                              {item.name}
                            </h4>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors border-2 ${
                              selected ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-900 text-slate-900 bg-white group-hover:bg-amber-100'
                            }`}>
                              {selected ? <Check strokeWidth={3} className="w-5 h-5" /> : <Plus strokeWidth={3} className="w-5 h-5" />}
                            </div>
                          </div>
                          <p className="text-slate-600 font-sans font-medium text-base pr-4">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="mt-6 font-display font-black text-xl text-slate-900">
                          + R$ {item.price.toFixed(2).replace('.', ',')}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Painel do recibo - Desktop */}
          <div className="hidden lg:flex lg:col-span-4 perspective-1000 flex-col gap-8">
            <motion.div 
              className="sticky top-32 bg-white rounded-xl p-6 border-4 border-slate-900 shadow-[12px_12px_0_#0f172a]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {renderReceipt()}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Barra flutuante do carrinho - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-4 border-slate-900 px-4 py-4 flex items-center justify-between shadow-[0_-4px_0_#0f172a]">
        <div>
          <span className="block font-sans font-bold text-xs uppercase tracking-widest text-slate-500">Total</span>
          <span className="font-display font-bold text-2xl text-rose-600 drop-shadow-[1px_1px_0_#2D2D2D]">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
        </div>
        <button 
           onClick={() => setIsMobileCartOpen(true)}
           className="bg-amber-400 border-4 border-slate-900 px-6 py-3 font-sans font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-colors"
        >
           Ver Conta
        </button>
      </div>

      {/* Modal do carrinho - Mobile */}
      <AnimatePresence>
        {isMobileCartOpen && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm lg:hidden p-4"
             onClick={() => setIsMobileCartOpen(false)}
          >
            <motion.div 
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="w-full max-w-sm bg-white rounded-2xl border-4 border-slate-900 p-6 flex flex-col max-h-[85vh] overflow-y-auto relative shadow-[8px_8px_0_#0f172a]"
               onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 z-10">
                   <button onClick={() => setIsMobileCartOpen(false)} className="w-8 h-8 flex items-center justify-center border-2 border-slate-900 rounded-full hover:bg-slate-100 bg-white">
                      <X className="w-5 h-5" strokeWidth={3} />
                   </button>
                </div>
                {renderReceipt()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
