
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
            <button 
              className="md:hidden text-foreground z-50" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
      
      {isMobile && (
        <div className={`mobile-menu-container md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center w-full py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="py-2 text-lg font-medium text-foreground hover:text-purple transition-colors w-40 text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.href);
                  }}
                >
                  {link.name}
                </a>
              ))}
              
              <button 
                onClick={() => {
                  contactUs();
                  setIsMenuOpen(false);
                }}
                className="btn-primary mt-4 py-2.5 w-40 text-center text-base"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
