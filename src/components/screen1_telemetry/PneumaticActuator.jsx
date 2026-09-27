import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { Wind, Zap, CheckCircle2 } from 'lucide-react';

export const PneumaticActuator = () => {
  const { pneumaticPulse, metrics } = useEdgeTelemetry();

  return (
    <div className={`glass-panel p-6 flex flex-col justify-between border-[#27272A] transition-all duration-300 ${
      pneumaticPulse ? 'border-red-500/80 bg-red-950/20 shadow-xl shadow-red-950/30' : ''
    }`}>
      <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Wind className={`w-4 h-4 ${pneumaticPulse ? 'text-red-400 animate-spin' : 'text-[#06B6D4]'}`} />
          Pneumatic Actuator
        </h3>
        <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
          pneumaticPulse 
            ? 'bg-red-950 text-red-400 border-red-500 pulse-red' 
            : 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
        }`}>
          {pneumaticPulse ? 'FIRING SOLENOID' : 'READY'}
        </span>
      </div>

      {/* Large Stat Gauges Grid */}
      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#27272A] flex flex-col">
          <span className="text-xs text-gray-400 font-mono">Air Pressure</span>
          <span className="text-2xl font-bold font-mono text-[#06B6D4] mt-1">6.2 Bar</span>
          <span className="text-[10px] text-gray-500 font-mono mt-1">Regulated Compressed Line</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#27272A] flex flex-col">
          <span className="text-xs text-gray-400 font-mono">Response Time</span>
          <span className="text-2xl font-bold font-mono text-emerald-400 mt-1">16 ms</span>
          <span className="text-[10px] text-gray-500 font-mono mt-1">Solenoid Diverter Pulse</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 font-mono pt-3 border-t border-[#27272A]">
        <span className="flex items-center gap-1.5 text-gray-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Solenoid Valve Gate #B-104
        </span>
        <span className="text-red-400 font-bold">{metrics.totalDiverted} Items Diverted</span>
      </div>
    </div>
  );
};
