import React, { useState } from 'react';
import { INITIAL_BATCH_LOGS } from '../../data/mockBatches';
import { Search, Copy, Check, ShieldCheck, FileSpreadsheet, Lock } from 'lucide-react';

export const AuditTrailTable = () => {
  const [batches] = useState(INITIAL_BATCH_LOGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedHash, setCopiedHash] = useState(null);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const filteredBatches = batches.filter(batch => 
    batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.fssaiHash.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-panel p-4 flex flex-col justify-between">
      {/* Table Header & Search Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#1F2937]">
        <div>
          <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
            Regulatory Digital Audit Trail (FSSAI Compliance)
          </h2>
          <p className="text-xs text-gray-400 font-mono">
            Cryptographically Hashed Inspection Logs (SHA-256 Immutable Traceability)
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Batch ID, Hash, or Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-1.5 rounded-md bg-[#090D16] border border-[#1F2937] text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE] w-64"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto my-3">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1F2937] text-[11px] font-mono text-gray-400 uppercase tracking-wider bg-[#090D16]/60">
              <th className="p-2.5">Batch ID</th>
              <th className="p-2.5">Line ID</th>
              <th className="p-2.5">Timestamp</th>
              <th className="p-2.5 text-right">Processed</th>
              <th className="p-2.5 text-right">Pass Count</th>
              <th className="p-2.5 text-right">Diverted</th>
              <th className="p-2.5">Lab Status</th>
              <th className="p-2.5">FSSAI Audit Hash (SHA-256)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1F2937]/60 text-xs font-mono">
            {filteredBatches.map(batch => (
              <tr key={batch.batchId} className="hover:bg-[#111827]/80 transition-colors">
                <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-[#00F2FE]" />
                  {batch.batchId}
                </td>
                <td className="p-2.5 text-gray-300">{batch.lineId}</td>
                <td className="p-2.5 text-gray-400 text-[11px]">{batch.timestamp}</td>
                <td className="p-2.5 text-right font-bold text-gray-200">{batch.totalProcessed.toLocaleString()}</td>
                <td className="p-2.5 text-right text-emerald-400 font-bold">{batch.passCount.toLocaleString()}</td>
                <td className="p-2.5 text-right text-red-400 font-bold">{batch.divertedCount.toLocaleString()} ({batch.rejectionRate})</td>
                <td className="p-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                    batch.labStatus === 'CONFIRMED_NEGATIVE'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-600/40'
                      : batch.labStatus === 'PCR_PENDING'
                      ? 'bg-amber-950 text-amber-400 border-amber-600/40'
                      : 'bg-red-950 text-red-400 border-red-600/40'
                  }`}>
                    {batch.labStatus}
                  </span>
                </td>
                <td className="p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 truncate max-w-[140px]" title={batch.fssaiHash}>
                      {batch.fssaiHash}
                    </span>
                    <button
                      onClick={() => handleCopyHash(batch.fssaiHash)}
                      className="p-1 rounded bg-[#090D16] border border-[#1F2937] hover:border-[#00F2FE] text-gray-300 hover:text-[#00F2FE] transition-all"
                      title="Copy SHA-256 Hash"
                    >
                      {copiedHash === batch.fssaiHash ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
