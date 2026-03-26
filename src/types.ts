export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  isDiscontinued: boolean;
  order?: number;
}

export type Category = 'Starters' | 'Soups' | 'Toast' | 'Lassi' | 'Hot Beverages' | 'Cornflakes/Porridge/Muesli' | 'Omelette' | 'Prantha' | 'Pasta (Italian Recipe)' | 'Pizza' | 'Indian Zaika' | 'Thali' | 'Dessert';
