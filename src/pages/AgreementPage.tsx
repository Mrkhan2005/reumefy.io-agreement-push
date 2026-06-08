import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import Navbar from '../components/shared/Navbar';
import OrderReview from '../components/page2/OrderReview';
import AgreementViewer from '../components/page2/AgreementViewer';
import SignatureSection from '../components/page2/SignatureSection';
import SignatureSuccessModal from '../components/page2/SignatureSuccessModal';
import PaymentSection from '../components/page2/PaymentSection';
import { FileSignature } from 'lucide-react';
import { motion } from 'framer-motion';

export const AgreementPage: React.FC = () => {
  const { services, agreementSigned } = useOrder();
  const navigate = useNavigate();

  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const paymentRef = useRef<HTMLDivElement>(null);

  // Safety check: If no services are selected, redirect back to Services page
  const hasItems =
    services.assistedJobApps.selected ||
    services.careerConsultation.selected ||
    services.interviewPrep.selected ||
    services.profileOptimization.selected ||
    services.portfolioCreation.selected;

  useEffect(() => {
    if (!hasItems) {
      navigate('/portal');
    }
  }, [hasItems, navigate]);

  const handleSignComplete = () => {
    setShowSuccessModal(true);
  };

  const handleProceedToPayment = () => {
    setShowSuccessModal(false);
    setShowPayment(true);
    
    // Smooth scroll to payment section on next render tick
    setTimeout(() => {
      paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pb-24 md:pb-16 font-sans"
    >
      <Navbar />

      {/* Hero Banner Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="relative py-10 md:py-16 text-center border-b border-gold-border/10 overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-4 z-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-accent-gold bg-accent-gold/10 border border-accent-gold/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider animate-gold-pulse">
            <FileSignature size={12} />
            Step 2: Sign & Finalize
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            You're one signature away from your dream career.
          </h2>
          
          <p className="text-sm sm:text-base text-text-muted max-w-lg mx-auto">
            Review your selected services and sign your legally binding client agreement below.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Order Review + Payment (cols 5) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <OrderReview />
            
            {/* Payment Section (Revealed after signing) */}
            <div ref={paymentRef}>
              <PaymentSection visible={showPayment || agreementSigned} />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Agreement Viewer + Sign pad (cols 7) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <AgreementViewer
              onScrollToBottom={setHasScrolledToBottom}
              hasScrolledToBottom={hasScrolledToBottom}
            />
            
            <SignatureSection
              visible={hasScrolledToBottom && !agreementSigned}
              onSignComplete={handleSignComplete}
            />

            {agreementSigned && !showPayment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-xl border border-success-green/30 bg-success-green/5 text-center text-sm text-text-primary shadow-[0_0_15px_rgba(34,197,94,0.1)]"
              >
                <p className="font-bold text-success-green flex justify-center items-center gap-1.5 mb-2">
                  ✓ Agreement Executed
                </p>
                <p className="text-text-muted text-xs leading-relaxed max-w-md mx-auto">
                  Agreement signed successfully. Your reference code is saved. Scroll to complete your order or click "Proceed to Payment" in the confirmation.
                </p>
                
                {!showPayment && (
                  <button
                    onClick={() => setShowPayment(true)}
                    className="mt-4 px-4 py-2 bg-accent-gold hover:bg-accent-gold-light text-bg-primary font-bold text-xs rounded transition-colors cursor-pointer"
                  >
                    Display Payment Section
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CONFETTI SUCCESS MODAL */}
      <SignatureSuccessModal
        visible={showSuccessModal}
        onProceedToPayment={handleProceedToPayment}
      />
    </motion.div>
  );
};

export default AgreementPage;
