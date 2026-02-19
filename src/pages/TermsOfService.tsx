import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TermsOfService() {
 const contentRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const ctx = gsap.context(() => {
   gsap.fromTo(
    contentRef.current,
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     duration: 0.8,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: contentRef.current,
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
    <div ref={contentRef} className="max-w-3xl mx-auto">
     <span className="velore-micro text-[#6B7280] mb-3 block">
      Legal
     </span>
     <h1 className="velore-heading-lg text-[#111111] mb-8">
      Terms of Service
     </h1>

     <div className="prose prose-lg max-w-none">
      <p className="text-sm text-[#6B7280] mb-8">
       Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        1. Introduction
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Welcome to Veloré Motors. These Terms of Service govern your use of our 
        website and services. By accessing or using our services, you agree to 
        be bound by these terms. Veloré Motors operates as an independent vehicle 
        brokerage coordinating supplier allocations on behalf of clients.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        2. Services
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        Veloré Motors provides the following services:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Sourcing and brokerage of electric vehicles</li>
        <li>Vehicle inspection coordination</li>
        <li>Documentation review and verification</li>
        <li>Cross-border logistics coordination</li>
        <li>Digital asset payment processing</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        3. Reservation and Deposit
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        To secure a vehicle, clients must provide a reservation deposit of 7% of 
        the listed vehicle price. This deposit:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Secures supplier allocation</li>
        <li>Initiates documentation verification</li>
        <li>Is applied toward the final purchase price</li>
        <li>Is held in escrow until inspection is completed</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        4. Payment Terms
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        We accept digital asset payments including USDT (ERC20 & TRC20), Bitcoin (BTC), 
        and Ethereum (ETH). All payments are subject to blockchain confirmation. 
        Clients are responsible for ensuring accurate wallet addresses and sufficient 
        funds for transactions.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        5. Vehicle Condition and Inspection
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        All vehicles undergo comprehensive multi-point inspection before delivery. 
        Inspection reports are provided to clients prior to final settlement. 
        Veloré Motors does not guarantee vehicle condition beyond the scope of 
        the provided inspection report.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        6. Delivery and Logistics
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Delivery timelines are estimates and may vary based on destination, 
        documentation requirements, and customs processing. Veloré Motors 
        coordinates logistics but is not responsible for delays caused by 
        third-party carriers or customs authorities.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        7. Limitation of Liability
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Veloré Motors' liability is limited to the amount of fees paid for our 
        brokerage services. We are not liable for indirect, incidental, or 
        consequential damages arising from vehicle defects, delivery delays, 
        or market value fluctuations.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        8. Governing Law
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        These terms are governed by international commercial law. Any disputes 
        shall be resolved through binding arbitration in a jurisdiction 
        mutually agreed upon by both parties.
       </p>
      </section>

      <section>
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        9. Contact
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        For questions about these terms, please contact us at{' '}
        <a href="mailto:liaison@veloremotors.com" className="text-[#2F8E92] hover:underline">
         liaison@veloremotors.com
        </a>
       </p>
      </section>
     </div>
    </div>
   </div>
  </div>
 );
}
