import Sidebar from './Component/Sidebar';
import { useState } from 'react'
import Navbar from './Component/Navbar';
import MainSection from './Component/MainSection';

function Home() {
  const [sidebarOpen,setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="flex h-screen w-full overflow-hidden">
    <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
    <div className="flex flex-1 flex-col overflow-hidden">
      <Navbar open={sidebarOpen} setOpen={setSidebarOpen}/>
      <div className="flex flex-1 flex-col p-4 overflow-auto">
          <MainSection />
        </div>
    </div>
      </div>
    </div>
  )
}

export default Home