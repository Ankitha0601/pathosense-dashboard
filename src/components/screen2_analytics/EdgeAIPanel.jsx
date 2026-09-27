import React from 'react';
import { Cpu, HardDrive, Zap, Grid, CheckCircle2 } from 'lucide-react';

export const EdgeAIPanel = () => {
  return (
    <div className="glass-panel p-6 flex flex-col justify-between border-[#27272A]">
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#06B6D4]" />
          Edge Model Status
        </h3>
        <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30">
          JETSON EDGE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 my-3">
        <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#27272A]">
          <span className="text-[11px] text-gray-400 block font-mono">Inference Speed</span>
          <span className="text-xl font-bold font-mono text-[#06B6D4]">12 ms</span>
        </div>

        <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#27272A]">
          <span className="text-[11px] text-gray-400 block font-mono">RAM Footprint</span>
          <span className="text-xl font-bold font-mono text-indigo-400">140 MB</span>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-[#0B0F17] border border-[#27272A] font-mono text-xs text-gray-300 flex items-center justify-between">
        <span>Hardware Engine:</span>
        <span className="font-bold text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Jetson Orin NPU
        </span>
      </div>
    </div>
  );
};
