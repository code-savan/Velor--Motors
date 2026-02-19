import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
 Target,
 Globe,
 Shield,
 Users,
 ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const values = [
 {
  icon: Target,
  title: 'Precision',
  description: 'Every vehicle is sourced with meticulous attention to detail, ensuring only the highest quality inventory reaches our clients.',
 },
 {
  icon: Globe,
  title: 'Global Reach',
  description: 'Our verified supplier network spans multiple continents, enabling us to source and deliver vehicles worldwide.',
 },
 {
  icon: Shield,
  title: 'Transparency',
  description: 'Clear documentation, structured contracts, and open communication at every stage of the acquisition process.',
 },
 {
  icon: Users,
  title: 'Client Focus',
  description: 'Personalized service from our Client Liaison team, ensuring your specific requirements are met with precision.',
 },
];

export default function About() {
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
    '.about-content',
    { y: 40, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     duration: 0.7,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: contentRef.current,
      start: 'top 80%',
     },
    }
   );

   gsap.fromTo(
    '.value-card',
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.1,
     duration: 0.6,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: '.values-grid',
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
    <div ref={headerRef} className="max-w-3xl mb-16">
     <span className="velore-micro text-[#6B7280] mb-3 block">
      About Veloré
     </span>
     <h1 className="velore-heading-lg text-[#111111] mb-6">
      Private Electric Vehicle Brokerage
     </h1>
    </div>

    {/* Main Content */}
    <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
     {/* Left Column - Main Text */}
     <div className="lg:col-span-7 about-content">
      <div className="prose prose-lg max-w-none">
       <p className="text-lg text-[#111111] leading-relaxed mb-6">
        Veloré Motors is an independent electric vehicle brokerage providing 
        access to high-demand Tesla models through a verified supplier network. 
        We coordinate allocation, documentation review, and cross-border logistics 
        for private clients seeking structured digital transactions.
       </p>
       <p className="text-base text-[#6B7280] leading-relaxed mb-6">
        Our operations remain internationally neutral and supplier-backed. We 
        do not maintain physical inventory; instead, we leverage relationships 
        with verified suppliers across multiple jurisdictions to source vehicles 
        that meet our rigorous standards.
       </p>
       <p className="text-base text-[#6B7280] leading-relaxed">
        Every vehicle in our network undergoes comprehensive inspection and 
        documentation review before being presented to clients. This commitment 
        to quality ensures that our clients receive vehicles that meet or exceed 
        their expectations.
       </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#EAEAEA]">
       <div>
        <p className="text-3xl font-semibold text-[#2F8E92] mb-1">500+</p>
        <p className="text-xs text-[#6B7280]">Vehicles Sourced</p>
       </div>
       <div>
        <p className="text-3xl font-semibold text-[#2F8E92] mb-1">30+</p>
        <p className="text-xs text-[#6B7280]">Countries Served</p>
       </div>
       <div>
        <p className="text-3xl font-semibold text-[#2F8E92] mb-1">99%</p>
        <p className="text-xs text-[#6B7280]">Client Satisfaction</p>
       </div>
      </div>
     </div>

     {/* Right Column - Info Cards */}
     <div className="lg:col-span-5 about-content">
      <div className="space-y-6">
       <div className="p-6 bg-white border border-[#EAEAEA]">
        <h3 className="text-sm font-semibold text-[#111111] mb-3">
         Our Approach
        </h3>
        <p className="text-sm text-[#6B7280]">
         We combine institutional-grade processes with personalized service, 
         ensuring every client receives the attention and expertise they deserve.
        </p>
       </div>

       <div className="p-6 bg-white border border-[#EAEAEA]">
        <h3 className="text-sm font-semibold text-[#111111] mb-3">
         Global Network
        </h3>
        <p className="text-sm text-[#6B7280]">
         Our supplier network spans North America, Europe, Asia, and the Middle 
         East, enabling us to source vehicles from multiple markets.
        </p>
       </div>

       <div className="p-6 bg-white border border-[#EAEAEA]">
        <h3 className="text-sm font-semibold text-[#111111] mb-3">
         Digital-First
        </h3>
        <p className="text-sm text-[#6B7280]">
         We embrace digital asset transactions, offering clients modern payment 
         options with secure blockchain settlement.
        </p>
       </div>
      </div>
     </div>
    </div>

    {/* Values Section */}
    <div className="mb-20">
     <div className="text-center mb-12">
      <span className="velore-micro text-[#6B7280] mb-3 block">
       Our Principles
      </span>
      <h2 className="velore-heading-md text-[#111111]">
       Core Values
      </h2>
     </div>

     <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {values.map((value, index) => (
       <div
        key={index}
        className="value-card p-6 bg-white border border-[#EAEAEA] hover:border-[#2F8E92]/30 hover:shadow-lg transition-all duration-300"
       >
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 text-[#2F8E92] mb-4">
         <value.icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-semibold text-[#111111] mb-2">
         {value.title}
        </h3>
        <p className="text-sm text-[#6B7280]">{value.description}</p>
       </div>
      ))}
     </div>
    </div>

    {/* CTA Section */}
    <div className="text-center">
     <div className="max-w-xl mx-auto p-8 bg-[#0B0D10] ">
      <h3 className="text-xl font-semibold text-white mb-3">
       Connect With Us
      </h3>
      <p className="text-sm text-white/70 mb-6">
       Have questions about our process or inventory? Our Client Liaison 
       team is ready to assist.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
       <Link to="/contact" className="velore-btn-primary">
        Contact Client Liaison
        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
       </Link>
       <Link
        to="/inventory"
        className="px-6 py-3 text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
       >
        View Inventory
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
