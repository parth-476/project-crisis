'use client';

interface RiskZone {
  zone: string;
  score: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
}

export function RiskZoneCard({ zone }: { zone: RiskZone }) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-critical/40 bg-critical/5';
      case 'high':
        return 'border-high/40 bg-high/5';
      case 'medium':
        return 'border-medium/40 bg-medium/5';
      case 'low':
        return 'border-low/40 bg-low/5';
      default:
        return 'border-border bg-background-secondary';
    }
  };

  const getBadgeClass = (level: string) => {
    switch (level) {
      case 'critical':
        return 'badge-critical';
      case 'high':
        return 'badge-high';
      case 'medium':
        return 'badge-medium';
      case 'low':
        return 'badge-low';
      default:
        return 'badge';
    }
  };

  return (
    <div className={`card-hover border-l-4 ${getRiskColor(zone.riskLevel)}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{zone.zone}</h3>
          <p className="text-sm text-foreground-secondary mt-1">Risk Assessment</p>
        </div>
        <span className={getBadgeClass(zone.riskLevel)}>
          {zone.riskLevel.toUpperCase()}
        </span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-foreground-secondary">Risk Score</span>
          <span className="text-xl font-bold text-foreground">{zone.score.toFixed(1)}</span>
        </div>
        <div className="w-full bg-background-tertiary rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              zone.riskLevel === 'critical'
                ? 'bg-critical'
                : zone.riskLevel === 'high'
                ? 'bg-high'
                : zone.riskLevel === 'medium'
                ? 'bg-medium'
                : 'bg-low'
            }`}
            style={{ width: `${Math.min(zone.score, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
