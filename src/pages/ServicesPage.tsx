import React from 'react';
import Navbar from '../components/shared/Navbar';
import HeroSection from '../components/page1/HeroSection';
import FreeServicesSection from '../components/page1/FreeServicesSection';
import PremiumServicesSection from '../components/page1/PremiumServicesSection';
import OrderSummary from '../components/page1/OrderSummary';
import { motion } from 'framer-motion';

export const ServicesPage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } }
      }}
      className="min-h-screen pb-24 md:pb-12"
    >
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <HeroSection />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 items-start">
          {/* Left Column: Services lists */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="md:col-span-2 space-y-6"
          >
            <FreeServicesSection />
            <PremiumServicesSection />
          </motion.div>

          {/* Right Column: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring' as const, stiffness: 100, damping: 20, delay: 0.3 }}
            className="md:col-span-1"
          >
            <OrderSummary />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
