import { CompanyCard } from "../company-card";

export default function CompanyCardExample() {
  return (
    <div className="p-6 max-w-md">
      <CompanyCard
        companyName="City Transit Authority"
        industry="Transportation"
        contactPerson="Sarah Johnson"
        problemCount={2}
        teamCount={15}
        onViewDetails={() => console.log("View company details")}
      />
    </div>
  );
}
