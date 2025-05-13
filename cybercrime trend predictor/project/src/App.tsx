import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-200">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Dashboard />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;