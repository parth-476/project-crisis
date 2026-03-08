'use client';

import { useState } from 'react';

interface ResourceSuggestion {
  zone: string;
  riskLevel: string;
  ambulances: number;
  rescueTeams: number;
  foodKits: number;
}

export function ResourceAllocator() {
  const [suggestions, setSuggestions] = useState<ResourceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const suggestResources = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/resources/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedZones: [] }),
      });
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Failed to get resource suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'ambulances':
        return '🚑';
      case 'rescueTeams':
        return '👨‍🚒';
      case 'foodKits':
        return '📦';
      default:
        return '📊';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Resource Allocation</h2>
          <p className="text-sm text-foreground-secondary mt-1">Emergency response needs</p>
        </div>
        <button
          onClick={suggestResources}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Analyzing...' : 'Get Suggestions'}
        </button>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.zone} className="bg-background-tertiary rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{suggestion.zone}</h3>
                <span className={`badge badge-${suggestion.riskLevel.toLowerCase()}`}>
                  {suggestion.riskLevel.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🚑</p>
                  <p className="text-xs text-foreground-secondary mb-1">Ambulances</p>
                  <p className="text-lg font-bold text-primary">{suggestion.ambulances}</p>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">👨‍🚒</p>
                  <p className="text-xs text-foreground-secondary mb-1">Rescue Teams</p>
                  <p className="text-lg font-bold text-secondary">{suggestion.rescueTeams}</p>
                </div>
                <div className="bg-background rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">📦</p>
                  <p className="text-xs text-foreground-secondary mb-1">Food Kits</p>
                  <p className="text-lg font-bold text-accent">{suggestion.foodKits}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foreground-secondary">Click "Get Suggestions" to analyze resource needs</p>
        </div>
      )}
    </div>
  );
}
