
import { useEffect, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden flex items-center min-h-[calc(100vh-4rem)] py-8 md:py-12">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10 -z-10"></div>
      
      {/* Abstract Shapes */}
      <div className="absolute top-20 right-10 h-48 w-48 md:h-64 md:w-64 rounded-full bg-purple/10 filter blur-3xl"></div>
      <div className="absolute bottom-20 left-10 h-48 w-48 md:h-72 md:w-72 rounded-full bg-purple/10 filter blur-3xl"></div>
      
      <div className="section py-10 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className={`space-y-3 md:space-y-4 lg:space-y-6 text-center md:text-left ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple/10 rounded-full px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm text-purple-dark">
              <Sparkles size={14} className="text-purple" />
              <span>Best AI Solutions for Your Business</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display leading-tight">
              Digital Transformation 
              <span className="text-purple block mt-1">with Artificial Intelligence</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-foreground/80 max-w-lg mx-auto md:mx-0">
              We help your business grow with cutting-edge AI technology,
              providing smart solutions that optimize processes and improve productivity.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-3 md:pt-4 justify-center md:justify-start">
              <a href="#services" className="btn-primary text-sm md:text-base py-2 md:py-3 flex items-center justify-center gap-2">
                Explore Services
              </a>
              <a href="#contact" className="btn-outline text-sm md:text-base py-2 md:py-3 flex items-center justify-center gap-2">
                Free Consultation
              </a>
            </div>
          </div>
          
          <div className={`relative mt-6 md:mt-0 ${isLoaded ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative bg-gradient-to-br from-purple-light to-purple rounded-2xl aspect-square max-w-[200px] sm:max-w-xs mx-auto overflow-hidden shadow-glow-lg">
              <img 
                src="/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png" 
                alt="WeVersAI Logo" 
                className="absolute inset-0 h-full w-full object-contain p-8 md:p-12 animate-float"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 h-24 w-24 md:h-32 md:w-32 bg-purple/20 rounded-full filter blur-xl"></div>
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 h-20 w-20 md:h-24 md:w-24 bg-purple/20 rounded-full filter blur-xl"></div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
          <a href="#services" className="flex flex-col items-center text-foreground/50 hover:text-foreground">
            <span className="text-sm mb-2">Scroll down</span>
            <ArrowDown size={20} className="arrow-down" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
