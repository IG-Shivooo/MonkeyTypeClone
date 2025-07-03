"use client";

import { cn } from "@/lib/utils";

const KEYBOARD_LAYOUT = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
  ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'enter'],
  ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'shift-r'],
  ['space'],
];

type KeyboardProps = {
  highlightKeys?: string[];
  activeKey?: string;
  className?: string;
};

const Keyboard = ({ highlightKeys = [], activeKey, className }: KeyboardProps) => {
  const getKeyClass = (key: string) => {
    const isHighlighted = highlightKeys.includes(key.toLowerCase());
    const isActive = activeKey?.toLowerCase() === key.toLowerCase() || (activeKey === ' ' && key === 'space');
    
    // special keys styling
    const specialKeyClasses: { [key: string]: string } = {
        'backspace': 'w-24',
        'tab': 'w-16',
        'caps': 'w-20',
        'enter': 'w-24',
        'shift': 'w-28',
        'shift-r': 'w-28',
        'space': 'w-96',
    };

    return cn(
      "h-12 flex items-center justify-center rounded-md border text-sm font-medium transition-all duration-100",
      specialKeyClasses[key] || "w-12",
      isHighlighted && !isActive && "bg-accent/50 border-accent",
      isActive && "bg-accent text-accent-foreground scale-110 transform-gpu border-accent-foreground",
      !isHighlighted && !isActive && "bg-secondary"
    );
  };
  
  return (
    <div className={cn("flex flex-col items-center gap-2 p-4 bg-background/50 rounded-lg", className)}>
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((key) => (
            <div key={key} className={getKeyClass(key)}>
              {key === 'space' ? '' : key === 'shift-r' ? 'Shift' : key === 'caps' ? 'Caps' : key.length > 1 ? key.charAt(0).toUpperCase() + key.slice(1) : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
