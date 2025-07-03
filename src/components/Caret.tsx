import { cn } from "@/lib/utils";

const Caret = () => {
  return (
    <span className="animate-caret-blink absolute -translate-x-1/2 -translate-y-[2px] text-accent text-2xl">
      |
    </span>
  );
};

export default Caret;
