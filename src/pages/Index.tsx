import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AISystemsAccess from '@/components/AISystemsAccess';
import AIChatbot from '@/components/AIChatbot';
import { Sparkles, ZapIcon, StarIcon, FileSearch, Brain, Image, Shield } from 'lucide-react';

const Index = () => {
  const [showAIAccess, setShowAIAccess] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const aiSystemsSectionRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    document.title = "WeVersAI | Best AI Solutions";
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });
    
    const createParticles = () => {
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
          const size = Math.random() * 20 + 5;
          const particle = document.createElement('div');
          particle.classList.add('particle');
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.opacity = `${Math.random() * 0.3}`;
          particle.style.animationDelay = `${Math.random() * 10}s`;
          particlesContainer.appendChild(particle);
        }
      }
    };
    
    createParticles();
    
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsScrolling(false);
        scrollTimeoutRef.current = null;
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
      
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden" ref={mainRef}>
      <Navbar showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
      
      <main className="pt-16 relative z-0">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        
        <section 
          id="ai-systems-section" 
          className="ai-dashboard-section py-16 relative" 
          ref={aiSystemsSectionRef}
          tabIndex={-1}
        >
          <div className="particles"></div>
          
          <div className="absolute left-[10%] top-[20%] w-32 h-32 rounded-full border border-purple/20 animate-slow-rotate"></div>
          <div className="absolute right-[15%] bottom-[25%] w-24 h-24 rounded-full border border-purple/10 animate-slow-rotate" style={{ animationDuration: '15s' }}></div>
          
          <div className="container mx-auto px-4 ai-dashboard-content">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="fancy-badge animate-float">AI POWERED</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                <span className="flex items-center justify-center gap-2">
                  WeVersAI Systems Dashboard
                  <Sparkles className="text-purple h-6 w-6 animate-pulse" />
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                Access our powerful AI systems designed to solve complex problems and enhance your business operations
              </p>
              
              <div className="hidden sm:block w-24 h-1 bg-gradient-to-r from-purple/30 to-purple mx-auto mb-12 rounded-full"></div>
            </div>
            
            <div className="mb-16">
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="card-3d bg-white p-5 rounded-xl shadow-sm hover:shadow-glow-lg w-64 text-center transition-all duration-300 border border-purple/10 hover:border-purple/30">
                  <div className="w-14 h-14 rounded-full bg-purple/10 text-purple flex items-center justify-center mx-auto mb-4">
                    <Brain size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">AI Brainstorming</h3>
                  <p className="text-sm text-foreground/70">Generate creative ideas for any project or business</p>
                </div>
                
                <div className="card-3d bg-white p-5 rounded-xl shadow-sm hover:shadow-glow-lg w-64 text-center transition-all duration-300 border border-purple/10 hover:border-purple/30">
                  <div className="w-14 h-14 rounded-full bg-purple/10 text-purple flex items-center justify-center mx-auto mb-4">
                    <FileSearch size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Document Analysis</h3>
                  <p className="text-sm text-foreground/70">Extract data from documents and images with our enhanced AI</p>
                </div>
                
                <div className="card-3d bg-white p-5 rounded-xl shadow-sm hover:shadow-glow-lg w-64 text-center transition-all duration-300 border border-purple/10 hover:border-purple/30">
                  <div className="w-14 h-14 rounded-full bg-purple/10 text-purple flex items-center justify-center mx-auto mb-4">
                    <Image size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Image Description</h3>
                  <p className="text-sm text-foreground/70">Generate detailed descriptions from images</p>
                </div>
              </div>
            </div>
            
            <AISystemsAccess showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
          </div>
          
          <div className="absolute right-0 top-20 w-64 h-64 rounded-full bg-purple/5 animate-float"></div>
          <div className="absolute -left-32 bottom-32 w-64 h-64 rounded-full border border-purple/10 animate-slow-rotate"></div>
          
          <div className="absolute inset-0 overflow-hidden z-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 w-[40rem] h-1 bg-gradient-to-r from-purple/0 via-purple/50 to-purple/0 rotate-45 animate-pulse-light"></div>
            <div className="absolute bottom-1/3 left-1/4 w-[30rem] h-0.5 bg-gradient-to-r from-purple/0 via-purple/30 to-purple/0 -rotate-30 animate-pulse-light" style={{ animationDelay: '1s' }}></div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <div className="fixed-ai-controls">
        <AIChatbot />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
