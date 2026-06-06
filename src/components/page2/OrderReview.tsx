import React from 'react';
import { useOrder } from '../../context/OrderContext';
import { ShoppingBag } from 'lucide-react';

export const OrderReview: React.FC = () => {
  const { services, orderDetails } = useOrder();

  return (
    <div className="glass-panel-elevated rounded-xl p-6 border border-gold-border/30 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl pointer-events-none" />
      
      <h3 className="font-display text-xl font-bold tracking-tight text-text-primary border-b border-gold-border/10 pb-4 mb-4 flex items-center gap-2">
        <ShoppingBag size={18} className="text-accent-gold" />
        Order Review
      </h3>

      <div className="space-y-4">
        {/* ATS-Optimized Resume (Always Complimentary) */}
        <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
          <div>
            <span className="font-semibold text-text-primary">ATS-Optimized Resume</span>
            <span className="block text-xs text-success-green font-medium">Included - Complimentary Offer</span>
          </div>
          <div className="text-right">
            <span className="text-xs line-through text-text-muted mr-2">$150</span>
            <span className="font-extrabold text-accent-gold-light">$0</span>
          </div>
        </div>

        {/* Assisted Job Applications */}
        {services.assistedJobApps.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Assisted Job Applications</span>
              <span className="block text-xs text-text-muted">
                {services.assistedJobApps.quantity} applications × $2
              </span>
              <span className="block text-[11px] text-success-green font-medium">
                Initiation Fee: <span className="line-through text-text-muted">$100</span> $0 (Waived)
              </span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-accent-gold">
                ${services.assistedJobApps.quantity * 2}
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
                Additional time billed at $100/hr in 30-min increments
              </span>
            </div>
            <div className="text-right">
              <span className="font-extrabold text-accent-gold">$0</span>
            </div>
          </div>
        )}

        {/* Interview Prep */}
        {services.interviewPrep.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Interview Preparation</span>
              <span className="block text-xs text-success-green font-medium">Promo applied: $50 savings</span>
            </div>
            <div className="text-right">
              <span className="text-xs line-through text-text-muted mr-2">$150</span>
              <span className="font-extrabold text-accent-gold">${100}</span>
            </div>
          </div>
        )}

        {/* Profile Optimization */}
        {services.profileOptimization.selected && (
          <div className="flex justify-between items-center text-sm border-b border-gold-border/5 pb-2.5">
            <div>
              <span className="font-semibold text-text-primary">Professional Profile Optimization</span>
              <span className="block text-xs text-success-green font-medium">Promo applied: $60 savings</span>
            </div>
            <div className="text-right">
              <span className="text-xs line-through text-text-muted mr-2">$120</span>
              <span className="font-extrabold text-accent-gold">${60}</span>
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
            <div className="text-right">
              {services.portfolioCreation.tier === 'web' && (
                <span className="text-xs line-through text-text-muted mr-2">$300</span>
              )}
              <span className="font-extrabold text-accent-gold">
                ${services.portfolioCreation.tier === 'pdf' ? 50 : 200}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Pricing Totals */}
      <div className="mt-6 pt-4 border-t border-gold-border/20 flex justify-between items-baseline">
        <div className="text-left">
          <span className="text-xs font-semibold tracking-widest text-text-muted uppercase">
            Total Due Today
          </span>
          <p className="text-[10px] text-text-muted mt-0.5">Secure, encrypted payment processing</p>
        </div>
        
        <div className="text-right">
          <span className="text-3xl font-black text-accent-gold gold-text-gradient">
            ${orderDetails.totalDueToday}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
