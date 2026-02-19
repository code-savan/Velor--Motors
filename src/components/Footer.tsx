import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const footerLinks = [
 { label: 'Inventory', href: '/inventory' },
 { label: 'Our Process', href: '/process' },
 { label: 'Digital Assets', href: '/digital-assets' },
 { label: 'About', href: '/about' },
 { label: 'Contact', href: '/contact' },
];

const legalLinks = [
 { label: 'Privacy Policy', href: '/privacy' },
 { label: 'Terms of Service', href: '/terms' },
 { label: 'Secure Transactions', href: '/secure-transactions' },
];

export default function Footer() {
 return (
  <footer className="bg-[#0B0D10] text-white">
   {/* Main Footer */}
   <div className="velore-container py-16 md:py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
     {/* Brand Column */}
     <div className="lg:col-span-2">
      <Link
       to="/"
       className="inline-block text-2xl font-semibold mb-4"
       style={{ fontFamily: 'Sora, sans-serif' }}
      >
       Veloré Motors
      </Link>
      <p className="text-sm text-white/60 mb-6 max-w-sm">
       Private Electric Vehicle Brokerage. We connect buyers to verified 
       Tesla inventory—inspected, documented, and delivered with institutional clarity.
      </p>
      <div className="flex flex-col gap-3">
       <a
        href="mailto:liaison@veloremotors.com"
        className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
       >
        <Mail className="w-4 h-4" strokeWidth={1.5} />
        liaison@veloremotors.com
       </a>
       <a
        href="tel:+15550142200"
        className="flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors"
       >
        <Phone className="w-4 h-4" strokeWidth={1.5} />
        +1 (555) 014-2200
       </a>
      </div>
     </div>

     {/* Navigation Column */}
     <div>
      <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-6">
       Navigation
      </h4>
      <ul className="flex flex-col gap-3">
       {footerLinks.map((link) => (
        <li key={link.href}>
         <Link
          to={link.href}
          className="text-sm text-white/70 hover:text-white transition-colors"
         >
          {link.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>

     {/* Legal Column */}
     <div>
      <h4 className="text-xs font-medium uppercase tracking-widest text-white/40 mb-6">
       Legal
      </h4>
      <ul className="flex flex-col gap-3">
       {legalLinks.map((link) => (
        <li key={link.href}>
         <Link
          to={link.href}
          className="text-sm text-white/70 hover:text-white transition-colors"
         >
          {link.label}
         </Link>
        </li>
       ))}
      </ul>
     </div>
    </div>
   </div>

   {/* Bottom Bar */}
   <div className="border-t border-white/10">
    <div className="velore-container py-6">
     <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-white/40 text-center md:text-left">
       Veloré Motors operates as an independent vehicle brokerage coordinating 
       supplier allocations on behalf of clients.
      </p>
      <p className="text-xs text-white/40">
       © {new Date().getFullYear()} Veloré Motors. All rights reserved.
      </p>
     </div>
    </div>
   </div>
  </footer>
 );
}
