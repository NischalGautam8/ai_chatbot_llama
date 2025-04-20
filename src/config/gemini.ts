import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBH1OMuCVipOjtmkRhoptDKWr9nlbUSsbI",
});

const modelName = "gemini-2.0-flash";

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function runChat(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  console.log(response.text);
  return response.text;
  //--------- MODIFIED----------
  // const response = await ai.models.generateContent({
  //   model: "gemini-2.0-flash",
  //   contents: prompt,
  // });
  // console.log(response.text);
  // return response.text;

  
}

async function imageResponse(file: File) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const base64Data = await fileToBase64(file);
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType: file.type,
                data: base64Data.split(',')[1] // Remove the data URL prefix
              }
            },
            { text: "Caption this image." }
          ]
        }
      ]
    });

    return response.text();
  } catch (error: any) {
    console.error("Error processing image:", error);
    return `Error: ${error.message}`;
  }
}

export { runChat, imageResponse };
