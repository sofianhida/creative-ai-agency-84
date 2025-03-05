
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIMarketplace from "./pages/AIMarketplace";
import AIBuilder from "./pages/AIBuilder";
import MarketDashboard from "./components/MarketDashboard";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Set favicon dynamically to logo
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png';
      document.head.appendChild(newLink);
    } else {
      link.setAttribute('href', '/lovable-uploads/72854016-f636-48a8-92ee-3160952a47cb.png');
    }

    // Update document title
    document.title = "WeVersAI | Best AI Solutions";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<AIMarketplace />} />
            <Route path="/builder" element={<AIBuilder />} />
            <Route path="/dashboard" element={<MarketDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
