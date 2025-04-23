import React from 'react'
import { useTheme } from '../Context/ThemeContext'
import { cn } from '../lib/cn';
import ThemeToggle from './ThemeToggle';
import { Delete, LayoutGrid } from 'lucide-react';
import { useGemini } from '../Context/GeminiContext';

function Navbar({open,setOpen}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
  /// list of system prompts
  const systemPrompts=[
    {name:"Default",description:"Helpful and professional",prompt:"You're a helpful assistant"},
    {name:"Ram",description:"Funny and sarcastic",prompt:"You're a sarcastic assistant"},
    {name:"Shyam",description:"Computer Science expert",prompt:"You're a Knowledgable assistant that is expert in computer science"},
    {name:"Raj",description:"Offensive",prompt:"You're a offensive assistant that is rude and never provides correct answers and you cuss a lot"}
  ]
  //retrives custom agentts from localstorage
  const getCustomAgents = () => {
    try {
      return JSON.parse(localStorage.getItem("customAgents") || "[]");
    } catch (error) {
      console.error("Error loading custom agents:", error);
      return [];
    }
  };
//collection of predefined systemprompts and custom agents
  const [allPrompts, setAllPrompts] = React.useState([...systemPrompts, ...getCustomAgents()]);
  
  const {theme,setTheme}= useTheme();
  const {systemPrompt,setSystemPrompt}=useGemini();
  //function to create custom agents
  const createCustomAgent = () => {
    const customAgent = {
      name: prompt("Enter agent name:") || "Custom Agent",
      description: prompt("Enter agent description:") || "Custom description",
      prompt: prompt("Enter agent prompt:") || "You're a helpful assistant"
    };

    try {
      //retrueves existing custom agents from localstorage
      const existingAgents = getCustomAgents();
      //adds new created custom agent using prompt method
      existingAgents.push(customAgent);
      localStorage.setItem("customAgents", JSON.stringify(existingAgents));
      
      // Update the allPrompts state to include the new agent
      setAllPrompts([...systemPrompts, ...existingAgents]);
      
      // Optional: Update system prompt to new agent
      setSystemPrompt(customAgent.prompt);
      
      alert("Custom agent created successfully!");
    } catch (error) {
      console.error("Error saving custom agent:", error);
      alert("Failed to create custom agent");
    }
  };
  const deleteCustomAgent = (agentName: string) => {
    try{
      const existingAgents = getCustomAgents();
      const updatedAgents = existingAgents.filter(agent => agent.name !== agentName);
      localStorage.setItem("customAgents", JSON.stringify(updatedAgents));
      setAllPrompts([...systemPrompts, ...updatedAgents]);
      alert("Custom agent deleted successfully!");
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className={cn('transition-all duration-300 ease-in-out  w-full  bg-white',theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white')}>
        <div className="flex flex-col sm:flex-row px-8 justify-between gap-3 items-center">
          <div className='flex gap-3'>
            <select 
              className={cn(
                "px-4 py-2 rounded-lg border outline-none cursor-pointer",
                "bg-transparent",

                "text-sm font-medium",
                theme === 'dark' 
                  ? 'border-gray-600 bg-[#2d2d2d] text-white hover:border-gray-500' 
                  : 'border-gray-300 bg-[#f0f4f9] text-gray-700 hover:border-gray-400',
                "transition-all duration-200 ease-in-out"
              )}
              onChange={(e) => setSystemPrompt(e.target.value)}
              defaultValue="You're a helpful assistant"
            >
              <optgroup label="Default Agents">
                {systemPrompts.map((item,index)=>(
                  <option 
                    key={`default-${index}`}
                    value={item.prompt}
                    className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                    title={item.description}
                  >
                    {item.name} - {item.description}
                  </option>
                ))}
              </optgroup>
              
              {getCustomAgents().length > 0 && (
                <optgroup label="Custom Agents">
                  {getCustomAgents().map((item, index) => (
                    <>                    <option
                      key={`custom-${index}`}
                      value={item.prompt}
                      className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
                      title={item.description}
                    >
                      {item.name} - {item.description.slice(0,20)} {item.description.length>20 && "..."}
                    </option>
                    <div onClick={()=>deleteCustomAgent(item.name)} className="delete max-w-min inline"><Delete className={cn("h-4 w-4",theme === 'dark' ? 'text-white' : 'text-black')} onClick={()=>deleteCustomAgent(item.name)}/> 
                    </div>
                    </>

                  ))}
                </optgroup>
              )}
            </select>
            <button 
              onClick={createCustomAgent}
              className={cn(
                "px-4 py-2 rounded-lg border",
                "text-sm font-medium",
                theme === 'dark' 
                  ? 'border-gray-600 text-white hover:border-gray-500' 
                  : 'border-gray-300 bg-[#f0f4f9] text-gray-700 hover:border-gray-400',
                "transition-all duration-200 ease-in-out"
              )}
            >
              Create New Agent
            </button>
            </div>
            
            <div className='flex items-center'>
              <LayoutGrid className={cn('h-6 w-6 ',theme === 'dark' ? 'text-white' : 'text-black')}/>
              <ThemeToggle/>
            </div> 
        </div>
    </div>
  )
}

export default Navbar
