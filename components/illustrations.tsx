export function DataEngineeringIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Server rack */}
      <rect x="30" y="30" width="60" height="100" rx="6" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="38" y="40" width="44" height="10" rx="2" fill="#3B82F6" />
      <circle cx="74" cy="45" r="3" fill="#BFDBFE" />
      <rect x="38" y="56" width="44" height="10" rx="2" fill="#3B82F6" />
      <circle cx="74" cy="61" r="3" fill="#BFDBFE" />
      <rect x="38" y="72" width="44" height="10" rx="2" fill="#3B82F6" />
      <circle cx="74" cy="77" r="3" fill="#BFDBFE" />
      <rect x="38" y="88" width="44" height="10" rx="2" fill="#93C5FD" />
      <circle cx="74" cy="93" r="3" fill="#BFDBFE" />
      {/* Pipeline arrows */}
      <path d="M95 60 L125 60" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M95 80 L125 80" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M120 55 L130 60 L120 65" fill="#3B82F6" />
      <path d="M120 75 L130 80 L120 85" fill="#3B82F6" />
      {/* Database cylinder */}
      <ellipse cx="155" cy="50" rx="25" ry="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <rect x="130" y="50" width="50" height="40" fill="#DBEAFE" />
      <line x1="130" y1="50" x2="130" y2="90" stroke="#3B82F6" strokeWidth="2" />
      <line x1="180" y1="50" x2="180" y2="90" stroke="#3B82F6" strokeWidth="2" />
      <ellipse cx="155" cy="90" rx="25" ry="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <ellipse cx="155" cy="70" rx="25" ry="10" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3 3" />
      {/* Data flow dots */}
      <circle cx="110" cy="52" r="2" fill="#60A5FA">
        <animate attributeName="cx" values="95;125" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="88" r="2" fill="#60A5FA">
        <animate attributeName="cx" values="125;95" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function DataCrunchingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Gears */}
      <circle cx="70" cy="65" r="28" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
      <circle cx="70" cy="65" r="15" fill="#C7D2FE" stroke="#6366F1" strokeWidth="2" />
      <circle cx="70" cy="65" r="5" fill="#6366F1" />
      {/* Gear teeth */}
      <rect x="64" y="33" width="12" height="8" rx="2" fill="#6366F1" />
      <rect x="64" y="89" width="12" height="8" rx="2" fill="#6366F1" />
      <rect x="38" y="59" width="8" height="12" rx="2" fill="#6366F1" />
      <rect x="94" y="59" width="8" height="12" rx="2" fill="#6366F1" />
      {/* Small gear */}
      <circle cx="108" cy="90" r="18" fill="#E0E7FF" stroke="#6366F1" strokeWidth="2" />
      <circle cx="108" cy="90" r="9" fill="#C7D2FE" stroke="#6366F1" strokeWidth="2" />
      <circle cx="108" cy="90" r="3" fill="#6366F1" />
      <rect x="103" y="69" width="10" height="6" rx="2" fill="#6366F1" />
      <rect x="103" y="105" width="10" height="6" rx="2" fill="#6366F1" />
      {/* Data rows flowing in */}
      <rect x="130" y="40" width="55" height="8" rx="3" fill="#C7D2FE" />
      <rect x="130" y="40" width="20" height="8" rx="3" fill="#6366F1" />
      <rect x="130" y="55" width="55" height="8" rx="3" fill="#C7D2FE" />
      <rect x="130" y="55" width="35" height="8" rx="3" fill="#6366F1" />
      <rect x="130" y="70" width="55" height="8" rx="3" fill="#C7D2FE" />
      <rect x="130" y="70" width="45" height="8" rx="3" fill="#6366F1" />
      {/* Processed output */}
      <rect x="130" y="95" width="55" height="8" rx="3" fill="#6366F1" />
      <rect x="130" y="110" width="55" height="8" rx="3" fill="#6366F1" />
      {/* Checkmark */}
      <circle cx="170" cy="130" r="8" fill="#6366F1" />
      <path d="M166 130 L169 133 L175 127" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DataAnalysisIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chart background */}
      <rect x="20" y="20" width="160" height="110" rx="8" fill="#F0FDFA" stroke="#14B8A6" strokeWidth="2" />
      {/* Grid lines */}
      <line x1="40" y1="30" x2="40" y2="120" stroke="#99F6E4" strokeWidth="1" />
      <line x1="20" y1="50" x2="180" y2="50" stroke="#99F6E4" strokeWidth="1" />
      <line x1="20" y1="75" x2="180" y2="75" stroke="#99F6E4" strokeWidth="1" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="#99F6E4" strokeWidth="1" />
      {/* Bar chart */}
      <rect x="50" y="72" width="14" height="48" rx="2" fill="#14B8A6" opacity="0.7" />
      <rect x="72" y="55" width="14" height="65" rx="2" fill="#14B8A6" opacity="0.85" />
      <rect x="94" y="62" width="14" height="58" rx="2" fill="#14B8A6" />
      <rect x="116" y="40" width="14" height="80" rx="2" fill="#0D9488" />
      <rect x="138" y="48" width="14" height="72" rx="2" fill="#14B8A6" />
      {/* Trend line */}
      <polyline points="57,68 79,50 101,56 123,35 145,42" stroke="#0F766E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Trend dots */}
      <circle cx="57" cy="68" r="3" fill="#0F766E" />
      <circle cx="79" cy="50" r="3" fill="#0F766E" />
      <circle cx="101" cy="56" r="3" fill="#0F766E" />
      <circle cx="123" cy="35" r="3" fill="#0F766E" />
      <circle cx="145" cy="42" r="3" fill="#0F766E" />
      {/* Magnifying glass */}
      <circle cx="160" cy="135" r="12" fill="none" stroke="#14B8A6" strokeWidth="2.5" />
      <line x1="169" y1="144" x2="178" y2="150" stroke="#14B8A6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function DataScienceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Brain outline */}
      <path d="M80 40 C60 40 45 55 45 75 C45 95 60 110 80 115 L80 120 L120 120 L120 115 C140 110 155 95 155 75 C155 55 140 40 120 40 C110 40 105 45 100 45 C95 45 90 40 80 40Z" fill="#F3E8FF" stroke="#9333EA" strokeWidth="2" />
      {/* Brain center line */}
      <line x1="100" y1="45" x2="100" y2="120" stroke="#9333EA" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Neural nodes left */}
      <circle cx="65" cy="65" r="6" fill="#C084FC" stroke="#9333EA" strokeWidth="1.5" />
      <circle cx="75" cy="85" r="6" fill="#C084FC" stroke="#9333EA" strokeWidth="1.5" />
      <circle cx="60" cy="95" r="5" fill="#D8B4FE" stroke="#9333EA" strokeWidth="1.5" />
      {/* Neural nodes right */}
      <circle cx="135" cy="65" r="6" fill="#C084FC" stroke="#9333EA" strokeWidth="1.5" />
      <circle cx="125" cy="85" r="6" fill="#C084FC" stroke="#9333EA" strokeWidth="1.5" />
      <circle cx="140" cy="95" r="5" fill="#D8B4FE" stroke="#9333EA" strokeWidth="1.5" />
      {/* Connections */}
      <line x1="71" y1="65" x2="129" y2="65" stroke="#9333EA" strokeWidth="1" opacity="0.5" />
      <line x1="81" y1="85" x2="119" y2="85" stroke="#9333EA" strokeWidth="1" opacity="0.5" />
      <line x1="65" y1="71" x2="75" y2="79" stroke="#9333EA" strokeWidth="1" opacity="0.5" />
      <line x1="135" y1="71" x2="125" y2="79" stroke="#9333EA" strokeWidth="1" opacity="0.5" />
      <line x1="71" y1="65" x2="119" y2="85" stroke="#9333EA" strokeWidth="1" opacity="0.3" />
      <line x1="129" y1="65" x2="81" y2="85" stroke="#9333EA" strokeWidth="1" opacity="0.3" />
      {/* Center node */}
      <circle cx="100" cy="75" r="8" fill="#9333EA" />
      <circle cx="100" cy="75" r="4" fill="#F3E8FF" />
      {/* Output nodes */}
      <circle cx="80" cy="140" r="5" fill="#9333EA" />
      <circle cx="100" cy="145" r="5" fill="#7C3AED" />
      <circle cx="120" cy="140" r="5" fill="#9333EA" />
      <line x1="80" y1="120" x2="80" y2="135" stroke="#9333EA" strokeWidth="1.5" />
      <line x1="100" y1="120" x2="100" y2="140" stroke="#9333EA" strokeWidth="1.5" />
      <line x1="120" y1="120" x2="120" y2="135" stroke="#9333EA" strokeWidth="1.5" />
    </svg>
  )
}

