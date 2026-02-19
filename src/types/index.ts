export interface Vehicle {
 id: string;
 model: string;
 variant: string;
 yearRange: string;
 mileageRange: string;
 startingPrice: number;
 image: string;
 status: 'available' | 'limited' | 'reserved';
 description: string;
 specifications: {
  range: string;
  acceleration: string;
  topSpeed: string;
  drivetrain: string;
  seating: string;
 };
 features: string[];
 deliveryEstimate: string;
}

export interface CurrencyRates {
 USD: number;
 AED: number;
 GBP: number;
 EUR: number;
 CAD: number;
 AUD: number;
}

export interface CryptoPayment {
 type: 'USDT-ERC20' | 'USDT-TRC20' | 'BTC' | 'ETH';
 name: string;
 icon: string;
}

export interface ReservationForm {
 vehicleId: string;
 name: string;
 email: string;
 phone: string;
 idDocument: File | null;
 preferredCrypto: string;
}

export interface ContactForm {
 name: string;
 email: string;
 region: string;
 vehicleInterest: string;
 message: string;
}

export interface ChatMessage {
 id: string;
 type: 'bot' | 'user';
 content: string;
 timestamp: Date;
 quickReplies?: string[];
}
