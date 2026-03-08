'use client';

import { useState } from 'react';

interface ReportForm {
  zone: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  issueType: string;
  population: string;
  notes: string;
}

export function DisasterReporter({ onReportAdded }: { onReportAdded: () => void }) {
  const [form, setForm] = useState<ReportForm>({
    zone: '',
    severity: 'medium',
    issueType: '',
    population: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.zone || !form.issueType || !form.population) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zone: form.zone,
          severity: form.severity,
          issueType: form.issueType,
          population: Number(form.population),
          notes: form.notes,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setForm({
          zone: '',
          severity: 'medium',
          issueType: '',
          population: '',
          notes: '',
        });
        onReportAdded();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to submit report:', error);
      alert('Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-foreground mb-6">Report Disaster</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Zone Name *
          </label>
          <input
            type="text"
            name="zone"
            value={form.zone}
            onChange={handleChange}
            placeholder="e.g., Zone-A, Downtown"
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Severity Level *
          </label>
          <select
            name="severity"
            value={form.severity}
            onChange={handleChange}
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Issue Type *
          </label>
          <input
            type="text"
            name="issueType"
            value={form.issueType}
            onChange={handleChange}
            placeholder="e.g., Flood, Earthquake, Fire"
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Affected Population *
          </label>
          <input
            type="number"
            name="population"
            value={form.population}
            onChange={handleChange}
            placeholder="Number of people"
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any additional details..."
            rows={3}
            className="w-full bg-background-tertiary border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>

        {success && (
          <div className="p-4 bg-low/10 border border-low/40 rounded-lg">
            <p className="text-low font-medium">✓ Report submitted successfully!</p>
          </div>
        )}
      </form>
    </div>
  );
}
