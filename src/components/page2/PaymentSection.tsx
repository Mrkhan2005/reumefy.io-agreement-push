import React, { useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import GoldButton from '../shared/GoldButton';
import { CreditCard, Landmark, DollarSign, MessageSquare, Check, ShieldCheck } from 'lucide-react';
import Badge from '../shared/Badge';

interface PaymentSectionProps {
  visible: boolean;
}

type PaymentMethod = 'stripe' | 'bank' | 'paypal' | 'whatsapp';

export const PaymentSection: React.FC<PaymentSectionProps> = ({ visible }) => {
  const { orderDetails, resetOrder } = useOrder();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bank');
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  if (!visible) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMethod === 'stripe') {
      alert('Stripe payments are currently in sandbox/preview. Please choose Bank Transfer or WhatsApp to complete setup.');
      return;
    }
    setPaymentSubmitted(true);
  };

  const handleFinish = () => {
    resetOrder();
    window.location.href = '/';
  };

  const methods = [
    {
      id: 'stripe' as PaymentMethod,
      name: 'Credit / Debit Card',
      icon: <CreditCard size={18} />,
      badge: 'Coming Soon',
      description: 'Secure checkout powered by Stripe.',
      disabled: true,
    },
    {
      id: 'bank' as PaymentMethod,
      name: 'Bank Transfer',
      icon: <Landmark size={18} />,
      badge: 'Recommended',
      description: 'Transfer directly to our corporate accounts.',
      disabled: false,
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal Checkout',
      icon: <DollarSign size={18} />,
      badge: null,
      description: 'Instant verification via secure PayPal link.',
      disabled: false,
    },
    {
      id: 'whatsapp' as PaymentMethod,
      name: 'WhatsApp Business',
      icon: <MessageSquare size={18} />,
      badge: 'Popular',
      description: 'Arrange invoice/terms with our sales team via WhatsApp.',
      disabled: false,
    },
  ];

  if (paymentSubmitted) {
    return (
      <div className="glass-panel-elevated rounded-xl p-8 border border-accent-gold/40 text-center space-y-6 max-w-xl mx-auto font-sans">
        <div className="w-16 h-16 bg-success-green/10 border border-success-green text-success-green rounded-full flex items-center justify-center mx-auto">
          <Check size={36} className="stroke-[2.5]" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-text-primary">
            Checkout Instructions Sent
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
            {selectedMethod === 'bank' &&
              'We have emailed you our corporate banking invoice with SWIFT/Routing details. Your application services will begin immediately upon transfer verification.'}
            {selectedMethod === 'paypal' &&
              'A secure PayPal transfer request has been sent to your email. Please fulfill it to unlock full service delivery.'}
            {selectedMethod === 'whatsapp' &&
              'Opening WhatsApp... A support agent will connect with you to review your contract details and customize your payment terms.'}
          </p>
        </div>

        <div className="pt-4">
          <GoldButton onClick={handleFinish} className="mx-auto">
            Return to Homepage
          </GoldButton>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel-elevated rounded-xl p-6 border border-gold-border/30 shadow-2xl relative font-sans">
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 rounded-full blur-xl pointer-events-none" />
      
      <div className="flex flex-col gap-1 border-b border-gold-border/10 pb-4 mb-6">
        <h3 className="font-display text-xl font-bold text-text-primary tracking-tight">
          Complete Your Order
        </h3>
        <p className="text-xs text-text-muted">
          Select your preferred payment method below to activate services.
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-6">
        {/* PAYMENT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {methods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => !method.disabled && setSelectedMethod(method.id)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                  method.disabled
                    ? 'border-gold-border/10 opacity-40 cursor-not-allowed bg-bg-primary/20'
                    : isSelected
                    ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.15)] cursor-pointer'
                    : 'border-gold-border/20 hover:border-gold-border/40 bg-bg-primary/40 cursor-pointer'
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2.5 text-text-primary font-bold text-sm">
                    <span className="text-accent-gold">{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                  {method.badge && (
                    <Badge
                      variant={method.badge === 'Recommended' ? 'gold' : 'muted'}
                      className="text-[9px]"
                    >
                      {method.badge}
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-text-muted mt-2 leading-relaxed">
                  {method.description}
                </p>

                <div className="flex justify-end mt-4">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-accent-gold bg-accent-gold text-bg-primary'
                        : 'border-gold-border/40'
                    }`}
                  >
                    {isSelected && <Check size={11} className="stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CHECKOUT CARD FOOTER */}
        <div className="p-4 rounded-lg bg-bg-primary border border-gold-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-text-muted text-center sm:text-left">
            <ShieldCheck size={20} className="text-accent-gold" />
            <div>
              <p className="font-semibold text-text-primary">Fully Secure 256-Bit SSL Checkout</p>
              <p>Your payment details are fully encrypted and never stored on our servers.</p>
            </div>
          </div>
          
          <div className="text-center sm:text-right shrink-0">
            <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold block">
              Total Payable
            </span>
            <span className="text-2xl font-black text-accent-gold font-sans tracking-tight">
              ${orderDetails.totalDueToday}
            </span>
          </div>
        </div>

        <div>
          <GoldButton type="submit" fullWidth className="py-4">
            Complete Payment →
          </GoldButton>
        </div>
      </form>
    </div>
  );
};

export default PaymentSection;
