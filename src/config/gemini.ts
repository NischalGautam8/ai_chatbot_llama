import OpenAI from "openai";
// import ai from '@google/generative-ai';
// Initialize OpenAI SDK with Ollama's endpoint
const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1", // Ollama's local API endpoint
  apiKey: "ollama", // Ollama doesn't require an API key, but OpenAI SDK expects one (can be any string)
  dangerouslyAllowBrowser: true
});

async function runChat(systemPrompt: string, userPrompt: string) {
  try {
    // Provide default system prompt if empty
    const finalSystemPrompt = systemPrompt.trim() || "You're a helpful assistant";
    const finalUserPrompt = userPrompt.trim();

    if (!finalUserPrompt) {
      throw new Error("User prompt cannot be empty");
    }

    // Call the chat completions endpoint
    const completion = await openai.chat.completions.create({
      model: "llama3.2", // Replace with your Ollama model (e.g., mistral, phi3)
      messages: [
        { role: "system", content: finalSystemPrompt },
        { role: "user", content: finalUserPrompt },
      ],
    });
    // Extract the response
    const responseText = completion.choices[0].message.content;
    console.log(responseText);
    return responseText;
  } catch (error) {
    console.error("Error in runChat:", error);
    throw error;
  }
}
// async function fileToBase64(file: File): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result as string);
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   }
  async function imageResponse(file: File) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // const base64Data = await fileToBase64(file);
    
    // const response = await ai.models.generateContent({
    //   model: "gemini-2.0-flash",
    //   contents: [
    //     {
    //       parts: [
    //         {
    //           inlineData: {
    //             mimeType: file.type,
    //             data: base64Data.split(',')[1] // Remove the data URL prefix
    //           }
    //         },
    //         { text: "Caption this image." }
    //       ]
    //     }
    //   ]
    // });

    return "NOT SET UP";
    //@ts-expect-error
  } catch (error: any) {
    console.error("Error processing image:", error);
    return `Error: ${error.message}`;
  }
}


export {runChat,imageResponse};
