import React, { useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import GoldButton from '../shared/GoldButton';
import { ChevronUp, ChevronDown, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OrderSummary: React.FC = () => {
  const { services, orderDetails } = useOrder();
  const navigate = useNavigate();
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const hasItems =
    services.assistedJobApps.selected ||
    services.careerConsultation.selected ||
    services.interviewPrep.selected ||
    services.profileOptimization.selected ||
    services.portfolioCreation.selected;

  const handleProceed = () => {
    if (hasItems) {
      navigate('/agreement');
    }
  };

  const renderLineItems = () => {
    return (
      <div className="space-y-4 font-sans text-sm">
        {/* Compliments Card (Always present or as reference) */}
        <div className="flex justify-between text-text-muted border-b border-gold-border/5 pb-2">
          <div>
            <span className="font-semibold text-text-primary">ATS-Optimized Resume</span>
            <span className="block text-[10px] text-success-green">Complimentary Offer</span>
          </div>
          <div className="text-right">
            <span className="text-xs line-through mr-1.5">$150</span>
            <span className="font-bold text-accent-gold-light">$0</span>
          </div>
        </div>

        {/* Assisted Job Applications */}
        {services.assistedJobApps.selected && (
          <div className="flex justify-between text-text-primary border-b border-gold-border/5 pb-2">
            <div>
              <span className="font-semibold">Assisted Job Applications</span>
              <span className="block text-xs text-text-muted">
                {services.assistedJobApps.quantity} applications × $2
              </span>
              {/* Initiation Fee Waived Detail */}
              <span className="block text-[10px] text-success-green font-medium">
                Initiation Fee Waived ($100 savings)
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-accent-gold">
                ${services.assistedJobApps.quantity * 2}
              </span>
            </div>
          </div>
        )}

        {/* Career Consultation */}
        {services.careerConsultation.selected && (
          <div className="flex justify-between text-text-primary border-b border-gold-border/5 pb-2">
            <div>
              <span className="font-semibold">Career Consultation</span>
              <span className="block text-xs text-text-muted">First 30 minutes free</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-accent-gold">$0</span>
            </div>
          </div>
        )}

        {/* Interview Prep */}
        {services.interviewPrep.selected && (
          <div className="flex justify-between text-text-primary border-b border-gold-border/5 pb-2">
            <div>
              <span className="font-semibold">Interview Prep</span>
              <span className="block text-[10px] text-accent-gold-light">Client Discount</span>
            </div>
            <div className="text-right">
              <span className="text-xs line-through text-text-muted mr-1.5">$150</span>
              <span className="font-bold text-accent-gold">$100</span>
            </div>
          </div>
        )}

        {/* Profile Optimization */}
        {services.profileOptimization.selected && (
          <div className="flex justify-between text-text-primary border-b border-gold-border/5 pb-2">
            <div>
              <span className="font-semibold">Profile Optimization</span>
              <span className="block text-[10px] text-accent-gold-light">Client Discount</span>
            </div>
            <div className="text-right">
              <span className="text-xs line-through text-text-muted mr-1.5">$120</span>
              <span className="font-bold text-accent-gold">$60</span>
            </div>
          </div>
        )}

        {/* Portfolio Creation */}
        {services.portfolioCreation.selected && (
          <div className="flex justify-between text-text-primary border-b border-gold-border/5 pb-2">
            <div>
              <span className="font-semibold">Portfolio Creation</span>
              <span className="block text-xs text-text-muted">
                Tier: {services.portfolioCreation.tier === 'pdf' ? 'Professional PDF' : 'Premium Web'}
              </span>
            </div>
            <div className="text-right">
              {services.portfolioCreation.tier === 'web' && (
                <span className="text-xs line-through text-text-muted mr-1.5">$300</span>
              )}
              <span className="font-bold text-accent-gold">
                ${services.portfolioCreation.tier === 'pdf' ? 50 : 200}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* DESKTOP SIDEBAR (Visible on md and above) */}
      <div className="hidden md:block sticky top-28 glass-panel-elevated rounded-xl p-6 shadow-2xl border border-gold-border w-full max-w-sm">
        <h3 className="font-display text-xl font-bold tracking-tight text-text-primary border-b border-gold-border/20 pb-4 mb-4 flex items-center gap-2">
          <ShoppingBag size={18} className="text-accent-gold" />
          Your Order Summary
        </h3>

        {!hasItems ? (
          <div className="py-12 text-center text-text-muted text-sm font-sans">
            <p>Select premium career services from the left to build your custom package.</p>
          </div>
        ) : (
          <>
            <div className="max-h-[300px] overflow-y-auto pr-1 legal-scrollbar">
              {renderLineItems()}
            </div>

            <div className="border-t border-gold-border/20 pt-4 mt-6 space-y-3 font-sans">
              {services.careerConsultation.selected && (
                <p className="text-[11px] text-text-muted italic leading-relaxed">
                  * Consultation first 30 min is complimentary. Additional consultation hours billed post-session.
                </p>
              )}

              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm text-text-muted uppercase tracking-wider font-semibold">
                  Total Due Today
                </span>
                <span className="text-3xl font-extrabold text-accent-gold gold-text-gradient">
                  ${orderDetails.totalDueToday}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mt-6">
          <GoldButton
            onClick={handleProceed}
            disabled={!hasItems}
            fullWidth
          >
            Review Agreement & Proceed →
          </GoldButton>
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET (Visible on mobile only) */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 z-40">
        {/* Backdrop overlay when expanded */}
        <AnimatePresence>
          {mobileExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileExpanded(false)}
              className="fixed inset-0 bg-black/80 z-30"
            />
          )}
        </AnimatePresence>

        {/* Dynamic Sheet Panel */}
        <motion.div
          animate={{ height: mobileExpanded ? 'auto' : '80px' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative glass-panel-elevated border-t border-gold-border rounded-t-2xl z-40 bg-bg-card/95 backdrop-blur-lg shadow-[0_-10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Handle / Tap trigger to expand */}
          <div
            onClick={() => hasItems && setMobileExpanded(!mobileExpanded)}
            className="w-full flex items-center justify-between px-6 h-[80px] cursor-pointer border-b border-gold-border/5"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-accent-gold/10 text-accent-gold">
                <ShoppingBag size={18} />
              </div>
              <div>
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
                  Total Today
                </span>
                <div className="text-xl font-bold text-accent-gold flex items-center gap-1.5">
                  ${orderDetails.totalDueToday}
                  {hasItems && (
                    <span className="text-[10px] text-text-muted lowercase font-normal">
                      ({Object.values(services).filter(s => s.selected).length} selected)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {hasItems ? (
              <div className="flex items-center gap-3">
                <GoldButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProceed();
                  }}
                  className="py-2.5 px-4 text-xs"
                >
                  Proceed
                </GoldButton>
                <div>
                  {mobileExpanded ? <ChevronDown size={20} className="text-accent-gold" /> : <ChevronUp size={20} className="text-accent-gold" />}
                </div>
              </div>
            ) : (
              <span className="text-xs text-text-muted italic">Select services above</span>
            )}
          </div>

          {/* Expanded Drawer Details */}
          {mobileExpanded && (
            <div className="p-6 max-h-[350px] overflow-y-auto legal-scrollbar bg-bg-primary/95 space-y-6">
              {renderLineItems()}
              
              {services.careerConsultation.selected && (
                <p className="text-[10px] text-text-muted italic">
                  * Consultation first 30 min is complimentary. Additional consultation hours billed post-session.
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default OrderSummary;
