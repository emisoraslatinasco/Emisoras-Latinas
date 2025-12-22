'use client';

import { useRadio } from '@/context/RadioContext';
import Image from 'next/image';

export default function AudioPlayer() {
  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    error,
    togglePlayPause,
    stopPlayback,
    setVolume,
    toggleMute,
  } = useRadio();

  if (!currentStation) return null;

  const volumePercent = Math.round(volume * 100);

  const getVolumeIcon = () => {
    if (volume === 0) return 'fa-volume-mute';
    if (volume < 0.5) return 'fa-volume-down';
    return 'fa-volume-up';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect shadow-2xl border-t border-slate-700 z-50">
      <div className="container mx-auto px-4 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Información de la emisora */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-slate-800 relative">
              {currentStation.logoUrl ? (
                <Image
                  src={currentStation.logoUrl}
                  alt={currentStation.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : null}
              <i className="fas fa-radio text-white text-2xl absolute"></i>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{currentStation.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">{currentStation.category}</span>
                <span className="text-slate-600">•</span>
                <span className={`text-sm ${error ? 'text-red-400' : isLoading ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                  {error ? 'Stream no disponible' : isLoading ? 'Conectando...' : 'Reproduciendo en vivo'}
                </span>
              </div>
            </div>
          </div>

          {/* Animación de ondas de sonido */}
          {isPlaying && !isLoading && (
            <div className="hidden md:flex items-center gap-1 h-12">
              <div className="wave-bar w-1 bg-blue-500 h-3 rounded-full animate-wave"></div>
              <div className="wave-bar w-1 bg-blue-500 h-6 rounded-full animate-wave" style={{ animationDelay: '0.1s' }}></div>
              <div className="wave-bar w-1 bg-blue-500 h-10 rounded-full animate-wave" style={{ animationDelay: '0.2s' }}></div>
              <div className="wave-bar w-1 bg-blue-500 h-6 rounded-full animate-wave" style={{ animationDelay: '0.3s' }}></div>
              <div className="wave-bar w-1 bg-blue-500 h-8 rounded-full animate-wave" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}

          {/* Controles */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-center">
            
            {/* Control de volumen */}
            <div className="hidden md:flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors"
                title="Silenciar/Activar"
              >
                <i className={`fas ${getVolumeIcon()} text-lg`}></i>
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                title="Control de volumen"
              />
              <span className="text-slate-400 text-xs w-8 text-right">{volumePercent}%</span>
            </div>

            {/* Botón Play/Pause */}
            <button
              onClick={togglePlayPause}
              disabled={isLoading}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50"
              title="Pausar/Reproducir (Espacio)"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin text-xl"></i>
              ) : (
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-xl ${!isPlaying ? 'ml-1' : ''}`}></i>
              )}
            </button>

            {/* Botón Cerrar */}
            <button
              onClick={stopPlayback}
              className="w-12 h-12 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-300"
              title="Cerrar reproductor"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