export function DataMiningIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Mountain / mine shape */}
      <path d="M20 130 L65 50 L90 90 L110 60 L180 130 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M20 130 L65 50 L90 90 L110 60 L180 130" fill="none" stroke="#D97706" strokeWidth="2" />
      {/* Underground data layers */}
      <rect x="20" y="130" width="160" height="25" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <line x1="30" y1="138" x2="170" y2="138" stroke="#D97706" strokeWidth="1" strokeDasharray="4 3" />
      <line x1="30" y1="146" x2="170" y2="146" stroke="#D97706" strokeWidth="1" strokeDasharray="4 3" />
      {/* Gems / data nuggets */}
      <polygon points="55,115 60,108 65,115 60,120" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      <polygon points="130,110 135,103 140,110 135,117" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      <polygon points="95,100 100,93 105,100 100,107" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      {/* Pickaxe */}
      <line x1="140" y1="25" x2="165" y2="55" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <path d="M137 22 L148 18 L150 30 Z" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      {/* Sparkles */}
      <circle cx="75" cy="95" r="2.5" fill="#FBBF24" />
      <circle cx="120" cy="85" r="2" fill="#FBBF24" />
      <circle cx="150" cy="100" r="2.5" fill="#FBBF24" />
      <circle cx="50" cy="105" r="1.5" fill="#FBBF24" />
      {/* Magnifying glass scanning */}
      <circle cx="88" cy="78" r="14" fill="none" stroke="#D97706" strokeWidth="2.5" />
      <line x1="98" y1="88" x2="108" y2="98" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="88" cy="78" r="10" fill="#FEF3C7" opacity="0.3" />
    </svg>
  )
}

