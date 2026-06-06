import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'gold-outline' | 'success' | 'muted';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className = '' }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase';
  
  const variants = {
    gold: 'bg-accent-gold text-bg-primary shadow-[0_0_10px_rgba(212,175,55,0.2)]',
    'gold-outline': 'border border-accent-gold/40 text-accent-gold bg-accent-gold/5',
    success: 'bg-success-green/10 border border-success-green/30 text-success-green',
    muted: 'bg-bg-elevated border border-gold-border/20 text-text-muted',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
