import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, collection, onSnapshot, query, orderBy } from '../firebase';
import { INITIAL_MENU, CATEGORIES } from '../constants';
import { MenuItem } from '../types';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';
import { ShoppingBag, X, Minus, Plus } from 'lucide-react';

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [selectedSpace, setSelectedSpace] = useState('Indoor Cafe');

  const WHATSAPP_NUMBER = '+917023207620';
  const SPACES = ['Indoor Cafe', 'Camp', 'Open Table'];

  useEffect(() => {
    const path = 'menuItems';
    const q = query(collection(db, path), orderBy('order', 'asc'), orderBy('name', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MenuItem[];
      
      // If Firestore is empty, use initial menu (for first run)
      if (items.length === 0) {
        setMenuItems(INITIAL_MENU.map((item, index) => ({ ...item, order: index })));
      } else {
        setMenuItems(items);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = (activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)
  ).filter(item => !item.isDiscontinued);

  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const cartTotal = Object.entries(cart).reduce((total, [id, quantity]) => {
    const item = menuItems.find(i => i.id === id);
    return total + (item?.price || 0) * quantity;
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert('Please enter your name');
      return;
    }

    const orderItems = Object.entries(cart).map(([id, quantity]) => {
      const item = menuItems.find(i => i.id === id);
      return `• ${item?.name} x${quantity} - ₹${(item?.price || 0) * quantity}`;
    }).join('\n');

    const message = `*New Order The Soul Cafe*\n\n` +
      `${customerName}\n` +
      `*Space:* ${selectedSpace}\n\n` +
      `*Order Details:*\n${orderItems}\n\n` +
      `*Total Amount:* ₹${cartTotal}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Decorative Elements - Mountain Mist Theme */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-green/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-brown/5 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight relative inline-block"
          >
            <span className="relative z-10">Our </span>
            <span className="text-brand-green italic font-serif relative z-10">Menu</span>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute -bottom-2 left-0 h-1 bg-brand-green/30 blur-sm rounded-full" 
            />
          </motion.h2>
          <p className="text-stone-400 font-serif italic text-xl max-w-2xl mx-auto mb-8">A taste of Tosh, served with the warmth of the mountains.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveCategory('Thali');
              const thaliSection = document.getElementById('Thali');
              if (thaliSection) thaliSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-brand-mist border border-white/20 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all backdrop-blur-sm"
          >
            Explore Thali
          </motion.button>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-8 mb-16 no-scrollbar gap-4 justify-start md:justify-center px-4 -mx-4">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-10 py-4 rounded-full transition-all text-[10px] font-black uppercase tracking-[0.2em] border shrink-0 ${
              activeCategory === 'All' 
                ? 'bg-brand-green text-white border-brand-green shadow-[0_10px_30px_rgba(45,79,61,0.3)]' 
                : 'bg-white/5 text-stone-500 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            All
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-10 py-4 rounded-full transition-all text-[10px] font-black uppercase tracking-[0.2em] border shrink-0 ${
                activeCategory === category 
                  ? 'bg-brand-green text-white border-brand-green shadow-[0_10px_30px_rgba(45,79,61,0.3)]' 
                  : 'bg-white/5 text-stone-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu List */}
        <div className="max-w-5xl mx-auto">
          {CATEGORIES.map(category => {
            const categoryItems = filteredItems.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;
            if (activeCategory !== 'All' && activeCategory !== category) return null;

            return (
              <div key={category} id={category} className="mb-24">
                <div className="flex items-center gap-8 mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-brand-green tracking-widest uppercase">
                    {category}
                  </h3>
                  <div className="h-[1px] bg-gradient-to-r from-brand-green/50 to-transparent flex-grow" />
                </div>
                
                <div className="space-y-6">
                  {categoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative glass-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 hover:bg-white/[0.05] transition-all duration-500 border border-white/5"
                    >
                      {/* Main Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                          <div className="flex-grow">
                            <div className="flex items-center flex-wrap gap-4 mb-2">
                              <h4 className={`font-serif text-3xl md:text-5xl leading-tight transition-all duration-500 ${!item.isAvailable ? 'text-stone-700' : 'text-white group-hover:text-brand-green'}`}>
                                {item.name}
                              </h4>
                              {!item.isAvailable && (
                                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-red-500/80 border border-red-500/20 px-3 py-1 rounded-full bg-red-500/5">
                                  Sold Out
                                </span>
                              )}
                            </div>
                            <p className="text-stone-500 text-sm md:text-lg font-light leading-relaxed max-w-2xl font-sans">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-3xl md:text-4xl font-serif italic text-brand-brown shrink-0">
                            ₹{item.price}
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center shrink-0">
                        <button 
                          disabled={!item.isAvailable}
                          onClick={() => addToCart(item.id)}
                          className={`w-full md:w-auto px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 border ${
                            item.isAvailable 
                              ? 'bg-brand-green text-white border-brand-green hover:bg-white hover:text-brand-dark hover:border-white shadow-xl' 
                              : 'bg-white/5 text-stone-700 border-white/5 cursor-not-allowed'
                          }`}
                        >
                          {item.isAvailable ? (
                            <>
                              <Plus size={16} />
                              <span>Add to Order</span>
                            </>
                          ) : 'Unavailable'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Cart Button */}
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={() => setIsCartOpen(true)}
              className="fixed bottom-8 right-8 z-40 bg-brand-green text-white p-6 rounded-full shadow-[0_20px_50px_rgba(45,79,61,0.4)] flex items-center gap-4 hover:scale-105 transition-transform border border-white/10"
            >
              <div className="relative">
                <ShoppingBag size={28} />
                <span className="absolute -top-2 -right-2 bg-white text-brand-dark text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              </div>
              <div className="text-left pr-2">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Your Order</div>
                <div className="font-black text-lg leading-none">₹{cartTotal}</div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-[60]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-slate z-[70] shadow-2xl overflow-y-auto border-l border-white/5"
              >
                <div className="p-8 border-b border-white/5 flex justify-between items-center bg-brand-slate sticky top-0 z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Your Order</h3>
                    <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">The Soul Cafe</p>
                  </div>
                  <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors text-stone-400">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  {Object.entries(cart).map(([id, quantity]) => {
                    const item = menuItems.find(i => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between items-center gap-6 group">
                        <div className="flex-grow">
                          <h4 className="font-bold text-white group-hover:text-brand-green transition-colors">{item.name}</h4>
                          <p className="text-sm text-stone-500 font-mono">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 rounded-full p-1 border border-white/5">
                          <button onClick={() => removeFromCart(id)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400">
                            <Minus size={14} />
                          </button>
                          <span className="font-mono font-bold text-white w-4 text-center">{quantity}</span>
                          <button onClick={() => addToCart(id)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400">
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="font-serif italic text-xl text-brand-brown w-20 text-right">
                          ₹{item.price * quantity}
                        </div>
                      </div>
                    );
                  })}
                  {Object.keys(cart).length === 0 && (
                    <div className="text-center py-20">
                      <ShoppingBag size={48} className="mx-auto text-stone-800 mb-4" />
                      <p className="text-stone-500 italic font-serif">Your order is empty...</p>
                    </div>
                  )}
                </div>

                <div className="p-8 glass-dark border-t border-white/10 space-y-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-3">Customer Identity</label>
                      <input 
                        type="text" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-stone-700 focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-3">Dining Experience</label>
                      <select 
                        value={selectedSpace}
                        onChange={(e) => setSelectedSpace(e.target.value)}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green outline-none transition-all appearance-none"
                      >
                        {SPACES.map(space => (
                          <option key={space} value={space} className="bg-brand-dark">{space}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-stone-500 uppercase tracking-widest">Grand Total</span>
                    <span className="text-4xl font-serif italic text-brand-brown">₹{cartTotal}</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleWhatsAppOrder}
                      disabled={Object.keys(cart).length === 0}
                      className="w-full py-6 bg-brand-green text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all shadow-[0_10px_40px_rgba(45,79,61,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Place Order</span>
                    </button>
                    
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-4 bg-white/5 text-stone-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-brand-dark transition-all border border-white/10"
                    >
                      Back to Menu
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
