import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useOrder } from '../../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Type, RefreshCw } from 'lucide-react';
import GoldButton from '../shared/GoldButton';

interface SignatureSectionProps {
  visible: boolean;
  onSignComplete: (refNum: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({
  visible,
  onSignComplete,
}) => {
  const {
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    hasReadAgreement,
    setHasReadAgreement,
    signatureType,
    setSignatureType,
    typedSignature,
    setTypedSignature,
    setDrawnSignatureData,
    signAgreement,
  } = useOrder();

  const [dateToday, setDateToday] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  // Set today's date formatted nicely in client timezone
  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setDateToday(today.toLocaleDateString(undefined, options));
  }, []);

  // Update typed signature automatically with client name for convenience
  useEffect(() => {
    if (clientName && !typedSignature) {
      setTypedSignature(clientName);
    }
  }, [clientName, typedSignature, setTypedSignature]);

  const handleClearCanvas = () => {
    sigCanvasRef.current?.clear();
    setDrawnSignatureData('');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientName.trim()) {
      setErrorMsg('Full legal name is required.');
      return;
    }
    if (!clientEmail.trim() || !/\S+@\S+\.\S+/.test(clientEmail)) {
      setErrorMsg('A valid email address is required.');
      return;
    }

    if (signatureType === 'draw') {
      if (sigCanvasRef.current?.isEmpty()) {
        setErrorMsg('Please draw your signature in the pad.');
        return;
      }
      // Save canvas to context
      const dataUrl = sigCanvasRef.current?.getTrimmedCanvas().toDataURL('image/png') || '';
      setDrawnSignatureData(dataUrl);
    } else {
      if (!typedSignature.trim()) {
        setErrorMsg('Please type your signature details.');
        return;
      }
    }

    if (!hasReadAgreement) {
      setErrorMsg('You must check the agreement box to proceed.');
      return;
    }

    // Call context signing
    const res = signAgreement();
    if (res.success) {
      onSignComplete(res.refNum);
    } else {
      setErrorMsg('An error occurred signing the document. Please verify all fields.');
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass-panel-elevated rounded-xl p-6 border border-gold-border/30 shadow-2xl relative font-sans"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 rounded-full blur-xl pointer-events-none" />
          
          <h3 className="font-display text-xl font-bold tracking-tight text-text-primary border-b border-gold-border/10 pb-4 mb-6">
            Execute Client Agreement
          </h3>

          <form onSubmit={handleSave} className="space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded bg-red-500/10 border border-red-500/30 text-red-200 text-sm font-semibold">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* LEGAL NAME */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-2">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-sm font-medium transition-all"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@company.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none text-sm font-medium transition-all"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase mb-2">
                  Date
                </label>
                <input
                  type="text"
                  readOnly
                  value={dateToday}
                  className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-gold-border/10 text-text-muted outline-none text-sm font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* SIGNATURE AREA */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold tracking-wider text-text-muted uppercase">
                  Digital Client Signature
                </label>
                
                {/* Switcher */}
                <div className="flex bg-bg-primary border border-gold-border/20 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setSignatureType('draw')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      signatureType === 'draw'
                        ? 'bg-accent-gold text-bg-primary shadow'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <Edit2 size={11} />
                    Draw
                  </button>
                  <button
                    type="button"
                    onClick={() => setSignatureType('type')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      signatureType === 'type'
                        ? 'bg-accent-gold text-bg-primary shadow'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <Type size={11} />
                    Type
                  </button>
                </div>
              </div>

              {/* Draw Pad */}
              {signatureType === 'draw' ? (
                <div className="relative group">
                  <div className="w-full bg-bg-primary rounded-lg border border-gold-border/20 h-44 overflow-hidden relative">
                    <SignatureCanvas
                      ref={sigCanvasRef}
                      penColor="#D4AF37"
                      canvasProps={{
                        className: 'signature-canvas w-full h-full cursor-crosshair',
                      }}
                      onBegin={() => setErrorMsg('')}
                    />
                    
                    <button
                      type="button"
                      onClick={handleClearCanvas}
                      className="absolute bottom-3 right-3 p-2 rounded-md bg-bg-elevated border border-gold-border/20 text-text-muted hover:text-accent-gold hover:border-accent-gold transition-all duration-200 cursor-pointer flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                      title="Clear Pad"
                    >
                      <RefreshCw size={10} />
                      Clear
                    </button>
                  </div>
                  <p className="text-[10px] text-text-muted mt-1.5 italic">
                    Use your mouse, trackpad, or touch screen to draw your signature inside the boundary.
                  </p>
                </div>
              ) : (
                /* Typed Signature */
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Type legal name to sign"
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg bg-bg-primary border border-gold-border/20 text-text-primary focus:border-accent-gold outline-none font-display italic text-2xl tracking-wide text-center text-accent-gold-light placeholder:not-italic placeholder:text-sm placeholder:text-text-muted transition-all"
                  />
                  <p className="text-[10px] text-text-muted italic">
                    Your typed name in the Playfair cursive representation acts as a legally binding signature.
                  </p>
                </div>
              )}
            </div>

            {/* AGREEMENT CHECKBOX */}
            <div className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                id="agree-check"
                checked={hasReadAgreement}
                onChange={(e) => setHasReadAgreement(e.target.checked)}
                className="mt-1 w-4.5 h-4.5 text-accent-gold border-gold-border/30 rounded focus:ring-accent-gold bg-bg-primary cursor-pointer"
              />
              <label htmlFor="agree-check" className="text-xs text-text-muted leading-relaxed cursor-pointer select-none">
                I have read, understood, and agree to be bound by all the terms and conditions outlined in the{' '}
                <span className="text-accent-gold font-semibold">Resumefy.io Client Services Agreement</span>.
              </label>
            </div>

            {/* SIGN BUTTON */}
            <div className="pt-2">
              <GoldButton type="submit" fullWidth>
                Sign Agreement & Continue to Payment →
              </GoldButton>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignatureSection;
