import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Phone, Clock, Loader2 } from 'lucide-react';
import { Store } from '../types';

export default function StoreLocator() {
  const [stores, setStores] = useState<Store[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setError('Seu navegador não suporta geolocalização.');
      return;
    }

    setStatus('loading');
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`/api/stores/nearby?lat=${latitude}&lng=${longitude}&limit=5`);
          if (!res.ok) throw new Error('Falha ao buscar lojas.');
          const data: Store[] = await res.json();
          setStores(data);
          setStatus('done');
        } catch (err) {
          setStatus('error');
          setError('Não foi possível buscar as lojas. Tente novamente.');
        }
      },
      () => {
        setStatus('error');
        setError('Não foi possível acessar sua localização. Verifique as permissões do navegador.');
      }
    );
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FFFBF2] border-b-4 border-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#0f172a_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <MapPin className="w-12 h-12 text-rose-600 mb-6 drop-shadow-[2px_2px_0_#0f172a]" strokeWidth={3} />
          <h2 className="font-display text-5xl md:text-6xl text-slate-900 uppercase tracking-wide drop-shadow-[2px_2px_0_#fbbf24]">
            Lojas Próximas
          </h2>
          <p className="font-sans font-bold text-lg text-slate-600 mt-4 max-w-xl">
            Descubra a unidade Coração de Ouro mais perto de você.
          </p>

          <button
            onClick={handleLocate}
            disabled={status === 'loading'}
            className="mt-8 inline-flex items-center gap-3 bg-rose-600 text-white font-sans font-black uppercase tracking-widest px-8 py-4 border-4 border-slate-900 shadow-[6px_6px_0_#0f172a] hover:-translate-y-1 hover:shadow-[8px_8px_0_#0f172a] active:translate-y-0 active:shadow-[4px_4px_0_#0f172a] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Localizando...
              </>
            ) : (
              <>
                <Navigation className="w-5 h-5" />
                Usar minha localização
              </>
            )}
          </button>

          {status === 'error' && (
            <p className="mt-4 font-sans font-bold text-rose-600 bg-white px-4 py-2 border-2 border-slate-900">
              {error}
            </p>
          )}
        </motion.div>

        {status === 'done' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.map((store, idx) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white border-4 border-slate-900 p-6 shadow-[6px_6px_0_#0f172a] hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-sans font-black text-lg text-slate-900 uppercase tracking-wide leading-tight">
                    {store.name}
                  </h3>
                  <span className="shrink-0 font-sans font-black text-sm bg-amber-400 text-slate-900 px-3 py-1 border-2 border-slate-900">
                    {store.distance_km.toFixed(1)} km
                  </span>
                </div>
                <p className="font-sans text-sm text-slate-600 mb-3">
                  {store.address}, {store.neighborhood} — {store.city}/{store.state}
                </p>
                <div className="flex flex-col gap-1 text-sm font-sans font-bold text-slate-700">
                  {store.opening_hours && (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rose-600" /> {store.opening_hours}
                    </span>
                  )}
                  {store.phone && (
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-rose-600" /> {store.phone}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
