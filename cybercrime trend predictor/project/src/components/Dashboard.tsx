import React, { useState } from 'react';
import TimeframeSelector from './controls/TimeframeSelector';
import TrendOverview from './charts/TrendOverview';
import AttackDistribution from './charts/AttackDistribution';
import PredictionModel from './charts/PredictionModel';
import ThreatMap from './charts/ThreatMap';
import DataTable from './DataTable';
import FilterPanel from './controls/FilterPanel';
import AlertBanner from './AlertBanner';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Cybercrime Trend Predictor</h1>
          <p className="text-slate-400">Proactive security through predictive analytics</p>
        </div>
        
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition text-sm font-medium flex items-center gap-2"
          >
            Filters
            <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full">3</span>
          </button>
          <TimeframeSelector value={timeframe} onChange={setTimeframe} />
        </div>
      </div>
      
      {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}
      
      <AlertBanner 
        title="Phishing Attack Surge Predicted" 
        message="ML models indicate a 43% increase in targeted phishing attacks within the next 72 hours."
        icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
        type="warning"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Attack Trends Overview</h2>
          </div>
          <div className="p-4 h-80">
            <TrendOverview timeframe={timeframe} />
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Attack Vector Distribution</h2>
          </div>
          <div className="p-4 h-80">
            <AttackDistribution timeframe={timeframe} />
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Threat Prediction Model</h2>
          </div>
          <div className="p-4 h-80">
            <PredictionModel timeframe={timeframe} />
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-semibold text-white">Global Threat Map</h2>
          </div>
          <div className="p-4 h-80">
            <ThreatMap />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h2 className="font-semibold text-white">Recent Attack Data</h2>
        </div>
        <div className="p-4">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;