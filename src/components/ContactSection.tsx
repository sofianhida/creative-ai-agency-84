
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Mail, MapPin, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactWhatsApp = () => {
    window.open(`https://wa.me/6285183978011`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <MessageSquare size={24} className="text-purple" />,
      title: "WhatsApp",
      details: "+62 85183978011",
      action: contactWhatsApp
    },
    {
      icon: <Mail size={24} className="text-purple" />,
      title: "Email",
      details: "info@nekoai.com",
      action: () => window.location.href = "mailto:info@nekoai.com"
    },
    {
      icon: <MapPin size={24} className="text-purple" />,
      title: "Lokasi",
      details: "Jakarta, Indonesia",
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-purple/5">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Hubungi <span className="text-purple">Kami</span></h2>
          <p className="section-subtitle">
            Ada pertanyaan atau ingin memulai proyek? Jangan ragu untuk menghubungi tim kami.
          </p>
          
          <div className="grid md:grid-cols-5 gap-8 mt-12">
            <div className="md:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-6">Informasi Kontak</h3>
                
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-white p-3 rounded-lg shadow-soft">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{method.title}</p>
                        <p className="text-foreground/70">{method.details}</p>
                        {method.action && (
                          <button 
                            onClick={method.action} 
                            className="text-purple hover:text-purple-dark flex items-center mt-1 underline-animation"
                          >
                            Hubungi Kami <ArrowRight size={16} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Jam Operasional</h4>
                  <p className="text-foreground/70">Senin - Jumat: 09:00 - 17:00</p>
                  <p className="text-foreground/70">Sabtu: 09:00 - 13:00</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-6">
                <h3 className="text-xl font-bold mb-6">Kirim Pesan</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Nama</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition"
                      placeholder="Nama Anda"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition"
                      placeholder="email@perusahaan.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Pesan</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition"
                      placeholder="Bagaimana kami dapat membantu Anda?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
