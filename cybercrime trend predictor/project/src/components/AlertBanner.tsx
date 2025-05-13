import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AlertBannerProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  type?: 'info' | 'warning' | 'error' | 'success';
}

const AlertBanner: React.FC<AlertBannerProps> = ({ 
  title, 
  message, 
  icon, 
  type = 'info' 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  const typeClasses = {
    info: 'bg-blue-900/40 border-blue-700 text-blue-200',
    warning: 'bg-amber-900/40 border-amber-700 text-amber-200',
    error: 'bg-red-900/40 border-red-700 text-red-200',
    success: 'bg-green-900/40 border-green-700 text-green-200',
  };
  
  return (
    <div className={`flex items-center p-4 border rounded-lg shadow-md animate-fade-in ${typeClasses[type]}`}>
      {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 ml-3 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AlertBanner;