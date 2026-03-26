import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Coffee, Menu as MenuIcon, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Menu from './components/Menu';
import Admin from './components/Admin';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-dark text-stone-100">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-3 group" title="Menu">
                  <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12 shadow-[0_0_20px_rgba(45,79,61,0.3)]">
                    <Coffee size={24} />
                  </div>
                  <span className="text-2xl font-serif font-bold tracking-tight text-white group-hover:text-brand-green transition-colors">The Soul Cafe</span>
                </Link>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-stone-400 hover:text-brand-green font-medium transition-colors tracking-widest uppercase text-xs">Menu</Link>
                <Link to="/admin" className="flex items-center gap-2 px-6 py-2 rounded-full border border-brand-green/30 text-brand-green hover:bg-brand-green hover:text-white transition-all font-bold text-xs uppercase tracking-widest">
                  <User size={16} />
                  <span>Owner Login</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-stone-400 hover:text-brand-green"
                >
                  {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-brand-dark border-b border-white/5 overflow-hidden"
              >
                <div className="px-4 pt-2 pb-6 space-y-4">
                  <Link 
                    to="/" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-medium text-stone-400 hover:text-brand-green uppercase tracking-widest"
                  >
                    Menu
                  </Link>
                  <Link 
                    to="/admin" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-lg font-medium text-brand-green uppercase tracking-widest"
                  >
                    Owner Login
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-brand-dark border-t border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white">
                <Coffee size={18} />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-widest">The Soul Cafe</span>
            </div>
            <p className="max-w-md mx-auto mb-4 italic text-stone-500 font-serif text-lg">
              "Delicious food served with care, one dish at a time."
            </p>
            <p className="text-stone-600 text-xs uppercase tracking-widest mb-10">Tosh, Himachal Pradesh</p>
            <div className="text-[10px] uppercase tracking-[0.4em] text-stone-700">
              &copy; {new Date().getFullYear()} The Soul Cafe. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
