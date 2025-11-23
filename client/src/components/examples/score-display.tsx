import { ScoreDisplay } from "../score-display";

export default function ScoreDisplayExample() {
  return (
    <div className="p-6 max-w-sm">
      <ScoreDisplay
        innovationScore={85}
        feasibilityScore={72}
        totalScore={78}
      />
    </div>
  );
}
