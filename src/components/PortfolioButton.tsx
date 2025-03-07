
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const PortfolioButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  return (
    <Link 
      to="/portfolio" 
      className={`fixed right-24 bottom-6 z-40 transition-all duration-300
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <Button className="rounded-full shadow-glow bg-purple text-white hover:bg-white hover:text-purple border border-purple/30 p-3 h-auto">
        <BookIcon size={20} />
        <span className="ml-2 font-medium">Portfolio</span>
      </Button>
    </Link>
  );
};

export default PortfolioButton;
