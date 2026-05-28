'use client';

import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { StationByCountry, CountryCode } from '@/data/stationsByCountry';
import { fetchVastAd, fireBeacon, VastAd } from '@/lib/vast';
import { canShowPreroll, markPrerollShown } from '@/lib/preroll-capping';

// Tipo auxiliar para soportar tanto datos del backend directo como transformados
type StationWithStream = StationByCountry & {
  urlStream?: string; // Backend directo usa urlStream
};

interface RadioState {
  currentStation: StationByCountry | null;
  currentCountryCode: CountryCode | null;
  loadingStation: string | null; // nombre de la emisora que está cargando
  isPlaying: boolean;
  volume: number;
  isLoading: boolean;
  error: string | null;
  // Estado del audio pre-roll (AdMixer / VAST)
  preroll: VastAd | null;
  prerollElapsed: number; // segundos transcurridos del ad
}

interface RadioContextType extends RadioState {
  playStation: (station: StationByCountry, countryCode: CountryCode) => void;
  togglePlayPause: () => void;
  stopPlayback: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  skipPreroll: () => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

// URL del tag VAST de AdMixer (o cualquier ad network compatible).
// Configurable vía NEXT_PUBLIC_ADMIXER_VAST_URL en Vercel. Si está vacía, el
// pre-roll se omite y el stream arranca directo (zero-impact si no está configurado).
const VAST_TAG_URL = process.env.NEXT_PUBLIC_ADMIXER_VAST_URL || '';

export function RadioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RadioState>({
    currentStation: null,
    currentCountryCode: null,
    loadingStation: null,
    isPlaying: false,
    volume: 0.7,
    isLoading: false,
    error: null,
    preroll: null,
    prerollElapsed: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolumeRef = useRef<number>(0.7);
  // Guardamos la estación pendiente mientras suena el ad para arrancarla al terminar.
  const pendingStationRef = useRef<{ station: StationByCountry; countryCode: CountryCode } | null>(null);
  // Quartiles ya disparados (para no duplicar beacons)
  const firedQuartilesRef = useRef<Set<string>>(new Set());

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Reproduce el stream real de la estación. Se llama tras completar/saltar el ad,
   * o directamente cuando no hay ad.
   */
  const playStreamDirect = useCallback((station: StationByCountry, countryCode: CountryCode) => {
    if (!audioRef.current) return;

    setState(prev => ({
      ...prev,
      isLoading: true,
      loadingStation: station.nombre,
      error: null,
      preroll: null,
      prerollElapsed: 0,
    }));

    const stationWithStream = station as StationWithStream;
    const streamUrl = stationWithStream.urlStream || station.url_stream;

    if (!streamUrl) {
      setState(prev => ({
        ...prev,
        loadingStation: null,
        isLoading: false,
        error: `Emisora "${station.nombre}" no tiene URL de streaming disponible`,
      }));
      return;
    }

    audioRef.current.src = streamUrl;

    const handleCanPlay = () => {
      audioRef.current?.play()
        .then(() => {
          setState(prev => ({
            ...prev,
            currentStation: station,
            currentCountryCode: countryCode,
            loadingStation: null,
            isPlaying: true,
            isLoading: false,
            error: null,
          }));
        })
        .catch(err => {
          setState(prev => ({
            ...prev,
            loadingStation: null,
            isLoading: false,
            error: `No se pudo reproducir: ${err.message}`,
          }));
        });
    };

    const handleError = () => {
      setState(prev => ({
        ...prev,
        loadingStation: null,
        isLoading: false,
        error: `Emisora "${station.nombre}" no disponible`,
      }));
    };

    audioRef.current.addEventListener('canplay', handleCanPlay, { once: true });
    audioRef.current.addEventListener('error', handleError, { once: true });
    audioRef.current.load();
  }, []);

  const playStation = useCallback(async (station: StationByCountry, countryCode: CountryCode) => {
    if (!audioRef.current) return;

    // Misma emisora: toggle play/pause (no pre-roll para no penalizar pausa/play)
    if (state.currentStation?.nombre === station.nombre) {
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

    // Nueva emisora — marcar como cargando
    setState(prev => ({ ...prev, isLoading: true, loadingStation: station.nombre, error: null }));
    audioRef.current.pause();

    // ¿Toca pre-roll? Solo si: VAST configurado + cooldown OK
    const shouldAttemptAd = Boolean(VAST_TAG_URL) && canShowPreroll();
    let ad: VastAd | null = null;
    if (shouldAttemptAd) {
      ad = await fetchVastAd(VAST_TAG_URL);
    }

    if (!ad) {
      // Sin ad disponible (o sin tag configurado): stream directo
      playStreamDirect(station, countryCode);
      return;
    }

    // ¡Tenemos ad! Guardamos la estación pendiente y reproducimos el ad
    pendingStationRef.current = { station, countryCode };
    firedQuartilesRef.current = new Set();
    markPrerollShown();
    fireBeacon(ad.impressionUrls);

    audioRef.current.src = ad.audioUrl;

    const onAdCanPlay = () => {
      audioRef.current?.play()
        .then(() => {
          fireBeacon(ad.trackingEvents.start);
          setState(prev => ({
            ...prev,
            preroll: ad,
            prerollElapsed: 0,
            isLoading: false,
            loadingStation: null,
            isPlaying: true,
          }));
        })
        .catch(() => {
          // Autoplay bloqueado u otro error: saltar al stream directo
          pendingStationRef.current = null;
          playStreamDirect(station, countryCode);
        });
    };

    const onAdEnded = () => {
      fireBeacon(ad.trackingEvents.complete);
      const pending = pendingStationRef.current;
      pendingStationRef.current = null;
      if (pending) {
        playStreamDirect(pending.station, pending.countryCode);
      }
    };

    const onAdError = () => {
      pendingStationRef.current = null;
      playStreamDirect(station, countryCode);
    };

    audioRef.current.addEventListener('canplay', onAdCanPlay, { once: true });
    audioRef.current.addEventListener('ended', onAdEnded, { once: true });
    audioRef.current.addEventListener('error', onAdError, { once: true });
    audioRef.current.load();
  }, [state.currentStation?.nombre, state.isPlaying, playStreamDirect]);

  // Tracking de quartiles del ad: medimos el progreso y disparamos los beacons VAST
  // estándar (firstQuartile, midpoint, thirdQuartile) para que AdMixer registre la
  // viewability correcta y nos pague el CPM completo.
  useEffect(() => {
    if (!state.preroll || !audioRef.current) return;
    const audio = audioRef.current;
    const ad = state.preroll;
    const duration = ad.duration;

    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setState(prev => ({ ...prev, prerollElapsed: t }));

      const fired = firedQuartilesRef.current;
      if (!fired.has('first') && t >= duration * 0.25) {
        fired.add('first');
        fireBeacon(ad.trackingEvents.firstQuartile);
      }
      if (!fired.has('mid') && t >= duration * 0.5) {
        fired.add('mid');
        fireBeacon(ad.trackingEvents.midpoint);
      }
      if (!fired.has('third') && t >= duration * 0.75) {
        fired.add('third');
        fireBeacon(ad.trackingEvents.thirdQuartile);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    return () => audio.removeEventListener('timeupdate', onTimeUpdate);
  }, [state.preroll]);

  const skipPreroll = useCallback(() => {
    if (!state.preroll || !audioRef.current) return;
    fireBeacon(state.preroll.trackingEvents.skip);
    audioRef.current.pause();
    const pending = pendingStationRef.current;
    pendingStationRef.current = null;
    if (pending) {
      playStreamDirect(pending.station, pending.countryCode);
    } else {
      setState(prev => ({ ...prev, preroll: null, prerollElapsed: 0 }));
    }
  }, [state.preroll, playStreamDirect]);

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
    pendingStationRef.current = null;
    setState(prev => ({
      ...prev,
      currentStation: null,
      currentCountryCode: null,
      loadingStation: null,
      isPlaying: false,
      isLoading: false,
      error: null,
      preroll: null,
      prerollElapsed: 0,
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

  // Keyboard shortcuts (deshabilitados durante el pre-roll para que la barra
  // espaciadora no pause el ad — eso confunde a los usuarios)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (state.preroll) return; // bloqueamos shortcuts durante el ad

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'KeyM') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, toggleMute, state.preroll]);

  return (
    <RadioContext.Provider
      value={{
        ...state,
        playStation,
        togglePlayPause,
        stopPlayback,
        setVolume,
        toggleMute,
        skipPreroll,
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
