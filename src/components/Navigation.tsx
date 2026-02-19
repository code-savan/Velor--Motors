import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
 { label: 'Inventory', href: '/inventory' },
 { label: 'Process', href: '/process' },
 { label: 'Digital Assets', href: '/digital-assets' },
 { label: 'About', href: '/about' },
 { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
 const [isScrolled, setIsScrolled] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const location = useLocation();

 useEffect(() => {
  const handleScroll = () => {
   setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 // Close mobile menu on route change
 useEffect(() => {
  setIsMobileMenuOpen(false);
 }, [location]);

 const isHomePage = location.pathname === '/';
 const shouldUseWhiteText = isHomePage && !isScrolled;

 const isActive = (href: string) => {
  if (href === '/') return location.pathname === '/';
  return location.pathname.startsWith(href);
 };

 return (
  <>
   <header
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
     isScrolled || !isHomePage
      ? 'bg-white/90 backdrop-blur-md shadow-sm'
      : 'bg-transparent'
    }`}
   >
    <nav className="velore-container">
     <div className="flex items-center justify-between h-16 md:h-20">
      {/* Logo */}
      <Link
       to="/"
       className="flex items-center gap-2 text-lg md:text-xl font-semibold tracking-tight"
       style={{ fontFamily: 'Sora, sans-serif' }}
      >
       <span className={`${shouldUseWhiteText ? 'text-white' : 'text-[#111111]'}`}>Veloré Motors</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
       {navLinks.map((link) => (
        <Link
         key={link.href}
         to={link.href}
         className={`relative text-sm font-medium transition-colors duration-300 ${
          isActive(link.href)
           ? shouldUseWhiteText ? 'text-white' : 'text-[#111111]'
           : shouldUseWhiteText ? 'text-white/80 hover:text-white' : 'text-[#6B7280] hover:text-[#111111]'
         }`}
        >
         {link.label}
         {isActive(link.href) && (
          <span className={`absolute -bottom-1 left-0 w-full h-px ${shouldUseWhiteText ? 'bg-white' : 'bg-[#111111]'}`} />
         )}
        </Link>
       ))}
      </div>

      {/* CTA Button */}
      <div className="hidden lg:block">
       <Link
        to="/reserve"
        className="velore-btn-primary text-xs"
       >
        Reserve
       </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
       onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
       className={`lg:hidden p-2 -mr-2 ${shouldUseWhiteText ? 'text-white' : 'text-[#111111]'}`}
       aria-label="Toggle menu"
      >
       {isMobileMenuOpen ? (
        <X className="w-5 h-5" strokeWidth={1.5} />
       ) : (
        <Menu className="w-5 h-5" strokeWidth={1.5} />
       )}
      </button>
     </div>
    </nav>
   </header>

   {/* Mobile Menu */}
   <div
    className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
     isMobileMenuOpen
      ? 'opacity-100 pointer-events-auto'
      : 'opacity-0 pointer-events-none'
    }`}
   >
    {/* Backdrop */}
    <div
     className="absolute inset-0 bg-black/20 backdrop-blur-sm"
     onClick={() => setIsMobileMenuOpen(false)}
    />

    {/* Menu Panel */}
    <div
     className={`absolute top-16 left-0 right-0 bg-white shadow-lg transition-transform duration-500 ${
      isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
     }`}
    >
     <div className="velore-container py-6">
      <div className="flex flex-col gap-4">
       {navLinks.map((link) => (
        <Link
         key={link.href}
         to={link.href}
         className={`text-lg font-medium py-2 transition-colors ${
          isActive(link.href)
           ? 'text-[#2F8E92]'
           : 'text-[#111111]'
         }`}
        >
         {link.label}
        </Link>
       ))}
       <div className="pt-4 border-t border-[#EAEAEA]">
        <Link
         to="/reserve"
         className="velore-btn-primary w-full justify-center"
        >
         Reserve
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}
