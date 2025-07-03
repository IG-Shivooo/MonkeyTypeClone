"use client";

import { useCallback, useEffect } from 'react';
import useEngine from '@/hooks/useEngine';
import TypingArea from '@/components/TypingArea';
import Stats from '@/components/Stats';
import Results from '@/components/Results';
import RestartButton from '@/components/RestartButton';
import Keyboard from '@/components/Keyboard';
import { Lesson } from '@/lib/lessons';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

type Props = {
  lesson: Lesson;
  onBack: () => void;
  onComplete: (lessonId: string) => void;
};

const LessonTypingUI = ({ lesson, onBack, onComplete }: Props) => {
  const { state, typed, errors, timer, wpm, accuracy, wpmHistory, handleKeyDown, restart } = useEngine(lesson.words);
  const { duration } = useSettings();

  useEffect(() => {
    // This effect ensures the engine is reset when the lesson changes
    restart();
  }, [lesson, restart]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const handleRestart = useCallback(() => {
    restart();
  }, [restart]);

  const activeKey = state !== 'finish' ? lesson.words[typed.length] : undefined;

  const elapsedTime = duration - timer;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-full flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lessons
        </Button>
        <h1 className="text-3xl font-headline text-primary-foreground tracking-wider text-center">{lesson.title}</h1>
        <div className="w-44" />
      </div>

      {state !== 'finish' && (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <div className="w-full relative">
            <div className="flex justify-center mb-4">
              <Stats timer={elapsedTime} wpm={wpm} />
            </div>
            <TypingArea words={lesson.words} typed={typed} />
          </div>
          <Keyboard highlightKeys={lesson.keys} activeKey={activeKey} className="mt-4" />
          <RestartButton onRestart={handleRestart} />
        </div>
      )}

      {state === 'finish' && (
        <>
          <Results wpm={wpm} accuracy={accuracy} errors={errors} wpmHistory={wpmHistory} duration={elapsedTime} />
          <div className="flex gap-4 mt-4">
            <RestartButton onRestart={handleRestart} />
            <Button onClick={() => onComplete(lesson.id)}>
              <Check className="mr-2 h-4 w-4" /> Mark as Complete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LessonTypingUI;
