"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Duration = 15 | 30 | 60 | 120;

interface Settings {
  duration: Duration;
  setDuration: (duration: Duration) => void;
  isBackspaceEnabled: boolean;
  toggleBackspace: () => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
  customText: string;
  setCustomText: (text: string) => void;
}

const SettingsContext = createContext<Settings | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [duration, setDuration] = useState<Duration>(30);
  const [isBackspaceEnabled, setIsBackspaceEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [customText, setCustomText] = useState('');

  const toggleBackspace = () => setIsBackspaceEnabled(prev => !prev);
  const toggleAudio = () => setIsAudioEnabled(prev => !prev);

  const value = {
    duration,
    setDuration,
    isBackspaceEnabled,
    toggleBackspace,
    isAudioEnabled,
    toggleAudio,
    customText,
    setCustomText,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