export function BusinessIntelligenceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Dashboard frame */}
      <rect x="20" y="15" width="160" height="120" rx="8" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <rect x="20" y="15" width="160" height="20" rx="8" fill="#3B82F6" />
      <rect x="20" y="27" width="160" height="8" fill="#3B82F6" />
      {/* Window dots */}
      <circle cx="33" cy="25" r="3" fill="#BFDBFE" />
      <circle cx="43" cy="25" r="3" fill="#BFDBFE" />
      <circle cx="53" cy="25" r="3" fill="#BFDBFE" />
      {/* KPI cards */}
      <rect x="30" y="45" width="40" height="22" rx="4" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1" />
      <rect x="35" y="50" width="15" height="4" rx="1" fill="#3B82F6" />
      <rect x="35" y="58" width="25" height="5" rx="1" fill="#60A5FA" />
      <rect x="80" y="45" width="40" height="22" rx="4" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1" />
      <rect x="85" y="50" width="15" height="4" rx="1" fill="#3B82F6" />
      <rect x="85" y="58" width="25" height="5" rx="1" fill="#60A5FA" />
      <rect x="130" y="45" width="40" height="22" rx="4" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1" />
      <rect x="135" y="50" width="15" height="4" rx="1" fill="#3B82F6" />
      <rect x="135" y="58" width="25" height="5" rx="1" fill="#60A5FA" />
      {/* Pie chart */}
      <circle cx="55" cy="105" r="20" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M55 105 L55 85 A20 20 0 0 1 73 97 Z" fill="#3B82F6" />
      <path d="M55 105 L73 97 A20 20 0 0 1 60 124 Z" fill="#60A5FA" />
      {/* Line chart */}
      <rect x="85" y="80" width="80" height="45" rx="3" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="1" />
      <polyline points="92,115 105,105 120,110 135,95 150,100 158,90" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polyline points="92,118 105,112 120,115 135,108 150,110 158,105" stroke="#60A5FA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3 2" />
      {/* Arrow up indicator */}
      <polygon points="168,47 172,40 176,47" fill="#22C55E" />
      <line x1="172" y1="40" x2="172" y2="55" stroke="#22C55E" strokeWidth="2" />
    </svg>
  )
}

