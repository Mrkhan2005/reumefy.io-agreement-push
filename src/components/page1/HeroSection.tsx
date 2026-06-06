import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative py-12 md:py-20 text-center overflow-hidden border-b border-gold-border/10">
      {/* Decorative luxury circles */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-accent-gold/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <div className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-accent-gold-light">
            Luxury Career Technology
          </span>
        </div>
        
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight leading-tight">
          Your Career, <br className="sm:hidden" />
          <span className="gold-text-gradient italic">Professionally Elevated</span>
        </h1>
        
        <p className="mt-6 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto font-sans leading-relaxed">
          Select your services below. Your first step — a fully ATS-optimized resume — is on us.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
