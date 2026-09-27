import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { Crosshair, X, ShieldAlert, CheckCircle2, Activity, Layers } from 'lucide-react';

export const ItemDetailModal = () => {
  const { selectedItem, setSelectedItem, setActiveTab } = useEdgeTelemetry();

  if (!selectedItem) return null;

  return (
    <div className="modal-overlay">
      <div className="glass-panel p-6 max-w-md w-full border-[#00F2FE]/40 relative">
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-cyan-950 border border-[#00F2FE]/40">
            <Crosshair className="w-6 h-6 text-[#00F2FE]" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400">SKU: {selectedItem.sku}</span>
            <h3 className="text-base font-bold text-white font-mono">
              {selectedItem.name}
            </h3>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs mb-4">
          <div className="p-3 rounded bg-[#090D16] border border-[#1F2937] flex items-center justify-between">
            <span className="text-gray-400">Risk Assessment Score:</span>
            <span className={`text-base font-bold ${
              selectedItem.riskScore >= 70 ? 'text-red-400' : selectedItem.riskScore >= 30 ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {selectedItem.riskScore}%
            </span>
          </div>

          <div className="p-3 rounded bg-[#090D16] border border-[#1F2937] space-y-1.5 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">Food Category:</span>
              <span className="font-bold text-white">{selectedItem.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tri-State Action:</span>
              <span className="font-bold text-[#00F2FE]">{selectedItem.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Camera Focal Time:</span>
              <span className="text-gray-200">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedItem(null);
              setActiveTab('analytics');
            }}
            className="w-full btn-primary font-mono text-xs py-2 flex items-center justify-center gap-1.5"
          >
            <Layers className="w-4 h-4" /> Inspect Spectral Bands
          </button>
        </div>
      </div>
    </div>
  );
};
