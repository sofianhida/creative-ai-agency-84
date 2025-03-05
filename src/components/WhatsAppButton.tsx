
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const openWhatsApp = () => {
    window.open('https://wa.me/6285183978011', '_blank');
  };
  
  return (
    <button
      onClick={openWhatsApp}
      className={`fixed bottom-6 right-6 z-40 bg-green-500 text-white p-3 rounded-full shadow-glow 
                transition-all duration-300 hover:bg-green-600 hover:scale-105 
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare size={24} className="animate-pulse-light" />
    </button>
  );
};

export default WhatsAppButton;
