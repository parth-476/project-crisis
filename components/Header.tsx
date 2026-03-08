'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-background">⚡</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">CrisisBrain</h1>
            <p className="text-xs text-foreground-secondary">Disaster Response Management</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p className="text-foreground-secondary">System Status</p>
            <p className="flex items-center gap-1 text-low font-medium">
              <span className="w-2 h-2 bg-low rounded-full animate-pulse"></span>
              Active
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
