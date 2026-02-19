import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, FileCheck, Globe, Wallet } from 'lucide-react';
import { getFeaturedVehicles } from '../data/vehicles';
import { CurrencyDisplayCompact } from '../components/CurrencyDisplay';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
 {
  icon: Shield,
  title: 'Multi-Point Vehicle Inspection',
  description: 'Comprehensive verification of every vehicle',
 },
 {
  icon: FileCheck,
  title: 'Structured Digital Contracts',
  description: 'Clear documentation at every step',
 },
 {
  icon: Globe,
  title: 'Global Logistics Coordination',
  description: 'End-to-end delivery management',
 },
 {
  icon: Wallet,
  title: 'Digital Asset Settlement Supported',
  description: 'Crypto payments accepted',
 },
];

const processSteps = [
 { label: 'Reservation', description: 'Secure allocation' },
 { label: 'Verification', description: 'Documentation review' },
 { label: 'Settlement', description: 'Digital transfer' },
 { label: 'Logistics', description: 'Export & shipping' },
 { label: 'Delivery', description: 'Final handover' },
];

export default function Home() {
 const heroRef = useRef<HTMLDivElement>(null);
 const heroCardRef = useRef<HTMLDivElement>(null);
 const heroContentRef = useRef<HTMLDivElement>(null);
 const featuredRef = useRef<HTMLDivElement>(null);
 const processRef = useRef<HTMLDivElement>(null);
 const trustRef = useRef<HTMLDivElement>(null);

 const featuredVehicles = getFeaturedVehicles();

 useEffect(() => {
  const ctx = gsap.context(() => {
   // Hero entrance animation (auto-play on load)
   const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

   heroTl
    .fromTo(
     heroCardRef.current,
     { x: '-60vw', opacity: 0 },
     { x: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
     '.hero-headline-word',
     { y: 40, opacity: 0 },
     { y: 0, opacity: 1, stagger: 0.06, duration: 0.8 },
     '-=0.6'
    )
    .fromTo(
     '.hero-micro',
     { y: 10, opacity: 0 },
     { y: 0, opacity: 1, duration: 0.6 },
     '-=0.4'
    )
    .fromTo(
     '.hero-hairline',
     { scaleX: 0 },
     { scaleX: 1, duration: 0.5 },
     '-=0.5'
    )
    .fromTo(
     '.hero-body',
     { y: 20, opacity: 0 },
     { y: 0, opacity: 1, duration: 0.6 },
     '-=0.3'
    )
    .fromTo(
     '.hero-cta',
     { y: 18, opacity: 0 },
     { y: 0, opacity: 1, duration: 0.5 },
     '-=0.2'
    );


   // Featured vehicles animation
   gsap.fromTo(
    '.featured-vehicle-card',
    { y: 60, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.1,
     duration: 0.8,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: featuredRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
     },
    }
   );

   // Trust bar animation
   gsap.fromTo(
    '.trust-item',
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.1,
     duration: 0.6,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: trustRef.current,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
     },
    }
   );

   // Process steps animation
   gsap.fromTo(
    '.process-step',
    { y: 20, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.08,
     duration: 0.5,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: processRef.current,
      start: 'top 85%',
      toggleActions: 'play none none reverse',
     },
    }
   );
  });

  return () => ctx.revert();
 }, []);

 return (
  <div className="relative">
   {/* Hero Section */}
   <section
    ref={heroRef}
    className="relative w-full h-screen overflow-hidden bg-[#F6F7F9]"
    style={{ zIndex: 10 }}
   >
    {/* Background Video */}
    <div className="absolute inset-0">
     <video
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
      poster="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Homepage-Promo-Carousel-FSD-Supervised-Tablet.jpg"
     >
      <source
       src="https://digitalassets.tesla.com/tesla-contents/video/upload/f_auto,q_auto:best/Homepage-Promo-Carousel-FSD-Supervised-Tablet.mp4"
       type="video/mp4"
      />
     </video>
     <div className="absolute inset-0 bg-black/40" />
    </div>

    {/* Hero Card */}
    <div
     ref={heroCardRef}
     className="absolute right-[6vw] bottom-[10vh] w-[70vw] md:w-[30vw] h-auto md:h-[44vh] bg-white/90 backdrop-blur-md shadow-xl p-6 md:p-8 flex flex-col justify-center"
    >
     <div ref={heroContentRef}>
      {/* Micro Label */}
      <div className="flex items-center gap-1.5 mb-3">
       <div className="hero-hairline w-8 h-px bg-[#111111]/20 origin-left" />
       <span className="hero-micro velore-micro text-[#6B7280]">
        Private EV Brokerage
       </span>
      </div>

      {/* Headline */}
      <h1 className="velore-heading-md text-[#111111] mb-3">
       <span className="hero-headline-word inline-block">Electric</span>{' '}
       <span className="hero-headline-word inline-block">vehicles.</span>
       <br />
       <span className="hero-headline-word inline-block">Sourced</span>{' '}
       <span className="hero-headline-word inline-block">with</span>{' '}
       <span className="hero-headline-word inline-block">precision.</span>
      </h1>

      {/* Body */}
      <p className="hero-body velore-body-xs max-w-full mb-5">
       A private brokerage specializing in premium Tesla acquisitions for
       global clients. Digital asset transactions supported.
      </p>

      {/* CTAs */}
      <div className="hero-cta flex flex-wrap items-center gap-2">
       <Link to="/inventory" className="velore-btn-primary text-xs px-4 py-2">
        View Inventory
        <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
       </Link>
       <Link to="/contact" className="velore-link text-sm">
        Begin Private Sourcing
       </Link>
      </div>
     </div>
    </div>
   </section>

   {/* Trust Bar Section */}
   <section
    ref={trustRef}
    className="relative py-16 md:py-24 bg-[#F6F7F9]"
    style={{ zIndex: 20 }}
   >
    <div className="velore-container">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
      {trustItems.map((item, index) => (
       <div
        key={index}
        className="trust-item flex flex-col items-start p-6 bg-white border border-[#EAEAEA] hover:border-[#2F8E92]/30 hover:shadow-lg transition-all duration-300"
       >
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 text-[#2F8E92] mb-4">
         <item.icon className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-semibold text-[#111111] mb-2">
         {item.title}
        </h3>
        <p className="text-xs text-[#6B7280]">{item.description}</p>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* Featured Vehicles Section */}
   <section
    ref={featuredRef}
    className="relative py-16 md:py-24 bg-[#F6F7F9]"
    style={{ zIndex: 20 }}
   >
    <div className="velore-container">
     {/* Section Header */}
     <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
      <div>
       <span className="velore-micro text-[#6B7280] mb-3 block">
        Featured Inventory
       </span>
       <h2 className="velore-heading-lg text-[#111111]">
        Available Now
       </h2>
      </div>
      <Link
       to="/inventory"
       className="velore-link mt-4 md:mt-0"
      >
       View All Vehicles
       <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.5} />
      </Link>
     </div>

     {/* Vehicles Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredVehicles.map((vehicle) => (
       <Link
        key={vehicle.id}
        to={`/inventory/${vehicle.id}`}
        className="featured-vehicle-card group velore-card overflow-hidden"
       >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
         <img
          src={vehicle.image}
          alt={vehicle.model}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
         <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium ${
           vehicle.status === 'available'
            ? 'bg-[#2F8E92] text-white'
            : vehicle.status === 'limited'
            ? 'bg-amber-500 text-white'
            : 'bg-[#6B7280] text-white'
          }`}>
           {vehicle.status === 'available'
            ? 'Available Now'
            : vehicle.status === 'limited'
            ? 'Limited Allocation'
            : 'Reserved'}
          </span>
         </div>
        </div>

        {/* Content */}
        <div className="p-5">
         <h3 className="text-base font-semibold text-[#111111] mb-1">
          {vehicle.model}
         </h3>
         <p className="text-xs text-[#6B7280] mb-3">
          {vehicle.variant}
         </p>
         <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-4">
          <span>{vehicle.yearRange}</span>
          <span className="w-1 h-1 bg-[#6B7280]" />
          <span>{vehicle.mileageRange}</span>
         </div>
         <CurrencyDisplayCompact usdPrice={vehicle.startingPrice} />
        </div>
       </Link>
      ))}
     </div>
    </div>
   </section>

   {/* Process Preview Section */}
   <section
    ref={processRef}
    className="relative py-16 md:py-24 bg-white"
    style={{ zIndex: 20 }}
   >
    <div className="velore-container">
     {/* Section Header */}
     <div className="text-center mb-12">
      <span className="velore-micro text-[#6B7280] mb-3 block">
       Our Process
      </span>
      <h2 className="velore-heading-lg text-[#111111]">
       From Reservation to Delivery
      </h2>
     </div>

     {/* Process Steps */}
     <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
      {processSteps.map((step, index) => (
       <div key={index} className="flex items-center">
        <div className="process-step flex flex-col items-center text-center px-6">
         <div className="w-12 h-12 flex items-center justify-center bg-[#F6F7F9] text-[#2F8E92] mb-3">
          <span className="text-sm font-semibold">{index + 1}</span>
         </div>
         <h4 className="text-sm font-semibold text-[#111111] mb-1">
          {step.label}
         </h4>
         <p className="text-xs text-[#6B7280]">{step.description}</p>
        </div>
        {index < processSteps.length - 1 && (
         <div className="hidden md:block w-12 h-px bg-[#EAEAEA] mx-2" />
        )}
        {index < processSteps.length - 1 && (
         <ArrowRight className="md:hidden w-4 h-4 text-[#EAEAEA] my-2 rotate-90" />
        )}
       </div>
      ))}
     </div>

     {/* CTA */}
     <div className="text-center mt-12">
      <Link to="/process" className="velore-btn-secondary">
       Learn More About Our Process
      </Link>
     </div>
    </div>
   </section>

   {/* CTA Section */}
   <section className="relative py-20 md:py-32 bg-[#0B0D10]" style={{ zIndex: 20 }}>
    <div className="velore-container">
     <div className="max-w-2xl mx-auto text-center">
      <h2 className="velore-heading-lg text-white mb-6">
       Ready to Acquire Your Tesla?
      </h2>
      <p className="velore-body text-white/70 mb-8 max-w-lg mx-auto">
       Begin your reservation today. Our Client Liaison team will guide
       you through every step of the acquisition process.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
       <Link to="/inventory" className="velore-btn-primary">
        Browse Inventory
       </Link>
       <Link
        to="/contact"
        className="px-6 py-3 text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
       >
        Contact Client Liaison
       </Link>
      </div>
     </div>
    </div>
   </section>
  </div>
 );
}
