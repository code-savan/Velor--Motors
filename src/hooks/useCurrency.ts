import { useState, useEffect, useCallback } from 'react';
import type { CurrencyRates } from '../types';

const FALLBACK_RATES: CurrencyRates = {
 USD: 1,
 AED: 3.67,
 GBP: 0.79,
 EUR: 0.92,
 CAD: 1.36,
 AUD: 1.52,
};

const STORAGE_KEY = 'velore_currency_rates';
const TIMESTAMP_KEY = 'velore_rates_timestamp';
const REFRESH_INTERVAL = 60000; // 60 seconds

export function useCurrency() {
 const [rates, setRates] = useState<CurrencyRates>(FALLBACK_RATES);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [preferredCurrency, setPreferredCurrency] = useState<string>('USD');

 const fetchRates = useCallback(async () => {
  try {
   // Check if we have cached rates less than 60 seconds old
   const cachedTimestamp = localStorage.getItem(TIMESTAMP_KEY);
   const now = Date.now();
   
   if (cachedTimestamp && now - parseInt(cachedTimestamp) < REFRESH_INTERVAL) {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
     setRates(JSON.parse(cached));
     setLoading(false);
     return;
    }
   }

   // Fetch from API
   const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
   
   if (!response.ok) {
    throw new Error('Failed to fetch exchange rates');
   }

   const data = await response.json();
   
   const newRates: CurrencyRates = {
    USD: 1,
    AED: data.rates.AED || FALLBACK_RATES.AED,
    GBP: data.rates.GBP || FALLBACK_RATES.GBP,
    EUR: data.rates.EUR || FALLBACK_RATES.EUR,
    CAD: data.rates.CAD || FALLBACK_RATES.CAD,
    AUD: data.rates.AUD || FALLBACK_RATES.AUD,
   };

   setRates(newRates);
   localStorage.setItem(STORAGE_KEY, JSON.stringify(newRates));
   localStorage.setItem(TIMESTAMP_KEY, now.toString());
   setError(null);
  } catch (err) {
   console.error('Currency fetch error:', err);
   setError('Using fallback rates');
   // Keep using existing rates or fallback
   const cached = localStorage.getItem(STORAGE_KEY);
   if (cached) {
    setRates(JSON.parse(cached));
   } else {
    setRates(FALLBACK_RATES);
   }
  } finally {
   setLoading(false);
  }
 }, []);

 const convertPrice = useCallback((usdPrice: number, currency: keyof CurrencyRates = 'USD'): string => {
  const rate = rates[currency] || 1;
  const converted = usdPrice * rate;
  
  const formatters: Record<string, Intl.NumberFormat> = {
   USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
   AED: new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }),
   GBP: new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }),
   EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
   CAD: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }),
   AUD: new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }),
  };

  return formatters[currency]?.format(converted) || `$${converted.toFixed(0)}`;
 }, [rates]);

 const getAllConversions = useCallback((usdPrice: number): { currency: string; symbol: string; value: string }[] => {
  const currencies: { key: keyof CurrencyRates; symbol: string }[] = [
   { key: 'AED', symbol: 'AED' },
   { key: 'GBP', symbol: 'GBP' },
   { key: 'EUR', symbol: 'EUR' },
   { key: 'CAD', symbol: 'CAD' },
   { key: 'AUD', symbol: 'AUD' },
  ];

  return currencies.map(({ key, symbol }) => ({
   currency: symbol,
   symbol,
   value: convertPrice(usdPrice, key),
  }));
 }, [convertPrice]);

 // Detect user's region for preferred currency
 useEffect(() => {
  const detectRegion = () => {
   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const regionMap: Record<string, string> = {
    'Europe/London': 'GBP',
    'Europe/Paris': 'EUR',
    'Europe/Berlin': 'EUR',
    'Europe/Madrid': 'EUR',
    'Europe/Rome': 'EUR',
    'Europe/Amsterdam': 'EUR',
    'Australia/Sydney': 'AUD',
    'Australia/Melbourne': 'AUD',
    'Australia/Brisbane': 'AUD',
    'Australia/Perth': 'AUD',
    'Canada/Toronto': 'CAD',
    'Canada/Vancouver': 'CAD',
    'Canada/Montreal': 'CAD',
    'Asia/Dubai': 'AED',
    'Asia/Abu_Dhabi': 'AED',
   };

   const detected = regionMap[timezone];
   if (detected) {
    setPreferredCurrency(detected);
   }
  };

  detectRegion();
 }, []);

 // Initial fetch and interval
 useEffect(() => {
  fetchRates();
  
  const interval = setInterval(fetchRates, REFRESH_INTERVAL);
  
  return () => clearInterval(interval);
 }, [fetchRates]);

 return {
  rates,
  loading,
  error,
  preferredCurrency,
  setPreferredCurrency,
  convertPrice,
  getAllConversions,
  refreshRates: fetchRates,
 };
}
