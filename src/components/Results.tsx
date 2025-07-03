"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type Props = {
  wpm: number;
  accuracy: number;
  errors: number;
  wpmHistory: number[];
  duration: number;
};

const Results = ({ wpm, accuracy, errors, wpmHistory, duration }: Props) => {
  const data = wpmHistory.map((wpm, i) => ({
    second: i + 1,
    wpm,
  }));
  
  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-8">
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">WPM</p>
            <p className="text-3xl font-bold text-accent">{Math.round(wpm)}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-3xl font-bold text-accent">{accuracy.toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Errors</p>
            <p className="text-3xl font-bold text-accent">{errors}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-3xl font-bold text-accent">{duration}s</p>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <XAxis dataKey="second" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Line type="monotone" dataKey="wpm" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default Results;
