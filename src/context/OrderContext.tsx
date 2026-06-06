import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ServiceSelection {
  assistedJobApps: {
    selected: boolean;
    quantity: number; // min 1, suggested 10, 25, 50, 100
  };
  careerConsultation: {
    selected: boolean;
  };
  interviewPrep: {
    selected: boolean;
  };
  profileOptimization: {
    selected: boolean;
  };
  portfolioCreation: {
    selected: boolean;
    tier: 'pdf' | 'web';
  };
}

export interface OrderDetails {
  services: ServiceSelection;
  subtotal: number;
  totalDiscount: number;
  totalDueToday: number;
  initiationFeeWaived: boolean;
}

export interface AgreementData {
  referenceNumber: string;
  timestamp: string;
  clientName: string;
  clientEmail: string;
  selectedServices: {
    name: string;
    details?: string;
    price: number;
  }[];
  totalPrice: number;
  signatureType: 'draw' | 'type';
  signatureData?: string; // canvas data URL or typed text
}

interface OrderContextType {
  services: ServiceSelection;
  orderDetails: OrderDetails;
  clientName: string;
  clientEmail: string;
  hasReadAgreement: boolean;
  signatureType: 'draw' | 'type';
  typedSignature: string;
  drawnSignatureData: string; // Base64 data url from canvas
  agreementSigned: boolean;
  referenceNumber: string;
  setServices: React.Dispatch<React.SetStateAction<ServiceSelection>>;
  updateJobAppsQuantity: (qty: number) => void;
  toggleService: (serviceKey: keyof ServiceSelection) => void;
  setPortfolioTier: (tier: 'pdf' | 'web') => void;
  setClientName: (name: string) => void;
  setClientEmail: (email: string) => void;
  setHasReadAgreement: (val: boolean) => void;
  setSignatureType: (type: 'draw' | 'type') => void;
  setTypedSignature: (sig: string) => void;
  setDrawnSignatureData: (data: string) => void;
  signAgreement: () => { success: boolean; refNum: string };
  resetOrder: () => void;
}