export function HealthcareIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Heart with pulse */}
      <path d="M100 130 C60 100 20 75 20 50 C20 30 35 15 55 15 C70 15 82 25 90 35 L100 48 L110 35 C118 25 130 15 145 15 C165 15 180 30 180 50 C180 75 140 100 100 130Z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      {/* Pulse line */}
      <polyline points="40,70 65,70 75,45 85,90 95,55 105,75 115,65 125,70 160,70" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cross */}
      <rect x="92" y="95" width="16" height="30" rx="2" fill="#EF4444" />
      <rect x="84" y="103" width="32" height="14" rx="2" fill="#EF4444" />
      {/* Data dots */}
      <circle cx="40" cy="140" r="4" fill="#FCA5A5" />
      <circle cx="60" cy="145" r="3" fill="#FCA5A5" />
      <circle cx="140" cy="140" r="4" fill="#FCA5A5" />
      <circle cx="160" cy="145" r="3" fill="#FCA5A5" />
    </svg>
  )
}

export function FinanceIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Chart background */}
      <rect x="25" y="15" width="150" height="100" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
      {/* Candlestick chart */}
      <line x1="50" y1="35" x2="50" y2="85" stroke="#10B981" strokeWidth="2" />
      <rect x="44" y="45" width="12" height="25" rx="1" fill="#10B981" />
      <line x1="75" y1="30" x2="75" y2="75" stroke="#EF4444" strokeWidth="2" />
      <rect x="69" y="35" width="12" height="28" rx="1" fill="#EF4444" />
      <line x1="100" y1="40" x2="100" y2="90" stroke="#10B981" strokeWidth="2" />
      <rect x="94" y="50" width="12" height="30" rx="1" fill="#10B981" />
      <line x1="125" y1="25" x2="125" y2="70" stroke="#10B981" strokeWidth="2" />
      <rect x="119" y="30" width="12" height="25" rx="1" fill="#10B981" />
      <line x1="150" y1="35" x2="150" y2="80" stroke="#EF4444" strokeWidth="2" />
      <rect x="144" y="40" width="12" height="28" rx="1" fill="#EF4444" />
      {/* Dollar sign */}
      <circle cx="100" cy="135" r="18" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
      <text x="100" y="141" textAnchor="middle" fill="#059669" fontSize="18" fontWeight="bold">$</text>
      {/* Trend arrow */}
      <polyline points="40,100 80,88 120,75 160,60" stroke="#10B981" strokeWidth="2" fill="none" strokeDasharray="4 3" />
      <polygon points="158,55 165,60 158,65" fill="#10B981" />
    </svg>
  )
}

