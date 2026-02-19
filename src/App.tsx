import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import VehicleDetail from './pages/VehicleDetail';
import OurProcess from './pages/OurProcess';
import DigitalAssetTransactions from './pages/DigitalAssetTransactions';
import About from './pages/About';
import SecureReservation from './pages/SecureReservation';
import ClientLiaison from './pages/ClientLiaison';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SecureTransactionPolicy from './pages/SecureTransactionPolicy';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on route change
    ScrollTrigger.refresh();

    return () => {
     ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

 return (
  <Router>
   <div className="relative min-h-screen">
    {/* Grain overlay */}
    <div className="velore-grain" />

    {/* Navigation */}
    <Navigation />

    {/* Main content */}
    <main>
     <ScrollToTop />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/:vehicleId" element={<VehicleDetail />} />
      <Route path="/process" element={<OurProcess />} />
      <Route path="/digital-assets" element={<DigitalAssetTransactions />} />
      <Route path="/about" element={<About />} />
      <Route path="/reserve" element={<SecureReservation />} />
      <Route path="/reserve/:vehicleId" element={<SecureReservation />} />
      <Route path="/contact" element={<ClientLiaison />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/secure-transactions" element={<SecureTransactionPolicy />} />
     </Routes>
    </main>

    {/* Footer */}
    <Footer />

    {/* Chatbot */}
    <Chatbot />
   </div>
  </Router>
 );
}

export default App;
