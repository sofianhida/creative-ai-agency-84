
import { useEffect, useState } from 'react';
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

const Index = () => {
  const [showAIAccess, setShowAIAccess] = useState(false);
  
  useEffect(() => {
    document.title = "WeVersAI | Best AI Solutions";
    
    // Add scroll reveal effect
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
    
    // Observe all sections except hero (which has its own animation)
    const sections = document.querySelectorAll('section:not(#home)');
    sections.forEach(section => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
      <main className="pt-16 relative z-0">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        
        {/* AI Systems Section with ID for scrolling */}
        <section id="ai-systems-section" className="py-8">
          <AISystemsAccess showAIAccess={showAIAccess} setShowAIAccess={setShowAIAccess} />
        </section>
      </main>
      <Footer />
      
      {/* AI components with fixed positioning */}
      <div className="fixed-ai-controls">
        <AIChatbot />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
