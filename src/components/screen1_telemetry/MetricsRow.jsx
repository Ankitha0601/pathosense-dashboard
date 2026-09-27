import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { Activity, Clock, Gauge, Layers, TrendingUp } from 'lucide-react';

export const MetricsRow = () => {
  const { metrics } = useEdgeTelemetry();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Metric Card 1: Throughput */}
      <div 
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px' }}
        className="glass-panel flex flex-col justify-between rounded-xl bg-[#111827]/80 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Throughput Counter
          </span>
          <Activity className="w-4 h-4 text-[#00F2FE]" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span 
            style={{ fontSize: '2.25rem', fontWeight: 800 }}
            className="font-mono text-[#00F2FE] tracking-tight glow-cyan"
          >
            {metrics.throughput}
          </span>
          <span className="text-xs font-mono font-bold text-[#00F2FE] uppercase">
            items/min
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
          <span className="text-[#10B981] flex items-center gap-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> 1.5 m/s Nominal
          </span>
          <svg className="w-14 h-4 stroke-[#10B981] fill-none" viewBox="0 0 60 20">
            <path strokeWidth="2" d="M0,15 L10,12 L20,16 L30,8 L40,11 L50,4 L60,9" />
          </svg>
        </div>
      </div>

      {/* Metric Card 2: End-to-End Latency */}
      <div 
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px' }}
        className="glass-panel flex flex-col justify-between rounded-xl bg-[#111827]/80 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9CA3AF]">
            End-to-End Latency
          </span>
          <Clock className="w-4 h-4 text-[#00F2FE]" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span 
            style={{ fontSize: '2.25rem', fontWeight: 800 }}
            className="font-mono text-[#00F2FE] tracking-tight glow-cyan"
          >
            {metrics.latency}
          </span>
          <span className="text-xs font-mono font-bold text-gray-300">
            ms
          </span>
        </div>
        <div className="pt-2 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
          Edge Inference + Actuator Decision
        </div>
      </div>

      {/* Metric Card 3: Rejection Rate */}
      <div 
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px' }}
        className="glass-panel flex flex-col justify-between rounded-xl bg-[#111827]/80 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Rejection Rate
          </span>
          <Gauge className="w-4 h-4 text-[#10B981]" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span 
            style={{ fontSize: '2.25rem', fontWeight: 800 }}
            className="font-mono text-[#10B981] tracking-tight glow-emerald"
          >
            {metrics.rejectionRate}%
          </span>
        </div>
        <div className="pt-2 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
          {metrics.totalDiverted} items diverted today
        </div>
      </div>

      {/* Metric Card 4: Active Wavelengths */}
      <div 
        style={{ border: '1px solid rgba(255, 255, 255, 0.1)', padding: '12px 16px' }}
        className="glass-panel flex flex-col justify-between rounded-xl bg-[#111827]/80 backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#9CA3AF]">
            Active Wavelengths
          </span>
          <Layers className="w-4 h-4 text-[#00F2FE]" />
        </div>
        <div className="flex items-baseline gap-2 my-1">
          <span 
            style={{ fontSize: '2.25rem', fontWeight: 800 }}
            className="font-mono text-[#00F2FE] tracking-tight glow-cyan"
          >
            6
          </span>
          <span className="text-xs font-mono font-bold text-gray-300">
            NIR Bands
          </span>
        </div>
        <div className="pt-2 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
          Multispectral Reduced-Band Mode
        </div>
      </div>

    </div>
  );
};
