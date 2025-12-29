import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Menu, X, Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 inset-x-0 z-50 h-16 flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl mt-4">
          <Link to="/" className="font-sans font-bold text-white hover:text-electric-blue transition-colors">
            AK.
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
             {!isAdmin && (
                <>
                  <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </>
             )}
             <Link to={isAdmin ? "/" : "/admin"} className="flex items-center gap-2 text-xs bg-white/10 hover:bg-electric-blue hover:text-white px-3 py-1 rounded-full transition-all">
                {isAdmin ? <Home size={12} /> : <ShieldCheck size={12} />}
                {isAdmin ? "Home" : "Admin"}
             </Link>
          </div>

          <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-cyber-black/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-gray-400 hover:text-white"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center gap-8 text-2xl font-bold">
               <a onClick={() => setIsOpen(false)} href="#projects">Projects</a>
               <a onClick={() => setIsOpen(false)} href="#about">About</a>
               <a onClick={() => setIsOpen(false)} href="#contact">Contact</a>
               <Link onClick={() => setIsOpen(false)} to="/admin" className="text-electric-blue">Admin</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-cyber-black text-white font-sans selection:bg-electric-blue selection:text-white pb-20">
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>
      <Navbar />
      <main className="relative z-10 pt-32">
        {children}
      </main>
    </div>
  );
};