'use client';

import { useState } from 'react';

interface Alert {
  alertId: string;
  zone: string;
  riskLevel: string;
  score: number;
  advisory: string;
  createdAt: string;
}

export function AlertGenerator({ zones }: { zones: any[] }) {
  const [selectedZone, setSelectedZone] = useState(zones[0]?.zone || '');
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAlert = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/alerts/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zone: selectedZone }),
      });
      const data = await response.json();
      setAlert(data);
    } catch (error) {
      console.error('Failed to generate alert:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBgClass = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-critical/10 border-critical/40';
      case 'high':
        return 'bg-high/10 border-high/40';
      case 'medium':
        return 'bg-medium/10 border-medium/40';
      case 'low':
        return 'bg-low/10 border-low/40';
      default:
        return 'bg-background-secondary border-border';
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-foreground mb-6">Generate Alert</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Select Zone
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          >
            {zones.map((zone) => (
              <option key={zone.zone} value={zone.zone}>
                {zone.zone} (Score: {zone.score.toFixed(1)})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateAlert}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Generating...' : 'Generate Alert'}
        </button>
      </div>

      {alert && (
        <div className={`mt-6 p-4 rounded-lg border ${getBgClass(alert.riskLevel)}`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-foreground-secondary">Alert ID</p>
              <p className="font-mono text-sm text-foreground">{alert.alertId}</p>
            </div>
            <span className={`badge badge-${alert.riskLevel.toLowerCase()}`}>
              {alert.riskLevel.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3 mt-4 pt-4 border-t border-border/30">
            <div>
              <p className="text-xs text-foreground-secondary uppercase tracking-wider">Zone</p>
              <p className="text-foreground font-medium">{alert.zone}</p>
            </div>
            <div>
              <p className="text-xs text-foreground-secondary uppercase tracking-wider">Risk Score</p>
              <p className="text-lg font-bold text-foreground">{alert.score.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-xs text-foreground-secondary uppercase tracking-wider">Advisory</p>
              <p className="text-foreground mt-1">{alert.advisory}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
