import { ProblemCard } from "../problem-card";

export default function ProblemCardExample() {
  return (
    <div className="p-6 max-w-md">
      <ProblemCard
        problemTitle="Smart Waste Collection Optimization"
        companyName="City Waste Management"
        category="Waste Management"
        difficulty="Hard"
        description="Design an AI-powered system to optimize waste collection routes and schedules based on real-time fill levels and traffic patterns."
        teamCount={12}
        onViewDetails={() => console.log("View problem details")}
      />
    </div>
  );
}
