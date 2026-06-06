import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  fullWidth?: boolean;
}

export const GoldButton: React.FC<GoldButtonProps> = ({
  children,
  variant = 'solid',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'relative px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none flex items-center justify-center gap-2 cursor-pointer shadow-md select-none';
  
  const widthClass = fullWidth ? 'w-full' : 'w-auto';
  
  const variantClasses = variant === 'solid'
    ? 'gold-btn-gradient text-bg-primary font-bold border border-accent-gold-light/20 disabled:bg-bg-elevated disabled:text-text-muted disabled:border-gold-border/10 disabled:cursor-not-allowed disabled:transform-none disabled:box-shadow-none'
    : 'border-2 border-accent-gold text-accent-gold hover:bg-accent-gold/10 active:bg-accent-gold/20 disabled:border-gold-border/20 disabled:text-text-muted disabled:cursor-not-allowed disabled:transform-none';

  return (
    <button
      className={`${baseClasses} ${widthClass} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default GoldButton;
