
import { CheckCircle2, Users, Award, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

const AboutSection = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const stats = [
    { value: '98%', label: 'Client Satisfaction', icon: <Users size={20} className="text-purple" /> },
    { value: '20+', label: 'AI Solutions', icon: <Award size={20} className="text-purple" /> },
    { value: '24/7', label: 'Support', icon: <Clock size={20} className="text-purple" /> }
  ];

  const features = [
    'Customized AI solutions for your business needs',
    'Expert team with specialized AI knowledge',
    'State-of-the-art ML models and algorithms',
    'End-to-end implementation and support',
    'Transparent pricing with no hidden costs',
    '100% satisfaction guarantee'
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-transparent to-purple/5 -z-10"></div>
      
      <div className="section">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`space-y-6 md:space-y-8 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple/10 rounded-full px-4 py-2 text-sm text-purple-dark">
              <span>About WeVersAI</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">
              Transforming Businesses <br />
              <span className="text-purple">Through Artificial Intelligence</span>
            </h2>
            
            <p className="text-foreground/70 text-lg leading-relaxed">
              WeVersAI is a leading AI solutions provider focused on helping businesses 
              leverage artificial intelligence to drive innovation, efficiency, and growth. 
              We combine technical expertise with business acumen to deliver results.
            </p>
            
            <ul className="space-y-3 pt-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-purple mt-1 flex-shrink-0" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <a href="#contact" className="btn-primary py-3 px-6 inline-block">
                Start Your AI Journey
              </a>
            </div>
          </div>
          
          <div className={`space-y-8 ${inView ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative z-10">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 relative z-10">
                <div className="grid grid-cols-3 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-3">
                        {stat.icon}
                      </div>
                      <p className="text-3xl font-bold text-purple">{stat.value}</p>
                      <p className="text-sm text-foreground/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-32 w-32 bg-purple/10 rounded-full filter blur-xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 h-24 w-24 bg-purple/10 rounded-full filter blur-xl -z-10"></div>
            </div>
            
            <div className="relative bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed">
                To be the premier partner for AI-powered digital transformation, 
                helping businesses of all sizes harness the power of artificial intelligence 
                to solve complex problems and create sustainable competitive advantages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
