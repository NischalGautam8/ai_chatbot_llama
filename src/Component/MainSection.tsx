import { useTheme } from '../Context/ThemeContext'
import { cn } from '../lib/cn'
import { PlusIcon, SendHorizontal, Mic } from 'lucide-react'
import user_icon from "../assets/user_icon.png";
import gemini_icon from "../assets/gemini_icon.png";
import {useGemini} from '../Context/GeminiContext';
// import { useState } from 'react';
function MainSection() {
  const {input,setInput,loading,resultData,onSent,showResult,recentPrompt,systemPrompt}=useGemini()
  // const [file,setFile] =useState<File | null>();
  const { theme } = useTheme()
  return (
    <div className={cn(
      'flex transition-all duration-300 ease-in-out flex-col items-center justify-center min-h-[80vh] gap-8',
      theme === 'dark' ? 'text-white' : 'text-black'
    )}>
      {!showResult ? <div className='text-center'>
        <h1 className='text-4xl font-bold'>
          Meet Your Personal AI Assistant,{' '}
          <span className='bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent'>
            Kernel
          </span>
        </h1>
      </div>:<div className='overflow-y-auto px-10 md:px-20  w-2/3 '>
        <div>
          {/* USER PROMPT */}
          <div className='flex gap-3 items-center'>
          <img  className='rounded-full w-8 h-8' src={user_icon}/>
        <p>{recentPrompt}</p>
          </div>
          {/* RESULT DATA / skeleton */}
          <div className='flex gap-3 my-6 items-start '>
          <img className='w-8 h-8 rounded-full' src={gemini_icon} />
        {loading?
        // SKELETON
        <div className='animate-pulse w-full flex flex-col items-center gap-3'>
          <div className='w-full h-4 bg-gray-200 rounded-md'></div>
          <div className='w-full h-4 bg-gray-200 rounded-md'></div>
          <div className='w-full h-4 bg-gray-200 rounded-md'></div>
        </div>:
        // RESULT CONTENT 
        <p className={cn('text-gray-600 overflow-x-hidden  text-lg items-start ',theme === 'dark' ? 'text-gray-300' : 'text-gray-700') }dangerouslySetInnerHTML={{__html:resultData}}></p>}
          </div>
          </div></div>}
      {/* INPUT SECTION */}
      <div className={cn(
        "w-full max-w-[800px] mt-auto relative",
        "flex items-center gap-2",
        "p-4 rounded-full ",
        theme === 'dark' 
          ? 'bg-[#2d2d2d] border border-gray-700' 
          : 'bg-white border border-gray-200 shadow-lg'
      )}>
        {/* Left Icon */}
        {/* <button onClick={()=> {
          if (file) { // Only call if file exists
            onImageSent(file);
            console.log("getting response");
          }
        }}>Get Response</button> */}
        <button  className={cn(
          "p-2 rounded-full transition-all",
          theme === 'dark' 
            ? 'hover:bg-gray-700 text-gray-300' 
            : 'hover:bg-gray-100 text-gray-600'
        )}>
          {/* <input 
  type="file" 
  accept=".jpg,image/jpeg" 
  onChange={(e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Extra runtime check to ensure it's truly a JPEG
    if (selectedFile.type !== "image/jpeg") {
      alert("Only JPEG files are allowed.");
      return;
    }

    setFile(selectedFile);
  }} 
/> */}
          <PlusIcon  className="w-6 h-6" /> 
        </button>

        {/* Input Field */}
        <input 
        onKeyDown={(e)=>{ 
          if(e.key==='Enter'){
            onSent(systemPrompt,input)
          }
        }}
        onChange={(e)=>setInput(e.target.value)}
        value={input}
          type="text" 
          placeholder="Ask me anything..."
          className={cn(
            "flex-1 text-lg transition-all duration-300 ease-in-outoutline-none border-none outline-none",
            "bg-transparent ",
            theme === 'dark' 
              ? 'text-white placeholder:text-gray-400' 
              : 'text-black placeholder:text-gray-500'
          )}
        />
        {/* Right Icons */}
        <div className="flex items-center gap-2">
          <button className={cn(
            "p-2 rounded-full transition-all",
            theme === 'dark' 
              ? 'hover:bg-gray-700 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-600'
          )}>
            <Mic className="w-6 h-6" />
          </button>
          <button  onClick={()=>onSent(systemPrompt,input)} className={cn(
            "p-2 rounded-full transition-all",
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          )}>
            <SendHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default MainSection
