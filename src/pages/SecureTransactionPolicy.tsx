import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SecureTransactionPolicy() {
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
      Secure Transaction Policy
     </h1>

     <div className="prose prose-lg max-w-none">
      <p className="text-sm text-[#6B7280] mb-8">
       Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        1. Overview
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Veloré Motors is committed to ensuring the highest standards of security 
        for all transactions conducted through our platform. This Secure Transaction 
        Policy outlines the measures we implement to protect your digital asset 
        payments and personal information.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        2. Accepted Digital Assets
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        We accept the following digital assets for payment:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>
         <strong>USDT (ERC20):</strong> Tether on the Ethereum blockchain
        </li>
        <li>
         <strong>USDT (TRC20):</strong> Tether on the Tron blockchain
        </li>
        <li>
         <strong>Bitcoin (BTC):</strong> Native Bitcoin network
        </li>
        <li>
         <strong>Ethereum (ETH):</strong> Native Ethereum network
        </li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        3. Transaction Security Measures
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        We implement the following security measures for all transactions:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>
         <strong>Unique Wallet Addresses:</strong> Each transaction receives 
         a unique wallet address generated specifically for that payment
        </li>
        <li>
         <strong>Blockchain Confirmation:</strong> All payments require 
         blockchain confirmation before being recognized
        </li>
        <li>
         <strong>Escrow Holding:</strong> Reservation deposits are held in 
         escrow until vehicle inspection is completed
        </li>
        <li>
         <strong>Multi-Signature Wallets:</strong> High-value transactions 
         utilize multi-signature wallet technology
        </li>
        <li>
         <strong>Transaction Monitoring:</strong> All transactions are 
         monitored for suspicious activity
        </li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        4. KYC/AML Compliance
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        In compliance with international regulations, we require identity 
        verification for transactions exceeding $25,000. This includes:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Government-issued photo identification</li>
        <li>Proof of address</li>
        <li>Source of funds verification when required</li>
        <li>Ongoing transaction monitoring</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        5. Transaction Process
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        Our secure transaction process follows these steps:
       </p>
       <ol className="list-decimal pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Client selects preferred digital asset payment method</li>
        <li>Unique wallet address is generated for the transaction</li>
        <li>Client transfers funds to the provided address</li>
        <li>Blockchain confirmation is verified</li>
        <li>Transaction receipt is issued to the client</li>
        <li>Funds are held in escrow until inspection completion</li>
       </ol>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        6. Refund Policy
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Refunds are processed under the following circumstances:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Vehicle fails inspection and cannot be sourced alternatively</li>
        <li>Supplier is unable to fulfill the allocation</li>
        <li>Transaction is cancelled by mutual agreement</li>
       </ul>
       <p className="text-base text-[#6B7280] leading-relaxed mt-4">
        Refunds are issued in the same digital asset used for the original 
        payment, at the USD equivalent value at the time of refund processing.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        7. Fraud Prevention
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        We employ advanced fraud detection systems and reserve the right to:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Decline transactions from suspicious sources</li>
        <li>Request additional verification documentation</li>
        <li>Report suspicious activity to relevant authorities</li>
        <li>Suspend accounts pending investigation</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        8. Client Responsibilities
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Clients are responsible for:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Verifying wallet addresses before sending payments</li>
        <li>Ensuring sufficient funds for transactions</li>
        <li>Covering any network fees associated with transfers</li>
        <li>Maintaining security of their own wallet credentials</li>
        <li>Reporting any suspicious activity immediately</li>
       </ul>
      </section>

      <section>
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        9. Contact
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        For questions about our Secure Transaction Policy or to report security 
        concerns, please contact us at{' '}
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
