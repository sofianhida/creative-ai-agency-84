
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
        title: "Message Sent!",
        description: "Thank you for your message. Our team will contact you shortly.",
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
      details: "falco@falcotk.space",
      action: () => window.location.href = "mailto:falco@falcotk.space"
    },
    {
      icon: <MapPin size={24} className="text-purple" />,
      title: "Location",
      details: "Indonesia, Central Java, Batang Regency",
      action: null
    }
  ];

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden bg-purple/5">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple/10 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="section">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title">Contact <span className="text-purple">Us</span></h2>
          <p className="section-subtitle">
            Have questions or want to start a project? Don't hesitate to reach out to our team.
          </p>
          
          <div className="grid md:grid-cols-5 gap-6 md:gap-8 mt-10 md:mt-12">
            <div className="md:col-span-2 space-y-6">
              <div className="glass-card p-4 md:p-6">
                <h3 className="text-xl font-bold mb-4 md:mb-6">Contact Information</h3>
                
                <div className="space-y-4 md:space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-white p-2 md:p-3 rounded-lg shadow-soft flex-shrink-0">
                        {method.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{method.title}</p>
                        <p className="text-foreground/70 text-sm md:text-base">{method.details}</p>
                        {method.action && (
                          <button 
                            onClick={method.action} 
                            className="text-purple hover:text-purple-dark flex items-center mt-1 text-sm underline-animation"
                          >
                            Contact Us <ArrowRight size={14} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 md:mt-8">
                  <h4 className="font-semibold mb-2 md:mb-3">Operating Hours</h4>
                  <p className="text-foreground/70 text-sm md:text-base">Monday - Friday: 09:00 - 17:00</p>
                  <p className="text-foreground/70 text-sm md:text-base">Saturday: 09:00 - 13:00</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-4 md:p-6">
                <h3 className="text-xl font-bold mb-4 md:mb-6">Send Message</h3>
                
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 md:mb-2 font-medium text-sm md:text-base">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition text-sm md:text-base"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 md:mb-2 font-medium text-sm md:text-base">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition text-sm md:text-base"
                      placeholder="email@company.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1 md:mb-2 font-medium text-sm md:text-base">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition text-sm md:text-base"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center text-sm md:text-base mt-2"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
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
