"use client";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  onRestart: () => void;
  className?: string;
};

const RestartButton = ({ onRestart, className }: Props) => {
  return (
    <Button onClick={onRestart} variant="ghost" size="icon" className={className}>
      <RefreshCw className="h-5 w-5 text-accent" />
    </Button>
  );
};

export default RestartButton;