const defaultServices: ServiceSelection = {
  assistedJobApps: { selected: false, quantity: 10 },
  careerConsultation: { selected: false },
  interviewPrep: { selected: false },
  profileOptimization: { selected: false },
  portfolioCreation: { selected: false, tier: 'pdf' },
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceSelection>(() => {
    const saved = localStorage.getItem('resumefy_current_selection');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [hasReadAgreement, setHasReadAgreement] = useState(false);
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [drawnSignatureData, setDrawnSignatureData] = useState('');
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    services,
    subtotal: 0,
    totalDiscount: 0,
    totalDueToday: 0,
    initiationFeeWaived: false,
  });

  // Persist selections
  useEffect(() => {
    localStorage.setItem('resumefy_current_selection', JSON.stringify(services));
  }, [services]);

  // Pricing calculations
  useEffect(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let initiationFeeWaived = false;

    // Complimentary Resume (Always shown, value is $0, but original value would be $150 or similar. Not in final calculation except as a free reminder)

    // Job Apps: $2 per application. Initiation Fee: $100.
    // If selected, show $100 initiation fee, and waiver banner, and $100 discount applied.
    if (services.assistedJobApps.selected) {
      const appsCost = services.assistedJobApps.quantity * 2;
      subtotal += appsCost + 100; // Add price + initiation fee to subtotal
      initiationFeeWaived = true;
      totalDiscount += 100; // Waived initiation fee ($100 discount)
    }

    // Career Consultation: First 30 min FREE, then $100/hr. Billed after session, so due today is $0.
    if (services.careerConsultation.selected) {
      // Due today: $0, billed in 30-min increments post-session
      subtotal += 0;
    }

    // Interview Prep: Original $150, client price $100 (saves $50)
    if (services.interviewPrep.selected) {
      subtotal += 150;
      totalDiscount += 50;
    }

    // Profile Optimization: Original $120, client price $60 (saves $60)
    if (services.profileOptimization.selected) {
      subtotal += 120;
      totalDiscount += 60;
    }

    // Portfolio Creation: PDF is $50, Web is $200 (discounted)
    if (services.portfolioCreation.selected) {
      if (services.portfolioCreation.tier === 'pdf') {
        subtotal += 50;
      } else {
        subtotal += 200; // Web portfolio after discount ($200)
        // Original price would be $300 (saves $100) or similar. Let's treat subtotal as $200 directly as listed, or show original $300, price $200 (saves $100)
        // Let's treat web portfolio price as $200, and PDF as $50.
      }
    }

    const totalDueToday = Math.max(0, subtotal - totalDiscount);

    setOrderDetails({
      services,
      subtotal,
      totalDiscount,
      totalDueToday,
      initiationFeeWaived,
    });
  }, [services]);

  const toggleService = (serviceKey: keyof ServiceSelection) => {
    setServices((prev) => {
      const updated = { ...prev };
      if (serviceKey === 'assistedJobApps') {
        updated.assistedJobApps = {
          ...prev.assistedJobApps,
          selected: !prev.assistedJobApps.selected,
        };
      } else if (serviceKey === 'careerConsultation') {
        updated.careerConsultation = {
          ...prev.careerConsultation,
          selected: !prev.careerConsultation.selected,
        };
      } else if (serviceKey === 'interviewPrep') {
        updated.interviewPrep = {
          ...prev.interviewPrep,
          selected: !prev.interviewPrep.selected,
        };
      } else if (serviceKey === 'profileOptimization') {
        updated.profileOptimization = {
          ...prev.profileOptimization,
          selected: !prev.profileOptimization.selected,
        };
      } else if (serviceKey === 'portfolioCreation') {
        updated.portfolioCreation = {
          ...prev.portfolioCreation,
          selected: !prev.portfolioCreation.selected,
        };
      }
      return updated;
    });
  };

  const updateJobAppsQuantity = (qty: number) => {
    setServices((prev) => ({
      ...prev,
      assistedJobApps: {
        ...prev.assistedJobApps,
        quantity: Math.max(1, qty),
      },
    }));
  };

  const setPortfolioTier = (tier: 'pdf' | 'web') => {
    setServices((prev) => ({
      ...prev,
      portfolioCreation: {
        ...prev.portfolioCreation,
        tier,
      },
    }));
  };

  const signAgreement = () => {
    if (!clientName.trim() || !clientEmail.trim() || !hasReadAgreement) {
      return { success: false, refNum: '' };
    }

    const year = new Date().getFullYear();
    const randDigits = Math.floor(10000 + Math.random() * 90000); // 5 digits
    const refNum = `RF-${year}-${randDigits}`;

    const itemsList: AgreementData['selectedServices'] = [];
    if (services.assistedJobApps.selected) {
      itemsList.push({
        name: 'Assisted Job Applications',
        details: `${services.assistedJobApps.quantity} applications`,
        price: services.assistedJobApps.quantity * 2,
      });
    }
    if (services.careerConsultation.selected) {
      itemsList.push({
        name: 'Career Consultation',
        details: 'First 30 minutes complimentary, $100/hr thereafter',
        price: 0,
      });
    }
    if (services.interviewPrep.selected) {
      itemsList.push({
        name: 'Interview Preparation',
        details: 'STAR method prep, feedback session',
        price: 100,
      });
    }
    if (services.profileOptimization.selected) {
      itemsList.push({
        name: 'Professional Profile Optimization',
        details: 'LinkedIn, Indeed, Glassdoor optimization',
        price: 60,
      });
    }
    if (services.portfolioCreation.selected) {
      itemsList.push({
        name: `Portfolio Creation (${services.portfolioCreation.tier.toUpperCase()} Tier)`,
        details: services.portfolioCreation.tier === 'pdf' ? 'Multi-page PDF layout' : '1-year hosted website',
        price: services.portfolioCreation.tier === 'pdf' ? 50 : 200,
      });
    }

    const agreementRecord: AgreementData = {
      referenceNumber: refNum,
      timestamp: new Date().toISOString(),
      clientName,
      clientEmail,
      selectedServices: itemsList,
      totalPrice: orderDetails.totalDueToday,
      signatureType,
      signatureData: signatureType === 'draw' ? drawnSignatureData : typedSignature,
    };

    // Load existing agreements
    const existingStr = localStorage.getItem('resumefy_agreements');
    const existing: AgreementData[] = existingStr ? JSON.parse(existingStr) : [];
    existing.push(agreementRecord);
    localStorage.setItem('resumefy_agreements', JSON.stringify(existing));

    // Optional: Stream to Google Sheets Webhook if configured
    const gsheetWebhook = localStorage.getItem('resumefy_gsheet_webhook');
    if (gsheetWebhook) {
      fetch(gsheetWebhook, {
        method: 'POST',
        mode: 'no-cors', // Avoids CORS blocks on standard Apps Script URLs
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agreementRecord),
      }).catch((err) => {
        console.error('Error streaming data to Google Sheet webhook:', err);
      });
    }

    setReferenceNumber(refNum);
    setAgreementSigned(true);

    return { success: true, refNum };
  };

  const resetOrder = () => {
    setServices(defaultServices);
    setClientName('');
    setClientEmail('');
    setHasReadAgreement(false);
    setSignatureType('draw');
    setTypedSignature('');
    setDrawnSignatureData('');
    setAgreementSigned(false);
    setReferenceNumber('');
  };

  return (
    <OrderContext.Provider
      value={{
        services,
        orderDetails,
        clientName,
        clientEmail,
        hasReadAgreement,
        signatureType,
        typedSignature,
        drawnSignatureData,
        agreementSigned,
        referenceNumber,
        setServices,
        updateJobAppsQuantity,
        toggleService,
        setPortfolioTier,
        setClientName,
        setClientEmail,
        setHasReadAgreement,
        setSignatureType,
        setTypedSignature,
        setDrawnSignatureData,
        signAgreement,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
