
import { Facebook, Instagram, Twitter, Linkedin, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-purple flex items-center justify-center">
                <img 
                  src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                  alt="Neko AI Logo" 
                  className="h-8 w-8"
                />
              </div>
              <span className="font-display font-bold text-xl">Neko AI</span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              Neko AI adalah agensi AI yang berfokus pada pengembangan solusi kecerdasan buatan untuk 
              membantu bisnis berkembang di era digital.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-purple transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-purple transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-purple transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-purple transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-purple transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">AI Chatbot</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Machine Learning</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Data Analytics</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Computer Vision</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">NLP Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-foreground/70 hover:text-purple underline-animation">Tentang Kami</a></li>
              <li><a href="#testimonials" className="text-foreground/70 hover:text-purple underline-animation">Testimoni</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Blog</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-purple underline-animation">Karir</a></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-purple underline-animation">Kontak</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm">
              &copy; {currentYear} Neko AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-foreground/60 hover:text-purple text-sm underline-animation">Privacy Policy</a>
              <a href="#" className="text-foreground/60 hover:text-purple text-sm underline-animation">Terms of Service</a>
              <a href="#" className="text-foreground/60 hover:text-purple text-sm underline-animation">Cookies Policy</a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-foreground/50 flex items-center justify-center">
            Dibuat dengan <Heart size={12} className="text-red-500 mx-1" /> dengan teknologi AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