export function RetailIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Shopping cart */}
      <path d="M35 30 L50 30 L70 100 L145 100" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="115" r="8" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="135" cy="115" r="8" fill="#DDD6FE" stroke="#7C3AED" strokeWidth="2" />
      {/* Cart body */}
      <path d="M55 45 L160 45 L150 90 L65 90 Z" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
      {/* Items in cart */}
      <rect x="75" y="55" width="15" height="30" rx="3" fill="#A78BFA" />
      <rect x="95" y="60" width="15" height="25" rx="3" fill="#8B5CF6" />
      <rect x="115" y="50" width="15" height="35" rx="3" fill="#7C3AED" />
      {/* Data tag */}
      <rect x="140" y="25" width="45" height="20" rx="4" fill="#7C3AED" />
      <text x="162" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">-20%</text>
      {/* Star ratings */}
      <polygon points="60,135 63,142 70,143 65,148 66,155 60,152 54,155 55,148 50,143 57,142" fill="#FBBF24" />
      <polygon points="80,135 83,142 90,143 85,148 86,155 80,152 74,155 75,148 70,143 77,142" fill="#FBBF24" />
      <polygon points="100,135 103,142 110,143 105,148 106,155 100,152 94,155 95,148 90,143 97,142" fill="#FBBF24" />
    </svg>
  )
}

export function ManufacturingIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Factory building */}
      <rect x="20" y="60" width="70" height="80" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <rect x="30" y="75" width="15" height="20" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="55" y="75" width="15" height="20" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="30" y="110" width="15" height="30" rx="2" fill="#F59E0B" />
      {/* Chimney */}
      <rect x="70" y="35" width="15" height="25" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* Smoke / steam */}
      <circle cx="77" cy="28" r="5" fill="#E5E7EB" opacity="0.7" />
      <circle cx="82" cy="20" r="7" fill="#E5E7EB" opacity="0.5" />
      <circle cx="75" cy="12" r="6" fill="#E5E7EB" opacity="0.3" />
      {/* Conveyor belt with data */}
      <rect x="100" y="115" width="85" height="8" rx="3" fill="#D97706" />
      <circle cx="110" cy="119" r="5" fill="#92400E" />
      <circle cx="145" cy="119" r="5" fill="#92400E" />
      <circle cx="175" cy="119" r="5" fill="#92400E" />
      {/* Products on belt */}
      <rect x="118" y="100" width="18" height="15" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="150" y="103" width="18" height="12" rx="2" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      {/* Robot arm */}
      <line x1="135" y1="50" x2="135" y2="80" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="135" y1="65" x2="155" y2="55" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="155" cy="55" r="5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      {/* Sensor / IoT */}
      <circle cx="170" cy="35" r="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="170" cy="35" r="4" fill="#F59E0B" />
      <path d="M158 25 C155 20 155 15 160 10" stroke="#D97706" strokeWidth="1" fill="none" />
      <path d="M182 25 C185 20 185 15 180 10" stroke="#D97706" strokeWidth="1" fill="none" />
    </svg>
  )
}

export function EnergyIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Lightning bolt */}
      <polygon points="105,10 80,70 100,70 85,105 120,45 100,45" fill="#FDE68A" stroke="#EAB308" strokeWidth="2" strokeLinejoin="round" />
      {/* Solar panel */}
      <rect x="15" y="90" width="50" height="35" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" transform="rotate(-15, 40, 107)" />
      <line x1="22" y1="95" x2="56" y2="87" stroke="#3B82F6" strokeWidth="1" />
      <line x1="25" y1="105" x2="59" y2="97" stroke="#3B82F6" strokeWidth="1" />
      <line x1="28" y1="115" x2="62" y2="107" stroke="#3B82F6" strokeWidth="1" />
      <line x1="30" y1="85" x2="37" y2="120" stroke="#3B82F6" strokeWidth="1" />
      <line x1="42" y1="82" x2="49" y2="117" stroke="#3B82F6" strokeWidth="1" />
      {/* Wind turbine */}
      <line x1="155" y1="55" x2="155" y2="140" stroke="#6B7280" strokeWidth="3" />
      <circle cx="155" cy="55" r="5" fill="#6B7280" />
      <path d="M155 55 L155 25 L162 50 Z" fill="#D1D5DB" stroke="#6B7280" strokeWidth="1" />
      <path d="M155 55 L175 67 L158 62 Z" fill="#D1D5DB" stroke="#6B7280" strokeWidth="1" />
      <path d="M155 55 L135 67 L152 62 Z" fill="#D1D5DB" stroke="#6B7280" strokeWidth="1" />
      {/* Battery / power meter */}
      <rect x="80" y="115" width="40" height="25" rx="4" fill="#FEF9C3" stroke="#EAB308" strokeWidth="2" />
      <rect x="120" y="122" width="5" height="11" rx="2" fill="#EAB308" />
      <rect x="85" y="120" width="10" height="15" rx="1" fill="#22C55E" />
      <rect x="97" y="120" width="10" height="15" rx="1" fill="#22C55E" />
      <rect x="109" y="123" width="6" height="12" rx="1" fill="#86EFAC" />
      {/* Sun rays */}
      <circle cx="40" cy="40" r="12" fill="#FDE68A" stroke="#EAB308" strokeWidth="1.5" />
      <line x1="40" y1="22" x2="40" y2="15" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="58" x2="40" y2="65" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="40" x2="15" y2="40" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      <line x1="58" y1="40" x2="65" y2="40" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ── Generic / Fallback Solution Illustration ──────────────── */
