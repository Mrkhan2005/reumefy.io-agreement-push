import React from 'react';

interface PortfolioTierSelectorProps {
  selectedTier: 'pdf' | 'web';
  onChange: (tier: 'pdf' | 'web') => void;
}

export const PortfolioTierSelector: React.FC<PortfolioTierSelectorProps> = ({
  selectedTier,
  onChange,
}) => {
  return (
    <div className="space-y-3 font-sans">
      <p className="text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">
        Choose Portfolio Tier
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* PDF TIER */}
        <div
          onClick={() => onChange('pdf')}
          className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-200 ${
            selectedTier === 'pdf'
              ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_10px_rgba(212,175,55,0.1)]'
              : 'border-gold-border/20 hover:border-gold-border/40 bg-bg-primary/40'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-text-primary">Professional PDF</span>
            <span className="text-sm font-extrabold text-accent-gold">$50</span>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Beautifully designed multi-page PDF portfolio. Print and digital ready.
          </p>
          <div className="mt-2 text-[10px] text-accent-gold/80 flex flex-wrap gap-x-2 gap-y-0.5">
            <span>✓ Custom Layout</span>
            <span>✓ Ready in 5 days</span>
          </div>
        </div>

        {/* WEB TIER */}
        <div
          onClick={() => onChange('web')}
          className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-200 ${
            selectedTier === 'web'
              ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_10px_rgba(212,175,55,0.1)]'
              : 'border-gold-border/20 hover:border-gold-border/40 bg-bg-primary/40'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-bold text-text-primary">Premium Web</span>
            <span className="text-sm font-extrabold text-accent-gold">$200</span>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Your own portfolio website, fully hosted for 1 year. Domain & hosting included.
          </p>
          <div className="mt-2 text-[10px] text-accent-gold/80 flex flex-wrap gap-x-2 gap-y-0.5">
            <span>✓ Custom Domain</span>
            <span>✓ 1-Year Hosting</span>
            <span>✓ Responsive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTierSelector;
