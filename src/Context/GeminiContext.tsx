import { createContext, useState, useContext } from "react";
import {runChat,generateImageCaption, imageResponse} from "../config/gemini";

interface GeminiContextType {
    input: string;
    setInput: (input: string) => void;
    recentPrompt: string;
    setRecentPrompt: (prompt: string) => void;
    previousPrompts: string[];
    setPreviousprompts: (prompts: string[]) => void;
    setResultData: (resultData: string) => void;
    showResult: boolean;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    resultData: string;
    onSent: (prompt: string) => Promise<void>;
    onImageSent: (file:File) => Promise<void>;
    newChat: () => void;
}
// eslint-disable-next-line react-refresh/only-export-components
export const GeminiContext = createContext<GeminiContextType | undefined>(undefined);
// eslint-disable-next-line react-refresh/only-export-components
export const useGemini = () => {
    const context = useContext(GeminiContext);
    if (context === undefined) {
        throw new Error('useGemini must be used within a GeminiProvider');
    }
    return context;
};
            
export const GeminiProvider = ({ children }: { children: React.ReactNode }) => {
    const [input, setInput] = useState<string>("");
    const [recentPrompt, setRecentPrompt] = useState<string>("");
    const [previousPrompts, setPreviousprompts] = useState<string[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [resultData, setResultData] = useState<string>("");
const delayPara = (index:number,nextWord:string)=>{
    //delays the addition of the next word 
    setTimeout(()=>{
        setResultData(prev=>prev+nextWord)
    },25*index)
}
const newChat = ()=>{
    setShowResult(false);
    setResultData("");
}
const onImageSent = async (file:File)=>{
    await imageResponse(file);
}
    const onSent = async (prompt: string) => {
        try {
            setResultData("");
            setLoading(true);
            setRecentPrompt(prompt);
            setPreviousprompts(prev => [...prev, prompt]);
            setInput("");
            setShowResult(true);
            const response = await runChat(prompt);
            const responseArray = response?.split("**") || []
            let processedResponse:string="" ;
            for (let i=0;i<responseArray?.length;i++){

                if(i===0 || i%2!==  1 ){
                    //even position or zero
                    console.log(responseArray[i])
                    processedResponse+=responseArray[i];
                }
                else{
                    processedResponse+="<b>"+responseArray[i]+"</b>";
                }
            }
            const newResponse2=processedResponse?.split("*").join("</br>")
            //remove undefined from first
            const ResponseRemovedUndefined=newResponse2?.split("undefined").join("");
            const newResponse4=ResponseRemovedUndefined.split(" ");
            for(let i=0;i<newResponse4.length;i++){
                delayPara(i,newResponse4[i]+ " ")
            }
            
        } catch (error) {
            console.error('Error in chat:', error);
            setResultData("Sorry, there was an error processing your request.");
        } finally {
            setLoading(false);
        }
    };
    const value: GeminiContextType = {
        input,
        setInput,
        setResultData,
        setLoading,
        recentPrompt,
        setRecentPrompt,
        previousPrompts,
        setPreviousprompts,
        showResult,
        loading,
        resultData,
        onSent,
        newChat,
        onImageSent,

    };

    return (
        <GeminiContext.Provider value={value}>
            {children}
        </GeminiContext.Provider>
    );
};