export function GenericSolutionIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Globe / network */}
      <circle cx="100" cy="70" r="40" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2" />
      <ellipse cx="100" cy="70" rx="40" ry="16" stroke="#93C5FD" strokeWidth="1.5" />
      <ellipse cx="100" cy="70" rx="16" ry="40" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="60" y1="70" x2="140" y2="70" stroke="#93C5FD" strokeWidth="1" />
      <line x1="100" y1="30" x2="100" y2="110" stroke="#93C5FD" strokeWidth="1" />
      {/* Data nodes */}
      <circle cx="60" cy="70" r="5" fill="#3B82F6" />
      <circle cx="140" cy="70" r="5" fill="#3B82F6" />
      <circle cx="100" cy="30" r="5" fill="#3B82F6" />
      <circle cx="100" cy="110" r="5" fill="#3B82F6" />
      <circle cx="75" cy="42" r="4" fill="#60A5FA" />
      <circle cx="125" cy="42" r="4" fill="#60A5FA" />
      <circle cx="75" cy="98" r="4" fill="#60A5FA" />
      <circle cx="125" cy="98" r="4" fill="#60A5FA" />
      {/* Lightbulb / idea symbol */}
      <circle cx="100" cy="55" r="10" fill="#FDE68A" stroke="#EAB308" strokeWidth="1.5" />
      <line x1="97" y1="65" x2="103" y2="65" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />
      <line x1="97" y1="68" x2="103" y2="68" stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round" />
      {/* Connecting lines */}
      <line x1="40" y1="130" x2="70" y2="115" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="160" y1="130" x2="130" y2="115" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
      {/* Base bar chart */}
      <rect x="30" y="130" width="12" height="20" rx="2" fill="#93C5FD" />
      <rect x="45" y="125" width="12" height="25" rx="2" fill="#60A5FA" />
      <rect x="143" y="128" width="12" height="22" rx="2" fill="#93C5FD" />
      <rect x="158" y="122" width="12" height="28" rx="2" fill="#60A5FA" />
    </svg>
  )
}

