import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, systemId, fileContent } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Select model based on system requirements
    let model = "google/gemini-2.5-flash";
    
    // Use Pro model for complex tasks
    if (systemId === 'document-analyzer' || systemId === 'data-analytics' || systemId === 'coding-assistant') {
      model = "google/gemini-2.5-pro";
    }

    console.log(`Using model: ${model} for system: ${systemId}`);

    // Prepare messages for API
    const apiMessages = messages.map((msg: any) => {
      if (msg.role === 'system') {
        return { role: 'system', content: msg.content };
      }
      return { role: msg.role, content: msg.content };
    });

    // Add file content if provided
    if (fileContent) {
      const lastUserMessage = apiMessages[apiMessages.length - 1];
      if (lastUserMessage && lastUserMessage.role === 'user') {
        lastUserMessage.content += `\n\nFile content:\n${fileContent}`;
      }
    }

    console.log("Calling Lovable AI Gateway");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: "Rate limit exceeded. Please try again in a moment.",
            code: "RATE_LIMIT"
          }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: "AI usage limit reached. Please contact support.",
            code: "PAYMENT_REQUIRED"
          }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      return new Response(
        JSON.stringify({ 
          error: "AI service error. Please try again.",
          code: "SERVICE_ERROR",
          details: errorText
        }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error("No response from AI");
    }

    // Clean markdown formatting
    let cleanedResponse = assistantMessage.replace(/\*\*(.*?)\*\*/g, '$1');
    cleanedResponse = cleanedResponse.replace(/\*(.*?)\*/g, '$1');

    console.log("Successfully received AI response");

    return new Response(
      JSON.stringify({ 
        response: cleanedResponse,
        model: model
      }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in ai-chat function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_ERROR"
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
