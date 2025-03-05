
import { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, ChevronDown, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/components/ui/use-toast';

// Define category types
type Category = 'All' | 'Chatbot' | 'Marketing' | 'Analytics' | 'Support';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
}

const AIMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  
  // Sample product data
  useEffect(() => {
    const demoProducts: Product[] = [
      {
        id: '1',
        name: 'Enterprise AI Chatbot',
        description: 'Fully customizable AI chatbot for customer service with 24/7 support and multi-language capabilities.',
        price: 499,
        category: 'Chatbot',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2030&auto=format&fit=crop',
        rating: 4.8
      },
      {
        id: '2',
        name: 'AI Content Creator Pro',
        description: 'Generate high-quality marketing content, social media posts, and ads with AI-powered assistance.',
        price: 299,
        category: 'Marketing',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        rating: 4.5
      },
      {
        id: '3',
        name: 'WhatsApp Business Automation',
        description: 'Automate customer support via WhatsApp with AI responses, appointment scheduling, and more.',
        price: 349,
        category: 'Support',
        image: 'https://images.unsplash.com/photo-1577563936485-5b8029eb8b8e?q=80&w=2070&auto=format&fit=crop',
        rating: 4.7
      },
      {
        id: '4',
        name: 'Business Intelligence Dashboard',
        description: 'Comprehensive AI-powered analytics platform to visualize and understand your business data.',
        price: 599,
        category: 'Analytics',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        rating: 4.9
      },
      {
        id: '5',
        name: 'Social Media Content Generator',
        description: 'AI tool to create engaging social media content tailored to your brand voice and audience.',
        price: 199,
        category: 'Marketing',
        image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=2074&auto=format&fit=crop',
        rating: 4.3
      },
      {
        id: '6',
        name: 'Customer Support AI Agent',
        description: 'AI-powered virtual agent that handles customer inquiries and support tickets automatically.',
        price: 449,
        category: 'Support',
        image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop',
        rating: 4.6
      },
      {
        id: '7',
        name: 'Marketing Campaign Analyzer',
        description: 'AI analytics tool to optimize your marketing campaigns and improve ROI.',
        price: 399,
        category: 'Analytics',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop',
        rating: 4.4
      },
      {
        id: '8',
        name: 'Conversational AI Chatbot',
        description: 'Natural-sounding AI chatbot with personality customization and advanced conversation capabilities.',
        price: 349,
        category: 'Chatbot',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop',
        rating: 4.7
      }
    ];
    
    setProducts(demoProducts);
    setFilteredProducts(demoProducts);
  }, []);
  
  // Filter products based on category, price range, and search query
  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, minPrice, maxPrice, searchQuery, products]);
  
  // Handle adding to cart
  const handleAddToCart = (productId: string) => {
    toast({
      title: "Added to cart!",
      description: "This product has been added to your cart",
    });
  };
  
  // Handle buy now
  const handleBuyNow = (productId: string) => {
    toast({
      title: "Proceeding to checkout",
      description: "You'll be redirected to the payment page",
    });
  };
  
  // Category options
  const categories: Category[] = ['All', 'Chatbot', 'Marketing', 'Analytics', 'Support'];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI Marketplace</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and integrate powerful AI solutions tailored for your business needs. 
            From chatbots to analytics tools, find the perfect AI companion.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search AI solutions..."
              className="w-full py-2 pl-10 pr-4 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="marketplace-filters sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <Filter size={18} className="mr-2" /> Filters
                </h3>
                <button 
                  className="text-sm text-purple hover:underline"
                  onClick={() => {
                    setSelectedCategory('All');
                    setMinPrice(0);
                    setMaxPrice(1000);
                    setSearchQuery('');
                  }}
                >
                  Reset
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="category-filters">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex justify-between mb-2">
                  <span>${minPrice}</span>
                  <span>${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={minPrice} 
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full mb-2"
                />
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="marketplace-grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="marketplace-card">
                    <div className="marketplace-card-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="marketplace-card-content">
                      <span className="marketplace-card-category">{product.category}</span>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="flex items-center mt-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                          />
                        ))}
                        <span className="ml-1 text-sm text-muted-foreground">{product.rating}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
                      <div className="marketplace-card-price mb-4">${product.price}</div>
                      <div className="flex gap-2">
                        <button 
                          className="w-1/2 btn-outline py-2 text-sm flex items-center justify-center"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart size={16} className="mr-1" /> Add to Cart
                        </button>
                        <button 
                          className="w-1/2 btn-primary py-2 text-sm"
                          onClick={() => handleBuyNow(product.id)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AIMarketplace;
