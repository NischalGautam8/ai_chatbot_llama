import OpenAI from "openai";

// Configuration flag to switch between API and mock responses
const USE_MOCK_RESPONSES = false; // Set to true to use mock responses

// Mock responses for testing
const MOCK_RESPONSES = [
  "This is a mock response that simulates an AI assistant. I can help you with various tasks and answer questions.",
  "Here's another mock response. I'm demonstrating different possible responses that could be returned.",
  "Let me explain that in detail... This is a simulated response showing how longer explanations would look.",
  "That's an interesting question! Here's a mock response that shows how I would handle such queries.",
  "I understand what you're asking. Here's a mock response that demonstrates my typical interaction style."
];

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
  dangerouslyAllowBrowser: true
});

async function getMockResponse(): Promise<string> {
  // Randomly select a response from the mock responses
  const randomIndex = Math.floor(Math.random() * MOCK_RESPONSES.length);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_RESPONSES[randomIndex];
}

async function runChat(systemPrompt: string, userPrompt: string) {
  try {
    const finalSystemPrompt = systemPrompt.trim() || "You're a helpful assistant";
    const finalUserPrompt = userPrompt.trim();

    if (!finalUserPrompt) {
      throw new Error("User prompt cannot be empty");
    }

    if (USE_MOCK_RESPONSES) {
      return await getMockResponse();
    }

    // Real API call
    const completion = await openai.chat.completions.create({
      model: "llama3.2",
      messages: [
        { role: "system", content: finalSystemPrompt },
        { role: "user", content: finalUserPrompt },
      ],
    });
    
    const responseText = completion.choices[0].message.content;
    console.log(responseText);
    return responseText;
  } catch (error) {
    if (USE_MOCK_RESPONSES) {
      // If using mock responses, don't throw error, return a mock error response
      return "I apologize, but I encountered an error processing your request. Could you please try again?";
    }
    console.error("Error in runChat:", error);
    throw error;
  }
}

async function imageResponse(file: File) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    if (USE_MOCK_RESPONSES) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return "This appears to be an image of [mock image description]. I can see [mock details] in it.";
    }

    return "NOT SET UP";
  } catch (error:any) {
    console.error("Error processing image:", error);
    return `Error: ${error.message}`;
  }
}

export { runChat, imageResponse };
