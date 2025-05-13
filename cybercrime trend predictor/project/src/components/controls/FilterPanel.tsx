import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
  const [attackTypes, setAttackTypes] = useState(['phishing', 'malware']);
  const [severity, setSeverity] = useState(['high', 'critical']);
  const [status, setStatus] = useState(['active']);
  
  const attackTypeOptions = [
    { value: 'phishing', label: 'Phishing' },
    { value: 'malware', label: 'Malware' },
    { value: 'ransomware', label: 'Ransomware' },
    { value: 'ddos', label: 'DDoS' },
    { value: 'sql_injection', label: 'SQL Injection' },
    { value: 'zero_day', label: 'Zero-Day' },
  ];
  
  const severityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];
  
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'mitigated', label: 'Mitigated' },
    { value: 'resolved', label: 'Resolved' },
  ];
  
  const toggleAttackType = (value: string) => {
    setAttackTypes(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const toggleSeverity = (value: string) => {
    setSeverity(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const toggleStatus = (value: string) => {
    setStatus(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 mb-6 relative animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-white">Filter Results</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium text-sm text-slate-300 mb-2">Attack Type</h4>
          <div className="space-y-2">
            {attackTypeOptions.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                  checked={attackTypes.includes(option.value)}
                  onChange={() => toggleAttackType(option.value)}
                />
                <span className="ml-2 text-sm text-slate-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-slate-300 mb-2">Severity</h4>
          <div className="space-y-2">
            {severityOptions.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                  checked={severity.includes(option.value)}
                  onChange={() => toggleSeverity(option.value)}
                />
                <span className="ml-2 text-sm text-slate-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-slate-300 mb-2">Status</h4>
          <div className="space-y-2">
            {statusOptions.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-600 focus:ring-offset-slate-800"
                  checked={status.includes(option.value)}
                  onChange={() => toggleStatus(option.value)}
                />
                <span className="ml-2 text-sm text-slate-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition text-sm font-medium"
        >
          Reset
        </button>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition text-sm font-medium"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;