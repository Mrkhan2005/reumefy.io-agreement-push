import React from 'react';
import { Logo } from './Logo';
import { useOrder } from '../../context/OrderContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { resetOrder } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    resetOrder();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full nav-glow px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" onClick={handleLogoClick} className="flex items-center group">
          <Logo className="transition-transform group-hover:scale-[1.01]" />
        </a>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-text-muted">
            <span className="hover:text-accent-gold transition-colors cursor-pointer">Services</span>
            <span className="hover:text-accent-gold transition-colors cursor-pointer">How it Works</span>
            <span className="hover:text-accent-gold transition-colors cursor-pointer">Pricing</span>
            <span className="hover:text-accent-gold transition-colors cursor-pointer">Compliance</span>
          </div>
          
          {location.pathname === '/agreement' && (
            <button
              onClick={() => navigate('/')}
              className="text-xs font-bold uppercase tracking-wider text-accent-gold border border-accent-gold/45 hover:bg-accent-gold/10 hover:border-accent-gold px-4 py-2 rounded-lg transition-all cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              ← Edit Services
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
