export interface Shake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  color: string;
}

export interface CartItem {
  id: string;
  base: string | null;
  mixins: string[];
  syrups: string[];
  toppings: string[];
  price: number;
  details: any[];
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'base' | 'mixin' | 'syrup' | 'topping';
  color?: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  opening_hours: string | null;
  distance_km: number;
}