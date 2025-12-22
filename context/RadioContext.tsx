'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { Station } from '@/data/stations';

interface RadioState {
  currentStation: Station | null;
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

interface RadioContextType extends RadioState {
  playStation: (station: Station) => void;
  togglePlayPause: () => void;
  stopPlayback: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export function RadioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RadioState>({
    currentStation: null,
    isPlaying: false,
    volume: 0.7,
    isLoading: false,
    error: null,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolumeRef = useRef<number>(0.7);

  // Inicializar audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playStation = useCallback((station: Station) => {
    if (!audioRef.current) return;

    // Si es la misma emisora, toggle play/pause
    if (state.currentStation?.id === station.id) {
      if (state.isPlaying) {
        audioRef.current.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
      } else {
        audioRef.current.play()
          .then(() => setState(prev => ({ ...prev, isPlaying: true, error: null })))
          .catch(err => setState(prev => ({ ...prev, error: err.message })));
      }
      return;
    }

    // Nueva emisora
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    audioRef.current.pause();
    audioRef.current.src = station.streamUrl;

    const handleCanPlay = () => {
      audioRef.current?.play()
        .then(() => {
          setState(prev => ({
            ...prev,
            currentStation: station,
            isPlaying: true,
            isLoading: false,
            error: null,
          }));
        })
        .catch(err => {
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: `No se pudo reproducir: ${err.message}`,
          }));
        });
    };

    const handleError = () => {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: `Emisora "${station.name}" no disponible`,
      }));
    };

    audioRef.current.addEventListener('canplay', handleCanPlay, { once: true });
    audioRef.current.addEventListener('error', handleError, { once: true });
    audioRef.current.load();
  }, [state.currentStation?.id, state.isPlaying]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !state.currentStation) return;

    if (state.isPlaying) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    } else {
      audioRef.current.play()
        .then(() => setState(prev => ({ ...prev, isPlaying: true, error: null })))
        .catch(err => setState(prev => ({ ...prev, error: err.message })));
    }
  }, [state.isPlaying, state.currentStation]);

  const stopPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setState(prev => ({
      ...prev,
      currentStation: null,
      isPlaying: false,
      isLoading: false,
      error: null,
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setState(prev => ({ ...prev, volume }));
  }, []);

  const toggleMute = useCallback(() => {
    if (state.volume > 0) {
      previousVolumeRef.current = state.volume;
      setVolume(0);
    } else {
      setVolume(previousVolumeRef.current || 0.7);
    }
  }, [state.volume, setVolume]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'KeyM') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, toggleMute]);

  return (
    <RadioContext.Provider
      value={{
        ...state,
        playStation,
        togglePlayPause,
        stopPlayback,
        setVolume,
        toggleMute,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
}
