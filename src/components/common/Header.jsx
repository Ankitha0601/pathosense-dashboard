import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { 
  Zap, 
  Activity, 
  BarChart3, 
  FileText, 
  Pause, 
  Play,
  Clock,
  Gauge,
  Layers,
  TrendingUp
} from 'lucide-react';

export const Header = () => {
  const { 
    isStreaming, 
    setIsStreaming, 
    activeTab, 
    setActiveTab,
    uptimeSeconds,
    metrics
  } = useEdgeTelemetry();

  // Format uptime (HH:MM:SS)
  const formatUptime = (totalSec) => {
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const navTabs = [
    { id: 'telemetry', label: 'Live Inline Telemetry', icon: Activity },
    { id: 'analytics', label: 'Spectral Analytics & AI Models', icon: BarChart3 },
    { id: 'audits', label: 'Batch Audits & Traceability', icon: FileText }
  ];

  return (
    <header className="w-full bg-[#090D16]/90 border-b border-[#1F2937] backdrop-blur-md sticky top-0 z-50 px-6 py-3">
      {/* Top Header Row: Branding, Tabs, Line Status & Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-3">
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-[#00F2FE]/40 flex items-center justify-center box-glow-cyan">
            <Zap className="w-6 h-6 text-[#00F2FE] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white font-mono">
                PathoSense <span className="text-[#00F2FE]">|</span> TensorX Edge
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-[#00F2FE] border border-[#00F2FE]/30 font-mono font-bold">
                ID: SNPSU0285
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono">
              SIH 2026: SIH26233 • High-Speed Hyperspectral Isolation Node
            </p>
          </div>
        </div>

        {/* Center: Tab Switcher Navigation */}
        <div className="bg-[#111827] p-1.5 rounded-xl border border-[#1F2937] flex items-center gap-1">
          {navTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                  isActive 
                    ? 'bg-[#00F2FE]/20 text-white border border-[#00F2FE] box-glow-cyan' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00F2FE]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Operational Status & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111827] border border-[#1F2937]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] pulse-green" />
            <span className="text-xs font-semibold text-gray-200 font-mono">
              Conveyor Active <span className="text-[#00F2FE]">(1.5 m/s)</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111827] border border-[#1F2937] text-xs font-mono text-gray-300">
            <Clock className="w-3.5 h-3.5 text-[#00F2FE]" />
            <span>{formatUptime(uptimeSeconds)}</span>
          </div>

          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold font-mono transition-all ${
              isStreaming
                ? 'bg-amber-950/60 text-amber-400 border border-amber-600/40 hover:bg-amber-900'
                : 'bg-emerald-950/60 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-900'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Edge
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Resume Edge
              </>
            )}
          </button>
        </div>
      </div>

      {/* TOP KPI METRICS BAR ENHANCEMENT */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-[#1F2937]">
        {/* Metric 1: Throughput */}
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
          <div className="flex items-center justify-between pt-1 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
            <span className="text-[#10B981] flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3 h-3" /> Nominal Speed
            </span>
            <svg className="w-14 h-4 stroke-[#10B981] fill-none" viewBox="0 0 60 20">
              <path strokeWidth="2" d="M0,15 L10,12 L20,16 L30,8 L40,11 L50,4 L60,9" />
            </svg>
          </div>
        </div>

        {/* Metric 2: Latency */}
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
          <div className="pt-1 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
            CNN + Solenoid Trigger Timing
          </div>
        </div>

        {/* Metric 3: Rejection Rate */}
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
          <div className="pt-1 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
            {metrics.totalDiverted} items diverted today
          </div>
        </div>

        {/* Metric 4: Active Wavelengths */}
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
          <div className="pt-1 border-t border-[#1F2937]/80 font-mono text-[11px] text-[#9CA3AF]">
            Multispectral Reduced-Band Mode
          </div>
        </div>
      </div>
    </header>
  );
};
