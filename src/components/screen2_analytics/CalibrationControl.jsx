import React from 'react';
import { useEdgeTelemetry } from '../../context/EdgeTelemetryContext';
import { Sun, ShieldAlert, RefreshCw, CheckCircle2 } from 'lucide-react';

export const CalibrationControl = () => {
  const { calibration, runAutoZeroCalibration } = useEdgeTelemetry();

  return (
    <div className="glass-panel p-4 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1F2937]">
        <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          Optical & Environmental Calibration
        </h3>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
          calibration.isCalibrating 
            ? 'bg-amber-950 text-amber-400 border border-amber-500 animate-pulse'
            : 'bg-emerald-950 text-emerald-400 border border-emerald-600/40'
        }`}>
          {calibration.isCalibrating ? 'CALIBRATING...' : 'NOMINAL BASELINE'}
        </span>
      </div>

      <div className="space-y-3">
        {/* Ambient Noise Baseline */}
        <div className="p-2.5 rounded bg-[#090D16] border border-[#1F2937] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-mono">Dark Tunnel Ambient Noise</span>
            <span className="text-sm font-bold font-mono text-emerald-400">
              {calibration.ambientNoise} W/m² (Zero Noise)
            </span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        </div>

        {/* LED Matrix Intensity */}
        <div className="p-2.5 rounded bg-[#090D16] border border-[#1F2937] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-mono">Halogen/NIR LED Intensity</span>
            <span className="text-sm font-bold font-mono text-[#00F2FE]">
              {calibration.ledIntensity}% Auto-Balanced (2400 K)
            </span>
          </div>
          <Sun className="w-4 h-4 text-[#00F2FE]" />
        </div>

        {/* Calibration Trigger Button */}
        <button
          onClick={runAutoZeroCalibration}
          disabled={calibration.isCalibrating}
          className="w-full btn-primary flex items-center justify-center gap-2 text-xs font-mono py-2.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${calibration.isCalibrating ? 'animate-spin' : ''}`} />
          {calibration.isCalibrating ? 'Running Auto-Zero Calibration...' : 'Run Auto-Zero Calibration Routine'}
        </button>
      </div>
    </div>
  );
};
