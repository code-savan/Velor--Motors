import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
 Bitcoin,
 CircleDollarSign,
 Wallet,
 Shield,
 FileCheck,
 Clock,
 AlertCircle,
 Check,
 ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const acceptedAssets = [
 {
  name: 'USDT (ERC20)',
  description: 'Tether on Ethereum network',
  icon: CircleDollarSign,
  color: '#26A17B',
 },
 {
  name: 'USDT (TRC20)',
  description: 'Tether on Tron network',
  icon: CircleDollarSign,
  color: '#26A17B',
 },
 {
  name: 'Bitcoin (BTC)',
  description: 'Native Bitcoin network',
  icon: Bitcoin,
  color: '#F7931A',
 },
 {
  name: 'Ethereum (ETH)',
  description: 'Native Ethereum network',
  icon: Wallet,
  color: '#627EEA',
 },
];

const settlementSteps = [
 {
  title: '7% Reservation',
  description: 'Initial deposit to secure vehicle allocation',
 },
 {
  title: 'Documentation Review',
  description: 'Complete inspection and verification process',
 },
 {
  title: 'Final Settlement',
  description: 'Remaining balance transferred securely',
 },
 {
  title: 'Delivery Coordination',
  description: 'Logistics and final handover arrangements',
 },
];

const complianceItems = [
 'Identification required for transactions exceeding $25,000',
 'KYC/AML verification for all digital asset settlements',
 'Unique wallet address generated per transaction',
 'Blockchain confirmation required for payment validation',
 'Secure email delivery of all transaction documentation',
];

export default function DigitalAssetTransactions() {
 const headerRef = useRef<HTMLDivElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const ctx = gsap.context(() => {
   gsap.fromTo(
    headerRef.current,
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     duration: 0.8,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: headerRef.current,
      start: 'top 85%',
     },
    }
   );

   gsap.fromTo(
    '.asset-card',
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.1,
     duration: 0.6,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: contentRef.current,
      start: 'top 80%',
     },
    }
   );

   gsap.fromTo(
    '.settlement-step',
    { x: -20, opacity: 0 },
    {
     x: 0,
     opacity: 1,
     stagger: 0.08,
     duration: 0.5,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: '.settlement-steps',
      start: 'top 85%',
     },
    }
   );
  });

  return () => ctx.revert();
 }, []);

 return (
  <div className="min-h-screen bg-[#F6F7F9] pt-24 md:pt-32 pb-20">
   <div className="velore-container">
    {/* Header */}
    <div ref={headerRef} className="max-w-2xl mb-16">
     <span className="velore-micro text-[#6B7280] mb-3 block">
      Payment Options
     </span>
     <h1 className="velore-heading-lg text-[#111111] mb-6">
      Structured Digital Settlement
     </h1>
     <p className="velore-body text-base">
      Veloré Motors supports digital asset settlement for qualified transactions. 
      Our secure process ensures transparent, efficient payments with full 
      documentation and compliance.
     </p>
    </div>

    {/* Content */}
    <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
     {/* Left Column */}
     <div>
      {/* Accepted Assets */}
      <div className="mb-12">
       <h2 className="velore-heading-md text-[#111111] mb-6">
        Accepted Digital Assets
       </h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {acceptedAssets.map((asset, index) => (
         <div
          key={index}
          className="asset-card p-5 bg-white border border-[#EAEAEA] hover:border-[#2F8E92]/30 hover:shadow-lg transition-all duration-300"
         >
          <div
           className="w-10 h-10 flex items-center justify-center mb-4"
           style={{ backgroundColor: `${asset.color}15` }}
          >
           <asset.icon
            className="w-5 h-5"
            style={{ color: asset.color }}
            strokeWidth={1.5}
           />
          </div>
          <h3 className="text-sm font-semibold text-[#111111] mb-1">
           {asset.name}
          </h3>
          <p className="text-xs text-[#6B7280]">{asset.description}</p>
         </div>
        ))}
       </div>
      </div>

      {/* Settlement Structure */}
      <div>
       <h2 className="velore-heading-md text-[#111111] mb-6">
        Settlement Structure
       </h2>
       <div className="settlement-steps space-y-4">
        {settlementSteps.map((step, index) => (
         <div
          key={index}
          className="settlement-step flex items-start gap-4 p-4 bg-white border border-[#EAEAEA]"
         >
          <div className="w-8 h-8 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
           <span className="text-sm font-semibold text-[#2F8E92]">
            {index + 1}
           </span>
          </div>
          <div>
           <h4 className="text-sm font-semibold text-[#111111] mb-1">
            {step.title}
           </h4>
           <p className="text-xs text-[#6B7280]">{step.description}</p>
          </div>
         </div>
        ))}
       </div>
      </div>
     </div>

     {/* Right Column */}
     <div>
      {/* Security Features */}
      <div className="mb-12">
       <h2 className="velore-heading-md text-[#111111] mb-6">
        Security & Compliance
       </h2>
       <div className="velore-card p-6">
        <div className="flex items-start gap-4 mb-6">
         <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
          <Shield className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
         </div>
         <div>
          <h4 className="text-sm font-semibold text-[#111111] mb-1">
           Secure Transaction Protocol
          </h4>
          <p className="text-sm text-[#6B7280]">
           Every transaction utilizes unique wallet addresses and 
           requires blockchain confirmation for validation.
          </p>
         </div>
        </div>

        <div className="flex items-start gap-4 mb-6">
         <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
          <FileCheck className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
         </div>
         <div>
          <h4 className="text-sm font-semibold text-[#111111] mb-1">
           Full Documentation
          </h4>
          <p className="text-sm text-[#6B7280]">
           All transactions receive complete documentation including 
           receipts, contracts, and blockchain confirmations.
          </p>
         </div>
        </div>

        <div className="flex items-start gap-4">
         <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
          <Clock className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
         </div>
         <div>
          <h4 className="text-sm font-semibold text-[#111111] mb-1">
           Fast Confirmation
          </h4>
          <p className="text-sm text-[#6B7280]">
           Transactions are typically confirmed within minutes, 
           enabling rapid progression to the next step.
          </p>
         </div>
        </div>
       </div>
      </div>

      {/* Compliance */}
      <div className="mb-12">
       <h2 className="velore-heading-md text-[#111111] mb-6">
        Compliance Requirements
       </h2>
       <div className="p-6 bg-white border border-[#EAEAEA]">
        <div className="flex items-start gap-3 mb-4">
         <AlertCircle
          className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
          strokeWidth={1.5}
         />
         <p className="text-sm text-[#111111]">
          Identification required for transactions exceeding $25,000
         </p>
        </div>
        <ul className="space-y-3">
         {complianceItems.slice(1).map((item, index) => (
          <li key={index} className="flex items-start gap-3">
           <Check
            className="w-4 h-4 text-[#2F8E92] mt-0.5 flex-shrink-0"
            strokeWidth={1.5}
           />
           <span className="text-sm text-[#6B7280]">{item}</span>
          </li>
         ))}
        </ul>
       </div>
      </div>

      {/* CTA */}
      <div className="p-6 bg-[#0B0D10] ">
       <h3 className="text-lg font-semibold text-white mb-2">
        Ready to Proceed?
       </h3>
       <p className="text-sm text-white/70 mb-4">
        Browse our inventory and begin your reservation with digital asset settlement.
       </p>
       <Link to="/inventory" className="velore-btn-primary w-full justify-center">
        Browse Inventory
        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
