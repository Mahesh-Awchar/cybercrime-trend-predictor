import React from 'react';
import { Menu, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-10 bg-slate-800/95 backdrop-blur border-b border-slate-700 shadow-md">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-0.5 -translate-y-0.5"></span>
            </button>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
            SC
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;