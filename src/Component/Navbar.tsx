import React from 'react'
import { useTheme } from '../Context/ThemeContext'
import { cn } from '../lib/cn';
import ThemeToggle from './ThemeToggle';
import { LayoutGrid } from 'lucide-react';
function Navbar({open,setOpen}:{open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
    const {theme,setTheme}= useTheme();
  return (
    <div className={cn('transition-all duration-300 ease-in-out  w-full  bg-white',theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white')}>
        <div className="flex px-8 justify-between items-center">
{/* OPTION TO CHOOSE GEMINI MODEL HERE USING DROPDOWN and usecontext */}
             <h1 className='text-3xl  '>GEMINI</h1>
             <div className='flex items-center '>
            <LayoutGrid className={cn('h-6 w-6 ',theme === 'dark' ? 'text-white' : 'text-black')}/>
            <ThemeToggle/>
             </div> 
        </div>
    </div>
  )
}

export default Navbar