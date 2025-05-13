import React, { useState } from 'react';
import { mockAttackData } from '../data/mockData';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';

const DataTable = () => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedData = [...mockAttackData].sort((a, b) => {
    if (sortField === 'timestamp') {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    
    if (sortField === 'severity') {
      const severityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
      return sortDirection === 'asc'
        ? severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder]
        : severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    }
    
    const aValue = a[sortField as keyof typeof a] || '';
    const bValue = b[sortField as keyof typeof b] || '';
    
    return sortDirection === 'asc'
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });
  
  const getSeverityBadge = (severity: string) => {
    const classes = {
      low: 'bg-blue-900/50 text-blue-300 border-blue-700',
      medium: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      high: 'bg-orange-900/50 text-orange-300 border-orange-700',
      critical: 'bg-red-900/50 text-red-300 border-red-700',
    };
    
    const key = severity.toLowerCase() as keyof typeof classes;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${classes[key] || ''}`}>
        {severity}
      </span>
    );
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-800">
          <tr>
            <SortableHeader
              field="timestamp"
              label="Timestamp"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              field="attackType"
              label="Attack Type"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              field="source"
              label="Source"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              field="target"
              label="Target"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              field="severity"
              label="Severity"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
            <SortableHeader
              field="status"
              label="Status"
              currentSort={sortField}
              direction={sortDirection}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody className="bg-slate-800 divide-y divide-slate-700">
          {sortedData.map((attack) => (
            <tr key={attack.id} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {new Date(attack.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {attack.attackType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {attack.source}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {attack.target}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {getSeverityBadge(attack.severity)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${attack.status === 'Active' ? 'bg-red-900/30 text-red-300 border border-red-700' : 
                    attack.status === 'Mitigated' ? 'bg-amber-900/30 text-amber-300 border border-amber-700' : 
                    'bg-green-900/30 text-green-300 border border-green-700'}`}
                >
                  {attack.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface SortableHeaderProps {
  field: string;
  label: string;
  currentSort: string;
  direction: 'asc' | 'desc';
  onSort: (field: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  field,
  label,
  currentSort,
  direction,
  onSort,
}) => {
  const isSorted = currentSort === field;
  
  return (
    <th 
      scope="col" 
      className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center">
        <span>{label}</span>
        <div className="ml-1 flex flex-col">
          {isSorted ? (
            direction === 'asc' ? (
              <ChevronUp className="h-4 w-4 text-blue-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-blue-500" />
            )
          ) : (
            <Filter className="h-4 w-4 text-slate-500" />
          )}
        </div>
      </div>
    </th>
  );
};

export default DataTable;