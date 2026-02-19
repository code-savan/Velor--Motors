import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
 Mail,
 Phone,
 Send,
 Check,
 Clock,
 MessageSquare,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vehicleOptions = [
 { value: '', label: 'Select a vehicle (optional)' },
 { value: 'model-3', label: 'Tesla Model 3' },
 { value: 'model-y', label: 'Tesla Model Y' },
 { value: 'model-s', label: 'Tesla Model S' },
 { value: 'model-x', label: 'Tesla Model X' },
 { value: 'cybertruck', label: 'Tesla Cybertruck' },
 { value: 'general', label: 'General Inquiry' },
];

const regionOptions = [
 { value: '', label: 'Select your region' },
 { value: 'north-america', label: 'North America' },
 { value: 'europe', label: 'Europe' },
 { value: 'middle-east', label: 'Middle East' },
 { value: 'asia-pacific', label: 'Asia Pacific' },
 { value: 'other', label: 'Other' },
];

export default function ClientLiaison() {
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  region: '',
  vehicleInterest: '',
  message: '',
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);

 const headerRef = useRef<HTMLDivElement>(null);
 const formRef = useRef<HTMLDivElement>(null);

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
    formRef.current,
    { y: 40, opacity: 0 },
    {
     y: 0,
     opacity: 1,
     duration: 0.7,
     ease: 'power2.out',
     scrollTrigger: {
      trigger: formRef.current,
      start: 'top 80%',
     },
    }
   );
  });

  return () => ctx.revert();
 }, []);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));

  setIsSubmitting(false);
  setIsSubmitted(true);
 };

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 ) => {
  setFormData({
   ...formData,
   [e.target.name]: e.target.value,
  });
 };

 return (
  <div className="min-h-screen bg-[#F6F7F9] pt-24 md:pt-32 pb-20">
   <div className="velore-container">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
     {/* Left Column - Info */}
     <div>
      <div ref={headerRef}>
       <span className="velore-micro text-[#6B7280] mb-3 block">
        Get in Touch
       </span>
       <h1 className="velore-heading-lg text-[#111111] mb-6">
        Client Liaison
       </h1>
       <p className="velore-body text-base mb-8">
        Have questions about our inventory, process, or digital asset settlements? 
        Our Client Liaison team is here to assist you with personalized guidance 
        throughout your vehicle acquisition journey.
       </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-6 mb-12">
       <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
         <Mail className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
        </div>
        <div>
         <h4 className="text-sm font-semibold text-[#111111] mb-1">
          Email
         </h4>
         <a
          href="mailto:liaison@veloremotors.com"
          className="text-sm text-[#6B7280] hover:text-[#2F8E92] transition-colors"
         >
          liaison@veloremotors.com
         </a>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
         <Phone className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
        </div>
        <div>
         <h4 className="text-sm font-semibold text-[#111111] mb-1">
          Phone
         </h4>
         <a
          href="tel:+15550142200"
          className="text-sm text-[#6B7280] hover:text-[#2F8E92] transition-colors"
         >
          +1 (555) 014-2200
         </a>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
         <Clock className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
        </div>
        <div>
         <h4 className="text-sm font-semibold text-[#111111] mb-1">
          Response Time
         </h4>
         <p className="text-sm text-[#6B7280]">
          Responses issued within one business day
         </p>
        </div>
       </div>

       <div className="flex items-start gap-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#2F8E92]/10 flex-shrink-0">
         <MessageSquare className="w-5 h-5 text-[#2F8E92]" strokeWidth={1.5} />
        </div>
        <div>
         <h4 className="text-sm font-semibold text-[#111111] mb-1">
          Live Chat
         </h4>
         <p className="text-sm text-[#6B7280]">
          Use the chat widget in the bottom-right corner for immediate assistance
         </p>
        </div>
       </div>
      </div>

      {/* Note */}
      <div className="p-6 bg-white border border-[#EAEAEA]">
       <h4 className="text-sm font-semibold text-[#111111] mb-2">
        Priority Support
       </h4>
       <p className="text-sm text-[#6B7280]">
        Existing clients with active reservations receive priority support 
        through their dedicated Client Liaison.
       </p>
      </div>
     </div>

     {/* Right Column - Form */}
     <div ref={formRef}>
      <div className="velore-card p-8">
       {isSubmitted ? (
        <div className="text-center py-8">
         <div className="w-16 h-16 flex items-center justify-center bg-[#2F8E92]/10 mx-auto mb-6">
          <Check className="w-8 h-8 text-[#2F8E92]" strokeWidth={1.5} />
         </div>
         <h3 className="text-xl font-semibold text-[#111111] mb-4">
          Message Sent
         </h3>
         <p className="text-sm text-[#6B7280] mb-6">
          Thank you for reaching out. Our Client Liaison team will review 
          your inquiry and respond within one business day.
         </p>
         <button
          onClick={() => {
           setIsSubmitted(false);
           setFormData({
            name: '',
            email: '',
            region: '',
            vehicleInterest: '',
            message: '',
           });
          }}
          className="velore-btn-secondary"
         >
          Send Another Message
         </button>
        </div>
       ) : (
        <form onSubmit={handleSubmit}>
         <h3 className="text-lg font-semibold text-[#111111] mb-6">
          Send Us a Message
         </h3>

         <div className="space-y-4">
          {/* Name */}
          <div>
           <label
            htmlFor="name"
            className="block text-sm font-medium text-[#111111] mb-2"
           >
            Name
           </label>
           <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
            placeholder="Your full name"
           />
          </div>

          {/* Email */}
          <div>
           <label
            htmlFor="email"
            className="block text-sm font-medium text-[#111111] mb-2"
           >
            Email
           </label>
           <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
            placeholder="your@email.com"
           />
          </div>

          {/* Region */}
          <div>
           <label
            htmlFor="region"
            className="block text-sm font-medium text-[#111111] mb-2"
           >
            Region
           </label>
           <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
           >
            {regionOptions.map((option) => (
             <option key={option.value} value={option.value}>
              {option.label}
             </option>
            ))}
           </select>
          </div>

          {/* Vehicle Interest */}
          <div>
           <label
            htmlFor="vehicleInterest"
            className="block text-sm font-medium text-[#111111] mb-2"
           >
            Vehicle of Interest
           </label>
           <select
            id="vehicleInterest"
            name="vehicleInterest"
            value={formData.vehicleInterest}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
           >
            {vehicleOptions.map((option) => (
             <option key={option.value} value={option.value}>
              {option.label}
             </option>
            ))}
           </select>
          </div>

          {/* Message */}
          <div>
           <label
            htmlFor="message"
            className="block text-sm font-medium text-[#111111] mb-2"
           >
            Message
           </label>
           <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20 resize-none"
            placeholder="How can we assist you?"
           />
          </div>

          {/* Submit */}
          <button
           type="submit"
           disabled={isSubmitting}
           className="velore-btn-primary w-full justify-center disabled:opacity-50"
          >
           {isSubmitting ? (
            <>
             <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin mr-2" />
             Sending...
            </>
           ) : (
            <>
             Send Message
             <Send className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </>
           )}
          </button>
         </div>
        </form>
       )}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
