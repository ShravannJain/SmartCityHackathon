import { StatsCard } from "../stats-card";
import { Users } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <StatsCard
        title="Total Teams"
        value={48}
        icon={Users}
        trend={{ value: 12, isPositive: true }}
        description="Active participants"
      />
    </div>
  );
}
