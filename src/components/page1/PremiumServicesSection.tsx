import React from 'react';
import { useOrder } from '../../context/OrderContext';
import ServiceCard from './ServiceCard';
import PortfolioTierSelector from './PortfolioTierSelector';
import { motion } from 'framer-motion';

export const PremiumServicesSection: React.FC = () => {
  const {
    services,
    toggleService,
    updateJobAppsQuantity,
    setPortfolioTier,
  } = useOrder();

  const handleQtyChange = (val: number) => {
    updateJobAppsQuantity(val);
  };

  // Framer Motion staggered container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  // Card items variants
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 90, damping: 15 },
    },
  };

  return (
    <div className="py-10">
      <div className="flex flex-col gap-1 mb-8">
        <div className="flex items-center gap-3">
          <span className="text-accent-gold text-lg">◆</span>
          <h2 className="text-lg font-bold tracking-wider uppercase text-text-primary">
            Premium Career Services
          </h2>
        </div>
        <p className="text-sm text-text-muted">
          Handpicked by our career experts. All prices shown reflect your exclusive client discount.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* SERVICE 1: Assisted Job Applications */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            title="Assisted Job Applications"
            subtitle="Human-supervised. Accuracy-guaranteed."
            priceText={`$2 / application`}
            isSelected={services.assistedJobApps.selected}
            onToggle={() => toggleService('assistedJobApps')}
            bullets={[
              'Real human reviews and tailors every single application',
              'Cover letter personalized and written specifically for each role',
              'Application tracking dashboard updated in real-time',
              'Quality-checked by senior resume editors before submission',
            ]}
          >
            <div className="space-y-4 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">
                    Number of Applications
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={services.assistedJobApps.quantity}
                      onChange={(e) => handleQtyChange(parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-1.5 rounded bg-bg-primary border border-gold-border/30 text-text-primary focus:border-accent-gold outline-none text-sm font-semibold"
                    />
                    <span className="text-xs text-text-muted">applications</span>
                  </div>
                </div>

                {/* Quick Select Quantity Buttons */}
                <div className="flex flex-wrap gap-1">
                  {[10, 25, 50, 100].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleQtyChange(num)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-all border cursor-pointer ${
                        services.assistedJobApps.quantity === num
                          ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                          : 'border-gold-border/20 text-text-muted hover:border-gold-border/40 hover:text-text-primary'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Waiver Banner */}
              {services.assistedJobApps.selected && (
                <div className="p-3 rounded bg-success-green/10 border border-success-green/20 text-success-green flex items-center gap-2 text-xs">
                  <span>🎁</span>
                  <span className="font-semibold">
                    Initiation fee waived — $100 discount applied automatically
                  </span>
                </div>
              )}
            </div>
          </ServiceCard>
        </motion.div>

        {/* SERVICE 2: Career Consultation */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            title="Career Consultation"
            subtitle="One-on-one session with premium resume strategists."
            priceText="First 30 min FREE"
            isSelected={services.careerConsultation.selected}
            onToggle={() => toggleService('careerConsultation')}
            bullets={[
              'Resume strategy, positioning, and narrative alignment',
              'Career path development and executive advisory',
              'Live salary negotiation mock coaching and tips',
              'First 30 minutes always complimentary, $100/hr thereafter',
            ]}
          >
            <div className="text-xs text-text-muted font-sans italic leading-relaxed">
              Note: Additional time is billed at $100 per hour (in 30-min increments) and will be invoiced post-session. First 30 min is always 100% free.
            </div>
          </ServiceCard>
        </motion.div>

        {/* SERVICE 3: Interview Preparation */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            title="Interview Preparation"
            subtitle="Master behavioral and technical interviews."
            priceText="$100"
            originalPriceText="$150"
            badgeText="Save $50"
            isSelected={services.interviewPrep.selected}
            onToggle={() => toggleService('interviewPrep')}
            bullets={[
              'Role-specific mock interviews with veteran industry recruiters',
              'Structured behavioral & technical prep based on target roles',
              'STAR framework alignment for crisp, impact-driven answers',
              'Fully recorded session with detailed feedback matrix',
            ]}
          />
        </motion.div>

        {/* SERVICE 4: Professional Profile Optimization */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            title="Professional Profile Optimization"
            subtitle="LinkedIn · Indeed · Glassdoor · ZipRecruiter · and more"
            priceText="$60"
            originalPriceText="$120"
            badgeText="Save $60"
            isSelected={services.profileOptimization.selected}
            onToggle={() => toggleService('profileOptimization')}
            bullets={[
              'LinkedIn profile full headline and section rewrite',
              'Indeed and Glassdoor resume match profile configuration',
              'Keyword injection strategy to rank in active recruiter search lists',
              'Comprehensive profile setup check across 4+ major platforms',
            ]}
          />
        </motion.div>

        {/* SERVICE 5: Portfolio Creation */}
        <motion.div variants={cardVariants}>
          <ServiceCard
            title="Portfolio Creation"
            subtitle="Showcase your professional achievements visually."
            priceText={services.portfolioCreation.tier === 'pdf' ? '$50' : '$200'}
            isSelected={services.portfolioCreation.selected}
            onToggle={() => toggleService('portfolioCreation')}
            bullets={[
              'Custom portfolio design tailored to your career specialization',
              services.portfolioCreation.tier === 'pdf'
                ? 'Multi-page designed PDF portfolio suitable for print & email'
                : 'Interactive portfolio website fully hosted for 1 year',
              services.portfolioCreation.tier === 'pdf'
                ? 'Delivered within 5 business days'
                : 'Custom domain and hosting setup included (all expenses covered)',
            ]}
          >
            {services.portfolioCreation.selected && (
              <PortfolioTierSelector
                selectedTier={services.portfolioCreation.tier}
                onChange={setPortfolioTier}
              />
            )}
          </ServiceCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PremiumServicesSection;
