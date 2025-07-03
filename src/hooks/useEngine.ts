"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export type State = 'start' | 'run' | 'finish';

let audioContext: AudioContext | null = null;

const useEngine = (words: string) => {
  const { duration, isBackspaceEnabled, isAudioEnabled } = useSettings();
  
  const [state, setState] = useState<State>('start');
  const [typed, setTyped] = useState<string>('');
  const [errors, setErrors] = useState(0);
  const [timer, setTimer] = useState(duration);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  
  const totalTyped = useRef(0);
  const correctTyped = useRef(0);

  const playKeySound = useCallback(() => {
    if (!isAudioEnabled) return;
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440 + Math.random() * 200, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.error("Failed to play audio", e);
    }
  }, [isAudioEnabled]);

  useEffect(() => {
    setTimer(duration);
    restart();
  }, [duration]);

  useEffect(() => {
    if (state === 'run') {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setState('finish');
            return 0;
          }
          const elapsedSeconds = duration - prevTimer + 1;
          const currentWpm = (correctTyped.current / 5) / (elapsedSeconds / 60);
          setWpmHistory(prev => [...prev, isFinite(currentWpm) ? Math.round(currentWpm) : 0]);
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state, duration]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (state === 'finish') return;

    const { key } = e;

    playKeySound();
    
    if (state === 'start') {
      setState('run');
    }

    if (key === 'Backspace') {
      if (!isBackspaceEnabled) return;
      if (typed.length === 0) return;
      
      const lastChar = typed[typed.length - 1];
      const correspondingWordChar = words[typed.length - 1];
      if (lastChar !== correspondingWordChar) {
        setErrors(errors - 1);
      }
      setTyped(typed.slice(0, -1));
      return;
    }
    
    if (key.length === 1 && typed.length < words.length) {
      if(key !== words[typed.length]){
        setErrors(errors + 1);
      } else {
        correctTyped.current++;
      }
      totalTyped.current++;
      setTyped(typed + key);
    }
  }, [state, typed, words, errors, isBackspaceEnabled, playKeySound]);

  const restart = useCallback(() => {
    setState('start');
    setTimer(duration);
    setTyped('');
    setErrors(0);
    totalTyped.current = 0;
    correctTyped.current = 0;
    setWpmHistory([]);
  }, [duration]);
  
  const wpm = (correctTyped.current / 5) / ((duration - timer) / 60);
  const accuracy = totalTyped.current > 0 ? ((totalTyped.current - errors) / totalTyped.current) * 100 : 100;

  return { state, typed, errors, timer, wpm, accuracy, wpmHistory, handleKeyDown, restart };
};

export default useEngine;
