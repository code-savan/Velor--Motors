import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PrivacyPolicy() {
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
      Privacy Policy
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
        Veloré Motors is committed to protecting your privacy. This Privacy Policy 
        explains how we collect, use, store, and protect your personal information 
        when you use our website and services. By using our services, you consent 
        to the practices described in this policy.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        2. Information We Collect
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        We collect the following types of information:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>
         <strong>Personal Information:</strong> Name, email address, phone number, 
         and residential address
        </li>
        <li>
         <strong>Identification Documents:</strong> Passport or driver's license 
         for transactions exceeding $25,000
        </li>
        <li>
         <strong>Transaction Information:</strong> Payment details, wallet addresses, 
         and transaction history
        </li>
        <li>
         <strong>Technical Information:</strong> IP address, browser type, and 
         device information
        </li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        3. How We Use Your Information
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        We use your information for the following purposes:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Processing vehicle reservations and transactions</li>
        <li>Verifying identity for compliance with KYC/AML regulations</li>
        <li>Coordinating vehicle inspections and deliveries</li>
        <li>Communicating about your reservation status</li>
        <li>Improving our services and user experience</li>
        <li>Complying with legal obligations</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        4. Information Sharing
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        We do not sell or rent your personal information to third parties. We may 
        share your information with:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Verified suppliers for vehicle sourcing and delivery</li>
        <li>Logistics partners for shipping coordination</li>
        <li>Compliance authorities when legally required</li>
        <li>Service providers who assist in our operations</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        5. Data Security
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        We implement industry-standard security measures to protect your information, 
        including encryption, access controls, and regular security audits. However, 
        no method of transmission over the internet is 100% secure, and we cannot 
        guarantee absolute security.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        6. Data Retention
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        We retain your personal information for as long as necessary to fulfill 
        the purposes outlined in this policy, unless a longer retention period 
        is required by law. Transaction records are retained for a minimum of 
        seven years for compliance purposes.
       </p>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        7. Your Rights
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed mb-4">
        You have the following rights regarding your personal information:
       </p>
       <ul className="list-disc pl-6 space-y-2 text-base text-[#6B7280]">
        <li>Access: Request a copy of your personal information</li>
        <li>Correction: Request correction of inaccurate information</li>
        <li>Deletion: Request deletion of your personal information</li>
        <li>Restriction: Request restriction of processing</li>
        <li>Portability: Request transfer of your information</li>
       </ul>
      </section>

      <section className="mb-8">
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        8. Cookies and Tracking
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        We use cookies and similar technologies to enhance your browsing experience, 
        analyze site traffic, and understand user behavior. You can control cookie 
        preferences through your browser settings.
       </p>
      </section>

      <section>
       <h2 className="text-xl font-semibold text-[#111111] mb-4">
        9. Contact Us
       </h2>
       <p className="text-base text-[#6B7280] leading-relaxed">
        If you have questions about this Privacy Policy or wish to exercise your 
        rights, please contact us at{' '}
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
