import React from 'react';
import { 
  Shield, BarChart2, Zap, Map, Users, Settings, 
  HelpCircle, LogOut, X, Home, Flag, Bell, AlertTriangle 
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-blue-500" />
            <h1 className="ml-2 text-xl font-bold text-white">CyberGuard</h1>
          </div>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 lg:hidden transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-3 py-4">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Dashboard
            </p>
            
            <NavItem icon={<Home />} text="Overview" active />
            <NavItem icon={<BarChart2 />} text="Analytics" />
            <NavItem icon={<Zap />} text="Incidents" />
            <NavItem icon={<Map />} text="Threat Map" />
            
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Intelligence
              </p>
            </div>
            
            <NavItem icon={<AlertTriangle />} text="Threats" badge={3} />
            <NavItem icon={<Flag />} text="Campaigns" />
            <NavItem icon={<Users />} text="Threat Actors" />
            <NavItem icon={<Bell />} text="Alerts" />
            
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Settings
              </p>
            </div>
            
            <NavItem icon={<Settings />} text="Preferences" />
            <NavItem icon={<HelpCircle />} text="Help" />
            <NavItem icon={<LogOut />} text="Logout" />
          </div>
        </div>
      </aside>
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, badge }) => {
  return (
    <a 
      href="#"
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        active 
          ? 'bg-slate-700 text-white' 
          : 'text-slate-400 hover:text-white hover:bg-slate-700'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{text}</span>
      {badge !== undefined && (
        <span className="ml-auto bg-blue-600 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};

export default Sidebar;