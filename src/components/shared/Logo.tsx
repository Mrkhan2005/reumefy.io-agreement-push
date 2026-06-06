import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl md:text-5xl',
  };

  return (
    <div className={`font-display font-bold tracking-tight text-text-primary flex items-center ${sizeClasses[size]} ${className}`}>
      <span>Siddiqui Bro</span>
      <span className="text-accent-gold font-sans font-black ml-1">LLC</span>
    </div>
  );
};

export default Logo;
