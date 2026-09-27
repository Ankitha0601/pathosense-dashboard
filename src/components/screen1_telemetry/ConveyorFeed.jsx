import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { Crosshair, ShieldCheck, AlertTriangle, ShieldX, Zap } from 'lucide-react';

export const ConveyorFeed = () => {
  const { 
    conveyorItems, 
    pneumaticPulse,
    setSelectedItem 
  } = useEdgeTelemetry();

  // Color mapping for the 3 food tray card presets
  const getCardStyle = (status, score) => {
    if (status === 'DIVERTED' || score >= 70) {
      return {
        cardBg: 'bg-[#18181B] border-red-500/80 shadow-lg shadow-red-950/40',
        badgeBg: 'bg-red-950/80 text-red-400 border-red-600/60 pulse-red',
        text: 'text-red-400',
        label: 'HIGH RISK (92% Risk) - DIVERTING',
        riskText: '92% Risk'
      };
    } else if (status === 'FLAGGED' || score >= 30) {
      return {
        cardBg: 'bg-[#18181B] border-amber-500/80 shadow-lg shadow-amber-950/40',
        badgeBg: 'bg-amber-950/80 text-amber-400 border-amber-600/60',
        text: 'text-amber-400',
        label: 'Uncertain (45% Risk)',
        riskText: '45% Risk'
      };
    } else {
      return {
        cardBg: 'bg-[#18181B] border-emerald-500/80 shadow-lg shadow-emerald-950/40',
        badgeBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-600/60',
        text: 'text-emerald-400',
        label: 'Pass (12% Risk)',
        riskText: '12% Risk'
      };
    }
  };

  return (
    <div className="glass-panel p-6 flex flex-col justify-between min-h-[460px] border-[#27272A]">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950/50 border border-[#06B6D4]/30">
            <Crosshair className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Live Conveyor Feed
            </h2>
            <span className="text-xs text-gray-400 font-mono">
              Push-broom NIR Hyperspectral Camera • 1,000 FPS Sync
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/30 px-3 py-1.5 rounded-lg border border-[#06B6D4]/30">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-ping" />
          OPTICAL TUNNEL ACTIVE
        </div>
      </div>

      {/* Main Conveyor Graphic Stage */}
      <div className="relative my-6 h-[280px] bg-[#0B0F17] border border-[#27272A] rounded-xl overflow-hidden flex items-center">
        
        {/* Conveyor Belt Track Grid */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #06B6D4 0, #06B6D4 2px, transparent 2px, transparent 36px)'
          }}
        />

        {/* Optical Scan Tunnel Center Region */}
        <div className="absolute left-[40%] width-[20%] top-0 bottom-0 border-x-2 border-dashed border-[#06B6D4]/50 bg-[#06B6D4]/5 pointer-events-none flex flex-col justify-between items-center py-3 z-10">
          <span className="text-[10px] font-mono font-bold text-[#06B6D4] bg-[#0B0F17] px-2.5 py-1 rounded border border-[#06B6D4]/40">
            NIR SCANNING FIELD (400-1000nm)
          </span>
          <div className="laser-beam" />
          <span className="text-[10px] font-mono text-gray-400 bg-[#0B0F17] px-2 py-0.5 rounded">
            FOCAL PLANE 01
          </span>
        </div>

        {/* Pneumatic Diverter Gate line at X = 75% */}
        <div className="absolute left-[75%] top-0 bottom-0 width-[2px] bg-red-500/50 pointer-events-none flex flex-col justify-between items-center z-10">
          <span className="text-[9px] font-mono text-red-400 bg-[#0B0F17] px-2 py-0.5 rounded border border-red-500/50 -translate-x-1/2">
            SOLENOID REJECTION VALVE
          </span>
        </div>

        {/* Pneumatic Shockwave Animation */}
        {pneumaticPulse && (
          <div className="absolute left-[73%] top-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center">
            <div className="pneumatic-shockwave -translate-x-1/2" />
            <div className="bg-red-600 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl animate-bounce flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-300" />
              PNEUMATIC BLAST ACTIVE!
            </div>
          </div>
        )}

        {/* Passing Food Tray Cards */}
        {conveyorItems.map(item => {
          const style = getCardStyle(item.status, item.riskScore);
          const isScanning = item.posX >= 35 && item.posX <= 60;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              style={{ left: `${item.posX}%` }}
              className="absolute top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 transform -translate-x-1/2 z-20 hover:scale-105"
            >
              <div className={`w-48 p-3 rounded-xl border ${style.cardBg}`}>
                
                {/* Laser scan highlight */}
                {isScanning && (
                  <div className="absolute -inset-1 border-2 border-[#06B6D4] rounded-xl animate-pulse pointer-events-none" />
                )}

                <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] text-gray-400">
                  <span>SKU: {item.sku}</span>
                  <span className={`font-bold ${style.text}`}>{style.riskText}</span>
                </div>

                <div className="text-xs font-bold text-white truncate mb-2 font-mono">
                  {item.name}
                </div>

                <div className={`text-[10px] font-bold px-2.5 py-1 rounded-md text-center font-mono border ${style.badgeBg}`}>
                  {style.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status Tags */}
      <div className="flex items-center justify-between pt-4 border-t border-[#27272A] font-mono text-xs text-gray-300">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            <strong className="text-emerald-400">[PASS]</strong> Low Risk (&lt;30%)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
            <strong className="text-amber-400">[FLAGGED]</strong> Uncertain (30-70%)
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <strong className="text-red-400">[DIVERTED]</strong> High Risk (&gt;70%)
          </span>
        </div>
        <span className="text-gray-500">Click card to view item spectrum</span>
      </div>
    </div>
  );
};
