
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
    'Solusi AI yang disesuaikan dengan kebutuhan bisnis',
    'Tim ahli dengan pengalaman di bidang AI dan machine learning',
    'Penggunaan teknologi terbaru untuk hasil terbaik',
    'Dukungan penuh selama dan setelah implementasi',
    'Transparansi harga tanpa biaya tersembunyi',
    'Jaminan kepuasan pelanggan'
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-purple/5">
      <div className="section">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-purple/10 rounded-full px-4 py-2 text-sm text-purple-dark">
              <span>Tentang WeVersAI</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight">
              Memajukan Bisnis Anda <br />
              <span className="text-purple">Dengan Kecerdasan Buatan</span>
            </h2>
            
            <p className="text-foreground/80">
              WeVersAI adalah agensi AI terdepan yang berfokus pada pengembangan solusi AI yang dapat 
              membantu bisnis Anda mencapai efisiensi maksimal dan keunggulan kompetitif. Kami percaya 
              bahwa teknologi AI adalah kunci untuk transformasi digital yang sukses.
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
                Mulai Konsultasi
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
              <h3 className="text-xl font-bold mb-4">Visi Kami</h3>
              <p className="text-foreground/80">
                Menjadi partner terpercaya dalam transformasi digital, membantu bisnis dalam 
                mengadopsi dan mengimplementasikan teknologi AI yang inovatif dan berkelanjutan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
