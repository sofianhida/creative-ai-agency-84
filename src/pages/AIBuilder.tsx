
import { useState, useRef, useEffect } from 'react';
import { Bot, Code, MessageSquare, Layers, Plus, Trash2, Settings, Save, Play, Zap, Download, PanelLeft, Bot as BotIcon, GraduationCap, Brain, MessageCircle, MessagesSquare, PencilRuler } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useToast } from '@/components/ui/use-toast';

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
  
  // Template options
  const templates = [
    { id: 'chatbot', name: 'Conversational Chatbot', icon: <MessageCircle size={24} />, description: 'General purpose AI chatbot' },
    { id: 'content-generator', name: 'Content Generator', icon: <PencilRuler size={24} />, description: 'Create marketing content, emails, etc.' },
    { id: 'customer-support', name: 'Customer Support', icon: <MessagesSquare size={24} />, description: 'Handle customer inquiries automatically' },
    { id: 'education', name: 'Educational Assistant', icon: <GraduationCap size={24} />, description: 'Help with learning and education' },
    { id: 'custom', name: 'Custom AI', icon: <Brain size={24} />, description: 'Build your own custom AI from scratch' }
  ];
  
  // Component palette options
  const componentPalette: { type: ComponentType; name: string; icon: JSX.Element }[] = [
    { type: 'text-input', name: 'Text Input', icon: <Code size={16} /> },
    { type: 'message', name: 'Message', icon: <MessageSquare size={16} /> },
    { type: 'action-button', name: 'Action Button', icon: <Zap size={16} /> },
    { type: 'selection', name: 'Selection', icon: <Layers size={16} /> },
    { type: 'image-upload', name: 'Image Upload', icon: <PanelLeft size={16} /> }
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
  
  // Render component based on type
  const renderComponent = (component: BuilderComponent) => {
    switch(component.type) {
      case 'text-input':
        return (
          <div className="bg-white rounded-lg p-2 border border-border w-full">
            <input 
              type="text" 
              placeholder={component.properties.placeholder} 
              className="w-full p-2 border border-border rounded-md"
              disabled={showPreview}
            />
          </div>
        );
      case 'message':
        return (
          <div className={`p-3 rounded-lg max-w-[80%] ${component.properties.isUser ? 'bg-purple-100 ml-auto' : 'bg-gray-100'}`}>
            {component.properties.text}
          </div>
        );
      case 'action-button':
        return (
          <button className="btn-primary py-2 px-4">{component.properties.text}</button>
        );
      case 'selection':
        return (
          <div className="flex flex-wrap gap-2 my-2">
            {component.properties.options.map((option: string, i: number) => (
              <button 
                key={i} 
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'image-upload':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <PanelLeft className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">Upload Image (Max {component.properties.maxSize})</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">AI Builder</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your own custom AI without coding. Choose a template or start from scratch and 
            customize every aspect of your AI assistant.
          </p>
        </div>
        
        {!selectedTemplate ? (
          // Template selection screen
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
            <div className="builder-templates">
              {templates.map((template) => (
                <div 
                  key={template.id}
                  className="builder-template hover-lift"
                  onClick={() => handleSelectTemplate(template.id as BuilderTemplate)}
                >
                  <div className="builder-template-icon">
                    {template.icon}
                  </div>
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Builder interface
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-4 h-fit">
              <h3 className="font-semibold mb-3">Component Palette</h3>
              <div className="component-palette">
                {componentPalette.map((component) => (
                  <div
                    key={component.type}
                    className="draggable-component"
                    draggable
                    onDragStart={() => handleDragStart(component.type)}
                  >
                    <div className="flex items-center">
                      {component.icon}
                      <span className="ml-2 text-sm">{component.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-3">AI Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">AI Name</label>
                    <input 
                      type="text" 
                      value={aiName} 
                      onChange={(e) => setAiName(e.target.value)}
                      className="w-full p-2 border border-border rounded-md text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1">Template</label>
                    <select 
                      className="w-full p-2 border border-border rounded-md text-sm"
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
              
              <div className="flex flex-col gap-2 mt-6">
                <button 
                  className="btn-primary py-2 flex items-center justify-center gap-2"
                  onClick={handleSaveAI}
                >
                  <Save size={16} /> Save AI
                </button>
                <button 
                  className="btn-outline py-2 flex items-center justify-center gap-2"
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
            </div>
            
            {/* Main Builder Canvas */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BotIcon className="text-purple mr-2" size={20} />
                    <h2 className="font-semibold">{aiName}</h2>
                  </div>
                  <div className="text-xs px-2 py-1 bg-purple/10 text-purple rounded-full">
                    {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1).replace('-', ' ')}
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
                  <div className="text-center text-muted-foreground py-8">
                    <Plus size={24} className="mx-auto mb-2" />
                    <p>Drag and drop components here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {components.map((component) => (
                      <div key={component.id} className="relative">
                        {!showPreview && (
                          <div className="absolute -top-2 -right-2 z-10 flex gap-1">
                            <button 
                              className="bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600"
                              onClick={() => handleRemoveComponent(component.id)}
                            >
                              <Trash2 size={12} />
                            </button>
                            <button 
                              className="bg-gray-200 text-gray-700 p-1 rounded-full shadow-sm hover:bg-gray-300"
                            >
                              <Settings size={12} />
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
        )}
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AIBuilder;
