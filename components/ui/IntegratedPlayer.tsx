'use client';

import { useRadio } from '@/context/RadioContext';
import { StationByCountry, CountryCode } from '@/data/stationsByCountry';
import { useState, useEffect } from 'react';

interface IntegratedPlayerProps {
  station: StationByCountry;
  countryCode: CountryCode;
}

export default function IntegratedPlayer({ station, countryCode }: IntegratedPlayerProps) {
  const { 
    playStation, 
    togglePlayPause, 
    stopPlayback,
    currentStation, 
    isPlaying, 
    loadingStation,
    volume, 
    setVolume,
    error 
  } = useRadio();
  
  const isCurrentStation = currentStation?.nombre === station.nombre;
  const isCurrentlyPlaying = isCurrentStation && isPlaying;
  const isThisStationLoading = loadingStation === station.nombre;
  
  // Estado para animación de barras (menos barras para diseño compacto)
  const [bars, setBars] = useState([40, 70, 55, 85, 45, 75, 50, 80]);
  
  // Detener reproducción cuando el usuario sale de esta página
  // Esto ocurre cuando navega hacia atrás al menú o a otra sección del sitio
  useEffect(() => {
    return () => {
      // Cleanup: detener reproducción al desmontar el componente
      stopPlayback();
    };
  }, [stopPlayback]);
  
  // Animar barras cuando está reproduciendo
  useEffect(() => {
    if (!isCurrentlyPlaying) return;
    
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 60 + 20));
    }, 150);
    
    return () => clearInterval(interval);
  }, [isCurrentlyPlaying]);
  
  const handlePlay = () => {
    playStation(station, countryCode);
  };
  
  const handleToggle = () => {
    if (isCurrentStation) {
      togglePlayPause();
    } else {
      handlePlay();
    }
  };
  
  const getVolumeIcon = () => {
    if (volume === 0) return 'fa-volume-xmark';
    if (volume < 0.3) return 'fa-volume-off';
    if (volume < 0.7) return 'fa-volume-low';
    return 'fa-volume-high';
  };

  return (
    <div className="w-full">
      {/* Reproductor Compacto */}
      <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
        isCurrentlyPlaying 
          ? 'bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 border border-blue-500/50' 
          : 'bg-slate-800/60 border border-slate-700/50'
      }`}>
        
        {/* Efecto de brillo cuando está reproduciendo */}
        {isCurrentlyPlaying && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
        )}
        
        <div className="relative p-4 md:p-6">
          {/* Layout horizontal: Visualizador | Botón | Estado | Volumen */}
          <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
            
            {/* Visualizador de Audio - Compacto */}
            <div className="flex items-center gap-0.5 h-12 flex-shrink-0">
              {bars.map((height, index) => (
                <div
                  key={index}
                  className={`w-2 rounded-full transition-all duration-150 ${
                    isCurrentlyPlaying 
                      ? 'bg-gradient-to-t from-blue-500 to-purple-500' 
                      : 'bg-slate-600'
                  }`}
                  style={{ 
                    height: isCurrentlyPlaying ? `${height}%` : '25%',
                    opacity: isCurrentlyPlaying ? 1 : 0.5
                  }}
                />
              ))}
            </div>
            
            {/* Botón Play/Pause */}
            <button
              onClick={handleToggle}
              disabled={isThisStationLoading}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                isCurrentlyPlaying
                  ? 'bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 shadow-lg shadow-red-500/30'
                  : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/30'
              } ${isThisStationLoading ? 'opacity-70 cursor-wait' : 'hover:scale-110'}`}
            >
              {isThisStationLoading ? (
                <i className="fas fa-spinner fa-spin text-white text-xl"></i>
              ) : isCurrentlyPlaying ? (
                <i className="fas fa-pause text-white text-xl"></i>
              ) : (
                <i className="fas fa-play text-white text-xl ml-0.5"></i>
              )}
            </button>
            
            {/* Estado del Reproductor */}
            <div className="flex-1 min-w-0">
              {isThisStationLoading ? (
                <p className="text-blue-400 font-medium animate-pulse text-sm">
                  <i className="fas fa-signal mr-2"></i>
                  Conectando...
                </p>
              ) : isCurrentlyPlaying ? (
                <div className="flex items-center gap-2 text-green-400 font-medium text-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  EN VIVO - Reproduciendo
                </div>
              ) : error && error.includes(station.nombre) ? (
                <p className="text-red-400 font-medium text-sm truncate">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {error}
                </p>
              ) : (
                <p className="text-slate-400 text-sm">
                  <i className="fas fa-play-circle mr-1"></i>
                  Presiona para escuchar
                </p>
              )}
            </div>
            
            {/* Control de Volumen */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <i className={`fas ${getVolumeIcon()} text-lg`}></i>
              </button>
              
              <div className="relative w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden hidden sm:block">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${volume * 100}%` }}
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              
              <span className="text-slate-400 text-xs w-8 hidden sm:block">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información adicional - Una sola fila compacta */}
      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-slate-800/40 rounded-lg p-2">
          <div className="text-lg text-blue-400 mb-0.5">
            <i className="fas fa-broadcast-tower"></i>
          </div>
          <p className="text-white font-medium text-xs">En vivo 24/7</p>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-2">
          <div className="text-lg text-purple-400 mb-0.5">
            <i className="fas fa-headphones"></i>
          </div>
          <p className="text-white font-medium text-xs">Alta Definición</p>
        </div>
        <div className="bg-slate-800/40 rounded-lg p-2">
          <div className="text-lg text-pink-400 mb-0.5">
            <i className="fas fa-wifi"></i>
          </div>
          <p className="text-white font-medium text-xs">Conexión Estable</p>
        </div>
      </div>
    </div>
  );
}
