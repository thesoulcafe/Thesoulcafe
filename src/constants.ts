import { MenuItem } from './types';

export const INITIAL_MENU: MenuItem[] = [
  // Starters
  { id: 's1', name: 'Veg Pakora', description: 'Crispy vegetable fritters served with chutney.', price: 250, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's2', name: 'Aloo Onion Pakora', description: 'Fried potato and onion fritters.', price: 220, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's3', name: 'Crispy Chilly Potato', description: 'Crispy potatoes tossed in spicy chilly sauce.', price: 200, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's4', name: 'Crispy Chilly Potato With honey', description: 'Sweet and spicy crispy potatoes.', price: 230, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's5', name: 'Paneer Pakora', description: 'Soft paneer cubes dipped in batter and fried.', price: 260, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's6', name: 'Paneer Chilly', description: 'Paneer cubes in a spicy Indo-Chinese chilly sauce.', price: 280, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's7', name: 'French fries', description: 'Classic salted golden fries.', price: 200, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's8', name: 'Peanut masala', description: 'Spicy and tangy peanut snack.', price: 180, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's9', name: 'Idli sambhar (special)', description: 'Steamed rice cakes served with flavorful lentil soup.', price: 200, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's10', name: 'Masala dosa (special)', description: 'Crispy crepe filled with spiced potato mash.', price: 200, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's11', name: 'Fried Idli', description: 'Tossed idli pieces with spices.', price: 220, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's12', name: 'Masala papad', description: 'Crispy papad topped with chopped veggies and spices.', price: 80, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's13', name: 'Fry papad', description: 'Deep fried crispy papad.', price: 80, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's14', name: 'Roasted papad', description: 'Traditional roasted crispy papad.', price: 60, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's15', name: 'Veg nuggets', description: 'Crispy vegetable nuggets.', price: 150, category: 'Starters', isAvailable: true, isDiscontinued: false },
  { id: 's16', name: 'Poha', description: 'Flattened rice cooked with onions and spices.', price: 120, category: 'Starters', isAvailable: true, isDiscontinued: false },

  // Soups
  { id: 'so1', name: 'Tomato soup', description: 'Classic creamy tomato soup.', price: 100, category: 'Soups', isAvailable: true, isDiscontinued: false },
  { id: 'so2', name: 'Mix veg. Soup', description: 'Healthy soup with mixed vegetables.', price: 120, category: 'Soups', isAvailable: true, isDiscontinued: false },
  { id: 'so3', name: 'Veg noodles soup', description: 'Vegetable soup with noodles.', price: 120, category: 'Soups', isAvailable: true, isDiscontinued: false },
  { id: 'so4', name: 'Mushroom soup', description: 'Creamy mushroom soup.', price: 150, category: 'Soups', isAvailable: true, isDiscontinued: false },
  { id: 'so5', name: 'Veg. sweet corn soup', description: 'Sweet and savory corn soup.', price: 150, category: 'Soups', isAvailable: true, isDiscontinued: false },

  // Toast
  { id: 't1', name: 'Plain toast', description: 'Toasted bread slices.', price: 50, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't2', name: 'Butter toast', description: 'Toasted bread with butter.', price: 80, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't3', name: 'Butter jam toast', description: 'Toasted bread with butter and jam.', price: 120, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't4', name: 'Peanut butter toast', description: 'Toasted bread with peanut butter.', price: 120, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't5', name: 'Nutella toast', description: 'Toasted bread with Nutella spread.', price: 160, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't6', name: 'Cheese tomato toast', description: 'Toasted bread with cheese and tomato.', price: 140, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't7', name: 'Cheese garlic toast', description: 'Toasted bread with cheese and garlic.', price: 140, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't8', name: 'Cheese egg toast', description: 'Toasted bread with cheese and egg.', price: 150, category: 'Toast', isAvailable: true, isDiscontinued: false },
  { id: 't9', name: 'Honey butter toast', description: 'Toasted bread with honey and butter.', price: 120, category: 'Toast', isAvailable: true, isDiscontinued: false },

  // Lassi
  { id: 'l1', name: 'Mango lassi', description: 'Creamy yogurt drink with mango.', price: 120, category: 'Lassi', isAvailable: true, isDiscontinued: false },
  { id: 'l2', name: 'Banana lassi', description: 'Creamy yogurt drink with banana.', price: 120, category: 'Lassi', isAvailable: true, isDiscontinued: false },
  { id: 'l3', name: 'Strawberry lassi', description: 'Creamy yogurt drink with strawberry.', price: 120, category: 'Lassi', isAvailable: true, isDiscontinued: false },
  { id: 'l4', name: 'Sweet lassi', description: 'Traditional sweet yogurt drink.', price: 100, category: 'Lassi', isAvailable: true, isDiscontinued: false },
  { id: 'l5', name: 'Salted lassi', description: 'Traditional salted yogurt drink.', price: 100, category: 'Lassi', isAvailable: true, isDiscontinued: false },
  { id: 'l6', name: 'Rose lassi', description: 'Creamy yogurt drink with rose flavor.', price: 150, category: 'Lassi', isAvailable: true, isDiscontinued: false },
  { id: 'l7', name: 'Mix dry fruit lassi', description: 'Rich lassi with mixed dry fruits.', price: 180, category: 'Lassi', isAvailable: true, isDiscontinued: false },

  // Hot Beverages
  { id: 'hb1', name: 'Milk tea', description: 'Traditional Indian milk tea.', price: 50, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb2', name: 'Masala tea', description: 'Spiced Indian milk tea.', price: 60, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb3', name: 'Black tea', description: 'Classic black tea.', price: 30, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb4', name: 'Lemon tea', description: 'Refreshing lemon tea.', price: 40, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb5', name: 'Mint tea', description: 'Refreshing mint tea.', price: 40, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb6', name: 'Kesar chai', description: 'Tea flavored with saffron.', price: 80, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb7', name: 'Ginger lemon honey tea', description: 'Soothing ginger, lemon, and honey tea.', price: 80, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb8', name: 'Black Coffee', description: 'Strong black coffee.', price: 50, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb9', name: 'Filter Coffee', description: 'Traditional filter coffee.', price: 100, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb10', name: 'Milk Coffee', description: 'Classic coffee with milk.', price: 80, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb11', name: 'Cappuccino', description: 'Frothy Italian coffee.', price: 180, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb12', name: 'Hot chocolate', description: 'Rich and creamy hot chocolate.', price: 120, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb13', name: 'Hot Nutella milk', description: 'Warm milk with Nutella.', price: 150, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },
  { id: 'hb14', name: 'Hot milk', description: 'Plain warm milk.', price: 60, category: 'Hot Beverages', isAvailable: true, isDiscontinued: false },

  // Cornflakes/Porridge/Muesli
  { id: 'cpm1', name: 'Cornflakes with milk', description: 'Classic breakfast cereal.', price: 160, category: 'Cornflakes/Porridge/Muesli', isAvailable: true, isDiscontinued: false },
  { id: 'cpm2', name: 'Fruit curd muesli', description: 'Healthy muesli with fruit and curd.', price: 180, category: 'Cornflakes/Porridge/Muesli', isAvailable: true, isDiscontinued: false },
  { id: 'cpm3', name: 'Plain porridge', description: 'Simple warm porridge.', price: 140, category: 'Cornflakes/Porridge/Muesli', isAvailable: true, isDiscontinued: false },
  { id: 'cpm4', name: 'Mix fruit porridge', description: 'Porridge with mixed fruits.', price: 180, category: 'Cornflakes/Porridge/Muesli', isAvailable: true, isDiscontinued: false },
  { id: 'cpm5', name: 'Banana porridge', description: 'Porridge with fresh banana.', price: 160, category: 'Cornflakes/Porridge/Muesli', isAvailable: true, isDiscontinued: false },

  // Omelette
  { id: 'o1', name: 'Plain omelette', description: 'Classic egg omelette.', price: 80, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o2', name: 'Boiled egg (4 PCs)', description: 'Four perfectly boiled eggs.', price: 120, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o3', name: 'Half fry', description: 'Sunny side up eggs.', price: 80, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o4', name: 'Poached egg', description: 'Soft poached eggs.', price: 100, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o5', name: 'Scrambled egg', description: 'Fluffy scrambled eggs.', price: 80, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o6', name: 'Onion omelette', description: 'Omelette with chopped onions.', price: 100, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o7', name: 'Bread omelette', description: 'Omelette served with bread.', price: 140, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o8', name: 'Cheese omelette', description: 'Omelette with melted cheese.', price: 160, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o9', name: 'Masala omelette', description: 'Spiced Indian omelette.', price: 140, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o10', name: 'Cheese masala omelette', description: 'Spiced omelette with cheese.', price: 160, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o11', name: 'Mushroom cheese bread omelette', description: 'Rich omelette with mushroom and cheese.', price: 180, category: 'Omelette', isAvailable: true, isDiscontinued: false },
  { id: 'o12', name: 'Cheese Masala bread omelette', description: 'Spiced bread omelette with cheese.', price: 200, category: 'Omelette', isAvailable: true, isDiscontinued: false },

  // Prantha
  { id: 'p1', name: 'Aloo Prantha', description: 'Flatbread stuffed with spiced potatoes.', price: 80, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p2', name: 'Onion Prantha', description: 'Flatbread stuffed with spiced onions.', price: 80, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p3', name: 'Gobhi Prantha', description: 'Flatbread stuffed with spiced cauliflower.', price: 100, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p4', name: 'Aloo onion Prantha', description: 'Flatbread stuffed with potato and onion.', price: 100, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p5', name: 'Mix Veg. Prantha', description: 'Flatbread stuffed with mixed vegetables.', price: 120, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p6', name: 'Egg Prantha', description: 'Flatbread with egg layer.', price: 120, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p7', name: 'Cheese Prantha', description: 'Flatbread stuffed with cheese.', price: 120, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p8', name: 'Egg cheese Prantha', description: 'Flatbread with egg and cheese.', price: 150, category: 'Prantha', isAvailable: true, isDiscontinued: false },
  { id: 'p9', name: 'Mirch jeera Prantha', description: 'Flatbread with chilly and cumin.', price: 80, category: 'Prantha', isAvailable: true, isDiscontinued: false },

  // Pasta
  { id: 'pa1', name: 'Pomodoro', description: 'Pasta with tomato sauce and cheese.', price: 260, category: 'Pasta (Italian Recipe)', isAvailable: true, isDiscontinued: false },
  { id: 'pa2', name: 'Ala funghi', description: 'Pasta with tomato sauce, mushroom and cheese.', price: 280, category: 'Pasta (Italian Recipe)', isAvailable: true, isDiscontinued: false },
  { id: 'pa3', name: 'All verdure', description: 'Capsicum, olive, mushroom, tomato sauce, olive cheese, oregano.', price: 280, category: 'Pasta (Italian Recipe)', isAvailable: true, isDiscontinued: false },
  { id: 'pa4', name: 'Tobasko pasta', description: 'Tomato sauce, green chilly, capsicum, onion, mozzarella cheese.', price: 280, category: 'Pasta (Italian Recipe)', isAvailable: true, isDiscontinued: false },
  { id: 'pa5', name: 'Creamy white sauce Pasta (Special)', description: 'Rich and creamy white sauce pasta.', price: 350, category: 'Pasta (Italian Recipe)', isAvailable: true, isDiscontinued: false },

  // Pizza
  { id: 'pi1', name: 'Margarita', description: 'Tomato sauce and mozzarella cheese.', price: 300, category: 'Pizza', isAvailable: true, isDiscontinued: false },
  { id: 'pi2', name: 'Alle E olive', description: 'Tomato sauce, mushroom, and mozzarella cheese.', price: 350, category: 'Pizza', isAvailable: true, isDiscontinued: false },
  { id: 'pi3', name: 'Veg. Delight', description: 'Mushroom, corn, capsicum, onion, olive, garlic, mozzarella.', price: 400, category: 'Pizza', isAvailable: true, isDiscontinued: false },

  // Indian Zaika
  { id: 'iz1', name: 'Dal fry', description: 'Yellow lentils tempered with spices.', price: 150, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz2', name: 'Dal tadka', description: 'Yellow lentils with a special spice tempering.', price: 180, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz3', name: 'Dal makhani', description: 'Rich and creamy black lentils.', price: 220, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz4', name: 'Gatta masala', description: 'Gram flour dumplings in spiced gravy.', price: 180, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz5', name: 'Gatta masala curry', description: 'Gram flour dumplings in a rich curry.', price: 200, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz6', name: 'Zeera Aloo', description: 'Potatoes tossed with cumin seeds.', price: 200, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz7', name: 'Aloo gobhi', description: 'Potato and cauliflower stir-fry.', price: 220, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz8', name: 'Aloo ka pyaza', description: 'Potatoes cooked with plenty of onions.', price: 250, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz9', name: 'Bhindi fry', description: 'Crispy fried okra.', price: 200, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz10', name: 'Masala Bhindi fry', description: 'Spiced fried okra.', price: 250, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz11', name: 'Rajasthani kadhi', description: 'Traditional Rajasthani yogurt curry.', price: 200, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz12', name: 'Pakora kadhi', description: 'Yogurt curry with vegetable fritters.', price: 250, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz13', name: 'Paneer butter masala', description: 'Paneer in a rich tomato and butter gravy.', price: 250, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz14', name: 'Kadai paneer', description: 'Paneer cooked with bell peppers and spices.', price: 250, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz15', name: 'Shahi paneer', description: 'Royal paneer in a creamy white gravy.', price: 280, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz16', name: 'Palak paneer', description: 'Paneer in a smooth spinach gravy.', price: 280, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz17', name: 'Matar paneer', description: 'Paneer and peas in a spiced gravy.', price: 280, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz18', name: 'Malai kofta', description: 'Paneer dumplings in a creamy gravy.', price: 350, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz19', name: 'Lauki kofta', description: 'Bottle gourd dumplings in gravy.', price: 320, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz20', name: 'Mushroom curry', description: 'Mushrooms in a spiced gravy.', price: 350, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },
  { id: 'iz21', name: 'Egg curry', description: 'Boiled eggs in a flavorful curry.', price: 350, category: 'Indian Zaika', isAvailable: true, isDiscontinued: false },

  // Thali
  { id: 'th1', name: 'Veg thali', description: 'Rice, 2 chapati, dal, mix veg, pickle, papad, salad.', price: 250, category: 'Thali', isAvailable: true, isDiscontinued: false },
  { id: 'th2', name: 'Special thali', description: 'Zeera Rice, Paneer butter masala, dal makhani, Boondi Raita, Parantha, 2 butter roti, papad, salad.', price: 380, category: 'Thali', isAvailable: true, isDiscontinued: false },
  { id: 'th4', name: 'Rajasthani special thali', description: 'Dal, lehsun chutney, Gatte ki sabji, 2 bati with ghee, 2 Chapati, special churma, papad, pickle, salad.', price: 530, category: 'Thali', isAvailable: true, isDiscontinued: false },
  { id: 'th3', name: 'EGG thali', description: 'Rice, 2 butter Chapati, egg curry, Dal, papad, salad.', price: 400, category: 'Thali', isAvailable: true, isDiscontinued: false },

  // Dessert
  { id: 'd1', name: 'Plain pancake', description: 'Classic fluffy pancake.', price: 160, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd2', name: 'Lemon honey pancake', description: 'Pancake with lemon and honey.', price: 220, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd3', name: 'Chocolate pancake', description: 'Pancake with chocolate syrup.', price: 250, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd4', name: 'Chocolate banana pancake', description: 'Pancake with chocolate and banana.', price: 260, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd5', name: 'Nutella pancake', description: 'Pancake with Nutella spread.', price: 260, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd6', name: 'Nutella banana pancake', description: 'Pancake with Nutella and banana.', price: 300, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd7', name: 'Chocolate ball', description: 'Sweet chocolate balls.', price: 120, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd8', name: 'Nutella chapati', description: 'Chapati with Nutella spread.', price: 100, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd9', name: 'Dairy milk chapati', description: 'Chapati with Dairy Milk chocolate.', price: 80, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd10', name: 'Milky bar chapati', description: 'Chapati with Milky Bar chocolate.', price: 100, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd11', name: 'Mix fruit Ice cream', description: 'Ice cream with mixed fruits.', price: 220, category: 'Dessert', isAvailable: true, isDiscontinued: false },
  { id: 'd12', name: 'Gulab jamun', description: 'Traditional Indian sweet dumplings.', price: 200, category: 'Dessert', isAvailable: true, isDiscontinued: false },
];

export const CATEGORIES = [
  'Starters',
  'Soups',
  'Toast',
  'Lassi',
  'Hot Beverages',
  'Cornflakes/Porridge/Muesli',
  'Omelette',
  'Prantha',
  'Pasta (Italian Recipe)',
  'Pizza',
  'Indian Zaika',
  'Thali',
  'Dessert'
];
