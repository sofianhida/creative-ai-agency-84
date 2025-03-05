
import { useState, useEffect } from 'react';
import { Menu, X, Lightbulb } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  showAIAccess: boolean;
  setShowAIAccess: (show: boolean) => void;
}

const Navbar = ({ showAIAccess, setShowAIAccess }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced body lock effect that prevents scrolling but maintains scroll position
  useEffect(() => {
    if (!isMobile) return;
    
    if (isMenuOpen) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Apply fixed positioning to body with the current scroll position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Get the scroll position from the body's top property
      const scrollY = document.body.style.top ? parseInt(document.body.style.top || '0') * -1 : 0;
      
      // Reset body styling
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    }
    
    return () => {
      // Clean up body styles when component unmounts
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isMenuOpen, isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const contactUs = () => {
    toast({
      title: "Contact Us",
      description: "You will be redirected to WhatsApp",
    });
    window.open(`https://wa.me/6285183978011`, '_blank');
  };
  
  const scrollToAISection = () => {
    // Show the AI access panel
    setShowAIAccess(true);
    
    // Close the mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // Scroll to the AI Systems section at the bottom
    const aiSystemsSection = document.getElementById('ai-systems-section');
    if (aiSystemsSection) {
      aiSystemsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavLinkClick = (href: string) => {
    setIsMenuOpen(false);
    window.location.href = href;
  };

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 
                 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm py-2' : 'py-4 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center gap-2 z-20">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-purple/80 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                alt="WeVersAI Logo" 
                className="h-7 w-7 sm:h-8 sm:w-8 object-cover rounded-full"
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl">WeVersAI</span>
          </a>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-8 lg:space-x-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="nav-link text-sm font-medium tracking-wide"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}
          
          <div className="flex items-center gap-4">
            {/* AI Systems Button in Navbar */}
            <button
              onClick={scrollToAISection}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-purple border-2 border-purple rounded-full bg-white hover:bg-purple/5 transition-all"
              aria-label="Access AI Systems"
            >
              <Lightbulb size={20} />
              <span className="font-medium">AI Systems</span>
            </button>
            
            <button 
              className="md:hidden text-foreground z-50 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} className="text-purple" /> : <Menu size={24} />}
            </button>
            
            <button 
              onClick={contactUs}
              className="hidden md:flex btn-primary text-sm px-5 py-2.5"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with enhanced positioning to prevent body scroll */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 overflow-hidden"
          >
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, staggerChildren: 0.1, delayChildren: 0.1 }}
              className="flex flex-col items-center justify-center h-full max-h-screen overflow-hidden"
            >
              <div className="flex flex-col items-center w-full py-6 gap-6 overflow-y-auto no-scrollbar">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="py-3 text-xl font-medium text-foreground hover:text-purple transition-colors w-full text-center"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.href);
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                {/* AI Systems Button in Mobile Menu */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={() => {
                    scrollToAISection();
                    setIsMenuOpen(false);
                  }}
                  className="py-3 text-xl font-medium text-foreground hover:text-purple transition-colors w-full text-center flex items-center justify-center gap-2"
                >
                  <Lightbulb size={20} />
                  <span>AI Systems</span>
                </motion.button>
                
                <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05 }}
                  onClick={() => {
                    contactUs();
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 py-3 px-8 rounded-full bg-purple text-white font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
