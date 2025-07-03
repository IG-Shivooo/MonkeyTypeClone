"use client";

import { cn } from "@/lib/utils";

type Props = {
  timer: number;
  wpm: number;
  className?: string;
};

const Stats = ({ timer, wpm, className }: Props) => {
  return (
    <div className={cn("flex items-center gap-8 font-headline text-accent", className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold">{timer}</span>
        <span className="text-sm">s</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold">
          {isFinite(wpm) ? Math.round(wpm) : 0}
        </span>
        <span className="text-sm">WPM</span>
      </div>
    </div>
  );
};

export default Stats;
