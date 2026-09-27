// FSSAI / Regulatory QA Audit History Dataset

export const INITIAL_BATCH_LOGS = [
  {
    batchId: "BATCH-2026-0927-A",
    lineId: "LINE-01 (High Speed)",
    timestamp: "2026-09-27 14:15:22",
    totalProcessed: 14200,
    passCount: 14008,
    divertedCount: 192,
    rejectionRate: "1.35%",
    labStatus: "CONFIRMED_NEGATIVE",
    fssaiHash: "0x8f2a4e9b71c0d3e5f2a1b4c7d9e0f3a6b5c4d2e1f0a9b8c7d6e5f4a3b2c1d0e9",
    category: "Fresh Poultry Trays",
    qaInspector: "Dr. A. Sharma (FSSAI Reg #IND-8841)"
  },
  {
    batchId: "BATCH-2026-0927-B",
    lineId: "LINE-01 (High Speed)",
    timestamp: "2026-09-27 11:30:00",
    totalProcessed: 12850,
    passCount: 12610,
    divertedCount: 240,
    rejectionRate: "1.86%",
    labStatus: "PCR_PENDING",
    fssaiHash: "0x3c9f1a2b4e5d6c7b8a9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1",
    category: "Atlantic Salmon Fillets",
    qaInspector: "Dr. A. Sharma (FSSAI Reg #IND-8841)"
  },
  {
    batchId: "BATCH-2026-0926-C",
    lineId: "LINE-02 (Standard)",
    timestamp: "2026-09-26 18:45:10",
    totalProcessed: 18900,
    passCount: 18720,
    divertedCount: 180,
    rejectionRate: "0.95%",
    labStatus: "CONFIRMED_NEGATIVE",
    fssaiHash: "0x1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    category: "Packaged Organic Greens",
    qaInspector: "R. Verma (Lead QA Auditor)"
  },
  {
    batchId: "BATCH-2026-0926-B",
    lineId: "LINE-01 (High Speed)",
    timestamp: "2026-09-26 12:10:05",
    totalProcessed: 15400,
    passCount: 15020,
    divertedCount: 380,
    rejectionRate: "2.46%",
    labStatus: "QUARANTINE_VERIFIED",
    fssaiHash: "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
    category: "Pork Loin Chops",
    qaInspector: "R. Verma (Lead QA Auditor)"
  },
  {
    batchId: "BATCH-2026-0925-A",
    lineId: "LINE-03 (Express)",
    timestamp: "2026-09-25 09:20:44",
    totalProcessed: 9800,
    passCount: 9745,
    divertedCount: 55,
    rejectionRate: "0.56%",
    labStatus: "CONFIRMED_NEGATIVE",
    fssaiHash: "0x4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
    category: "Processed Meat Slices",
    qaInspector: "S. Kulkarni (FSSAI Inspector)"
  }
];
