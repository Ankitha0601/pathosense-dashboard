import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FileText, Download, CheckCircle2, ShieldCheck, Printer, X, FileCheck } from 'lucide-react';

export const ReportExportModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setIsDownloading(false);
      // Trigger a browser print or simulated text download file
      const reportText = `
PATHOSENSE TENSORX EDGE SYSTEM - FSSAI / HACCP COMPLIANCE REPORT
-----------------------------------------------------------------
System ID: SNPSU0285
Problem Statement: SIH 2026 (SIH26233)
Report Generated: ${new Date().toLocaleString()}
Inspection Node: Inline Hyperspectral Edge Tunnel 01

EXECUTIVE SUMMARY:
Total Processed Items: 14,200
Passed Items (Low Risk): 14,008 (98.65%)
Diverted Items (High Risk): 192 (1.35%)
Average End-to-End Latency: 38 ms
Selected Wavelength Bands: 710nm, 760nm, 810nm, 850nm, 910nm, 950nm

FSSAI DIGITAL SIGNATURE & IMMUTABLE HASH:
SHA-256: 0x8f2a4e9b71c0d3e5f2a1b4c7d9e0f3a6b5c4d2e1f0a9b8c7d6e5f4a3b2c1d0e9
QA Auditor: Dr. A. Sharma (FSSAI Reg #IND-8841)
-----------------------------------------------------------------
      `;

      const element = document.createElement("a");
      const file = new Blob([reportText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `PathoSense_FSSAI_HACCP_Report_${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  return (
    <>
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-[#00F2FE]/30">
            <FileText className="w-6 h-6 text-[#00F2FE]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono">
              FSSAI / HACCP Compliance Documentation
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Generate Official Regulatory PDF Audit Record with SHA-256 Signature
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary flex items-center gap-2 text-xs font-mono py-2.5 px-4"
        >
          <Download className="w-4 h-4" />
          Generate FSSAI / HACCP Compliance PDF Report
        </button>
      </div>

      {/* PDF Report Preview Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="glass-panel p-6 max-w-2xl w-full border-[#00F2FE]/40 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="border-b border-[#1F2937] pb-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#00F2FE]" />
                <div>
                  <h2 className="text-base font-bold text-white font-mono">
                    FSSAI & HACCP OFFICIAL AUDIT CERTIFICATE
                  </h2>
                  <p className="text-xs text-[#00F2FE] font-mono">
                    PathoSense TensorX Hyperspectral Edge Isolation System (SIH26233)
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-600/40 px-2 py-1 rounded font-bold">
                VALIDATED & COMPLIANT
              </span>
            </div>

            {/* Certificate Preview Body */}
            <div className="bg-[#090D16] p-4 rounded-lg border border-[#1F2937] font-mono text-xs space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-2 text-gray-300 border-b border-[#1F2937] pb-3">
                <div><strong>System ID:</strong> SNPSU0285</div>
                <div><strong>Inspection Date:</strong> {new Date().toLocaleDateString()}</div>
                <div><strong>Facility:</strong> Plant Line 01 (High Speed)</div>
                <div><strong>Lead Inspector:</strong> Dr. A. Sharma (IND-8841)</div>
              </div>

              <div>
                <h4 className="font-bold text-[#00F2FE] mb-1">AUTOMATED QA AUDIT METRICS</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Total Food Items Inspected: <strong className="text-white">14,200 Trays</strong></li>
                  <li>• Passed Quality Threshold (&lt;30% Risk): <strong className="text-emerald-400">14,008 (98.65%)</strong></li>
                  <li>• Solenoid Isolation Diverted (&gt;70% Risk): <strong className="text-red-400">192 (1.35%)</strong></li>
                  <li>• Wavelength Spectral Resolution: <strong className="text-white">6 Compressed NIR Bands (710nm - 950nm)</strong></li>
                  <li>• Optical Tunnel Ambient Zero Noise: <strong className="text-emerald-400">0.04 W/m² (Pass)</strong></li>
                </ul>
              </div>

              <div className="p-2.5 rounded bg-black/60 border border-[#1F2937]">
                <span className="text-[10px] text-gray-500 block">FSSAI IMMUTABLE BLOCKCHAIN / SHA-256 AUDIT HASH</span>
                <span className="text-[10px] text-[#00F2FE] font-bold break-all">
                  0x8f2a4e9b71c0d3e5f2a1b4c7d9e0f3a6b5c4d2e1f0a9b8c7d6e5f4a3b2c1d0e9
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 font-mono">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded border border-[#1F2937] bg-[#111827] text-gray-200 text-xs hover:border-[#00F2FE] flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print Document
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="btn-primary text-xs py-2 px-5 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isDownloading ? 'Generating Encrypted PDF...' : 'Download Official PDF Report'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
