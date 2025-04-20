import React from 'react'
import { FileQuestionIcon, PlusIcon, HistoryIcon, SettingsIcon, MenuIcon, MessageCircle } from "lucide-react";
import { useTheme } from '../Context/ThemeContext';
import { cn } from '../lib/cn';
import { useGemini } from '../Context/GeminiContext';

// interface RecentItem {
//     id: number;
//     title: string;
//     summary: string;
// }


function Sidebar({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const { theme } = useTheme();
    const {newChat,previousPrompts,onSent,setInput} = useGemini()
    return (
        <div className={cn(
            "transition-all duration-300 ease-in-out h-screen px-2",
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-[#f0f4f9]',
            open ? "w-[240px]" : "w-[60px]"
        )}>
            <div className="flex flex-col h-full">
                {/* Top Icons */}
                <div className="p-4 space-y-4"> 
                    <MenuIcon 
                        onClick={() => setOpen(!open)}
                        className={cn(
                            "w-8 h-8 cursor-pointer p-1 rounded-full transition-all",
                            theme === 'dark' 
                                ? 'hover:bg-gray-700 text-gray-300' 
                                : 'hover:bg-gray-200 text-gray-700'
                        )}
                    />
                    <PlusIcon onClick={()=>newChat()}
                        className={cn(
                            "w-8 h-8 cursor-pointer p-1 rounded-full transition-all",
                            theme === 'dark' 
                                ? 'hover:bg-gray-700 text-gray-300' 
                                : 'hover:bg-gray-200 text-gray-700'
                        )}
                    />
                </div>

                {/* Recent Items */}
                {open && (
                    <div className="px-2">
                        <p className={cn(
                            "text-sm font-medium mb-2",
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        )}>
                            Recent
                        </p>
                        <div className="space-y-1">
                            {previousPrompts.map((item,index) => (
                                <div onClick={()=>{setInput(item);
                                onSent(item);
                                }}
                                    key={index}
                                    className="text-gray-600 py-1"
                                >
                                    <div className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all",
                                        theme === 'dark' 
                                            ? 'hover:bg-gray-800 text-gray-300' 
                                            : 'hover:bg-blue-50 text-gray-700'
                                    )}>
                                        <MessageCircle className="h-5 w-5" />
                                        <p className="text-sm truncate">{item.slice(0,20)} {item.length>20 && "..."}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Icons */}
                <div className="mt-auto p-4 space-y-4">
                    {[SettingsIcon, HistoryIcon, FileQuestionIcon].map((Icon, index) => (
                        <Icon 
                            key={index}
                            className={cn(
                                "w-8 h-8 cursor-pointer p-1 rounded-full transition-all",
                                theme === 'dark' 
                                    ? 'hover:bg-gray-700 text-gray-300' 
                                    : 'hover:bg-gray-200 text-gray-700'
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar
