import { SubmissionCard } from "../submission-card";

export default function SubmissionCardExample() {
  return (
    <div className="p-6 max-w-md">
      <SubmissionCard
        solutionTitle="AI-Powered Route Optimizer"
        teamName="Smart Transit Innovators"
        problemTitle="Smart Waste Collection Optimization"
        innovationScore={85}
        feasibilityScore={78}
        totalScore={82}
        awardType="Collaboration Offer"
        status="Evaluated"
        judgeCount={3}
        onViewDetails={() => console.log("View submission details")}
      />
    </div>
  );
}