export function DataMigrationIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="15" y="40" width="60" height="80" rx="6" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="2" />
      <rect x="25" y="55" width="40" height="6" rx="2" fill="#06B6D4" opacity="0.5" />
      <rect x="25" y="65" width="40" height="6" rx="2" fill="#06B6D4" opacity="0.3" />
      <rect x="25" y="75" width="40" height="6" rx="2" fill="#06B6D4" opacity="0.5" />
      <rect x="25" y="85" width="40" height="6" rx="2" fill="#06B6D4" opacity="0.3" />
      <rect x="125" y="40" width="60" height="80" rx="6" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="2" />
      <circle cx="155" cy="65" r="8" fill="#06B6D4" opacity="0.2" />
      <circle cx="155" cy="65" r="4" fill="#06B6D4" />
      <rect x="138" y="80" width="34" height="6" rx="2" fill="#06B6D4" opacity="0.5" />
      <rect x="138" y="90" width="34" height="6" rx="2" fill="#06B6D4" opacity="0.3" />
      <path d="M80 65 L115 65" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 80 L115 80" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="115,60 125,72.5 115,85" fill="#06B6D4" />
      <circle cx="100" cy="30" r="10" fill="#CFFAFE" stroke="#06B6D4" strokeWidth="1.5" />
      <path d="M96 30 L100 26 L104 30 M100 26 L100 34" stroke="#06B6D4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function DataModernizationIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="85" width="50" height="55" rx="4" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="1.5" />
      <rect x="28" y="95" width="34" height="5" rx="1" fill="#0EA5E9" opacity="0.4" />
      <rect x="28" y="104" width="34" height="5" rx="1" fill="#0EA5E9" opacity="0.3" />
      <rect x="28" y="113" width="34" height="5" rx="1" fill="#0EA5E9" opacity="0.2" />
      <line x1="20" y1="125" x2="70" y2="125" stroke="#0EA5E9" strokeWidth="1" opacity="0.3" />
      <path d="M70 105 L100 55" stroke="#0EA5E9" strokeWidth="2" strokeDasharray="4 3" />
      <ellipse cx="140" cy="45" rx="45" ry="28" fill="#E0F2FE" stroke="#0EA5E9" strokeWidth="2" />
      <ellipse cx="140" cy="45" rx="30" ry="18" fill="#BAE6FD" opacity="0.5" />
      <circle cx="128" cy="42" r="4" fill="#0EA5E9" />
      <circle cx="140" cy="42" r="4" fill="#0EA5E9" opacity="0.7" />
      <circle cx="152" cy="42" r="4" fill="#0EA5E9" opacity="0.5" />
      <rect x="110" y="80" width="60" height="55" rx="6" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2" />
      <rect x="120" y="90" width="40" height="5" rx="1" fill="#0EA5E9" opacity="0.5" />
      <rect x="120" y="100" width="40" height="5" rx="1" fill="#0EA5E9" opacity="0.4" />
      <rect x="120" y="110" width="40" height="5" rx="1" fill="#0EA5E9" opacity="0.3" />
      <polygon points="155,118 162,125 155,132" fill="#22C55E" />
    </svg>
  )
}

export function AiMlIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="70" r="35" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="100" cy="70" r="22" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="100" cy="70" r="8" fill="#7C3AED" />
      <circle cx="100" cy="70" r="4" fill="#DDD6FE" />
      <line x1="100" y1="48" x2="100" y2="35" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="100" cy="32" r="4" fill="#A78BFA" />
      <line x1="122" y1="70" x2="135" y2="70" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="138" cy="70" r="4" fill="#A78BFA" />
      <line x1="78" y1="70" x2="65" y2="70" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="62" cy="70" r="4" fill="#A78BFA" />
      <line x1="100" y1="92" x2="100" y2="105" stroke="#7C3AED" strokeWidth="1.5" />
      <circle cx="100" cy="108" r="4" fill="#A78BFA" />
      <line x1="115" y1="55" x2="125" y2="45" stroke="#7C3AED" strokeWidth="1" />
      <circle cx="128" cy="42" r="3" fill="#C4B5FD" />
      <line x1="85" y1="55" x2="75" y2="45" stroke="#7C3AED" strokeWidth="1" />
      <circle cx="72" cy="42" r="3" fill="#C4B5FD" />
      <line x1="115" y1="85" x2="125" y2="95" stroke="#7C3AED" strokeWidth="1" />
      <circle cx="128" cy="98" r="3" fill="#C4B5FD" />
      <line x1="85" y1="85" x2="75" y2="95" stroke="#7C3AED" strokeWidth="1" />
      <circle cx="72" cy="98" r="3" fill="#C4B5FD" />
      <rect x="30" y="120" width="140" height="20" rx="4" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1" />
      <rect x="38" y="126" width="20" height="8" rx="2" fill="#7C3AED" opacity="0.6" />
      <rect x="65" y="126" width="20" height="8" rx="2" fill="#7C3AED" opacity="0.4" />
      <rect x="92" y="126" width="20" height="8" rx="2" fill="#7C3AED" opacity="0.6" />
      <rect x="119" y="126" width="20" height="8" rx="2" fill="#7C3AED" opacity="0.4" />
      <rect x="146" y="126" width="18" height="8" rx="2" fill="#7C3AED" opacity="0.6" />
    </svg>
  )
}

