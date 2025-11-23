import { useState } from "react";
import { TeamCard } from "@/components/team-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const teams = [
    {
      teamName: "Smart Transit Innovators",
      memberCount: 5,
      contactEmail: "team@smarttransit.com",
      submissionCount: 3,
      averageScore: 85,
      awardType: "Gold",
    },
    {
      teamName: "EcoCity Solutions",
      memberCount: 4,
      contactEmail: "contact@ecocity.io",
      submissionCount: 2,
      averageScore: 82,
      awardType: "Silver",
    },
    {
      teamName: "Urban Safety Network",
      memberCount: 6,
      contactEmail: "team@urbansafety.net",
      submissionCount: 3,
      averageScore: 78,
    },
    {
      teamName: "Traffic Flow Optimizers",
      memberCount: 4,
      contactEmail: "hello@trafficflow.dev",
      submissionCount: 1,
      averageScore: 75,
    },
  ];

  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create team submitted");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground mt-1">Manage participating teams</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-team">
              <Plus className="h-4 w-4 mr-2" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateTeam}>
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
                <DialogDescription>
                  Add a new team to the hackathon platform.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input id="teamName" placeholder="Enter team name" data-testid="input-team-name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="memberCount">Member Count</Label>
                  <Input id="memberCount" type="number" placeholder="5" data-testid="input-member-count" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" placeholder="team@example.com" data-testid="input-contact-email" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" data-testid="button-submit-team">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search-teams"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.teamName}
            {...team}
            onViewDetails={() => console.log(`View ${team.teamName}`)}
          />
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No teams found</p>
        </div>
      )}
    </div>
  );
}
