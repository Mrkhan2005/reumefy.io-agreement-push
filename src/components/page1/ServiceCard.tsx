import React from 'react';
import { Check } from 'lucide-react';
import Badge from '../shared/Badge';

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  priceText?: string;
  originalPriceText?: string;
  badgeText?: string;
  bullets: string[];
  isSelected: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  priceText,
  originalPriceText,
  badgeText,
  bullets,
  isSelected,
  onToggle,
  children,
}) => {
  return (
    <div
      onClick={onToggle}
      className={`glass-panel rounded-xl p-6 cursor-pointer select-none gold-glow-card flex flex-col justify-between h-full ${
        isSelected ? 'gold-glow-card-selected' : ''
      }`}
    >
      <div>
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 items-center mb-1">
              <h3 className="text-xl font-bold text-text-primary tracking-tight font-sans">
                {title}
              </h3>
              {badgeText && (
                <Badge variant="gold" className="text-[10px]">
                  {badgeText}
                </Badge>
              )}
            </div>
            
            {subtitle && (
              <p className="text-sm text-text-muted mb-2 font-sans font-medium">
                {subtitle}
              </p>
            )}
          </div>
          
          <div
            className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-200 ${
              isSelected
                ? 'bg-accent-gold border-accent-gold text-bg-primary'
                : 'border-gold-border/40 hover:border-accent-gold/60'
            }`}
          >
            {isSelected && <Check size={14} className="stroke-[3]" />}
          </div>
        </div>

        {priceText && (
          <div className="mt-2 mb-4 flex items-baseline gap-2">
            {originalPriceText && (
              <span className="text-sm text-text-muted line-through">
                {originalPriceText}
              </span>
            )}
            <span className="text-2xl font-extrabold text-accent-gold font-sans">
              {priceText}
            </span>
          </div>
        )}

        <ul className="space-y-2 mt-4">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start text-xs text-text-muted leading-relaxed font-sans">
              <span className="text-accent-gold mr-2 font-bold select-none">✓</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {children && (
        <div
          onClick={(e) => e.stopPropagation()} // Prevent card toggle when clicking sub-controls
          className="mt-6 pt-4 border-t border-gold-border/10 cursor-default"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
