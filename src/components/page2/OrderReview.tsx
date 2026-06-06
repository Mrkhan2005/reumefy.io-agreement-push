import React from 'react';
import { useOrder } from '../../context/OrderContext';
import { ShoppingBag } from 'lucide-react';

export const OrderReview: React.FC = () => {
  const { services } = useOrder();

  return (
    <div className="glass-panel-elevated rounded-xl p-6 border border-gold-border/30 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />
      
      <h3 className="font-display text-xl font-bold tracking-tight text-text-primary border-b border-gold-border/10 pb-4 mb-4 flex items-center gap-2">
        <ShoppingBag size={18} className="text-accent-gold" />
        Services Selected
      </h3>

      <div className="space-y-4">
        {/* ATS-Optimized Resume (Always Complimentary) */}
        <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
          <div>
            <span className="font-semibold text-text-primary">ATS-Optimized Resume</span>
            <span className="block text-xs text-success-green font-medium">Included - Complimentary Offer</span>
          </div>
        </div>

        {/* Assisted Job Applications */}
        {services.assistedJobApps.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Assisted Job Applications</span>
              <span className="block text-xs text-text-muted">
                {services.assistedJobApps.quantity} applications
              </span>
              <span className="block text-[11px] text-success-green font-medium">
                Initiation Fee Waived
              </span>
            </div>
          </div>
        )}

        {/* Career Consultation */}
        {services.careerConsultation.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Career Consultation</span>
              <span className="block text-xs text-text-muted">First 30 minutes free</span>
              <span className="block text-[11px] text-text-muted italic">
                Additional time billed hourly in 30-min increments
              </span>
            </div>
          </div>
        )}

        {/* Interview Prep */}
        {services.interviewPrep.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Interview Preparation</span>
              <span className="block text-xs text-success-green font-medium">Active Package Selection</span>
            </div>
          </div>
        )}

        {/* Profile Optimization */}
        {services.profileOptimization.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Professional Profile Optimization</span>
              <span className="block text-xs text-success-green font-medium">Active Package Selection</span>
            </div>
          </div>
        )}

        {/* Portfolio Creation */}
        {services.portfolioCreation.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Portfolio Creation</span>
              <span className="block text-xs text-text-muted">
                Tier: {services.portfolioCreation.tier === 'pdf' ? 'Professional PDF' : 'Premium Web'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Summary details */}
      <div className="mt-6 pt-4 border-t border-gold-border/20 flex justify-between items-baseline">
        <div className="text-left">
          <span className="text-xs font-semibold tracking-widest text-text-muted uppercase">
            Selected Services
          </span>
          <p className="text-[10px] text-text-muted mt-0.5">Ready for agreement signature execution</p>
        </div>
        
        <div className="text-right">
          <span className="text-2xl font-bold text-accent-gold">
            {Object.values(services).filter(s => s.selected).length + 1} Items Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
