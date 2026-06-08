import React from 'react';
import Badge from '../shared/Badge';

export const FreeServicesSection: React.FC = () => {
  const freeResumeBullets = [
    'Passes all major ATS systems (Workday, Greenhouse, Lever, etc.)',
    'Industry keyword optimization tailored to your target job roles',
    'Clean, recruiter-approved formatting optimized for readability',
    'Delivered within 48 hours in Microsoft Word & PDF formats',
  ];

  return (
    <div className="py-10 border-b border-gold-border/10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-accent-gold text-lg">✦</span>
        <h2 className="text-lg font-bold tracking-wider uppercase text-text-primary">
          Complimentary Services
        </h2>
        <Badge variant="gold" className="ml-1 text-[10px]">
          Free - Limited Time
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-3xl">
        <div className="glass-panel-elevated rounded-xl p-6 border border-accent-gold/20 shadow-[0_4px_30px_rgba(212,175,55,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-border/10 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold font-display text-text-primary">
                  ATS-Optimized Resume
                </h3>
                <span className="bg-success-green/15 text-success-green border border-success-green/20 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                  Included
                </span>
              </div>
              <p className="text-sm text-text-muted mt-1 leading-relaxed max-w-xl">
                Your resume rebuilt to score high across all major ATS platforms including Workday, Greenhouse, Lever, iCIMS, Taleo, and more. Keyword-optimized, properly formatted, and recruiter-ready.
              </p>
            </div>
            
            <div className="text-left sm:text-right shrink-0">
              <span className="bg-accent-gold/15 text-accent-gold border border-accent-gold/20 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded">
                Complimentary
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {freeResumeBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start text-xs text-text-muted">
                <span className="text-success-green mr-2.5 font-bold font-mono">✓</span>
                <span className="leading-normal">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeServicesSection;
