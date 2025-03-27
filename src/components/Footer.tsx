import { Facebook, Instagram, X, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import TikTokIcon from './icons/TikTokIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple flex items-center justify-center overflow-hidden">
                <img 
                  src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                  alt="WeVersAI Logo" 
                  className="h-8 w-8 object-cover rounded-full"
                />
              </div>
              <span className="font-display font-bold text-xl">WeVersAI</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              WeVersAI is an AI agency focused on developing artificial intelligence solutions to 
              help businesses thrive in the digital era.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61573947502896" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/weversai?igsh=ZDNqZHA1bXc2bTN3" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/WeverseAI?t=KimD49BVPRN_3dRpheaRZQ&s=09" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple transition-colors" aria-label="Twitter">
                <X size={20} />
              </a>
              <a href="https://www.linkedin.com/company/weversai/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://www.tiktok.com/@weversai?_t=ZS-8v1lCM0FE6U&_r=1" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple transition-colors" aria-label="TikTok">
                <TikTokIcon size={20} />
              </a>
              <a href="https://youtube.com/@weversai?si=QbM_i7s0NGCoqJIh" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-purple transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">AI Chatbot</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Machine Learning</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Data Analytics</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Computer Vision</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">NLP Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-foreground/70 hover:text-purple underline-animation">About Us</a></li>
              <li><a href="#testimonials" className="text-foreground/70 hover:text-purple underline-animation">Testimonials</a></li>
              <li><Link to="/products" className="text-foreground/70 hover:text-purple underline-animation">Our Products</Link></li>
              <li><Link to="/portfolio" className="text-foreground/70 hover:text-purple underline-animation">Portfolio</Link></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-purple underline-animation">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm">
              &copy; {currentYear} WeVersAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-foreground/60 hover:text-purple text-sm underline-animation">Privacy Policy</a>
              <a href="#" className="text-foreground/60 hover:text-purple text-sm underline-animation">Terms of Service</a>
              <a href="#" className="text-foreground/60 hover:text-purple text-sm underline-animation">Cookies Policy</a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-foreground/50 flex items-center justify-center">
            <span>Credit: WeverseAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
