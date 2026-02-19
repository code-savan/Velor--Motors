import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
 ChevronRight,
 ChevronLeft,
 Check,
 Upload,
 Wallet,
 QrCode,
 Copy,
 AlertCircle,
 FileCheck,
 Shield,
} from 'lucide-react';
import { getVehicleById } from '../data/vehicles';
import CurrencyDisplay from '../components/CurrencyDisplay';

const cryptoOptions = [
 { id: 'usdt-erc20', name: 'USDT (ERC20)', symbol: 'USDT' },
 { id: 'usdt-trc20', name: 'USDT (TRC20)', symbol: 'USDT' },
 { id: 'btc', name: 'Bitcoin (BTC)', symbol: 'BTC' },
 { id: 'eth', name: 'Ethereum (ETH)', symbol: 'ETH' },
];

export default function SecureReservation() {
 const { vehicleId } = useParams<{ vehicleId: string }>();
 const navigate = useNavigate();
 const vehicle = vehicleId ? getVehicleById(vehicleId) : null;

 const [currentStep, setCurrentStep] = useState(1);
 const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].id);
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  idDocument: null as File | null,
  agreeToTerms: false,
 });
 const [copied, setCopied] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const totalSteps = 6;
 const depositAmount = vehicle ? vehicle.startingPrice * 0.07 : 0;

 // Generate mock wallet address
 const walletAddress = selectedCrypto === 'btc'
  ? 'bc1q' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  : selectedCrypto === 'eth'
  ? '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  : 'T' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

 const steps = [
  { number: 1, title: 'Confirm Vehicle' },
  { number: 2, title: 'Review Pricing' },
  { number: 3, title: 'Upload ID' },
  { number: 4, title: 'Deposit Terms' },
  { number: 5, title: 'Payment' },
  { number: 6, title: 'Confirmation' },
 ];

 const handleNext = () => {
  if (currentStep < totalSteps) {
   setCurrentStep(currentStep + 1);
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 };

 const handleBack = () => {
  if (currentStep > 1) {
   setCurrentStep(currentStep - 1);
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 };

 const handleCopyAddress = () => {
  navigator.clipboard.writeText(walletAddress);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
 };

 const handleSubmit = async () => {
  setIsSubmitting(true);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  setIsSubmitting(false);
  handleNext();
 };

 useEffect(() => {
  if (vehicleId && !vehicle) {
   navigate('/inventory');
  }
 }, [vehicleId, vehicle, navigate]);

 if (vehicleId && !vehicle) {
  return null;
 }

 return (
  <div className="min-h-screen bg-[#F6F7F9] pt-24 md:pt-32 pb-20">
   <div className="velore-container">
    {/* Header */}
    <div className="max-w-2xl mx-auto text-center mb-12">
     <span className="velore-micro text-[#6B7280] mb-3 block">
      Secure Reservation
     </span>
     <h1 className="velore-heading-lg text-[#111111] mb-4">
      Reserve Your Vehicle
     </h1>
     <p className="velore-body">
      Complete the steps below to secure your vehicle allocation.
     </p>
    </div>

    {/* Progress Steps */}
    <div className="max-w-4xl mx-auto mb-12">
     <div className="flex items-center justify-between">
      {steps.map((step, index) => (
       <div key={step.number} className="flex items-center">
        <div className="flex flex-col items-center">
         <div
          className={`w-8 h-8 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
           currentStep >= step.number
            ? 'bg-[#2F8E92] text-white'
            : 'bg-[#EAEAEA] text-[#6B7280]'
          }`}
         >
          {currentStep > step.number ? (
           <Check className="w-4 h-4" strokeWidth={1.5} />
          ) : (
           step.number
          )}
         </div>
         <span
          className={`text-xs mt-2 hidden md:block ${
           currentStep >= step.number
            ? 'text-[#111111]'
            : 'text-[#6B7280]'
          }`}
         >
          {step.title}
         </span>
        </div>
        {index < steps.length - 1 && (
         <div
          className={`w-12 md:w-24 h-px mx-2 transition-all duration-300 ${
           currentStep > step.number ? 'bg-[#2F8E92]' : 'bg-[#EAEAEA]'
          }`}
         />
        )}
       </div>
      ))}
     </div>
    </div>

    {/* Step Content */}
    <div className="max-w-2xl mx-auto">
     <div className="velore-card p-8">
      {/* Step 1: Confirm Vehicle */}
      {currentStep === 1 && (
       <div className="animate-fade-in">
        <h2 className="text-xl font-semibold text-[#111111] mb-6">
         Confirm Vehicle Selection
        </h2>
        {vehicle ? (
         <div className="flex items-start gap-4 p-4 bg-[#F6F7F9] mb-6">
          <img
           src={vehicle.image}
           alt={vehicle.model}
           className="w-24 h-24 object-cover "
          />
          <div>
           <h3 className="text-base font-semibold text-[#111111]">
            {vehicle.model}
           </h3>
           <p className="text-sm text-[#6B7280] mb-2">
            {vehicle.variant}
           </p>
           <p className="text-xs text-[#6B7280]">
            {vehicle.yearRange} • {vehicle.mileageRange}
           </p>
          </div>
         </div>
        ) : (
         <div className="p-4 bg-[#F6F7F9] mb-6">
          <p className="text-sm text-[#6B7280]">
           No vehicle selected. You can{' '}
           <Link to="/inventory" className="text-[#2F8E92] hover:underline">
            browse our inventory
           </Link>{' '}
           or proceed with a general inquiry.
          </p>
         </div>
        )}
        <div className="flex justify-end">
         <button onClick={handleNext} className="velore-btn-primary">
          Continue
          <ChevronRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
         </button>
        </div>
       </div>
      )}

      {/* Step 2: Review Pricing */}
      {currentStep === 2 && (
       <div className="animate-fade-in">
        <h2 className="text-xl font-semibold text-[#111111] mb-6">
         Review Pricing
        </h2>
        <div className="space-y-4 mb-6">
         <div className="flex justify-between items-center py-3 border-b border-[#EAEAEA]">
          <span className="text-sm text-[#6B7280]">Vehicle Price</span>
          <CurrencyDisplay
           usdPrice={vehicle?.startingPrice || 0}
           showConversions={false}
           size="sm"
          />
         </div>
         <div className="flex justify-between items-center py-3 border-b border-[#EAEAEA]">
          <span className="text-sm text-[#6B7280]">Reservation Deposit (7%)</span>
          <span className="text-lg font-semibold text-[#2F8E92]">
           ${depositAmount.toLocaleString()}
          </span>
         </div>
         <div className="flex justify-between items-center py-3">
          <span className="text-sm font-medium text-[#111111]">
           Remaining Balance
          </span>
          <CurrencyDisplay
           usdPrice={(vehicle?.startingPrice || 0) - depositAmount}
           showConversions={false}
           size="sm"
          />
         </div>
        </div>
        <div className="flex justify-between">
         <button onClick={handleBack} className="velore-btn-secondary">
          <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back
         </button>
         <button onClick={handleNext} className="velore-btn-primary">
          Continue
          <ChevronRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
         </button>
        </div>
       </div>
      )}

      {/* Step 3: Upload ID */}
      {currentStep === 3 && (
       <div className="animate-fade-in">
        <h2 className="text-xl font-semibold text-[#111111] mb-4">
         Identity Verification
        </h2>
        <div className="flex items-start gap-3 p-4 bg-amber-50 mb-6">
         <AlertCircle
          className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
          strokeWidth={1.5}
         />
         <p className="text-sm text-amber-800">
          Identification is required for transactions above $25,000.
          Your information is securely stored and used only for compliance purposes.
         </p>
        </div>
        <div className="space-y-4 mb-6">
         <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">
           Full Name
          </label>
          <input
           type="text"
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
           placeholder="Enter your full name"
          />
         </div>
         <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">
           Email Address
          </label>
          <input
           type="email"
           value={formData.email}
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
           placeholder="Enter your email"
          />
         </div>
         <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">
           Phone Number
          </label>
          <input
           type="tel"
           value={formData.phone}
           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
           className="w-full px-4 py-3 bg-[#F6F7F9] border border-[#EAEAEA] text-sm focus:outline-none focus:ring-2 focus:ring-[#2F8E92]/20"
           placeholder="Enter your phone number"
          />
         </div>
         <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">
           ID Document (Passport or Driver's License)
          </label>
          <div className="border-2 border-dashed border-[#EAEAEA] p-6 text-center hover:border-[#2F8E92]/30 transition-colors">
           <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" strokeWidth={1.5} />
           <p className="text-sm text-[#6B7280] mb-1">
            Click to upload or drag and drop
           </p>
           <p className="text-xs text-[#6B7280]">
            PDF, JPG, or PNG (max 10MB)
           </p>
          </div>
         </div>
        </div>
        <div className="flex justify-between">
         <button onClick={handleBack} className="velore-btn-secondary">
          <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back
         </button>
         <button onClick={handleNext} className="velore-btn-primary">
          Continue
          <ChevronRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
         </button>
        </div>
       </div>
      )}

      {/* Step 4: Deposit Terms */}
      {currentStep === 4 && (
       <div className="animate-fade-in">
        <h2 className="text-xl font-semibold text-[#111111] mb-6">
         Review Deposit Terms
        </h2>
        <div className="space-y-4 mb-6">
         <div className="flex items-start gap-4 p-4 bg-[#F6F7F9] ">
          <FileCheck className="w-5 h-5 text-[#2F8E92] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
           <h4 className="text-sm font-semibold text-[#111111] mb-1">
            Deposit Purpose
           </h4>
           <p className="text-sm text-[#6B7280]">
            The 7% deposit secures supplier allocation and initiates
            documentation verification.
           </p>
          </div>
         </div>
         <div className="flex items-start gap-4 p-4 bg-[#F6F7F9] ">
          <Shield className="w-5 h-5 text-[#2F8E92] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
           <h4 className="text-sm font-semibold text-[#111111] mb-1">
            Deposit Protection
           </h4>
           <p className="text-sm text-[#6B7280]">
            Your deposit is held in escrow until vehicle inspection
            is completed and approved.
           </p>
          </div>
         </div>
         <div className="flex items-start gap-4 p-4 bg-[#F6F7F9] ">
          <Wallet className="w-5 h-5 text-[#2F8E92] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div>
           <h4 className="text-sm font-semibold text-[#111111] mb-1">
            Applied to Purchase
           </h4>
           <p className="text-sm text-[#6B7280]">
            The deposit is applied toward your final purchase price
            and is not an additional fee.
           </p>
          </div>
         </div>
        </div>
        <div className="flex items-start gap-3 mb-6">
         <input
          type="checkbox"
          id="terms"
          checked={formData.agreeToTerms}
          onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
          className="w-4 h-4 mt-0.5 border-[#EAEAEA] text-[#2F8E92] focus:ring-[#2F8E92]/20"
         />
         <label htmlFor="terms" className="text-sm text-[#6B7280]">
          I agree to the{' '}
          <Link to="/terms" className="text-[#2F8E92] hover:underline">
           Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/secure-transactions" className="text-[#2F8E92] hover:underline">
           Secure Transaction Policy
          </Link>
         </label>
        </div>
        <div className="flex justify-between">
         <button onClick={handleBack} className="velore-btn-secondary">
          <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back
         </button>
         <button
          onClick={handleNext}
          disabled={!formData.agreeToTerms}
          className="velore-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
         >
          Continue
          <ChevronRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
         </button>
        </div>
       </div>
      )}

      {/* Step 5: Payment */}
      {currentStep === 5 && (
       <div className="animate-fade-in">
        <h2 className="text-xl font-semibold text-[#111111] mb-6">
         Digital Asset Payment
        </h2>
        <div className="mb-6">
         <label className="block text-sm font-medium text-[#111111] mb-2">
          Select Payment Method
         </label>
         <div className="grid grid-cols-2 gap-3">
          {cryptoOptions.map((crypto) => (
           <button
            key={crypto.id}
            onClick={() => setSelectedCrypto(crypto.id)}
            className={`p-3 border text-left transition-all duration-300 ${
             selectedCrypto === crypto.id
              ? 'border-[#2F8E92] bg-[#2F8E92]/5'
              : 'border-[#EAEAEA] hover:border-[#2F8E92]/30'
            }`}
           >
            <p className="text-sm font-medium text-[#111111]">
             {crypto.name}
            </p>
           </button>
          ))}
         </div>
        </div>
        <div className="p-6 bg-[#F6F7F9] mb-6">
         <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[#6B7280]">Deposit Amount</span>
          <span className="text-lg font-semibold text-[#111111]">
           ${depositAmount.toLocaleString()}
          </span>
         </div>
         <div className="border-t border-[#EAEAEA] pt-4">
          <p className="text-xs text-[#6B7280] mb-2">Send to this address:</p>
          <div className="flex items-center gap-2">
           <code className="flex-1 px-3 py-2 bg-white text-xs text-[#111111] break-all">
            {walletAddress}
           </code>
           <button
            onClick={handleCopyAddress}
            className="p-2 bg-white hover:bg-[#EAEAEA] transition-colors"
           >
            {copied ? (
             <Check className="w-4 h-4 text-[#2F8E92]" strokeWidth={1.5} />
            ) : (
             <Copy className="w-4 h-4 text-[#6B7280]" strokeWidth={1.5} />
            )}
           </button>
          </div>
         </div>
         <div className="mt-4 flex items-center justify-center">
          <div className="w-32 h-32 bg-white flex items-center justify-center">
           <QrCode className="w-24 h-24 text-[#111111]" strokeWidth={1} />
          </div>
         </div>
        </div>
        <div className="flex justify-between">
         <button onClick={handleBack} className="velore-btn-secondary">
          <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back
         </button>
         <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="velore-btn-primary disabled:opacity-50"
         >
          {isSubmitting ? (
           <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin mr-2" />
            Processing...
           </>
          ) : (
           <>
            I've Sent the Payment
            <ChevronRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
           </>
          )}
         </button>
        </div>
       </div>
      )}

      {/* Step 6: Confirmation */}
      {currentStep === 6 && (
       <div className="animate-fade-in text-center">
        <div className="w-16 h-16 flex items-center justify-center bg-[#2F8E92]/10 mx-auto mb-6">
         <Check className="w-8 h-8 text-[#2F8E92]" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-[#111111] mb-4">
         Reservation Confirmed
        </h2>
        <p className="text-sm text-[#6B7280] mb-6">
         Thank you for your reservation. We have received your deposit and
         will begin the verification process immediately. A confirmation email
         with your contract will be sent to {formData.email || 'your email'} shortly.
        </p>
        <div className="p-4 bg-[#F6F7F9] mb-6 text-left">
         <p className="text-xs text-[#6B7280] mb-1">Reference Number</p>
         <p className="text-sm font-mono text-[#111111]">
          VR-{Date.now().toString(36).toUpperCase()}
         </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
         <Link to="/inventory" className="velore-btn-primary">
          Browse More Vehicles
         </Link>
         <Link to="/" className="velore-btn-secondary">
          Return Home
         </Link>
        </div>
       </div>
      )}
     </div>
    </div>
   </div>
  </div>
 );
}
