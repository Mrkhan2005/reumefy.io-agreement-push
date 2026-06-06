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
      <span>Resumefy</span>
      <span className="text-accent-gold font-sans font-black">.</span>
      <span className="text-sm font-sans font-semibold text-text-muted mt-1.5 ml-0.5 tracking-normal">io</span>
    </div>
  );
};

export default Logo;
