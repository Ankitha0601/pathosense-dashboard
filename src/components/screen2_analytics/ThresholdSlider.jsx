import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { Sliders, ShieldCheck, ShieldX } from 'lucide-react';

export const ThresholdSlider = () => {
  const { thresholds, setThresholds } = useEdgeTelemetry();

  return (
    <div className="glass-panel p-6 flex flex-col justify-between border-[#27272A]">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#06B6D4]" />
          Tri-State Classifier Thresholds
        </h3>
        <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30">
          CLASSIFIER
        </span>
      </div>

      <div className="space-y-4 my-2">
        {/* Low Risk Cutoff */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Low Risk Cutoff [PASS]
            </span>
            <span className="text-[#06B6D4] font-bold">&lt; {thresholds.lowMax}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="45"
            value={thresholds.lowMax}
            onChange={(e) => setThresholds({ ...thresholds, lowMax: parseInt(e.target.value) })}
            className="w-full accent-[#10B981] bg-[#0B0F17] rounded-lg h-2 cursor-pointer"
          />
        </div>

        {/* High Risk Cutoff */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-mono">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <ShieldX className="w-4 h-4" />
              High Risk Cutoff [DIVERTED]
            </span>
            <span className="text-red-400 font-bold">&gt; {thresholds.highMin}%</span>
          </div>
          <input
            type="range"
            min="55"
            max="90"
            value={thresholds.highMin}
            onChange={(e) => setThresholds({ ...thresholds, highMin: parseInt(e.target.value) })}
            className="w-full accent-[#EF4444] bg-[#0B0F17] rounded-lg h-2 cursor-pointer"
          />
        </div>

        {/* Summary Pill */}
        <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#27272A] text-xs font-mono text-gray-300 flex justify-between">
          <span className="text-emerald-400">Pass: &lt;{thresholds.lowMax}%</span>
          <span className="text-amber-400">Flagged: {thresholds.lowMax}-{thresholds.highMin}%</span>
          <span className="text-red-400">Diverted: &gt;{thresholds.highMin}%</span>
        </div>
      </div>
    </div>
  );
};
