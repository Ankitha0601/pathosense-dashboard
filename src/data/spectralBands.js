// Spectral NIR Wavelength definitions and baseline curves (400nm - 1000nm)

export const SELECTED_NIR_BANDS = [
  {
    wavelength: 710,
    label: "710 nm",
    name: "Chlorophyll & Surface Pigment",
    role: "Detects pigment breakdown, enzymatic browning, and surface tissue discoloration.",
    color: "#00F2FE"
  },
  {
    wavelength: 760,
    label: "760 nm",
    name: "O-H 3rd Overtone (Moisture)",
    role: "Monitors cellular water retention, drip loss, and surface dehydration index.",
    color: "#3B82F6"
  },
  {
    wavelength: 810,
    label: "810 nm",
    name: "C-H Stretching (Lipid/Fat)",
    role: "Quantifies lipid oxidation, rancidity markers, and intramuscular fat degradation.",
    color: "#8B5CF6"
  },
  {
    wavelength: 850,
    label: "850 nm",
    name: "N-H Protein Structure",
    role: "Measures myofibrillar protein denaturization and peptide bond cleavage.",
    color: "#EC4899"
  },
  {
    wavelength: 910,
    label: "910 nm",
    name: "Amino Acid Breakdown (TVB-N)",
    role: "Correlates directly with Total Volatile Basic Nitrogen (TVB-N) microbial decay.",
    color: "#F59E0B"
  },
  {
    wavelength: 950,
    label: "950 nm",
    name: "Free vs. Bound Water Ratio",
    role: "Evaluates intracellular water displacement and bacterial biofilm formation.",
    color: "#10B981"
  }
];

// Generate smooth absorption curve baseline from 400nm to 1000nm
export const generateAbsorptionCurve = () => {
  const data = [];
  for (let w = 400; w <= 1000; w += 10) {
    // Normal baseline absorption curve with characteristic NIR peaks
    let passAbs = 0.2 + 0.15 * Math.sin((w - 400) / 100) + 0.1 * Math.exp(-Math.pow((w - 760) / 40, 2)) + 0.25 * Math.exp(-Math.pow((w - 950) / 50, 2));
    
    // Contaminated / High Risk item shows strong anomaly spikes at 850nm (protein breakdown) and 910nm (TVB-N decay)
    let highRiskAbs = passAbs + 0.35 * Math.exp(-Math.pow((w - 850) / 30, 2)) + 0.42 * Math.exp(-Math.pow((w - 910) / 25, 2)) - 0.12 * Math.exp(-Math.pow((w - 760) / 20, 2));
    
    // Check if this wavelength is one of the 6 selected bands
    const selectedBand = SELECTED_NIR_BANDS.find(b => b.wavelength === w);

    data.push({
      wavelength: w,
      passAbs: parseFloat(passAbs.toFixed(3)),
      highRiskAbs: parseFloat(highRiskAbs.toFixed(3)),
      isBand: !!selectedBand,
      bandLabel: selectedBand ? selectedBand.label : null,
      bandColor: selectedBand ? selectedBand.color : null
    });
  }
  return data;
};
