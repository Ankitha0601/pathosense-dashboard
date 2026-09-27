import React, { createContext, useContext, useState, useEffect } from 'react';

const EdgeTelemetryContext = createContext();

const FOOD_PRESETS = [
  { name: "Packaged Chicken Breast Tray", sku: "CH-9021", category: "Poultry", baseRisk: 8 },
  { name: "Atlantic Salmon Fillet", sku: "SF-4412", category: "Seafood", baseRisk: 12 },
  { name: "Organic Spinach Salad Tray", sku: "SP-1093", category: "Produce", baseRisk: 4 },
  { name: "Fresh Beef Tenderloin Loin", sku: "BF-7712", category: "Red Meat", baseRisk: 15 },
  { name: "Pork Loin Chops Pack", sku: "PK-8831", category: "Pork", baseRisk: 10 },
  { name: "Fresh Red Apples Tray", sku: "AP-3104", category: "Produce", baseRisk: 2 }
];

export const EdgeTelemetryProvider = ({ children }) => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry', 'analytics', 'audits'

  // Uptime in seconds
  const [uptimeSeconds, setUptimeSeconds] = useState(15738); // ~04h 22m 18s

  // Thresholds (Tri-state slider)
  const [thresholds, setThresholds] = useState({ lowMax: 30, highMin: 70 });

  // System Metrics
  const [metrics, setMetrics] = useState({
    throughput: 138,
    latency: 38,
    activeBands: 6,
    rejectionRate: 1.41,
    totalProcessed: 4820,
    totalDiverted: 68
  });

  // Spectral Surrogates Telemetry Gauges
  const [surrogates, setSurrogates] = useState({
    proteinOxidation: 14.2, // %
    moistureLoss: 8.7,      // %
    tvbnDrift: 0.18         // mg/100g
  });

  // Rejection Log Stream
  const [rejectionLog, setRejectionLog] = useState([
    {
      id: "REJ-8941",
      timestamp: new Date(Date.now() - 120000).toLocaleTimeString(),
      item: "Packaged Chicken Breast Tray",
      sku: "CH-9021",
      riskScore: 92,
      confidence: "98.4%",
      primaryAnom: "Salmonella & TVB-N Spike (910nm)",
      bin: "Bin #B-104"
    },
    {
      id: "REJ-8938",
      timestamp: new Date(Date.now() - 340000).toLocaleTimeString(),
      item: "Pork Loin Chops Pack",
      sku: "PK-8831",
      riskScore: 84,
      confidence: "95.1%",
      primaryAnom: "Protein Oxidation (850nm)",
      bin: "Bin #B-104"
    },
    {
      id: "REJ-8931",
      timestamp: new Date(Date.now() - 620000).toLocaleTimeString(),
      item: "Atlantic Salmon Fillet",
      sku: "SF-4412",
      riskScore: 89,
      confidence: "97.8%",
      primaryAnom: "Lipid Oxidation & Moisture Loss",
      bin: "Bin #B-104"
    }
  ]);

  // Conveyor Items Stream (Position 0% to 100%)
  const [conveyorItems, setConveyorItems] = useState([
    { id: 'item-1', name: 'Packaged Chicken Breast Tray', sku: 'CH-9021', category: 'Poultry', posX: 15, riskScore: 12, status: 'PASS' },
    { id: 'item-2', name: 'Atlantic Salmon Fillet', sku: 'SF-4412', category: 'Seafood', posX: 45, riskScore: 88, status: 'DIVERTED' },
    { id: 'item-3', name: 'Organic Spinach Salad Tray', sku: 'SP-1093', category: 'Produce', posX: 75, riskScore: 42, status: 'FLAGGED' }
  ]);

  // Active Pneumatic Actuator Pulse Event
  const [pneumaticPulse, setPneumaticPulse] = useState(false);

  // Optical Tunnel Calibration state
  const [calibration, setCalibration] = useState({
    ambientNoise: 0.04,
    ledIntensity: 100,
    status: 'OPTIMAL_CALIBRATED',
    isCalibrating: false
  });

  // Selected item modal for live inspection
  const [selectedItem, setSelectedItem] = useState(null);

  // Uptime ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Main Live Telemetry Simulation Loop (runs every 1.5 seconds)
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // 1. Update Conveyor Positions & Spawn New Items
      setConveyorItems(prevItems => {
        let updated = prevItems.map(item => ({
          ...item,
          posX: item.posX + 12 // Speed of conveyor
        }));

        // Check if any high risk item reaches solenoid diverter position (~75%)
        const diverterItem = updated.find(item => item.posX >= 72 && item.posX <= 88 && item.status === 'DIVERTED');
        if (diverterItem) {
          triggerPneumaticActuator(diverterItem);
        }

        // Filter out items that exited conveyor (> 100%)
        updated = updated.filter(item => item.posX <= 100);

        // Spawn new item if queue has room
        if (updated.length < 4) {
          const preset = FOOD_PRESETS[Math.floor(Math.random() * FOOD_PRESETS.length)];
          // Determine risk score dynamically based on random roll
          const roll = Math.random();
          let riskScore = 0;
          let status = 'PASS';

          if (roll > 0.82) {
            // High Risk (>70%)
            riskScore = Math.floor(74 + Math.random() * 23);
            status = 'DIVERTED';
          } else if (roll > 0.65) {
            // Uncertain (30% - 70%)
            riskScore = Math.floor(34 + Math.random() * 32);
            status = 'FLAGGED';
          } else {
            // Low Risk (<30%)
            riskScore = Math.floor(2 + Math.random() * 22);
            status = 'PASS';
          }

          updated.push({
            id: `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: preset.name,
            sku: preset.sku,
            category: preset.category,
            posX: 0,
            riskScore,
            status
          });

          // Increment total session count
          setMetrics(m => {
            const newTotal = m.totalProcessed + 1;
            const newDiverted = status === 'DIVERTED' ? m.totalDiverted + 1 : m.totalDiverted;
            return {
              ...m,
              throughput: Math.floor(134 + Math.random() * 9),
              latency: Math.floor(36 + Math.random() * 5),
              totalProcessed: newTotal,
              totalDiverted: newDiverted,
              rejectionRate: parseFloat(((newDiverted / newTotal) * 100).toFixed(2))
            };
          });
        }

        return updated;
      });

      // 2. Jitter Spectral Surrogates realistically
      setSurrogates(s => ({
        proteinOxidation: parseFloat((14.0 + (Math.random() * 0.6 - 0.3)).toFixed(1)),
        moistureLoss: parseFloat((8.5 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        tvbnDrift: parseFloat((0.18 + (Math.random() * 0.04 - 0.02)).toFixed(2))
      }));

    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming, thresholds]);

  // Trigger Pneumatic Actuator Solenoid
  const triggerPneumaticActuator = (item) => {
    setPneumaticPulse(true);
    setTimeout(() => setPneumaticPulse(false), 800);

    // Add to rejection log if not already added
    setRejectionLog(prevLog => {
      if (prevLog.some(entry => entry.sku === item.sku && entry.timestamp === new Date().toLocaleTimeString())) {
        return prevLog;
      }
      return [
        {
          id: `REJ-${Math.floor(8900 + Math.random() * 100)}`,
          timestamp: new Date().toLocaleTimeString(),
          item: item.name,
          sku: item.sku,
          riskScore: item.riskScore,
          confidence: `${(94 + Math.random() * 5).toFixed(1)}%`,
          primaryAnom: item.riskScore > 85 ? "Severe Microbial Degradation (910nm)" : "Protein Denaturation (850nm)",
          bin: "Bin #B-104"
        },
        ...prevLog.slice(0, 9)
      ];
    });
  };

  // Run Auto-Zero Calibration
  const runAutoZeroCalibration = () => {
    setCalibration(c => ({ ...c, isCalibrating: true }));
    setTimeout(() => {
      setCalibration({
        ambientNoise: 0.02,
        ledIntensity: 100,
        status: 'OPTIMAL_CALIBRATED',
        isCalibrating: false
      });
    }, 2500);
  };

  return (
    <EdgeTelemetryContext.Provider value={{
      isStreaming,
      setIsStreaming,
      activeTab,
      setActiveTab,
      uptimeSeconds,
      metrics,
      surrogates,
      rejectionLog,
      conveyorItems,
      pneumaticPulse,
      thresholds,
      setThresholds,
      calibration,
      runAutoZeroCalibration,
      selectedItem,
      setSelectedItem
    }}>
      {children}
    </EdgeTelemetryContext.Provider>
  );
};

export const useEdgeTelemetry = () => useContext(EdgeTelemetryContext);
