import React from 'react';
import { EdgeTelemetryProvider, useEdgeTelemetry } from './context/EdgeTelemetryContext';
import { Header } from './components/common/Header';

// Screen 1 Components
import { ConveyorFeed } from './components/screen1_telemetry/ConveyorFeed';
import { PneumaticActuator } from './components/screen1_telemetry/PneumaticActuator';
import { SpectralSurrogates } from './components/screen1_telemetry/SpectralSurrogates';
import { RejectionStream } from './components/screen1_telemetry/RejectionStream';

// Screen 2 Components
import { HyperspectralChart } from './components/screen2_analytics/HyperspectralChart';
import { EdgeAIPanel } from './components/screen2_analytics/EdgeAIPanel';
import { ThresholdSlider } from './components/screen2_analytics/ThresholdSlider';
import { CalibrationControl } from './components/screen2_analytics/CalibrationControl';

// Screen 3 Components
import { AuditTrailTable } from './components/screen3_audits/AuditTrailTable';
import { LabDispatchCard } from './components/screen3_audits/LabDispatchCard';
import { ReportExportModal } from './components/screen3_audits/ReportExportModal';

// Modal
import { ItemDetailModal } from './components/common/ItemDetailModal';

const DashboardContent = () => {
  const { activeTab } = useEdgeTelemetry();

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-[#F3F4F6]">
      {/* Top Header Bar & KPI Metrics Row */}
      <Header />

      <main className="flex-1 p-4 max-w-[1600px] w-full mx-auto space-y-4">
        
        {/* SCREEN 1: LIVE INLINE TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div className="space-y-4">
            {/* Primary Conveyor Feed Centerpiece */}
            <ConveyorFeed />

            {/* Bottom Widgets Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PneumaticActuator />
              <SpectralSurrogates />
              <RejectionStream />
            </div>
          </div>
        )}

        {/* SCREEN 2: SPECTRAL ANALYTICS & AI MODELS */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            {/* Primary Hyperspectral Chart */}
            <HyperspectralChart />

            {/* AI Stats & Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EdgeAIPanel />
              <ThresholdSlider />
              <CalibrationControl />
            </div>
          </div>
        )}

        {/* SCREEN 3: BATCH AUDITS & TRACEABILITY */}
        {activeTab === 'audits' && (
          <div className="space-y-4">
            {/* Primary Regulatory Audit Trail Table */}
            <AuditTrailTable />

            {/* Lab Dispatch & Export Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LabDispatchCard />
              <ReportExportModal />
            </div>
          </div>
        )}

      </main>

      {/* Footer Bar */}
      <footer className="w-full bg-[#090D16] border-t border-[#1F2937] px-4 py-3 text-center text-xs font-mono text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>PathoSense Inline Hyperspectral Edge Isolation System (SNPSU0285)</span>
        <span className="text-gray-400">Smart India Hackathon (SIH 2026, Problem Statement: SIH26233)</span>
        <span className="text-[#00F2FE]">Status: 100% Operational • Edge Connected</span>
      </footer>

      {/* Modals */}
      <ItemDetailModal />
    </div>
  );
};

export default function App() {
  return (
    <EdgeTelemetryProvider>
      <DashboardContent />
    </EdgeTelemetryProvider>
  );
}
