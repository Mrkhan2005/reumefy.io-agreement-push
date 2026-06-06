import React, { useRef, useEffect } from 'react';

interface AgreementViewerProps {
  onScrollToBottom: (reached: boolean) => void;
  hasScrolledToBottom: boolean;
}

export const AgreementViewer: React.FC<AgreementViewerProps> = ({
  onScrollToBottom,
  hasScrolledToBottom,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const target = containerRef.current;
    // Standard scroll calculation with 15px threshold to account for decimal scaling/zooming
    const reachedBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 15;
    
    if (reachedBottom) {
      onScrollToBottom(true);
    }
  };

  // If the content is short and doesn't need scrolling (e.g. huge screen or small zoom), auto-enable it
  useEffect(() => {
    if (containerRef.current) {
      const target = containerRef.current;
      const isScrollable = target.scrollHeight > target.clientHeight;
      if (!isScrollable) {
        onScrollToBottom(true);
      }
    }
  }, [onScrollToBottom]);

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col gap-1 border-b border-gold-border/20 pb-4 mb-4">
        <h3 className="font-display text-2xl font-bold text-text-primary tracking-tight">
          Siddiqui Bro LLC Client Services Agreement
        </h3>
        <p className="text-xs font-semibold tracking-wider text-accent-gold uppercase">
          ✦ Governed by the laws of the State of Texas
        </p>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-[400px] overflow-y-auto p-6 rounded-lg bg-bg-primary border border-gold-border/20 text-xs text-text-muted leading-relaxed space-y-6 legal-scrollbar select-text"
      >
        <div className="text-center font-bold text-text-primary text-sm mb-4 tracking-widest uppercase font-display">
          SIDDIQUI BRO LLC CLIENT SERVICES AGREEMENT
        </div>

        <p className="italic">
          This Client Services Agreement ("Agreement") is entered into as of the date of electronic 
          acceptance between Siddiqui Bro LLC ("Company") and the undersigned client ("Client").
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">1. SERVICES</h4>
            <p>
              The Company agrees to provide the career services selected by the Client on the preceding 
              page, as itemized in the Services Summary incorporated herein by reference. Services are 
              subject to the terms and scope described at the time of selection.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">2. SERVICE INITIATION</h4>
            <p>
              Client agrees to all terms associated with the selected services. Services will begin 
              upon agreement execution. Siddiqui Bro LLC reserves the right to withhold deliverables 
              until all necessary client intake information is provided.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">3. ASSISTED JOB APPLICATIONS</h4>
            <p>
              Where the Client has selected Assisted Job Application services, any initiation fee is 
              hereby waived. The Company will apply to jobs on behalf of the Client according to the 
              selected volume. The Client is responsible for providing accurate job preferences, login 
              credentials where required, and timely responses to employer inquiries.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">4. CONSULTATION SERVICES</h4>
            <p>
              The first thirty (30) minutes of any career consultation session are provided complimentary. 
              Additional time is billed hourly, in thirty (30) minute increments, and will be invoiced 
              following the session.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">5. DELIVERABLE TIMELINES</h4>
            <p>
              The Company will make commercially reasonable efforts to deliver services within the 
              timelines communicated at the time of purchase. Delays caused by the Client's failure to 
              provide required materials shall not be the responsibility of the Company.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">6. REVISIONS & SATISFACTION</h4>
            <p>
              The Company offers reasonable revisions within the scope of the purchased service. 
              Revision requests must be submitted in writing within seven (7) days of delivery.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">7. REFUND POLICY</h4>
            <p>
              Due to the digital and custom nature of career services, all sales are final. Refunds may 
              be granted at the sole discretion of Siddiqui Bro LLC in cases of documented non-delivery.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">8. CONFIDENTIALITY</h4>
            <p>
              Both parties agree to maintain confidentiality of all personal, professional, and proprietary 
              information shared during the course of service delivery.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">9. INTELLECTUAL PROPERTY</h4>
            <p>
              Upon service activation, the Client owns all deliverables created specifically for them. The 
              Company retains the right to use anonymized work samples for portfolio and marketing 
              purposes unless the Client opts out in writing.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">10. LIMITATION OF LIABILITY</h4>
            <p>
              The Company does not guarantee employment outcomes. Career services improve the 
              quality of Client materials and processes; however, hiring decisions remain at the discretion 
              of employers. The Company's total liability shall not exceed the value of the services 
              rendered under this Agreement.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">11. GOVERNING LAW & DISPUTE RESOLUTION</h4>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws of the 
              State of Texas. Any disputes arising hereunder shall be resolved through binding 
              arbitration in the State of Texas before a mutually agreed arbitrator, in accordance with 
              the rules of the American Arbitration Association. The prevailing party shall be entitled 
              to recover reasonable attorney's fees.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">12. ENTIRE AGREEMENT</h4>
            <p>
              This Agreement constitutes the entire agreement between the parties with respect to 
              its subject matter and supersedes all prior discussions, representations, or agreements. 
              Any modifications must be made in writing and signed by both parties.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-1 uppercase tracking-wide">13. ELECTRONIC SIGNATURE</h4>
            <p>
              The Client acknowledges that an electronic signature on this Agreement constitutes a 
              legally binding signature under the Electronic Signatures in Global and National Commerce 
              Act (E-SIGN) and the Texas Uniform Electronic Transactions Act (TUETA).
            </p>
          </div>
        </div>

        <p className="pt-6 font-semibold text-text-primary border-t border-gold-border/10">
          By signing below, Client confirms they have read, understood, and agree to all terms 
          of this Agreement.
        </p>
      </div>

      {!hasScrolledToBottom && (
        <div className="text-center py-2 bg-accent-gold/5 border border-dashed border-accent-gold/20 rounded text-xs text-accent-gold font-medium animate-pulse">
          ↓ Please scroll to the bottom of the agreement to unlock the signature section.
        </div>
      )}
    </div>
  );
};

export default AgreementViewer;
