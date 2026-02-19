import { useState } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { ChevronDown, RefreshCw } from 'lucide-react';

interface CurrencyDisplayProps {
 usdPrice: number;
 showConversions?: boolean;
 size?: 'sm' | 'md' | 'lg';
 className?: string;
}

export default function CurrencyDisplay({
 usdPrice,
 showConversions = true,
 size = 'md',
 className = '',
}: CurrencyDisplayProps) {
 const { convertPrice, getAllConversions, preferredCurrency, refreshRates, loading } = useCurrency();
 const [isExpanded, setIsExpanded] = useState(false);

 const sizeClasses = {
  sm: {
   main: 'text-lg',
   conversion: 'text-xs',
  },
  md: {
   main: 'text-2xl md:text-3xl',
   conversion: 'text-sm',
  },
  lg: {
   main: 'text-3xl md:text-4xl',
   conversion: 'text-base',
  },
 };

 const conversions = getAllConversions(usdPrice);
 const mainPrice = convertPrice(usdPrice, preferredCurrency as keyof typeof convertPrice);

 return (
  <div className={`${className}`}>
   {/* Main Price */}
   <div className="flex items-center gap-2">
    <span className={`font-semibold text-[#111111] ${sizeClasses[size].main}`}>
     {convertPrice(usdPrice, 'USD')}
    </span>
    {preferredCurrency !== 'USD' && (
     <span className="text-sm text-[#6B7280]">
      ≈ {mainPrice}
     </span>
    )}
   </div>

   {/* Conversions */}
   {showConversions && (
    <div className="mt-2">
     <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#111111] transition-colors"
     >
      <span>View all currencies</span>
      <ChevronDown
       className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
      />
     </button>

     {isExpanded && (
      <div className="mt-2 pt-2 border-t border-[#EAEAEA] space-y-1 animate-fade-in">
       {conversions.map(({ currency, value }) => (
        <div
         key={currency}
         className={`flex items-center justify-between text-[#6B7280] ${sizeClasses[size].conversion}`}
        >
         <span>≈ {value}</span>
        </div>
       ))}
       <button
        onClick={refreshRates}
        disabled={loading}
        className="flex items-center gap-1.5 mt-2 text-xs text-[#2F8E92] hover:text-[#267a7d] transition-colors"
       >
        <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
        <span>Refresh rates</span>
       </button>
      </div>
     )}
    </div>
   )}
  </div>
 );
}

// Compact version for cards
export function CurrencyDisplayCompact({
 usdPrice,
 className = '',
}: {
 usdPrice: number;
 className?: string;
}) {
 const { convertPrice, getAllConversions } = useCurrency();
 const conversions = getAllConversions(usdPrice);

 return (
  <div className={`${className}`}>
   <span className="text-lg font-semibold text-[#111111]">
    {convertPrice(usdPrice, 'USD')}
   </span>
   <div className="mt-1 space-y-0.5">
    {conversions.slice(0, 3).map(({ currency, value }) => (
     <p key={currency} className="text-xs text-[#6B7280]">
      ≈ {value}
     </p>
    ))}
   </div>
  </div>
 );
}
