import { Shake, Ingredient } from './types';

export const shakes: Shake[] = [
  {
    id: '2',
    name: 'Fudge de Cacau',
    description: 'Fudge de chocolate denso, pedaços de brownie artesanal e uma base incrivelmente cremosa de cacau 70%.',
    price: 28.90,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-stone-50'
  },
  {
    id: '1',
    name: 'Sonho de Morango',
    description: 'Morangos frescos batidos artesanalmente com sorvete de creme supremo. Leveza e frescor em uma textura perfeitamente aveludada.',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-rose-50'
  },
  {
    id: '3',
    name: 'Macchiato Dourado',
    description: 'A fusão perfeita: baunilha tostada, um shot de espresso intenso e generosas fitas de caramelo salgado.',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1626084478335-5bcf7a7a5369?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-amber-50'
  },
  {
    id: '4',
    name: 'Jardim de Menta',
    description: 'O frescor absoluto da menta natural misturado com ricas e crocantes gotas de chocolate belga.',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-emerald-50'
  },
  {
    id: '5',
    name: 'Baunilha Sublime',
    description: 'Elegância em sua forma mais pura. Pontuado com sementes reais de favas de baunilha de Madagascar.',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1556710807-81aa7858cfa7?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-slate-50'
  },
  {
    id: '6',
    name: 'Nuvem de Amendoim',
    description: 'Creme espesso de manteiga de amendoim torrado, equilibrado com uma fundação rica e macia de chocolate.',
    price: 27.90,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=1200',
    color: 'bg-orange-50'
  }
];

export const ingredients: Ingredient[] = [
  // Bases
  { id: 'b1', name: 'Baunilha de Madagascar', description: 'Creme absoluto com favas reais.', price: 15.90, category: 'base', color: 'bg-[#fef3c7]' },
  { id: 'b2', name: 'Cacau Premium 70%', description: 'Chocolate denso, escuro e encorpado.', price: 18.90, category: 'base', color: 'bg-[#292524]' },
  { id: 'b3', name: 'Morango Silvestre', description: 'Frescor intenso das frutas colhidas.', price: 16.90, category: 'base', color: 'bg-[#fecdd3]' },
  { id: 'b4', name: 'Creme de Pistache', description: 'Riqueza amanteigada do pistache puro.', price: 21.90, category: 'base', color: 'bg-[#a7f3d0]' },
  
  // Misturas
  { id: 'm1', name: 'Pedaços de Brownie', description: 'Brownie artesanal com nozes macadâmia.', price: 6.00, category: 'mixin', color: 'bg-[#44403c]' },
  { id: 'm2', name: 'Cookie Drops Belga', description: 'Gotas de chocolate meio amargo crocante.', price: 5.50, category: 'mixin', color: 'bg-[#1c1917]' },
  { id: 'm3', name: 'Frutas Vermelhas Frescas', description: 'Mirtilos, amoras e framboesas.', price: 7.00, category: 'mixin', color: 'bg-[#e11d48]' },
  { id: 'm4', name: 'Pralinê de Avelã', description: 'Avelãs caramelizadas e trituradas.', price: 6.50, category: 'mixin', color: 'bg-[#d97706]' },
  
  // Caldas
  { id: 's1', name: 'Caramelo Flôr de Sal', description: 'O equilíbrio perfeito entre doce e salgado.', price: 4.50, category: 'syrup', color: 'bg-[#f59e0b]' },
  { id: 's2', name: 'Fudge Quente', description: 'Chocolate espesso e derretido.', price: 5.00, category: 'syrup', color: 'bg-[#292524]' },
  { id: 's3', name: 'Coulis de Amarena', description: 'Calda ácida e doce de cerejas importadas.', price: 5.00, category: 'syrup', color: 'bg-[#be123c]' },
  
  // Coberturas
  { id: 't1', name: 'Chantilly Fresco', description: 'Batido na hora, textura de nuvem.', price: 3.50, category: 'topping', color: 'bg-white' },
  { id: 't2', name: 'Cereja Amarena', description: 'A cereja suprema para coroar seu shake.', price: 4.00, category: 'topping', color: 'bg-[#e11d48]' },
  { id: 't3', name: 'Folha de Ouro Comestível', description: 'Toque de extravagância 24k.', price: 12.00, category: 'topping', color: 'bg-[#fbbf24]' },
];
