import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-headline text-center mb-8">History</h1>
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="font-headline flex items-center justify-center gap-4">
            <Construction className="w-8 h-8 text-accent" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground">
          <p>
            User profiles and performance history are currently under development.
          </p>
          <p>
            Soon, you'll be able to track your progress over time, view past tests, and see how you stack up on the leaderboard. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
