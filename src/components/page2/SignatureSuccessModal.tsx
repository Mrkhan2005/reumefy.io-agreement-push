import React, { useEffect, useState } from 'react';
import { useOrder } from '../../context/OrderContext';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, ArrowRight, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface SignatureSuccessModalProps {
  visible: boolean;
  onProceedToPayment: () => void;
}

interface ConfettiPiece {
  id: number;
  left: string;
  delay: string;
  size: string;
  color: string;
}

export const SignatureSuccessModal: React.FC<SignatureSuccessModalProps> = ({
  visible,
  onProceedToPayment,
}) => {
  const {
    referenceNumber,
    clientName,
    clientEmail,
    signatureType,
    typedSignature,
    drawnSignatureData,
    orderDetails,
  } = useOrder();

  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Generate confetti items on mount
  useEffect(() => {
    if (visible) {
      const colors = ['#D4AF37', '#F0D060', '#F8F9FA', '#8B9BB4', '#B89020'];
      const pieces: ConfettiPiece[] = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        size: `${Math.random() * 8 + 5}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setConfetti(pieces);
    }
  }, [visible]);

  if (!visible) return null;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString();

    // Custom Luxury PDF Styles
    // Header
    doc.setFillColor(10, 15, 30); // Navy Blue bg (#0A0F1E)
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(212, 175, 55); // Gold Accent (#D4AF37)
    doc.setFont('times', 'bold');
    doc.setFontSize(26);
    doc.text('RESUMEFY.IO', 20, 25);
    
    doc.setTextColor(248, 249, 250); // White
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text('Your Career, Professionally Elevated.', 20, 34);

    // Document Title
    doc.setTextColor(17, 24, 39); // Dark Gray
    doc.setFont('times', 'bold');
    doc.setFontSize(18);
    doc.text('CLIENT SERVICES AGREEMENT', 20, 60);

    // Meta Block
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Reference: ${referenceNumber}`, 20, 70);
    doc.text(`Date: ${today}`, 20, 75);
    doc.text(`Governing Law: State of Texas`, 20, 80);

    // Client Block
    doc.setFillColor(244, 245, 247);
    doc.rect(20, 88, 170, 25, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text('CLIENT INFORMATION', 25, 94);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${clientName}`, 25, 100);
    doc.text(`Email: ${clientEmail}`, 25, 106);

    // Selected Services List
    doc.setFont('times', 'bold');
    doc.setFontSize(14);
    doc.text('ITEMIZED ORDER DETAILS', 20, 128);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('Service Item', 20, 136);
    doc.text('Price (USD)', 160, 136);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(20, 138, 190, 138);

    let currentY = 145;
    doc.setFont('helvetica', 'normal');

    // Add Complimentary Item
    doc.text('ATS-Optimized Resume (Complimentary)', 20, currentY);
    doc.text('$0.00', 160, currentY);
    currentY += 8;

    // Premium Items
    const services = orderDetails.services;
    if (services.assistedJobApps.selected) {
      doc.text(`Assisted Job Applications (${services.assistedJobApps.quantity} applications)`, 20, currentY);
      doc.text(`$${services.assistedJobApps.quantity * 2}.00`, 160, currentY);
      currentY += 8;
    }
    if (services.careerConsultation.selected) {
      doc.text('Career Consultation (Complimentary first 30m, $100/hr post-session)', 20, currentY);
      doc.text('$0.00', 160, currentY);
      currentY += 8;
    }
    if (services.interviewPrep.selected) {
      doc.text('Interview Preparation (STAR Coaching Session)', 20, currentY);
      doc.text('$100.00', 160, currentY);
      currentY += 8;
    }
    if (services.profileOptimization.selected) {
      doc.text('Professional Profile Optimization (LinkedIn/Indeed)', 20, currentY);
      doc.text('$60.00', 160, currentY);
      currentY += 8;
    }
    if (services.portfolioCreation.selected) {
      doc.text(`Portfolio Creation (${services.portfolioCreation.tier.toUpperCase()} Tier)`, 20, currentY);
      doc.text(`$${services.portfolioCreation.tier === 'pdf' ? 50 : 200}.00`, 160, currentY);
      currentY += 8;
    }

    doc.setDrawColor(200, 200, 200);
    doc.line(20, currentY, 190, currentY);
    currentY += 8;

    doc.setFont('helvetica', 'bold');
    doc.text('TOTAL DUE TODAY:', 20, currentY);
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(12);
    doc.text(`$${orderDetails.totalDueToday}.00`, 160, currentY);
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(10);

    currentY += 20;

    // Execution Terms Header
    doc.setFont('times', 'bold');
    doc.setFontSize(12);
    doc.text('ELECTRONIC SIGNATURE RECORD', 20, currentY);
    currentY += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text('This document has been signed electronically in accordance with the E-SIGN Act and the Texas', 20, currentY);
    currentY += 4;
    doc.text('Uniform Electronic Transactions Act (TUETA). Both parties agree to the terms as of execution date.', 20, currentY);
    currentY += 12;

    // Signatures block
    doc.setDrawColor(220, 220, 220);
    doc.line(20, currentY, 95, currentY);
    doc.line(115, currentY, 190, currentY);
    
    currentY += 6;
    doc.setTextColor(17, 24, 39);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('For Resumefy.io Team', 20, currentY);
    doc.text('For Client (Digital Authorization)', 115, currentY);

    currentY += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Authorized Signatory', 20, currentY);
    doc.text(clientName, 115, currentY);

    // Under the lines - Signatures Content
    if (signatureType === 'draw' && drawnSignatureData) {
      try {
        doc.addImage(drawnSignatureData, 'PNG', 120, currentY - 22, 50, 15);
      } catch (err) {
        console.error('Error rendering image in PDF:', err);
      }
    } else {
      doc.setFont('times', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(212, 175, 55);
      doc.text(typedSignature, 120, currentY - 10);
    }

    doc.save(`Resumefy_Agreement_${referenceNumber}.pdf`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Confetti container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-50">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute animate-confetti-fall"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        ))}
      </div>

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring' as const, damping: 25, stiffness: 200 }}
        className="relative glass-panel-elevated rounded-2xl max-w-lg w-full p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] z-50 text-center font-sans"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' as const, stiffness: 300, damping: 15 }}
            className="w-20 h-20 bg-accent-gold/10 border border-accent-gold rounded-full flex items-center justify-center text-accent-gold"
          >
            <CheckCircle2 size={44} className="stroke-[1.5]" />
          </motion.div>
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
          Agreement Successfully Executed
        </h3>
        
        <p className="mt-4 text-sm text-text-muted max-w-sm mx-auto leading-relaxed">
          Your client agreement has been saved and is legally binding. A copy will be emailed to your inbox shortly.
        </p>

        {/* Reference Panel */}
        <div className="mt-6 p-4 rounded-lg bg-bg-primary border border-gold-border/20 max-w-sm mx-auto">
          <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">
            Agreement Reference Number
          </span>
          <div className="text-xl font-bold text-accent-gold mt-1 select-all font-mono tracking-wider">
            {referenceNumber}
          </div>
          <span className="text-[10px] text-text-muted block mt-1">
            Date Signed: {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col gap-3 max-w-sm mx-auto">
          {/* PDF DOWNLOAD */}
          <button
            onClick={handleDownloadPDF}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-accent-gold/40 hover:border-accent-gold bg-accent-gold/5 text-accent-gold font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(212,175,55,0.15)]"
          >
            <FileText size={16} />
            Download Signed Contract (PDF)
            <Download size={14} className="ml-1" />
          </button>

          {/* PROCEED TO PAYMENT */}
          <button
            onClick={onProceedToPayment}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg gold-btn-gradient text-bg-primary font-bold text-sm transition-all duration-200 cursor-pointer border border-accent-gold-light/20"
          >
            Proceed to Payment
            <ArrowRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SignatureSuccessModal;
