'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { RiskZoneCard } from '@/components/RiskZoneCard';
import { AlertGenerator } from '@/components/AlertGenerator';
import { ResourceAllocator } from '@/components/ResourceAllocator';
import { DisasterReporter } from '@/components/DisasterReporter';

interface RiskZone {
  zone: string;
  score: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
}

interface Disaster {
  id: number;
  zone: string;
  severity: string;
  issueType: string;
  population: number;
  notes: string;
  createdAt: string;
}

export default function Home() {
  const [zones, setZones] = useState<RiskZone[]>([]);
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'dashboard' | 'disasters' | 'reports'>('dashboard');

  const fetchRiskZones = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/risk-zones');
      const data = await response.json();
      setZones(data.prediction.topZones || []);
    } catch (error) {
      console.error('Failed to fetch risk zones:', error);
    }
  };

  const fetchDisasters = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/disasters');
      const data = await response.json();
      setDisasters(data.reports || []);
    } catch (error) {
      console.error('Failed to fetch disasters:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchRiskZones(), fetchDisasters()]);
      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleReportAdded = async () => {
    await fetchDisasters();
    await fetchRiskZones();
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            {['dashboard', 'disasters', 'reports'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab as any)}
                className={`pb-4 px-2 font-medium transition-all duration-300 relative ${
                  selectedTab === tab
                    ? 'text-primary'
                    : 'text-foreground-secondary hover:text-foreground'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {selectedTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-foreground-secondary">Loading crisis data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {selectedTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Risk Zones Overview */}
                  <section>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground">Risk Assessment</h2>
                      <p className="text-foreground-secondary mt-1">
                        Real-time analysis of {zones.length} identified risk zones
                      </p>
                    </div>

                    {zones.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {zones.map((zone) => (
                          <RiskZoneCard key={zone.zone} zone={zone} />
                        ))}
                      </div>
                    ) : (
                      <div className="card text-center py-12">
                        <p className="text-foreground-secondary">No risk zones identified</p>
                      </div>
                    )}
                  </section>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <AlertGenerator zones={zones} />
                    <ResourceAllocator />
                  </div>
                </div>
              )}

              {/* Disasters Tab */}
              {selectedTab === 'disasters' && (
                <div className="space-y-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Disaster Reports</h2>
                    <p className="text-foreground-secondary mt-1">
                      Total reports: {disasters.length}
                    </p>
                  </div>

                  {disasters.length > 0 ? (
                    <div className="space-y-4">
                      {disasters.map((disaster) => (
                        <div key={disaster.id} className="card-hover">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">
                                {disaster.issueType}
                              </h3>
                              <p className="text-sm text-foreground-secondary mt-1">
                                {disaster.zone}
                              </p>
                            </div>
                            <span className={`badge badge-${disaster.severity.toLowerCase()}`}>
                              {disaster.severity.toUpperCase()}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/30">
                            <div>
                              <p className="text-xs text-foreground-secondary uppercase tracking-wider">
                                Population
                              </p>
                              <p className="text-lg font-bold text-foreground">
                                {disaster.population.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground-secondary uppercase tracking-wider">
                                Reported
                              </p>
                              <p className="text-sm text-foreground">
                                {new Date(disaster.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="text-xs text-foreground-secondary uppercase tracking-wider">
                                Notes
                              </p>
                              <p className="text-sm text-foreground">
                                {disaster.notes || 'No additional notes'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="card text-center py-12">
                      <p className="text-foreground-secondary">No disaster reports yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Reports Tab */}
              {selectedTab === 'reports' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <DisasterReporter onReportAdded={handleReportAdded} />
                  <div className="card">
                    <h2 className="text-xl font-bold text-foreground mb-6">Quick Tips</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-background-tertiary rounded-lg border border-border">
                        <h3 className="font-semibold text-foreground mb-2">Report Accuracy</h3>
                        <p className="text-sm text-foreground-secondary">
                          Provide accurate zone names and population estimates for better risk assessment
                        </p>
                      </div>
                      <div className="p-4 bg-background-tertiary rounded-lg border border-border">
                        <h3 className="font-semibold text-foreground mb-2">Severity Levels</h3>
                        <p className="text-sm text-foreground-secondary">
                          Critical: Immediate danger, High: Urgent response needed, Medium: Monitor situation
                        </p>
                      </div>
                      <div className="p-4 bg-background-tertiary rounded-lg border border-border">
                        <h3 className="font-semibold text-foreground mb-2">Real-time Updates</h3>
                        <p className="text-sm text-foreground-secondary">
                          Dashboard updates every 30 seconds with latest risk assessments
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
