"use client";

import { useEffect, useCallback, useState } from 'react';
import { useSettings, Duration } from '@/contexts/SettingsContext';
import useEngine from '@/hooks/useEngine';
import TypingArea from '@/components/TypingArea';
import Stats from '@/components/Stats';
import Results from '@/components/Results';
import RestartButton from '@/components/RestartButton';
import { defaultWords } from '@/lib/words';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const TypingPage = () => {
  const { duration, setDuration, customText } = useSettings();
  const [words, setWords] = useState('');

  const generateWords = useCallback(() => {
    if (customText) {
      setWords(customText);
    } else {
      setWords(defaultWords.sort(() => Math.random() - 0.5).slice(0, 50).join(' '));
    }
  }, [customText]);
  
  useEffect(() => {
    generateWords();
  }, [generateWords]);

  const { state, typed, errors, timer, wpm, accuracy, wpmHistory, handleKeyDown, restart } = useEngine(words);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const handleRestart = useCallback(() => {
    generateWords();
    restart();
  }, [generateWords, restart]);

  const durationOptions: Duration[] = [15, 30, 60, 120];

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-headline text-primary-foreground tracking-wider">Typecraft</h1>

      {state !== 'finish' && (
        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <div className='flex items-center justify-center gap-4'>
            {durationOptions.map((d) => (
              <Button
                key={d}
                variant={duration === d ? 'default' : 'secondary'}
                onClick={() => setDuration(d)}
                className={cn('transition-all', duration === d ? 'bg-accent text-accent-foreground' : '')}
              >
                {d}s
              </Button>
            ))}
          </div>

          <div className="w-full relative">
            <div className="flex justify-center mb-4">
               <Stats timer={timer} wpm={wpm} />
            </div>
            <TypingArea words={words} typed={typed} />
          </div>

          <RestartButton onRestart={handleRestart} />
        </div>
      )}

      {state === 'finish' && (
        <>
          <Results wpm={wpm} accuracy={accuracy} errors={errors} wpmHistory={wpmHistory} duration={duration} />
          <RestartButton onRestart={handleRestart} className="mt-4" />
        </>
      )}
    </div>
  );
};

export default TypingPage;
