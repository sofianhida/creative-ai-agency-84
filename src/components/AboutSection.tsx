
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
    'AI solutions tailored to business needs',
    'Expert team with experience in AI and machine learning',
    'Utilization of the latest technology for best results',
    'Full support during and after implementation',
    'Price transparency with no hidden fees',
    'Customer satisfaction guarantee'
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-purple/5">
      <div className="section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple/10 rounded-full px-4 py-2 text-sm text-purple-dark">
              <span>About WeVersAI</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">
              Advancing Your Business <br />
              <span className="text-purple">With Artificial Intelligence</span>
            </h2>
            
            <p className="text-foreground/80">
              WeVersAI is a leading AI agency focused on developing AI solutions that can
              help your business achieve maximum efficiency and competitive advantage. We believe
              that AI technology is the key to successful digital transformation.
            </p>
            
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 size={20} className="text-purple mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <a href="#contact" className="btn-primary">
                Start Consultation
              </a>
            </div>
          </div>
          
          <div className={`space-y-8 ${inView ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            <div className="relative z-10">
              <div className="bg-white rounded-2xl p-8 shadow-soft relative z-10 tilt-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            
            <div className="relative bg-white rounded-2xl p-8 shadow-soft tilt-card">
              <h3 className="text-xl font-bold mb-4">Our Vision</h3>
              <p className="text-foreground/80">
                To be a trusted partner in digital transformation, helping businesses
                adopt and implement innovative and sustainable AI technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
