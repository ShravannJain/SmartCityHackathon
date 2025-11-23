import { TeamCard } from "../team-card";

export default function TeamCardExample() {
  return (
    <div className="p-6 max-w-md">
      <TeamCard
        teamName="Smart Transit Innovators"
        memberCount={5}
        contactEmail="team@smarttransit.com"
        submissionCount={3}
        averageScore={85}
        awardType="Gold"
        onViewDetails={() => console.log("View team details")}
      />
    </div>
  );
}
