import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine, 
  Legend 
} from 'recharts';
import { generateAbsorptionCurve, SELECTED_NIR_BANDS } from '../../data/spectralBands';
import { Layers, Info, CheckCircle2 } from 'lucide-react';

export const HyperspectralChart = () => {
  const [data] = useState(generateAbsorptionCurve());
  const [selectedBand, setSelectedBand] = useState(SELECTED_NIR_BANDS[3]); // 850nm

  return (
    <div className="glass-panel p-8 flex flex-col justify-between border-[#27272A]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#06B6D4]" />
            Hyperspectral Wavelength Absorbance Scan (400 nm - 1000 nm)
          </h2>
          <p className="text-xs text-gray-400 font-mono mt-1">
            6 Compressed NIR Critical Bands Highlighted for Reduced-Band Edge Execution
          </p>
        </div>

        {/* 6 Band Pill Callouts */}
        <div className="flex flex-wrap items-center gap-2">
          {SELECTED_NIR_BANDS.map(band => {
            const isSelected = selectedBand.wavelength === band.wavelength;
            return (
              <button
                key={band.wavelength}
                onClick={() => setSelectedBand(band)}
                style={{
                  borderColor: isSelected ? '#06B6D4' : '#27272A',
                  backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.15)' : '#18181B'
                }}
                className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  isSelected ? 'text-cyan-400 shadow-md shadow-cyan-950/40' : 'text-gray-300 hover:border-gray-500'
                }`}
              >
                {band.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full Width Area Chart */}
      <div className="h-[320px] my-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="passGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="wavelength" 
              stroke="#71717A" 
              fontSize={12} 
              tickFormatter={(v) => `${v}nm`}
            />
            <YAxis 
              stroke="#71717A" 
              fontSize={12} 
              domain={[0, 1.2]}
              tickFormatter={(v) => `${v} AU`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0B0F17', 
                borderColor: '#27272A', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontFamily: 'JetBrains Mono'
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '12px', fontFamily: 'JetBrains Mono', paddingTop: '10px' }} />

            {/* Baseline Pass Area */}
            <Area 
              type="monotone" 
              dataKey="passAbs" 
              name="Nominal Pass Curve (Low Risk)" 
              stroke="#10B981" 
              fillOpacity={1}
              fill="url(#passGradient)"
              strokeWidth={2.5}
            />

            {/* High Risk Contaminated Area */}
            <Area 
              type="monotone" 
              dataKey="highRiskAbs" 
              name="Spoiled / Anomalous Curve (High Risk)" 
              stroke="#EF4444" 
              fillOpacity={1}
              fill="url(#riskGradient)"
              strokeWidth={2}
              strokeDasharray="4 4"
            />

            {/* 6 Neon Cyan NIR Wavelength Markers */}
            {SELECTED_NIR_BANDS.map(band => (
              <ReferenceLine 
                key={band.wavelength}
                x={band.wavelength}
                stroke={selectedBand.wavelength === band.wavelength ? "#06B6D4" : "#27272A"}
                strokeWidth={selectedBand.wavelength === band.wavelength ? 2.5 : 1}
                strokeDasharray={selectedBand.wavelength === band.wavelength ? "none" : "3 3"}
                label={{ 
                  value: band.label, 
                  position: 'top', 
                  fill: '#06B6D4', 
                  fontSize: 11,
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 'bold'
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Band Callout Info */}
      {selectedBand && (
        <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#06B6D4]/40 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-cyan-950/60 font-mono text-sm font-bold text-cyan-400 border border-[#06B6D4]/30">
            {selectedBand.label}
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              {selectedBand.name}
            </h4>
            <p className="text-xs text-gray-300 font-mono mt-1">
              {selectedBand.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
