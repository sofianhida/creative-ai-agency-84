import { useState, useEffect } from 'react';
import { Menu, X, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavbarProps {
  showAIAccess: boolean;
  setShowAIAccess: (show: boolean) => void;
}

const Navbar = ({ showAIAccess, setShowAIAccess }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
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

  useEffect(() => {
    if (!isMobile) return;
    
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      const scrollY = document.body.style.top ? parseInt(document.body.style.top || '0') * -1 : 0;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      window.scrollTo(0, scrollY);
    }
    
    return () => {
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
    setShowAIAccess(true);
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    setTimeout(() => {
      const aiSystemsSection = document.getElementById('ai-systems-section');
      if (aiSystemsSection) {
        aiSystemsSection.scrollIntoView({ behavior: 'smooth' });
        aiSystemsSection.focus({ preventScroll: false });
      } else {
        console.error('AI Systems section not found');
      }
    }, isMobile ? 300 : 0);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Products', href: '/products' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavLinkClick = (href: string) => {
    setIsMenuOpen(false);
    
    setTimeout(() => {
      if (href.startsWith('#')) {
        if (window.location.pathname !== '/' && href.startsWith('#')) {
          window.location.href = '/' + href;
        } else {
          window.location.href = href;
        }
      }
    }, isMobile ? 300 : 0);
  };

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 
                 ${scrolled ? 'glass shadow-sm py-2' : 'py-4 bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-20 group">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-purple-light/90 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-glow">
              <img 
                src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                alt="WeVersAI Logo" 
                className="h-7 w-7 sm:h-8 sm:w-8 object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl relative overflow-hidden">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-dark via-purple to-purple-light">WeVers</span>
              <span className="text-purple font-extrabold">AI</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-dark to-purple-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-1 lg:space-x-2 xl:space-x-6">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="nav-link relative px-2 py-2 text-xs lg:text-sm font-medium tracking-wide whitespace-nowrap group overflow-hidden"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.href);
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-dark to-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                ) : (
                  <Link 
                    key={link.name}
                    to={link.href}
                    className="nav-link relative px-2 py-2 text-xs lg:text-sm font-medium tracking-wide whitespace-nowrap group overflow-hidden"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-dark to-purple scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </Link>
                )
              ))}
            </nav>
          )}
          
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
            {!isMobile && (
              <button
                onClick={scrollToAISection}
                className="hidden md:flex items-center gap-1 lg:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 text-xs lg:text-sm text-purple border border-purple/70 rounded-full bg-white/80 backdrop-blur-sm hover:bg-purple/5 transition-all whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Access AI Systems"
              >
                <Lightbulb size={isTablet ? 14 : 16} className="text-purple" />
                <span className="font-medium">AI Systems</span>
              </button>
            )}
            
            <button 
              className="md:hidden text-foreground z-50 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all active:scale-95" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? 
                <X size={24} className="text-purple" /> : 
                <Menu size={24} className="text-purple-dark" />
              }
            </button>
            
            <button 
              onClick={contactUs}
              className={`${isMobile ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-r from-purple to-purple-dark text-white text-xs lg:text-sm px-3 lg:px-5 py-1.5 lg:py-2 rounded-full font-medium transition-all duration-300 hover:shadow-glow hover:translate-y-[-2px] active:translate-y-0 whitespace-nowrap shadow-sm`}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 glass-dark z-40 overflow-hidden mobile-menu-container"
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
                  link.href.startsWith('#') ? (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="py-3 text-xl font-medium text-white hover:text-purple-light transition-colors w-full text-center"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavLinkClick(link.href);
                      }}
                    >
                      {link.name}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={link.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="py-3 text-xl font-medium text-white hover:text-purple-light transition-colors w-full text-center"
                    >
                      <Link 
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                ))}
                
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={scrollToAISection}
                  className="py-3 text-xl font-medium text-purple-light hover:text-white transition-colors w-full text-center flex items-center justify-center gap-2"
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
                  className="mt-4 py-3 px-8 rounded-full bg-gradient-to-r from-purple to-purple-dark text-white font-medium shadow-md hover:shadow-lg transition-all"
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
