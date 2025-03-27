
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Package, Star, Sparkles, BookOpen, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Set page title
    document.title = "Our Products | WeVersAI";
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Product features data
  const productFeatures = [
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "AI-Powered Analytics",
      description: "Advanced analytics features powered by machine learning algorithms."
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      title: "Enterprise Security",
      description: "Secure data handling with end-to-end encryption and compliance."
    },
    {
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      title: "Real-time Processing",
      description: "Process data in real-time with minimal latency and high throughput."
    },
    {
      icon: <BookOpen className="h-5 w-5 text-orange-500" />,
      title: "Comprehensive Documentation",
      description: "Detailed documentation and guides for easy implementation."
    }
  ];

  // Our products data
  const ourProducts = [
    {
      title: "EduVerseAI",
      description: "An AI-powered educational platform for interactive learning",
      url: "https://eduverse-ai--eight.vercel.app/",
      color: "from-blue-400/20 to-blue-500/40",
      icon: <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500"><Sparkles size={20} /></div>
    },
    {
      title: "Class Scheduler",
      description: "Intelligent scheduling system for educational institutions",
      url: "https://class-scheduler-ai-05-mszh4haau-sofian-hidayats-projects.vercel.app/",
      color: "from-green-400/20 to-green-500/40",
      icon: <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-500"><Zap size={20} /></div>
    },
    {
      title: "WebJob",
      description: "AI-powered job matching and recruitment platform",
      url: "https://webjob-cyan.vercel.app/",
      color: "from-orange-400/20 to-orange-500/40",
      icon: <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500"><Star size={20} /></div>
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Back navigation */}
      <div className="container mx-auto px-4 absolute top-20 left-0">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeftIcon size={16} />
          <span>Back to Home</span>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-purple/30 border-t-purple rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <motion.div 
            className="max-w-6xl mx-auto px-4 mb-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple/20 to-purple/30 flex items-center justify-center">
              <Package className="w-10 h-10 text-purple" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-6 text-gray-800">
              Our Products
            </h1>
            
            <div className="w-32 h-1 bg-gradient-to-r from-purple/30 to-purple mx-auto mb-8 rounded-full"></div>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Discover our suite of AI-powered products designed to revolutionize your business operations.
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-6xl mx-auto px-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">WeVersAI Suite</h2>
                  <p className="text-gray-600 mb-6">
                    Our flagship product combines AI-powered analytics, natural language processing, and computer vision in one comprehensive platform.
                  </p>
                  
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-white">Product Modules</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {[
                              { title: "Analytics Engine", description: "Process and analyze large datasets" },
                              { title: "NLP Module", description: "Natural language processing capabilities" },
                              { title: "Vision AI", description: "Advanced computer vision algorithms" },
                              { title: "Decision System", description: "AI-powered decision making support" }
                            ].map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <a
                                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100"
                                  >
                                    <div className="text-sm font-medium leading-none">{item.title}</div>
                                    <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                      {item.description}
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {productFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                        <div className="mt-1">{feature.icon}</div>
                        <div>
                          <h3 className="font-medium text-gray-800">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="lg:w-[300px] rounded-xl overflow-hidden shadow-md relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple/30 to-purple flex items-center justify-center">
                    <div className="text-center px-6">
                      <span className="font-display text-2xl font-bold text-white mb-4 block">WeVersAI Suite</span>
                      <div className="w-16 h-1 bg-white/50 mx-auto mb-4"></div>
                      <p className="text-white/80 text-sm mb-6">
                        Our comprehensive AI solution to transform your business
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="max-w-6xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Our AI Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ourProducts.map((product, index) => (
                  <Card 
                    key={index}
                    className="overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${product.color} opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                    <CardHeader className="relative">
                      {product.icon}
                      <CardTitle className="mt-4">{product.title}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <a 
                        href={product.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-purple hover:text-purple/80 flex items-center gap-2 font-medium"
                      >
                        Visit Product <ExternalLink size={16} />
                      </a>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="inline-block bg-gray-100 rounded-full py-1 px-3 text-xs text-gray-600">
                        AI Solution
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-16">
              <p className="text-gray-600 mb-6">
                Want to know more about our products or need a custom solution?
              </p>
              
              <Button asChild className="bg-purple hover:bg-purple/90">
                <Link to="/#contact">Contact Our Team</Link>
              </Button>
            </div>
          </motion.div>
        </>
      )}
      
      {/* Decorative elements */}
      <div className="absolute left-20 top-1/4 w-64 h-64 rounded-full bg-purple/5 opacity-30"></div>
      <div className="absolute right-10 bottom-1/3 w-32 h-32 rounded-full border border-purple/10 animate-pulse opacity-20"></div>
    </div>
  );
};

export default Products;
