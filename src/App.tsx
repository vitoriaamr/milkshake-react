import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Builder from './components/Builder';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Menu from './components/Menu';
import StoreLocator from './components/StoreLocator';
import Footer from './components/Footer';
import Intro from './components/Intro';
import { CartItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'builder'>('home');
  const [viewState, setViewState] = useState<'builder' | 'cart' | 'success'>('builder');
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleNavigate = (page: 'home' | 'builder') => {
    setCurrentPage(page);
    if (page === 'builder') {
      setViewState('builder');
    }
  };

  const handleCartClick = () => {
    setCurrentPage('builder');
    setViewState('cart');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF2] selection:bg-rose-600 selection:text-white overflow-x-hidden flex flex-col">
      <Intro />
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage}
        cartCount={cart.length}
        onCartClick={handleCartClick}
      />
      <main className="flex-grow pt-24">
        {currentPage === 'home' ? (
          <>
            <Hero onStartOrder={() => handleNavigate('builder')} />
            <Menu onAddToCart={(shake) => {
              const newItem: CartItem = {
                id: Math.random().toString(36).substr(2, 9),
                base: null,
                mixins: [],
                syrups: [],
                toppings: [],
                price: shake.price,
                details: [{ name: shake.name, category: 'Pronto', price: shake.price }]
              };
              setCart([...cart, newItem]);
              setCurrentPage('builder');
              setViewState('cart');
            }} />
            <Features />
            <StoreLocator />
            <Testimonials />
          </>
        ) : (
          <Builder 
            cart={cart}
            setCart={setCart}
            viewState={viewState}
            setViewState={setViewState}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
