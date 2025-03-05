
import { useState, useRef, useEffect } from 'react';
import { Bot, Code, MessageSquare, Layers, Plus, Trash2, Settings, Save, Play, Zap, Download, PanelLeft, Bot as BotIcon, GraduationCap, Brain, MessageCircle, MessagesSquare, PencilRuler, BookOpen, Sparkles, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

type BuilderTemplate = 'chatbot' | 'content-generator' | 'customer-support' | 'education' | 'custom';
type ComponentType = 'text-input' | 'message' | 'action-button' | 'selection' | 'image-upload';

interface BuilderComponent {
  id: string;
  type: ComponentType;
  properties: Record<string, any>;
}

const AIBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<BuilderTemplate | null>(null);
  const [components, setComponents] = useState<BuilderComponent[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<ComponentType | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [aiName, setAiName] = useState('My Custom AI');
  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Template options with enhanced descriptions
  const templates = [
    { 
      id: 'chatbot', 
      name: 'Conversational Chatbot', 
      icon: <MessageCircle size={24} />, 
      description: 'Create an AI assistant that can engage in natural conversations with users and answer their questions intelligently.' 
    },
    { 
      id: 'content-generator', 
      name: 'Content Generator', 
      icon: <PencilRuler size={24} />, 
      description: 'Build an AI that generates various types of content from marketing copy to creative writing and social media posts.' 
    },
    { 
      id: 'customer-support', 
      name: 'Customer Support', 
      icon: <MessagesSquare size={24} />, 
      description: 'Design an automated support system that handles customer inquiries, troubleshooting, and ticket management.' 
    },
    { 
      id: 'education', 
      name: 'Educational Assistant', 
      icon: <GraduationCap size={24} />, 
      description: 'Create a learning companion that helps with studying, explanations, quizzes, and educational content.' 
    },
    { 
      id: 'custom', 
      name: 'Custom AI', 
      icon: <Brain size={24} />, 
      description: 'Start from scratch and build a completely customized AI solution tailored to your specific needs.' 
    }
  ];
  
  // Component palette options with enhanced descriptions
  const componentPalette: { type: ComponentType; name: string; icon: JSX.Element; description: string }[] = [
    { 
      type: 'text-input', 
      name: 'Text Input', 
      icon: <Code size={16} />,
      description: 'Lets users enter text or questions'
    },
    { 
      type: 'message', 
      name: 'Message', 
      icon: <MessageSquare size={16} />,
      description: 'Displays AI or user messages'
    },
    { 
      type: 'action-button', 
      name: 'Action Button', 
      icon: <Zap size={16} />,
      description: 'Triggers specific AI actions'
    },
    { 
      type: 'selection', 
      name: 'Selection', 
      icon: <Layers size={16} />,
      description: 'Provides multiple choice options'
    },
    { 
      type: 'image-upload', 
      name: 'Image Upload', 
      icon: <PanelLeft size={16} />,
      description: 'Allows image analysis functionality'
    }
  ];
  
  // Handle template selection
  const handleSelectTemplate = (template: BuilderTemplate) => {
    setSelectedTemplate(template);
    
    // Set default components based on template
    let defaultComponents: BuilderComponent[] = [];
    
    switch(template) {
      case 'chatbot':
        setAiName('Conversational Assistant');
        defaultComponents = [
          { id: 'welcome', type: 'message', properties: { text: 'Welcome! How can I help you today?', isUser: false } },
          { id: 'input', type: 'text-input', properties: { placeholder: 'Type your message...' } }
        ];
        break;
      case 'content-generator':
        setAiName('Content Creator AI');
        defaultComponents = [
          { id: 'welcome', type: 'message', properties: { text: 'What type of content would you like to create?', isUser: false } },
          { id: 'selection', type: 'selection', properties: { options: ['Blog Post', 'Social Media', 'Email', 'Ad Copy'] } },
          { id: 'input', type: 'text-input', properties: { placeholder: 'Describe your content needs...' } }
        ];
        break;
      case 'customer-support':
        setAiName('Support Assistant');
        defaultComponents = [
          { id: 'welcome', type: 'message', properties: { text: 'Welcome to customer support! What do you need help with?', isUser: false } },
          { id: 'selection', type: 'selection', properties: { options: ['Product Issues', 'Billing', 'Returns', 'Other'] } },
          { id: 'input', type: 'text-input', properties: { placeholder: 'Explain your issue...' } }
        ];
        break;
      case 'education':
        setAiName('Learning Assistant');
        defaultComponents = [
          { id: 'welcome', type: 'message', properties: { text: 'Ready to learn! What subject are you studying?', isUser: false } },
          { id: 'selection', type: 'selection', properties: { options: ['Math', 'Science', 'History', 'Language', 'Programming'] } },
          { id: 'input', type: 'text-input', properties: { placeholder: 'Ask your question...' } }
        ];
        break;
      case 'custom':
        setAiName('My Custom AI');
        defaultComponents = [
          { id: 'welcome', type: 'message', properties: { text: 'Hello! This is a custom AI assistant.', isUser: false } },
          { id: 'input', type: 'text-input', properties: { placeholder: 'Start typing...' } }
        ];
        break;
    }
    
    setComponents(defaultComponents);
    
    // Show success toast
    toast({
      title: "Template Selected",
      description: `You're now building with the ${template.replace('-', ' ')} template!`,
    });
  };
  
  // Handle drag start
  const handleDragStart = (type: ComponentType) => {
    setDraggedComponent(type);
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (canvasRef.current) {
      canvasRef.current.classList.add('active');
    }
  };
  
  // Handle drag leave
  const handleDragLeave = () => {
    if (canvasRef.current) {
      canvasRef.current.classList.remove('active');
    }
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (canvasRef.current) {
      canvasRef.current.classList.remove('active');
    }
    
    if (draggedComponent) {
      const newComponent: BuilderComponent = {
        id: `component-${Date.now()}`,
        type: draggedComponent,
        properties: getDefaultProperties(draggedComponent)
      };
      
      setComponents([...components, newComponent]);
      setDraggedComponent(null);
      
      toast({
        title: "Component Added",
        description: `New ${draggedComponent.replace('-', ' ')} added to your AI`,
      });
    }
  };
  
  // Get default properties for component types
  const getDefaultProperties = (type: ComponentType) => {
    switch(type) {
      case 'text-input':
        return { placeholder: 'Enter text here...' };
      case 'message':
        return { text: 'This is a message', isUser: false };
      case 'action-button':
        return { text: 'Click Me', action: 'submit' };
      case 'selection':
        return { options: ['Option 1', 'Option 2', 'Option 3'] };
      case 'image-upload':
        return { maxSize: '5MB', acceptedTypes: 'image/*' };
      default:
        return {};
    }
  };
  
  // Handle component removal
  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    
    toast({
      title: "Component Removed",
      description: "Component has been removed from your AI",
    });
  };
  
  // Handle saving the AI
  const handleSaveAI = () => {
    toast({
      title: "AI Saved Successfully",
      description: `Your ${aiName} has been saved!`,
    });
  };
  
  // Handle preview toggle
  const togglePreview = () => {
    setShowPreview(!showPreview);
    
    toast({
      title: showPreview ? "Edit Mode" : "Preview Mode",
      description: showPreview ? "You can now edit your AI components" : "You can now preview how your AI will work",
    });
  };
  
  // Handle exporting the AI
  const handleExport = () => {
    toast({
      title: "AI Configuration Exported",
      description: "Your AI configuration has been downloaded as JSON",
    });
    
    // Create download file
    const aiConfig = {
      name: aiName,
      template: selectedTemplate,
      components: components
    };
    
    const dataStr = JSON.stringify(aiConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', dataUri);
    downloadLink.setAttribute('download', `${aiName.replace(/\s+/g, '-').toLowerCase()}-config.json`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  
  // Render component based on type with enhanced styling
  const renderComponent = (component: BuilderComponent) => {
    switch(component.type) {
      case 'text-input':
        return (
          <div className="bg-white rounded-lg p-3 border border-border w-full shadow-sm">
            <input 
              type="text" 
              placeholder={component.properties.placeholder} 
              className="w-full p-2 border border-border rounded-md focus:border-purple focus:ring-1 focus:ring-purple/30 outline-none transition"
              disabled={showPreview}
            />
          </div>
        );
      case 'message':
        return (
          <div className={`p-4 rounded-lg max-w-[80%] ${component.properties.isUser ? 'bg-purple-100 ml-auto' : 'bg-gray-100'} shadow-sm`}>
            {component.properties.text}
          </div>
        );
      case 'action-button':
        return (
          <button className="btn-primary py-2 px-4 shadow-sm hover:shadow">{component.properties.text}</button>
        );
      case 'selection':
        return (
          <div className="flex flex-wrap gap-2 my-2">
            {component.properties.options.map((option: string, i: number) => (
              <button 
                key={i} 
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm shadow-sm transition"
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'image-upload':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple/50 transition-colors">
            <PanelLeft className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Upload Image (Max {component.properties.maxSize})</p>
            <p className="text-xs text-gray-400 mt-1">Drag & drop or click to browse</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">AI Builder</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Create your own custom AI without coding. Choose a template or start from scratch and 
            customize every aspect of your AI assistant.
          </p>
        </div>
        
        {!selectedTemplate ? (
          // Template selection screen with enhanced UI
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md mb-8">
              <div className="flex items-center mb-4">
                <Sparkles className="text-purple mr-3" size={20} />
                <h2 className="text-xl font-semibold">Choose a Template to Get Started</h2>
              </div>
              <p className="text-muted-foreground mb-6">Select the type of AI assistant you want to build from our pre-configured templates below.</p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {templates.map((template) => (
                  <motion.div 
                    key={template.id}
                    className="builder-template hover-lift"
                    onClick={() => handleSelectTemplate(template.id as BuilderTemplate)}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -8,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="builder-template-icon">
                      {template.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{template.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Builder interface with enhanced UI and responsiveness
          <div className="relative">
            {/* Sidebar toggle button for mobile */}
            <button 
              className="lg:hidden fixed z-20 left-4 top-20 bg-white p-2 rounded-full shadow-md mb-4"
              onClick={toggleSidebar}
            >
              <Layers size={20} className="text-purple" />
            </button>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar - collapsible on mobile */}
              <div className={`bg-white rounded-xl shadow-md p-5 h-fit transition-all duration-300 ${showSidebar ? 'block' : 'hidden lg:block'} ${showSidebar ? 'fixed lg:static z-10 top-20 left-4 right-4 lg:z-0' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center">
                    <PencilRuler size={18} className="mr-2 text-purple" />
                    Component Palette
                  </h3>
                  {showSidebar && (
                    <button className="lg:hidden text-gray-500" onClick={toggleSidebar}>
                      <X size={18} />
                    </button>
                  )}
                </div>
                
                <div className="component-palette">
                  {componentPalette.map((component) => (
                    <div
                      key={component.type}
                      className="draggable-component group"
                      draggable
                      onDragStart={() => handleDragStart(component.type)}
                    >
                      <div className="flex items-center mb-1">
                        <div className="bg-purple/10 p-1.5 rounded-md mr-2">
                          {component.icon}
                        </div>
                        <span className="text-sm font-medium">{component.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground hidden group-hover:block">{component.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Settings size={18} className="mr-2 text-purple" />
                    AI Settings
                  </h3>
                  <div className="mt-3 space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground block mb-1">AI Name</label>
                      <input 
                        type="text" 
                        value={aiName} 
                        onChange={(e) => setAiName(e.target.value)}
                        className="w-full p-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-purple focus:border-purple outline-none transition"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-muted-foreground block mb-1">Template</label>
                      <select 
                        className="w-full p-2 border border-border rounded-lg text-sm focus:ring-1 focus:ring-purple focus:border-purple outline-none transition"
                        value={selectedTemplate}
                        onChange={(e) => handleSelectTemplate(e.target.value as BuilderTemplate)}
                      >
                        {templates.map(t => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 mt-6">
                  <button 
                    className="btn-primary py-2.5 flex items-center justify-center gap-2 shadow-md"
                    onClick={handleSaveAI}
                  >
                    <Save size={16} /> Save AI
                  </button>
                  <button 
                    className="btn-outline py-2.5 flex items-center justify-center gap-2"
                    onClick={togglePreview}
                  >
                    <Play size={16} /> {showPreview ? 'Edit Mode' : 'Preview'}
                  </button>
                  <button 
                    className="text-muted-foreground hover:text-foreground py-2 flex items-center justify-center gap-2 text-sm"
                    onClick={handleExport}
                  >
                    <Download size={16} /> Export Configuration
                  </button>
                </div>
                
                {/* Mobile only - close sidebar button */}
                {showSidebar && (
                  <button 
                    className="lg:hidden mt-4 w-full py-2 text-center text-sm text-purple border border-purple rounded-lg"
                    onClick={toggleSidebar}
                  >
                    Back to Builder
                  </button>
                )}
              </div>
              
              {/* Main Builder Canvas */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-md p-5 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple/10 p-2 rounded-lg mr-3">
                        <BotIcon className="text-purple" size={22} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-lg">{aiName}</h2>
                        <p className="text-xs text-muted-foreground">
                          {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1).replace('-', ' ')} Template
                        </p>
                      </div>
                    </div>
                    <div className="text-xs px-3 py-1.5 bg-purple/10 text-purple rounded-full font-medium">
                      {showPreview ? 'Preview Mode' : 'Edit Mode'}
                    </div>
                  </div>
                </div>
                
                <div 
                  ref={canvasRef}
                  className="builder-canvas"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {components.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <div className="bg-purple/5 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                        <Plus size={24} className="text-purple/70" />
                      </div>
                      <h3 className="font-medium mb-2">Your AI Canvas is Empty</h3>
                      <p className="text-sm">Drag and drop components from the palette to build your AI</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {components.map((component) => (
                        <div key={component.id} className="relative">
                          {!showPreview && (
                            <div className="absolute -top-3 -right-3 z-10 flex gap-2">
                              <button 
                                className="bg-red-500 text-white p-1.5 rounded-full shadow-sm hover:bg-red-600 transition"
                                onClick={() => handleRemoveComponent(component.id)}
                              >
                                <Trash2 size={14} />
                              </button>
                              <button 
                                className="bg-gray-200 text-gray-700 p-1.5 rounded-full shadow-sm hover:bg-gray-300 transition"
                              >
                                <Settings size={14} />
                              </button>
                            </div>
                          )}
                          {renderComponent(component)}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AIBuilder;
