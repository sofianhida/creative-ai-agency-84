
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  isActive: boolean;
  index: number;
  currentIndex: number;
}

const Testimonial = ({ quote, name, title, company, isActive, index, currentIndex }: TestimonialProps) => {
  // Calculate the position relative to the current index
  const position = index - currentIndex;
  
  let transformClass = '';
  let opacityClass = 'opacity-0 pointer-events-none';
  let zIndexClass = 'z-0';
  
  if (position === 0) {
    transformClass = 'translate-x-0 scale-100';
    opacityClass = 'opacity-100';
    zIndexClass = 'z-30';
  } else if (position === 1 || position === -1) {
    transformClass = position === 1 ? 'translate-x-[60%] scale-90' : 'translate-x-[-60%] scale-90';
    opacityClass = 'opacity-70';
    zIndexClass = 'z-20';
  } else if (position === 2 || position === -2) {
    transformClass = position === 2 ? 'translate-x-[120%] scale-80' : 'translate-x-[-120%] scale-80';
    opacityClass = 'opacity-40';
    zIndexClass = 'z-10';
  }
  
  return (
    <div
      className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${transformClass} ${opacityClass} ${zIndexClass}`}
    >
      <div className="glass-card max-w-2xl mx-auto p-8">
        <div className="flex flex-col items-center text-center">
          <Quote size={36} className="text-purple/30 mb-4" />
          <p className="text-lg mb-6">{quote}</p>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-foreground/70">{title}, {company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials = [
    {
      quote: "The implementation of WeversAI chatbot on our website has increased customer service responsiveness by 95% and significantly reduced operational costs.",
      name: "Budi Santoso",
      title: "CTO",
      company: "TechSolve Indonesia"
    },
    {
      quote: "The data analysis solution developed by WeversAI helped us identify consumer patterns with high accuracy, increasing sales by 30% in just 3 months.",
      name: "Sinta Wijaya",
      title: "Marketing Director",
      company: "Retail Prime"
    },
    {
      quote: "WeversAI's stock prediction system has optimized our supply chain, reducing excess stock by 40% and improving product availability by 25%.",
      name: "Agus Purnomo",
      title: "Supply Chain Manager",
      company: "Distribusi Utama"
    },
    {
      quote: "The WeversAI team is very professional and responsive. The custom AI solutions they developed are on point and aligned with our business needs.",
      name: "Diana Putri",
      title: "CEO",
      company: "FinTech Solutions"
    },
    {
      quote: "The implementation of computer vision for quality control in our factory has increased inspection accuracy to 99.7%, far exceeding our initial expectations.",
      name: "Hendra Laksono",
      title: "Operations Director",
      company: "Manufaktur Presisi"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          startAutoPlay();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    resetAutoPlay();
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple/5 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section">
        <h2 className="section-title">What Our <span className="text-purple">Clients Say</span></h2>
        <p className="section-subtitle">
          Hear from businesses that have worked with WeversAI and 
          how we've helped them achieve their business goals.
        </p>
        
        <div className={`relative h-80 sm:h-64 mt-16 ${inView ? 'animate-fade-in' : 'opacity-0'}`}
             onMouseEnter={stopAutoPlay} 
             onMouseLeave={startAutoPlay}>
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
              isActive={index === currentIndex}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
          
          <div className="absolute z-40 left-0 right-0 bottom-0 flex justify-center space-x-6 mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-colors shadow-soft"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-purple" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-colors shadow-soft"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-purple" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1 transition-all ${
                currentIndex === index ? 'bg-purple w-6' : 'bg-purple/30'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                resetAutoPlay();
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
