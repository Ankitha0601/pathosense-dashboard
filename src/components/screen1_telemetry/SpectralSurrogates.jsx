import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { TestTube, Activity, Droplets, Thermometer } from 'lucide-react';

export const SpectralSurrogates = () => {
  const { surrogates } = useEdgeTelemetry();

  return (
    <div className="glass-panel p-6 flex flex-col justify-between border-[#27272A]">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <TestTube className="w-4 h-4 text-[#06B6D4]" />
          Biochemical Surrogates
        </h3>
        <span className="text-[10px] text-[#06B6D4] font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30">
          REAL-TIME MARKERS
        </span>
      </div>

      <div className="space-y-4 my-3">
        {/* Progress Bar 1: Surface Protein Degradation */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#06B6D4]" />
              Surface Protein Degradation
            </span>
            <span className="font-bold text-[#06B6D4]">{surrogates.proteinOxidation}%</span>
          </div>
          <div className="w-full bg-[#0B0F17] h-2.5 rounded-full overflow-hidden border border-[#27272A]">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-[#06B6D4] to-amber-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, surrogates.proteinOxidation * 3.5)}%` }}
            />
          </div>
        </div>

        {/* Progress Bar 2: Moisture Loss Index */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              Moisture Loss Index
            </span>
            <span className="font-bold text-blue-400">{surrogates.moistureLoss}%</span>
          </div>
          <div className="w-full bg-[#0B0F17] h-2.5 rounded-full overflow-hidden border border-[#27272A]">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, surrogates.moistureLoss * 5)}%` }}
            />
          </div>
        </div>

        {/* Progress Bar 3: TVB-N Marker Drift */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" />
              TVB-N Marker Drift
            </span>
            <span className="font-bold text-amber-400">{surrogates.tvbnDrift} mg/100g</span>
          </div>
          <div className="w-full bg-[#0B0F17] h-2.5 rounded-full overflow-hidden border border-[#27272A]">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-full transition-all duration-500"
              style={{ width: `${Math.min(100, surrogates.tvbnDrift * 200)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
