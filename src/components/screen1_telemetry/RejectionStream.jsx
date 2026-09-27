import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { ShieldX, ChevronRight } from 'lucide-react';

export const RejectionStream = () => {
  const { rejectionLog, setActiveTab } = useEdgeTelemetry();

  // Take top 3 recent items
  const recentDiverted = rejectionLog.slice(0, 3);

  return (
    <div className="glass-panel p-6 flex flex-col justify-between border-[#27272A]">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <ShieldX className="w-4 h-4 text-red-400" />
          Recent Diverted Items Feed
        </h3>
        <span className="text-[10px] text-red-400 font-mono bg-red-950/60 px-2 py-0.5 rounded-full border border-red-600/40">
          BIN #B-104
        </span>
      </div>

      {/* 3 Recent Diverted Items List */}
      <div className="space-y-3 my-3">
        {recentDiverted.map(entry => (
          <div
            key={entry.id}
            className="p-3 rounded-xl bg-[#0B0F17] border border-red-950/60 hover:border-red-500/50 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between font-mono text-xs mb-1">
              <span className="font-bold text-white">{entry.item}</span>
              <span className="text-gray-400 text-[11px]">{entry.timestamp}</span>
            </div>

            <div className="flex items-center justify-between font-mono text-xs my-1">
              <span className="text-gray-400 text-[11px]">SKU: {entry.sku}</span>
              <span className="text-red-400 font-bold">{entry.riskScore}% Risk</span>
            </div>

            {/* Red Risk Progress Bar */}
            <div className="w-full bg-[#18181B] h-2 rounded-full overflow-hidden my-1.5 border border-[#27272A]">
              <div 
                className="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all duration-500"
                style={{ width: `${entry.riskScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between mt-1 pt-1 font-mono text-[11px]">
              <span className="text-red-400/80 truncate max-w-[200px]">{entry.primaryAnom}</span>
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-cyan-400 hover:text-white flex items-center gap-0.5 text-xs font-semibold"
              >
                Details <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
