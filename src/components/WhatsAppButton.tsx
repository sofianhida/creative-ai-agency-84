
import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(true); // Always visible now
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
      className="ai-circular-button green fixed left-6 bottom-24 z-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare size={24} className="text-white" />
    </button>
  );
};

export default WhatsAppButton;
