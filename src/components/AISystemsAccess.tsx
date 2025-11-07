import { useState, useRef, useEffect } from 'react';
import { Lightbulb, X, Send, FileText, BookOpen, Globe, BarChart, FileSearch, Code, GraduationCap, ChevronRight,
  Image, MessageSquare, Music, Brain, Shapes, Flower2, ShieldCheck } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

// System contexts for different AI systems
const SYSTEM_CONTEXTS = {
  'content-generator': `
    You are WeVersAI's Content Generator AI assistant. 
    You specialize in creating high-quality content like articles, ads, social media captions, email copy, and marketing materials.
    Focus on being creative, engaging, and tailoring content to specific audiences and platforms.
    Always maintain the brand voice and address the user's specific content needs.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'text-summarization': `
    You are WeVersAI's Text Summarization AI assistant.
    You specialize in creating concise, accurate summaries of articles, documents, reports, and other text content.
    Focus on extracting key points, maintaining the original meaning, and delivering clear summaries of various lengths.
    Help users understand the main ideas without reading the entire text.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'translation': `
    You are WeVersAI's Translation AI assistant.
    You specialize in translating text between multiple languages while preserving meaning, context, and nuance.
    You can handle various content types from casual conversations to technical documents.
    Offer explanations about cultural nuances when relevant to ensure accurate communication.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'data-analytics': `
    You are WeVersAI's Data Analytics AI assistant.
    You specialize in helping with data interpretation, business intelligence, trend analysis, and data-driven insights.
    Focus on helping users understand patterns in their data, generate reports, and make data-driven decisions.
    Offer guidance on data visualization and analytical approaches.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'document-analyzer': `
    You are WeVersAI's Document Analyzer AI assistant. 
    You specialize in extracting and analyzing information from documents like PDFs, Word files, images of documents, and spreadsheets.
    Help users extract specific data points, convert documents to structured formats, and analyze document content.
    Focus on accuracy and structure in document processing.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'coding-assistant': `
    You are WeVersAI's Coding Assistant AI.
    You specialize in helping developers with programming tasks, debugging, code optimization, and learning new technologies.
    Provide code snippets, explain programming concepts, and help troubleshoot issues across various programming languages.
    Focus on clean, efficient, and maintainable code practices.
    When providing code examples, do not use markdown formatting with asterisks, just provide the code directly.
  `,
  'education': `
    You are WeVersAI's Education AI assistant.
    You specialize in creating educational content, lesson plans, study materials, and e-learning resources.
    Help educators and students with explanations of complex topics, quiz generation, and personalized learning materials.
    Focus on making learning engaging, accessible, and effective for various learning styles.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'image-description': `
    You are WeVersAI's Image Description AI assistant.
    You specialize in providing detailed, accurate descriptions of images.
    When images are uploaded, describe them in detail, including objects, people, scenes, colors, and other visual elements.
    If no image is provided, offer guidance on what kinds of images you can describe and how to upload them.
    Your descriptions should be objective, detailed, and useful for understanding the visual content.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'creative-writing': `
    You are WeVersAI's Creative Writing AI assistant.
    You specialize in generating creative content like stories, poems, scripts, dialogues, and other literary forms.
    Adapt your writing to different genres, styles, and tones based on user requests.
    Maintain narrative consistency, character development, and engaging language in your creative outputs.
    Offer creative variations when requested and be open to iterative refinement.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'music-lyrics': `
    You are WeVersAI's Music Lyrics AI assistant.
    You specialize in creating song lyrics across various genres, styles, and themes.
    Consider rhythm, rhyme, structure, and musical conventions when writing lyrics.
    Adapt to specific genre requests like pop, rock, hip-hop, country, etc.
    Create lyrics that convey emotions, tell stories, or explore themes as requested.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'brainstorming': `
    You are WeVersAI's Brainstorming AI assistant.
    You specialize in generating creative ideas for projects, businesses, marketing, content creation, and problem-solving.
    Provide diverse, innovative, and practical ideas tailored to the user's specific needs.
    Consider different angles, approaches, and possibilities for each brainstorming request.
    Help refine and expand on ideas when needed, offering constructive feedback and alternatives.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'pattern-recognition': `
    You are WeVersAI's Pattern Recognition AI assistant.
    You specialize in identifying patterns, trends, and insights in text data and information.
    Analyze text to identify recurring themes, relationships, correlations, and anomalies.
    Provide clear explanations of detected patterns and their potential implications.
    Help users understand complex information through pattern identification and analysis.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'nature-guide': `
    You are WeVersAI's Nature Guide AI assistant.
    You specialize in providing information about plants, animals, ecosystems, natural phenomena, and environmental topics.
    Offer accurate, educational content about species identification, habitats, behaviors, and ecological relationships.
    Address questions about conservation, sustainability, and human interaction with nature.
    Provide engaging, informative responses that foster appreciation for the natural world.
    Do not use markdown formatting like asterisks (*) in your responses.
  `,
  'security-advisor': `
    You are WeVersAI's Security Advisor AI assistant.
    You specialize in providing guidance on digital security, privacy, and best practices for online safety.
    Offer practical advice on password management, account security, safe browsing, and protection against common threats.
    Explain security concepts in clear, accessible terms for users with varying levels of technical knowledge.
    Provide educational information about current security trends and emerging threats.
    Do not use markdown formatting like asterisks (*) in your responses.
  `
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AISystemsAccessProps {
  showAIAccess: boolean;
  setShowAIAccess: (show: boolean) => void;
}

const AISystemsAccess = ({ showAIAccess, setShowAIAccess }: AISystemsAccessProps) => {
  const isMobile = useIsMobile();
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('english');
  const [summaryLength, setSummaryLength] = useState('medium');
  const [contentType, setContentType] = useState('article');
  const [visualizationType, setVisualizationType] = useState('chart');
  const [educationFormat, setEducationFormat] = useState('lesson');
  const [creativeFormat, setCreativeFormat] = useState('short story');
  const [musicGenre, setMusicGenre] = useState('pop');
  const [ideaCategory, setIdeaCategory] = useState('business');
  const [patternType, setPatternType] = useState('themes');
  const [natureCategory, setNatureCategory] = useState('animals');
  const [securityTopic, setSecurityTopic] = useState('passwords');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const aiSystems = [
    {
      id: 'content-generator',
      name: 'AI Content Generator',
      description: 'Generate articles, ads, captions, emails and more',
      icon: <FileText size={isMobile ? 20 : 24} />,
      color: 'from-blue-400/20 to-blue-500/10'
    },
    {
      id: 'text-summarization',
      name: 'AI Text Summarization',
      description: 'Automatic summaries for articles & documents',
      icon: <BookOpen size={isMobile ? 20 : 24} />,
      color: 'from-green-400/20 to-green-500/10'
    },
    {
      id: 'translation',
      name: 'AI Translation',
      description: 'Translate text between languages',
      icon: <Globe size={isMobile ? 20 : 24} />,
      color: 'from-amber-400/20 to-amber-500/10'
    },
    {
      id: 'data-analytics',
      name: 'AI for Data Analytics',
      description: 'Business intelligence & data analysis',
      icon: <BarChart size={isMobile ? 20 : 24} />,
      color: 'from-pink-400/20 to-pink-500/10'
    },
    {
      id: 'document-analyzer',
      name: 'AI Document Analyzer',
      description: 'Extract data from PDF, Word, and other documents',
      icon: <FileSearch size={isMobile ? 20 : 24} />,
      color: 'from-orange-400/20 to-orange-500/10'
    },
    {
      id: 'coding-assistant',
      name: 'AI Coding Assistant',
      description: 'Help developers with programming tasks',
      icon: <Code size={isMobile ? 20 : 24} />,
      color: 'from-cyan-400/20 to-cyan-500/10'
    },
    {
      id: 'education',
      name: 'AI for Education',
      description: 'Educational content & e-learning assistance',
      icon: <GraduationCap size={isMobile ? 20 : 24} />,
      color: 'from-violet-400/20 to-violet-500/10'
    },
    {
      id: 'image-description',
      name: 'AI Image Description',
      description: 'Generate detailed descriptions of images',
      icon: <Image size={isMobile ? 20 : 24} />,
      color: 'from-indigo-400/20 to-indigo-500/10'
    },
    {
      id: 'creative-writing',
      name: 'AI Creative Writing',
      description: 'Generate stories, poems, scripts, and creative content',
      icon: <MessageSquare size={isMobile ? 20 : 24} />,
      color: 'from-teal-400/20 to-teal-500/10'
    },
    {
      id: 'music-lyrics',
      name: 'AI Music Lyrics',
      description: 'Create song lyrics in various genres and styles',
      icon: <Music size={isMobile ? 20 : 24} />,
      color: 'from-rose-400/20 to-rose-500/10'
    },
    {
      id: 'brainstorming',
      name: 'AI Brainstorming',
      description: 'Generate ideas for projects, businesses, and more',
      icon: <Brain size={isMobile ? 20 : 24} />,
      color: 'from-emerald-400/20 to-emerald-500/10'
    },
    {
      id: 'pattern-recognition',
      name: 'AI Pattern Recognition',
      description: 'Identify patterns and insights in text data',
      icon: <Shapes size={isMobile ? 20 : 24} />,
      color: 'from-sky-400/20 to-sky-500/10'
    },
    {
      id: 'nature-guide',
      name: 'AI Nature Guide',
      description: 'Information about plants, animals, and natural phenomena',
      icon: <Flower2 size={isMobile ? 20 : 24} />,
      color: 'from-lime-400/20 to-lime-500/10'
    },
    {
      id: 'security-advisor',
      name: 'AI Security Advisor',
      description: 'Guidance on digital security best practices',
      icon: <ShieldCheck size={isMobile ? 20 : 24} />,
      color: 'from-amber-400/20 to-amber-500/10'
    }
  ];

  const closePanel = () => {
    if (selectedSystem) {
      setSelectedSystem(null);
      resetSystemStates();
    } else {
      setShowAIAccess(false);
    }
  };
  
  const resetSystemStates = () => {
    setUploadedFile(null);
    setFileContent(null);
    setCodeLanguage('javascript');
    setSourceLang('auto');
    setTargetLang('english');
    setSummaryLength('medium');
    setContentType('article');
    setVisualizationType('chart');
    setEducationFormat('lesson');
    setCreativeFormat('short story');
    setMusicGenre('pop');
    setIdeaCategory('business');
    setPatternType('themes');
    setNatureCategory('animals');
    setSecurityTopic('passwords');
    setMessages([]);
    setInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const selectSystem = (systemId: string) => {
    setSelectedSystem(systemId);
    resetSystemStates();
    
    const systemContext = SYSTEM_CONTEXTS[systemId as keyof typeof SYSTEM_CONTEXTS];
    const systemName = getSystemName(systemId);
    
    setMessages([
      { role: 'system', content: systemContext },
      { role: 'assistant', content: `Hello! I'm the ${systemName} AI. How can I assist you today?` }
    ]);
    
    toast({
      title: `${getSystemName(systemId)} Selected`,
      description: "You can now interact with this AI system",
    });
  };

  const getSystemName = (systemId: string): string => {
    const system = aiSystems.find(sys => sys.id === systemId);
    return system ? system.name : 'AI System';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      
      // Read file content
      const reader = new FileReader();
      
      if (file.type.includes('image')) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
      
      reader.onload = () => {
        setFileContent(reader.result);
        toast({
          title: "File Uploaded",
          description: `${file.name} is ready for analysis`,
        });
      };
      
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read file",
          variant: "destructive",
        });
      };
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      
      // Read file content
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        setFileContent(reader.result);
        toast({
          title: "Image Uploaded",
          description: `${file.name} is ready for analysis`,
        });
      };
      
      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to read image file",
          variant: "destructive",
        });
      };
    }
  };

  const sendMessage = async () => {
    if ((!input.trim() && !uploadedFile && !fileContent) || !selectedSystem) return;
    
    let messageContent = input;
    
    switch (selectedSystem) {
      case 'text-summarization':
        messageContent = `Please provide a ${summaryLength} length summary of the following text: ${input}`;
        break;
      case 'translation':
        messageContent = `Translate the following text from ${sourceLang} to ${targetLang}: ${input}`;
        break;
      case 'content-generator':
        messageContent = `Generate a ${contentType} about: ${input}`;
        break;
      case 'data-analytics':
        messageContent = `Analyze this data and provide insights with ${visualizationType} visualization recommendations: ${input}`;
        break;
      case 'document-analyzer':
        messageContent = uploadedFile 
          ? `I've uploaded a file named ${uploadedFile.name}. ${input ? input : 'Please analyze it and extract the key information'}`
          : `Analyze this text as if it were a document: ${input}`;
        break;
      case 'coding-assistant':
        messageContent = `Using ${codeLanguage}, ${input}`;
        break;
      case 'education':
        messageContent = `Create a ${educationFormat} about: ${input}`;
        break;
      case 'image-description':
        messageContent = uploadedFile 
          ? `I've uploaded an image named ${uploadedFile.name}. ${input ? input : 'Please describe it in detail'}`
          : `Describe this hypothetical image based on my description: ${input}`;
        break;
      case 'creative-writing':
        messageContent = `Write a ${creativeFormat} about: ${input}`;
        break;
      case 'music-lyrics':
        messageContent = `Write ${musicGenre} song lyrics about: ${input}`;
        break;
      case 'brainstorming':
        messageContent = `Generate creative ideas in the ${ideaCategory} category about: ${input}`;
        break;
      case 'pattern-recognition':
        messageContent = `Analyze this text and identify ${patternType} patterns: ${input}`;
        break;
      case 'nature-guide':
        messageContent = `Provide information about this ${natureCategory} topic: ${input}`;
        break;
      case 'security-advisor':
        messageContent = `Provide security advice about ${securityTopic}: ${input}`;
        break;
    }
    
    const userMessage = { role: 'user' as const, content: messageContent };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemContext = SYSTEM_CONTEXTS[selectedSystem as keyof typeof SYSTEM_CONTEXTS];
      
      // Prepare messages for backend
      const apiMessages = [
        { role: 'system', content: systemContext },
        ...messages.filter(msg => msg.role !== 'system')
      ];

      console.log(`Sending to AI backend for ${selectedSystem}`);

      // Extract text content from files if needed
      let extractedFileContent = null;
      if (uploadedFile && fileContent) {
        if (uploadedFile.type.includes('image')) {
          extractedFileContent = `[Image file: ${uploadedFile.name}]\nNote: Image content analysis requires multimodal capabilities.`;
        } else if (typeof fileContent === 'string') {
          extractedFileContent = fileContent;
        }
      }

      // Call backend edge function with better error handling
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          messages: [...apiMessages, { role: 'user', content: messageContent }],
          systemId: selectedSystem,
          fileContent: extractedFileContent
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to get AI response');
      }

      if (data?.error) {
        console.error('AI error:', data.error);
        
        // Handle specific error codes
        if (data.code === 'RATE_LIMIT') {
          toast({
            title: "Rate Limit",
            description: data.error,
            variant: "destructive",
          });
          setMessages(prev => [
            ...prev, 
            { role: 'assistant', content: data.error }
          ]);
          return;
        }
        
        if (data.code === 'PAYMENT_REQUIRED') {
          toast({
            title: "Usage Limit",
            description: data.error,
            variant: "destructive",
          });
          setMessages(prev => [
            ...prev, 
            { role: 'assistant', content: data.error }
          ]);
          return;
        }
        
        throw new Error(data.error);
      }

      const assistantResponse = data.response;

      if (!assistantResponse) {
        throw new Error('Empty response from AI');
      }

      console.log(`Received response using ${data.model || 'AI model'}`);

      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: assistantResponse }
      ]);
      
      if ((selectedSystem === 'document-analyzer' || selectedSystem === 'image-description') && uploadedFile) {
        setUploadedFile(null);
        setFileContent(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        if (imageInputRef.current) {
          imageInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Error in AI chat:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "AI Error",
        description: `${errorMessage}. Our AI is experiencing issues. Please try again.`,
        variant: "destructive",
      });
      
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: `I encountered an error: ${errorMessage}. Please try rephrasing your question or contact support via WhatsApp at 085183978011.` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const backToSystems = () => {
    setSelectedSystem(null);
    resetSystemStates();
  };
  
  const renderSystemSpecificControls = () => {
    if (!selectedSystem) return null;
    
    switch (selectedSystem) {
      case 'document-analyzer':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Upload a document for analysis</p>
            <input 
              type="file" 
              ref={fileInputRef}
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="w-full text-xs"
            />
            {uploadedFile && (
              <div className="mt-2 text-xs bg-muted p-1 rounded flex justify-between items-center">
                <span>{uploadedFile.name}</span>
                <button 
                  onClick={() => {
                    setUploadedFile(null);
                    setFileContent(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        );
        
      case 'coding-assistant':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Select programming language</p>
            <select
              value={codeLanguage}
              onChange={(e) => setCodeLanguage(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
              <option value="typescript">TypeScript</option>
              <option value="sql">SQL</option>
              <option value="html">HTML/CSS</option>
            </select>
          </div>
        );
        
      case 'translation':
        return (
          <div className="mb-2 p-2 border-t">
            <div className="flex justify-between gap-2">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Source Language</p>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full p-1 text-xs border rounded"
                >
                  <option value="auto">Auto-detect</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="russian">Russian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="chinese">Chinese</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                  <option value="indonesian">Indonesian</option>
                </select>
              </div>
              
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Target Language</p>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full p-1 text-xs border rounded"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="portuguese">Portuguese</option>
                  <option value="russian">Russian</option>
                  <option value="japanese">Japanese</option>
                  <option value="korean">Korean</option>
                  <option value="chinese">Chinese</option>
                  <option value="arabic">Arabic</option>
                  <option value="hindi">Hindi</option>
                  <option value="indonesian">Indonesian</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      case 'text-summarization':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Summary Length</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSummaryLength('short')}
                className={`text-xs px-2 py-1 rounded flex-1 ${summaryLength === 'short' 
                  ? 'bg-purple text-white' 
                  : 'bg-muted hover:bg-muted/80'}`}
              >
                Short
              </button>
              <button
                onClick={() => setSummaryLength('medium')}
                className={`text-xs px-2 py-1 rounded flex-1 ${summaryLength === 'medium' 
                  ? 'bg-purple text-white' 
                  : 'bg-muted hover:bg-muted/80'}`}
              >
                Medium
              </button>
              <button
                onClick={() => setSummaryLength('long')}
                className={`text-xs px-2 py-1 rounded flex-1 ${summaryLength === 'long' 
                  ? 'bg-purple text-white' 
                  : 'bg-muted hover:bg-muted/80'}`}
              >
                Long
              </button>
            </div>
          </div>
        );
        
      case 'content-generator':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Content Type</p>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="article">Article</option>
              <option value="ad copy">Ad Copy</option>
              <option value="social media post">Social Media Post</option>
              <option value="email">Email</option>
              <option value="product description">Product Description</option>
              <option value="blog post">Blog Post</option>
              <option value="press release">Press Release</option>
            </select>
          </div>
        );
        
      case 'data-analytics':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Visualization Type</p>
            <select
              value={visualizationType}
              onChange={(e) => setVisualizationType(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="chart">Chart</option>
              <option value="table">Table</option>
              <option value="dashboard">Dashboard</option>
              <option value="report">Report</option>
              <option value="infographic">Infographic</option>
            </select>
          </div>
        );
        
      case 'education':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Education Format</p>
            <select
              value={educationFormat}
              onChange={(e) => setEducationFormat(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="lesson">Lesson Plan</option>
              <option value="quiz">Quiz</option>
              <option value="flashcards">Flashcards</option>
              <option value="study guide">Study Guide</option>
              <option value="presentation">Presentation</option>
              <option value="interactive activity">Interactive Activity</option>
            </select>
          </div>
        );
        
      case 'image-description':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Upload an image to describe</p>
            <input 
              type="file" 
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full text-xs"
            />
            {uploadedFile && (
              <div className="mt-2 text-xs bg-muted p-1 rounded flex justify-between items-center">
                <span>{uploadedFile.name}</span>
                <button 
                  onClick={() => {
                    setUploadedFile(null);
                    setFileContent(null);
                    if (imageInputRef.current) {
                      imageInputRef.current.value = '';
                    }
                  }}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        );
        
      case 'creative-writing':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Creative Format</p>
            <select
              value={creativeFormat}
              onChange={(e) => setCreativeFormat(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="short story">Short Story</option>
              <option value="poem">Poem</option>
              <option value="script">Script</option>
              <option value="dialogue">Dialogue</option>
              <option value="flash fiction">Flash Fiction</option>
              <option value="sci-fi story">Sci-Fi Story</option>
              <option value="fantasy story">Fantasy Story</option>
              <option value="horror story">Horror Story</option>
              <option value="fairy tale">Fairy Tale</option>
            </select>
          </div>
        );
        
      case 'music-lyrics':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Music Genre</p>
            <select
              value={musicGenre}
              onChange={(e) => setMusicGenre(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip-Hop/Rap</option>
              <option value="country">Country</option>
              <option value="r&b">R&B/Soul</option>
              <option value="electronic">Electronic/Dance</option>
              <option value="folk">Folk</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
              <option value="indie">Indie</option>
              <option value="metal">Metal</option>
              <option value="reggae">Reggae</option>
            </select>
          </div>
        );
        
      case 'brainstorming':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Idea Category</p>
            <select
              value={ideaCategory}
              onChange={(e) => setIdeaCategory(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="business">Business Ideas</option>
              <option value="marketing">Marketing Strategies</option>
              <option value="content">Content Creation</option>
              <option value="product">Product Development</option>
              <option value="creative">Creative Projects</option>
              <option value="education">Educational Activities</option>
              <option value="event">Event Planning</option>
              <option value="research">Research Topics</option>
              <option value="problem-solving">Problem Solving</option>
            </select>
          </div>
        );
        
      case 'pattern-recognition':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Pattern Type</p>
            <select
              value={patternType}
              onChange={(e) => setPatternType(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="themes">Themes & Topics</option>
              <option value="relationships">Relationships & Connections</option>
              <option value="trends">Trends & Changes</option>
              <option value="anomalies">Anomalies & Outliers</option>
              <option value="sentiment">Sentiment & Emotions</option>
              <option value="structure">Structure & Organization</option>
              <option value="language">Language Patterns</option>
            </select>
          </div>
        );
        
      case 'nature-guide':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Nature Category</p>
            <select
              value={natureCategory}
              onChange={(e) => setNatureCategory(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="animals">Animals</option>
              <option value="plants">Plants</option>
              <option value="ecosystems">Ecosystems</option>
              <option value="weather">Weather & Climate</option>
              <option value="geology">Geology & Earth Science</option>
              <option value="conservation">Conservation</option>
              <option value="astronomy">Astronomy & Space</option>
              <option value="oceans">Oceans & Marine Life</option>
              <option value="forests">Forests & Trees</option>
            </select>
          </div>
        );
        
      case 'security-advisor':
        return (
          <div className="mb-2 p-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Security Topic</p>
            <select
              value={securityTopic}
              onChange={(e) => setSecurityTopic(e.target.value)}
              className="w-full p-1 text-xs border rounded"
            >
              <option value="passwords">Password Security</option>
              <option value="accounts">Account Protection</option>
              <option value="browsing">Safe Browsing</option>
              <option value="phishing">Phishing Defense</option>
              <option value="malware">Malware Protection</option>
              <option value="privacy">Online Privacy</option>
              <option value="social-media">Social Media Security</option>
              <option value="devices">Device Security</option>
              <option value="networks">Network Security</option>
              <option value="data">Data Protection</option>
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderAISystemsGrid = () => {
    return (
      <div className="ai-systems-grid">
        {aiSystems.map((system, index) => (
          <div 
            key={system.id}
            className={`ai-system-card animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => selectSystem(system.id)}
          >
            <div className={`animated-icon bg-gradient-to-br ${system.color}`}>
              {system.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground mb-1">{system.name}</h3>
              <p className="text-sm text-muted-foreground">{system.description}</p>
              <div className="mt-3">
                <span className="flex items-center text-xs text-purple hover:underline cursor-pointer">
                  Access now
                  <ChevronRight className="h-3 w-3 ml-1" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderChatInterface = () => {
    const system = aiSystems.find(sys => sys.id === selectedSystem);
    
    return (
      <div className="ai-chat-container animate-fade-in">
        <div className="ai-chat-header">
          <div className="flex items-center gap-3">
            <button 
              onClick={backToSystems}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                {system?.icon}
              </div>
              <span className="font-medium text-white">{system?.name}</span>
            </div>
          </div>
          <button 
            onClick={closePanel}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="ai-chat-messages">
          {messages.filter(msg => msg.role !== 'system').map((message, index) => (
            <div 
              key={index}
              className={`mb-4 ${
                message.role === 'assistant' 
                  ? 'flex justify-start' 
                  : 'flex justify-end'
              }`}
            >
              <div 
                className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
                  message.role === 'assistant' 
                    ? 'bg-gray-100 text-gray-800 animate-fade-in animate-delay-100' 
                    : 'bg-gradient-to-r from-purple to-purple-dark text-white animate-fade-in'
                }`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-4 animate-fade-in">
              <div className="max-w-[85%] p-3 rounded-xl bg-gray-100 text-gray-800 shadow-sm">
                <div className="flex space-x-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple/50 animate-pulse"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-purple/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-purple/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {renderSystemSpecificControls()}
        
        <div className="ai-chat-input">
          <div className="flex items-center gap-2">
            {selectedSystem === 'text-summarization' || selectedSystem === 'content-generator' ? (
              <textarea 
                value={input}
                onChange={handleInputChange}
                placeholder={`Ask the ${getSystemName(selectedSystem || '')} AI...`}
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple/30 text-sm resize-y min-h-[80px] shadow-sm"
                disabled={isLoading}
              />
            ) : (
              <input 
                type="text" 
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={`Ask the ${getSystemName(selectedSystem || '')} AI...`}
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple/30 text-sm shadow-sm"
                disabled={isLoading}
              />
            )}
            <button 
              onClick={sendMessage}
              disabled={isLoading || (!input.trim() && !uploadedFile)}
              className={`btn-animated p-3 rounded-xl ${isLoading || (!input.trim() && !uploadedFile) ? 'opacity-50' : ''}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showAIAccess && (
        <div className="ai-systems-panel glass border border-purple/30 shadow-glow-lg overflow-hidden transition-all duration-300">
          {selectedSystem ? renderChatInterface() : renderAISystemsGrid()}
        </div>
      )}
    </>
  );
};

export default AISystemsAccess;
