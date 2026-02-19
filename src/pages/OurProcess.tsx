import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
 ClipboardList,
 FileSearch,
 FileSignature,
 Wallet,
 Truck,
 Check,
 ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
 {
  number: '01',
  icon: ClipboardList,
  title: 'Reservation',
  description: 'Secure allocation with 7% digital asset deposit.',
  details: [
   'Select your preferred vehicle from our verified inventory',
   'Submit reservation request with basic contact information',
   'Transfer 7% deposit in your preferred digital asset',
   'Receive immediate confirmation and transaction receipt',
  ],
 },
 {
  number: '02',
  icon: FileSearch,
  title: 'Verification',
  description: 'Inspection documentation and supplier confirmation.',
  details: [
   'Comprehensive multi-point vehicle inspection',
   'Battery health and performance assessment',
   'Documentation review and authentication',
   'Supplier allocation confirmation',
  ],
 },
 {
  number: '03',
  icon: FileSignature,
  title: 'Contract Execution',
  description: 'Structured purchase agreement issued prior to final settlement.',
  details: [
   'Digital contract prepared and shared for review',
   'Terms and conditions clearly outlined',
   'Electronic signature collection',
   'Contract execution confirmation',
  ],
 },
 {
  number: '04',
  icon: Wallet,
  title: 'Digital Settlement',
  description: 'Remaining balance transferred securely.',
  details: [
   'Unique wallet address generated for transaction',
   'Secure blockchain confirmation',
   'Payment verification and receipt',
   'Title transfer initiation',
  ],
 },
 {
  number: '05',
  icon: Truck,
  title: 'Logistics Coordination',
  description: 'Export clearance, shipment, delivery scheduling.',
  details: [
   'Export documentation preparation',
   'Shipping coordination and tracking',
   'Customs clearance assistance',
   'Final delivery scheduling and handover',
  ],
 },
];

export default function OurProcess() {
 const headerRef = useRef<HTMLDivElement>(null);
 const stepsRef = useRef<HTMLDivElement>(null);

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
    '.process-step-card',
    { y: 50, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.15,
     duration: 0.7,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: stepsRef.current,
      start: 'top 80%',
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
      How We Work
     </span>
     <h1 className="velore-heading-lg text-[#111111] mb-6">
      Our Process
     </h1>
     <p className="velore-body text-base">
      A structured, transparent approach to electric vehicle acquisition. 
      From initial reservation to final delivery, we coordinate every step 
      with institutional precision.
     </p>
    </div>

    {/* Process Steps */}
    <div ref={stepsRef} className="space-y-8">
     {processSteps.map((step, index) => (
      <div
       key={index}
       className="process-step-card bg-white border border-[#EAEAEA] overflow-hidden"
      >
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left - Step Info */}
        <div className="lg:col-span-4 p-8 bg-[#F6F7F9] lg:border-r border-[#EAEAEA]">
         <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl font-bold text-[#2F8E92]/20">
           {step.number}
          </span>
          <div className="w-12 h-12 flex items-center justify-center bg-[#2F8E92]/10">
           <step.icon
            className="w-6 h-6 text-[#2F8E92]"
            strokeWidth={1.5}
           />
          </div>
         </div>
         <h3 className="text-xl font-semibold text-[#111111] mb-2">
          {step.title}
         </h3>
         <p className="text-sm text-[#6B7280]">{step.description}</p>
        </div>

        {/* Right - Details */}
        <div className="lg:col-span-8 p-8">
         <h4 className="text-sm font-medium text-[#6B7280] mb-4">
          What happens in this step:
         </h4>
         <ul className="space-y-3">
          {step.details.map((detail, detailIndex) => (
           <li
            key={detailIndex}
            className="flex items-start gap-3"
           >
            <Check
             className="w-4 h-4 text-[#2F8E92] mt-0.5 flex-shrink-0"
             strokeWidth={1.5}
            />
            <span className="text-sm text-[#111111]">{detail}</span>
           </li>
          ))}
         </ul>
        </div>
       </div>
      </div>
     ))}
    </div>

    {/* CTA Section */}
    <div className="mt-16 text-center">
     <div className="max-w-xl mx-auto p-8 bg-[#0B0D10] ">
      <h3 className="text-xl font-semibold text-white mb-3">
       Ready to Begin?
      </h3>
      <p className="text-sm text-white/70 mb-6">
       Start your reservation today and experience the Veloré difference.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
       <Link to="/inventory" className="velore-btn-primary">
        View Inventory
        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
       </Link>
       <Link
        to="/contact"
        className="px-6 py-3 text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
       >
        Contact Us
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
