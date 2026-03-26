import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, LogIn, LogOut, ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, User } from '../firebase';
import { INITIAL_MENU, CATEGORIES } from '../constants';
import { MenuItem } from '../types';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'Starters',
    isAvailable: true,
    isDiscontinued: false
  });

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    const path = 'menuItems';
    const q = query(collection(db, path), orderBy('order', 'asc'), orderBy('name', 'asc'));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
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
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSeedMenu = async () => {
    const path = 'menuItems';
    try {
      const promises = INITIAL_MENU.map((item, index) => {
        const { id, ...data } = item;
        return addDoc(collection(db, path), { ...data, order: index });
      });
      await Promise.all(promises);
      alert('Menu seeded successfully!');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= filteredMenuItems.length) return;

    const itemA = filteredMenuItems[index];
    const itemB = filteredMenuItems[newIndex];

    // Ensure both items have an order value
    const orderA = itemA.order ?? index;
    const orderB = itemB.order ?? newIndex;

    const pathA = `menuItems/${itemA.id}`;
    const pathB = `menuItems/${itemB.id}`;

    try {
      // Swap order values
      await Promise.all([
        updateDoc(doc(db, 'menuItems', itemA.id), { order: orderB }),
        updateDoc(doc(db, 'menuItems', itemB.id), { order: orderA })
      ]);
    } catch (error) {
      console.error("Failed to reorder:", error);
    }
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.description || !newItem.price) return;
    const path = 'menuItems';
    try {
      const maxOrder = menuItems.length > 0 
        ? Math.max(...menuItems.map(i => i.order ?? 0)) 
        : -1;
      
      await addDoc(collection(db, path), {
        name: newItem.name,
        description: newItem.description,
        price: Number(newItem.price),
        category: newItem.category,
        isAvailable: newItem.isAvailable ?? true,
        isDiscontinued: newItem.isDiscontinued ?? false,
        order: maxOrder + 1
      });
      setIsAdding(false);
      resetForm();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleDelete = async (id: string) => {
    const path = `menuItems/${id}`;
    try {
      await deleteDoc(doc(db, 'menuItems', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setNewItem(item);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const path = `menuItems/${editingId}`;
    try {
      await updateDoc(doc(db, 'menuItems', editingId), {
        name: newItem.name,
        description: newItem.description,
        price: Number(newItem.price),
        category: newItem.category,
        isAvailable: newItem.isAvailable ?? true,
        isDiscontinued: newItem.isDiscontinued ?? false
      });
      setEditingId(null);
      resetForm();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: 'Starters',
      isAvailable: true,
      isDiscontinued: false
    });
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' 
      ? true 
      : filterCategory === 'Discontinued' 
        ? item.isDiscontinued 
        : item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
      </div>
    );
  }

  if (!user || user.email !== "piush10122001@gmail.com") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-brand-dark px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-brand-slate p-12 rounded-3xl shadow-2xl text-center max-w-md w-full border border-white/5"
        >
          <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-green">
            <LogIn size={40} />
          </div>
          <h2 className="text-3xl font-bold text-stone-100 mb-4">Owner Access</h2>
          <p className="text-stone-400 mb-8 font-serif italic">
            {user ? "You are not authorized to access this dashboard." : "Please sign in with your Google account to manage the menu items."}
          </p>
          {user ? (
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-brand-dark text-stone-400 rounded-xl font-bold text-lg hover:bg-brand-dark/80 transition-all flex items-center justify-center gap-3 border border-white/5"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          ) : (
            <button 
              onClick={handleLogin}
              className="w-full py-4 bg-brand-green text-white rounded-xl font-bold text-lg hover:bg-brand-green/90 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <LogIn size={20} />
              <span>Sign in with Google</span>
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-green/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-brown/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Owner Dashboard</h2>
              <button 
                onClick={handleLogout}
                className="p-2 text-stone-500 hover:text-brand-green transition-colors"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
            <p className="text-stone-400 font-serif italic">Manage your menu from here.</p>
          </div>
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button 
              onClick={handleSeedMenu}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/5 text-stone-100 px-6 py-3 rounded-full hover:bg-white/10 transition-all font-bold text-sm border border-white/10"
            >
              <Save size={18} />
              <span>Import Default Menu</span>
            </button>
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full hover:bg-brand-green/90 transition-all shadow-lg font-bold text-sm"
            >
              <Plus size={18} />
              <span>Add New Dish</span>
            </button>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {(isAdding || editingId) && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-brand-slate rounded-3xl p-8 w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh] border border-white/5"
              >
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-stone-100">
                    {editingId ? 'Edit Dish' : 'Add New Dish'}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                    }}
                    className="p-2 hover:bg-brand-dark rounded-full transition-colors text-stone-400"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-widest">Dish Name</label>
                      <input 
                        type="text" 
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-stone-100 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                        placeholder="e.g. Veg Thali"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-widest">Price (₹)</label>
                      <input 
                        type="number" 
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-stone-100 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                        placeholder="250"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-widest">Category</label>
                    <select 
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-stone-100 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all appearance-none"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat} className="bg-brand-slate">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-widest">Full Description</label>
                    <textarea 
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-white/10 text-stone-100 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all h-32 resize-none"
                      placeholder="e.g. Explain with Rice, 2 chapati, dal, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-brand-dark rounded-xl border border-white/5">
                      <input 
                        type="checkbox" 
                        id="isAvailable"
                        checked={newItem.isAvailable}
                        onChange={(e) => setNewItem({ ...newItem, isAvailable: e.target.checked })}
                        className="w-5 h-5 rounded border-white/10 bg-brand-dark text-brand-green focus:ring-brand-green"
                      />
                      <label htmlFor="isAvailable" className="font-bold text-stone-300 cursor-pointer">Available for Ordering</label>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-red-900/10 rounded-xl border border-red-900/20">
                      <input 
                        type="checkbox" 
                        id="isDiscontinued"
                        checked={newItem.isDiscontinued}
                        onChange={(e) => setNewItem({ ...newItem, isDiscontinued: e.target.checked })}
                        className="w-5 h-5 rounded border-red-900/30 bg-brand-dark text-red-500 focus:ring-red-500"
                      />
                      <label htmlFor="isDiscontinued" className="font-bold text-red-400 cursor-pointer">Discontinue Dish</label>
                    </div>
                  </div>

                  <button 
                    onClick={editingId ? handleSaveEdit : handleAdd}
                    className="w-full py-4 bg-brand-green text-white rounded-xl font-bold text-lg hover:bg-brand-green/90 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    <span>{editingId ? 'Save Changes' : 'Add to Menu'}</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-brand-slate border border-white/10 text-stone-100 focus:ring-2 focus:ring-brand-green outline-none transition-all"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
              <Plus size={20} className="rotate-45" />
            </div>
          </div>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-6 py-3 rounded-2xl bg-brand-slate border border-white/10 text-stone-100 focus:ring-2 focus:ring-brand-green outline-none transition-all font-bold"
          >
            <option value="All" className="bg-brand-slate">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat} className="bg-brand-slate">{cat}</option>
            ))}
            <option value="Discontinued" className="bg-brand-slate">Discontinued Only</option>
          </select>
        </div>

        {/* Menu Management List */}
        <div className="bg-brand-slate rounded-3xl shadow-2xl overflow-hidden border border-white/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-dark/50 border-b border-white/5">
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest">Dish</th>
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest">Order</th>
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest">Discontinued</th>
                  <th className="px-8 py-5 text-xs font-bold text-stone-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMenuItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-brand-dark/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-1">
                          <button 
                            onClick={() => moveItem(index, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-20"
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button 
                            onClick={() => moveItem(index, 'down')}
                            disabled={index === filteredMenuItems.length - 1}
                            className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-20"
                          >
                            <ChevronDown size={16} />
                          </button>
                        </div>
                        <div>
                          <div className={`font-bold transition-all ${item.isDiscontinued ? 'text-stone-600 line-through' : 'text-stone-100'}`}>
                            {item.name}
                          </div>
                          {item.isDiscontinued && (
                            <span className="text-[8px] bg-red-900/20 text-red-400 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">
                              Discontinued
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-stone-500 line-clamp-1 max-w-xs">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-stone-500 font-mono text-xs">{item.order ?? index}</span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-brand-dark rounded-full text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-bold text-brand-green">₹{item.price}</td>
                    <td className="px-8 py-6">
                      <button
                        onClick={async () => {
                          const path = `menuItems/${item.id}`;
                          try {
                            await updateDoc(doc(db, 'menuItems', item.id), {
                              isAvailable: !item.isAvailable
                            });
                          } catch (error) {
                            handleFirestoreError(error, OperationType.UPDATE, path);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          item.isAvailable 
                            ? 'bg-green-900/20 text-green-400 hover:bg-green-900/40' 
                            : 'bg-red-900/20 text-red-400 hover:bg-red-900/40'
                        }`}
                      >
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={async () => {
                          const path = `menuItems/${item.id}`;
                          try {
                            await updateDoc(doc(db, 'menuItems', item.id), {
                              isDiscontinued: !item.isDiscontinued
                            });
                          } catch (error) {
                            handleFirestoreError(error, OperationType.UPDATE, path);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          item.isDiscontinued 
                            ? 'bg-red-900/20 text-red-400 hover:bg-red-900/40' 
                            : 'bg-brand-dark text-stone-400 hover:bg-brand-dark/80'
                        }`}
                      >
                        {item.isDiscontinued ? 'Discontinued' : 'Active'}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-stone-500 hover:text-brand-green hover:bg-brand-green/10 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