export function GeospatialIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="75" r="50" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <ellipse cx="100" cy="75" rx="50" ry="20" stroke="#6EE7B7" strokeWidth="1.5" />
      <ellipse cx="100" cy="75" rx="20" ry="50" stroke="#6EE7B7" strokeWidth="1.5" />
      <line x1="50" y1="75" x2="150" y2="75" stroke="#6EE7B7" strokeWidth="1" />
      <line x1="100" y1="25" x2="100" y2="125" stroke="#6EE7B7" strokeWidth="1" />
      <path d="M80 50 C85 45, 90 55, 95 48 C100 42, 105 52, 110 46 C115 40, 120 50, 125 44" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M70 85 C78 90, 85 82, 95 88 C105 94, 115 84, 125 90" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="85" cy="60" r="5" fill="#10B981" opacity="0.7" />
      <circle cx="115" cy="55" r="4" fill="#10B981" opacity="0.5" />
      <circle cx="95" cy="90" r="4" fill="#10B981" opacity="0.6" />
      <path d="M80 15 L80 10 C80 6, 84 2, 88 6 L88 6 C92 2, 96 6, 96 10 L96 15 Z" fill="#EF4444" />
      <circle cx="88" cy="10" r="3" fill="#FCA5A5" />
      <path d="M140 30 L140 26 C140 23, 143 20, 146 23 L146 23 C149 20, 152 23, 152 26 L152 30 Z" fill="#F97316" />
      <circle cx="146" cy="26" r="2" fill="#FDBA74" />
    </svg>
  )
}

export function DataAnalyticsBiIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="15" width="160" height="110" rx="8" fill="#FFF1F2" stroke="#E11D48" strokeWidth="2" />
      <rect x="20" y="15" width="160" height="20" rx="8" fill="#E11D48" />
      <rect x="20" y="27" width="160" height="8" fill="#E11D48" />
      <circle cx="33" cy="25" r="3" fill="#FECDD3" />
      <circle cx="43" cy="25" r="3" fill="#FECDD3" />
      <circle cx="53" cy="25" r="3" fill="#FECDD3" />
      <rect x="30" y="45" width="55" height="35" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <rect x="36" y="68" width="8" height="8" rx="1" fill="#E11D48" />
      <rect x="48" y="62" width="8" height="14" rx="1" fill="#E11D48" opacity="0.7" />
      <rect x="60" y="55" width="8" height="21" rx="1" fill="#E11D48" opacity="0.5" />
      <rect x="72" y="58" width="8" height="18" rx="1" fill="#E11D48" opacity="0.8" />
      <rect x="95" y="45" width="75" height="35" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <polyline points="102,72 115,60 128,65 140,52 155,58 163,48" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="155" cy="58" r="3" fill="#E11D48" />
      <rect x="30" y="90" width="40" height="25" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <circle cx="50" cy="102" r="10" fill="none" stroke="#E11D48" strokeWidth="3" />
      <path d="M50 102 L50 92 A10 10 0 0 1 59 99 Z" fill="#E11D48" />
      <rect x="80" y="90" width="90" height="25" rx="4" fill="#FFE4E6" stroke="#FB7185" strokeWidth="1" />
      <rect x="88" y="97" width="30" height="4" rx="1" fill="#E11D48" opacity="0.6" />
      <rect x="88" y="105" width="50" height="4" rx="1" fill="#E11D48" opacity="0.3" />
      <polygon points="162,93 166,86 170,93" fill="#22C55E" />
      <line x1="166" y1="86" x2="166" y2="98" stroke="#22C55E" strokeWidth="2" />
    </svg>
  )
}
