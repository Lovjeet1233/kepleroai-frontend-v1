"use client";

export function SpaceUsageIndicator() {
  const usedMB = 2.4;
  const totalMB = 100;
  const percentage = (usedMB / totalMB) * 100;

  return (
    <div className="fixed bottom-6 left-[260px] w-[280px] p-4 bg-card border border-border rounded-xl">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Space Used</h3>
        
        {/* Progress bar */}
        <div className="relative h-2 bg-secondary rounded">
          <div
            className="absolute top-0 left-0 h-full bg-primary rounded transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          {usedMB} MB used of {totalMB} MB
        </p>
      </div>
    </div>
  );
}

