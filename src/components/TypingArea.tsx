"use client";
import { useMemo, useRef, useEffect } from "react";
import Caret from "./Caret";

type CharacterProps = {
  char: string;
  state: "correct" | "incorrect" | "untyped";
};

const Character = ({ char, state }: CharacterProps) => {
  const color =
    state === "correct"
      ? "text-foreground"
      : state === "incorrect"
      ? "text-red-500"
      : "text-muted-foreground";
  
  return <span className={`transition-colors duration-200 ${color}`}>{char}</span>;
};

type TypingAreaProps = {
  words: string;
  typed: string;
};

const TypingArea = ({ words, typed }: TypingAreaProps) => {
  const caretRef = useRef<HTMLSpanElement>(null);

  const characters = useMemo(() => {
    return words.split("").map((char, index) => {
      let state: "correct" | "incorrect" | "untyped" = "untyped";
      if (index < typed.length) {
        state = typed[index] === char ? "correct" : "incorrect";
      }
      return { char, state };
    });
  }, [words, typed]);
  
  useEffect(() => {
    if (caretRef.current) {
      const activeChar = caretRef.current.querySelector<HTMLSpanElement>(".active-char");
      if (activeChar) {
        activeChar.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [typed]);

  return (
    <div
      ref={caretRef}
      className="relative text-2xl md:text-3xl leading-relaxed break-all font-code max-h-[168px] overflow-hidden"
    >
      {characters.map(({ char, state }, index) => (
        <span key={index} className={typed.length === index ? 'active-char' : ''}>
          {typed.length === index && <Caret />}
          <Character char={char} state={state} />
        </span>
      ))}
       {typed.length === words.length && <Caret />}
    </div>
  );
};

export default TypingArea;
