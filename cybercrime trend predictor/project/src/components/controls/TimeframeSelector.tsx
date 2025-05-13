import React from 'react';

interface TimeframeSelectorProps {
  value: string;
  onChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ value, onChange }) => {
  const options = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' },
  ];

  return (
    <div className="bg-slate-800 rounded-md shadow-sm flex p-1">
      {options.map((option) => (
        <button
          key={option.value}
          className={`px-3 py-1.5 text-sm font-medium rounded transition ${
            value === option.value
              ? 'bg-blue-600 text-white'
              : 'text-slate-400 hover:text-white'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;