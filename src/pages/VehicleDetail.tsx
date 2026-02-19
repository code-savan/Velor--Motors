import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
 ArrowLeft,
 Battery,
 Gauge,
 Wind,
 Users,
 Settings,
 Shield,
 Check,
 Clock,
 AlertCircle,
} from 'lucide-react';
import { getVehicleById } from '../data/vehicles';
import CurrencyDisplay from '../components/CurrencyDisplay';

gsap.registerPlugin(ScrollTrigger);

export default function VehicleDetail() {
 const { vehicleId } = useParams<{ vehicleId: string }>();
 const vehicle = getVehicleById(vehicleId || '');

 const heroRef = useRef<HTMLDivElement>(null);
 const contentRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  if (!vehicle) return;

  const ctx = gsap.context(() => {
   gsap.fromTo(
    '.vehicle-hero-image',
    { scale: 1.1, opacity: 0 },
    {
     scale: 1,
     opacity: 1,
     duration: 1.2,
     ease: 'power2.out',
    }
   );

   gsap.fromTo(
    '.vehicle-info-block',
    { y: 40, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     duration: 0.8,
     ease: 'power2.out',
     delay: 0.3,
    }
   );

   gsap.fromTo(
    '.spec-card',
    { y: 30, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     stagger: 0.08,
     duration: 0.6,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: contentRef.current,
      start: 'top 80%',
     },
    }
   );

   gsap.fromTo(
    '.feature-item',
    { x: -20, opacity: 0 },
    {
     x: 0,
     opacity: 1,
     stagger: 0.05,
     duration: 0.4,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: '.features-list',
      start: 'top 85%',
     },
    }
   );
  });

  return () => ctx.revert();
 }, [vehicle]);

 if (!vehicle) {
  return <Navigate to="/inventory" replace />;
 }

 const depositAmount = vehicle.startingPrice * 0.07;

 const specItems = [
  { icon: Battery, label: 'Range', value: vehicle.specifications.range },
  { icon: Gauge, label: 'Acceleration', value: vehicle.specifications.acceleration },
  { icon: Wind, label: 'Top Speed', value: vehicle.specifications.topSpeed },
  { icon: Settings, label: 'Drivetrain', value: vehicle.specifications.drivetrain },
  { icon: Users, label: 'Seating', value: vehicle.specifications.seating },
 ];

 return (
  <div className="min-h-screen bg-[#F6F7F9]">
   {/* Hero Section */}
   <section ref={heroRef} className="relative h-[70vh] md:h-[80vh] overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
     <img
      src={vehicle.image}
      alt={vehicle.model}
      className="vehicle-hero-image w-full h-full object-cover"
     />
     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>

    {/* Navigation */}
    <div className="absolute top-0 left-0 right-0 z-10 pt-24 md:pt-28">
     <div className="velore-container">
      <Link
       to="/inventory"
       className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
       <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
       <span className="text-sm">Back to Inventory</span>
      </Link>
     </div>
    </div>

    {/* Hero Content */}
    <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 md:pb-16">
     <div className="velore-container">
      <div className="vehicle-info-block">
       <span
        className={`inline-block px-3 py-1 text-xs font-medium mb-4 ${
         vehicle.status === 'available'
          ? 'bg-[#2F8E92] text-white'
          : vehicle.status === 'limited'
          ? 'bg-amber-500 text-white'
          : 'bg-[#6B7280] text-white'
        }`}
       >
        {vehicle.status === 'available'
         ? 'Available for Immediate Reservation'
         : vehicle.status === 'limited'
         ? 'Limited Allocation'
         : 'Reserved'}
       </span>
       <h1 className="velore-heading-xl text-white mb-2">{vehicle.model}</h1>
       <p className="text-lg text-white/80">{vehicle.variant}</p>
      </div>
     </div>
    </div>
   </section>

   {/* Content Section */}
   <section ref={contentRef} className="py-12 md:py-20">
    <div className="velore-container">
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Left Column - Details */}
      <div className="lg:col-span-2">
       {/* Overview */}
       <div className="mb-12">
        <h2 className="velore-heading-md text-[#111111] mb-4">Overview</h2>
        <p className="velore-body text-base">{vehicle.description}</p>
       </div>

       {/* Specifications */}
       <div className="mb-12">
        <h2 className="velore-heading-md text-[#111111] mb-6">Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
         {specItems.map((spec, index) => (
          <div
           key={index}
           className="spec-card p-4 bg-white border border-[#EAEAEA]"
          >
           <spec.icon
            className="w-5 h-5 text-[#2F8E92] mb-3"
            strokeWidth={1.5}
           />
           <p className="text-xs text-[#6B7280] mb-1">{spec.label}</p>
           <p className="text-sm font-semibold text-[#111111]">
            {spec.value}
           </p>
          </div>
         ))}
        </div>
       </div>

       {/* Features */}
       <div className="mb-12">
        <h2 className="velore-heading-md text-[#111111] mb-6">Key Features</h2>
        <div className="features-list grid grid-cols-1 md:grid-cols-2 gap-3">
         {vehicle.features.map((feature, index) => (
          <div
           key={index}
           className="feature-item flex items-center gap-3 p-3 bg-white border border-[#EAEAEA]"
          >
           <Check
            className="w-4 h-4 text-[#2F8E92] flex-shrink-0"
            strokeWidth={1.5}
           />
           <span className="text-sm text-[#111111]">{feature}</span>
          </div>
         ))}
        </div>
       </div>

       {/* Inspection Scope */}
       <div className="mb-12">
        <h2 className="velore-heading-md text-[#111111] mb-4">Inspection Scope</h2>
        <div className="p-6 bg-white border border-[#EAEAEA]">
         <div className="flex items-start gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
           <Shield className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
          </div>
          <div>
           <h4 className="text-sm font-semibold text-[#111111] mb-2">
            Multi-Point Verification
           </h4>
           <p className="text-sm text-[#6B7280]">
            Every vehicle undergoes comprehensive inspection including 
            battery health assessment, structural integrity verification, 
            sensor function testing, and complete documentation review.
           </p>
          </div>
         </div>
        </div>
       </div>

       {/* Delivery Estimate */}
       <div>
        <h2 className="velore-heading-md text-[#111111] mb-4">Delivery Estimate</h2>
        <div className="flex items-center gap-4 p-4 bg-[#F6F7F9] border border-[#EAEAEA]">
         <Clock className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
         <div>
          <p className="text-sm font-medium text-[#111111]">
           {vehicle.deliveryEstimate}
          </p>
          <p className="text-xs text-[#6B7280]">
           Timeline varies by destination and documentation requirements
          </p>
         </div>
        </div>
       </div>
      </div>

      {/* Right Column - Pricing & CTA */}
      <div className="lg:col-span-1">
       <div className="sticky top-28">
        <div className="velore-card p-6 mb-6">
         <h3 className="text-sm font-medium text-[#6B7280] mb-4">
          Starting Price
         </h3>
         <CurrencyDisplay
          usdPrice={vehicle.startingPrice}
          showConversions={true}
          size="lg"
         />
        </div>

        {/* Deposit Notice */}
        <div className="velore-card p-6 mb-6">
         <div className="flex items-start gap-3 mb-4">
          <AlertCircle
           className="w-5 h-5 text-[#2F8E92] flex-shrink-0 mt-0.5"
           strokeWidth={1.5}
          />
          <div>
           <h4 className="text-sm font-semibold text-[#111111] mb-1">
            Reservation Deposit
           </h4>
           <p className="text-sm text-[#6B7280]">
            7% of listed vehicle price required to secure allocation
           </p>
          </div>
         </div>
         <div className="pt-4 border-t border-[#EAEAEA]">
          <p className="text-sm text-[#111111]">
           Deposit Amount:{' '}
           <span className="font-semibold">
            ${depositAmount.toLocaleString()}
           </span>
          </p>
         </div>
        </div>

        {/* CTA */}
        <Link
         to={`/reserve/${vehicle.id}`}
         className="velore-btn-primary w-full justify-center mb-4"
        >
         Secure This Vehicle
        </Link>

        <p className="text-xs text-[#6B7280] text-center">
         VIN documentation issued after confirmed reservation
        </p>

        {/* Contact */}
        <div className="mt-6 pt-6 border-t border-[#EAEAEA]">
         <p className="text-sm text-[#6B7280] text-center mb-3">
          Have questions?
         </p>
         <Link
          to="/contact"
          className="velore-link w-full justify-center text-sm"
         >
          Speak with Client Liaison
         </Link>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </div>
 );
}
