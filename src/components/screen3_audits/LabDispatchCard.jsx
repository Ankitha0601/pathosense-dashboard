import React, { useState } from 'react';
import { ShieldAlert, Truck, CheckCircle2, TestTube2, ArrowRight, X } from 'lucide-react';

export const LabDispatchCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dispatchStep, setDispatchStep] = useState('IDLE'); // 'IDLE', 'PROCESSING', 'DISPATCHED'

  const handleTriggerDispatch = () => {
    setIsModalOpen(true);
    setDispatchStep('PROCESSING');
    setTimeout(() => {
      setDispatchStep('DISPATCHED');
    }, 2000);
  };

  return (
    <>
      <div className="glass-panel p-4 border-l-4 border-l-amber-500 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-500/40">
              <ShieldAlert className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 font-bold border border-amber-600/40">
                AUTOMATED QUARANTINE PROTOCOL ACTIVE
              </span>
              <h3 className="text-sm font-bold text-white font-mono mt-1">
                Auto-Quarantine Tag Generated for Bin #B-104
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Pneumatic Diverter Active • 68 Diverted High-Risk Items Secured
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerDispatch}
            className="btn-danger flex items-center gap-2 text-xs font-mono py-2.5 px-4"
          >
            <Truck className="w-4 h-4" />
            Trigger Courier Pickup & Lab Dispatch for Confirmatory PCR Testing
          </button>
        </div>
      </div>

      {/* Lab Dispatch Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-panel p-6 max-w-lg w-full border-[#00F2FE]/40 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-950 border border-[#00F2FE]/40">
                <TestTube2 className="w-6 h-6 text-[#00F2FE]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono">
                  Confirmatory PCR Testing Dispatch Wizard
                </h3>
                <p className="text-xs text-gray-400 font-mono">
                  Target Facility: National Food Safety Referral Lab (FSSAI Accredited)
                </p>
              </div>
            </div>

            {dispatchStep === 'PROCESSING' && (
              <div className="py-8 text-center space-y-3 font-mono">
                <div className="w-10 h-10 border-4 border-[#00F2FE] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-gray-200">Generating Encrypted Sample Manifest & Booking Priority Express Cold-Chain Courier...</p>
              </div>
            )}

            {dispatchStep === 'DISPATCHED' && (
              <div className="space-y-4 font-mono">
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <span>Courier Pickup Scheduled! Tracking Code: <strong>EXP-IN-2026-9931</strong></span>
                </div>

                <div className="p-3 rounded bg-[#090D16] border border-[#1F2937] text-xs space-y-1.5 text-gray-300">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sample Manifest ID:</span>
                    <span className="font-bold text-white">MNF-2026-0927-B104</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chain of Custody Hash:</span>
                    <span className="text-[10px] text-[#00F2FE]">0x99a2c4e...88f1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Lab Turnaround:</span>
                    <span className="font-bold text-emerald-400">4 Hours (Multiplex Real-Time PCR)</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full btn-primary font-mono text-xs py-2"
                >
                  Close & Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
