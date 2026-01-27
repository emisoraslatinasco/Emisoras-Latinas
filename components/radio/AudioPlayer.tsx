'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRadio } from '@/context/RadioContext';
import Image from 'next/image';
import { getLogoPath } from '@/utils/logoMapper';
import AdSpace from '@/components/ui/AdSpace';

export default function AudioPlayer() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    currentStation,
    currentCountryCode,
    isPlaying,
    isLoading,
    volume,
    error,
    togglePlayPause,
    stopPlayback,
    setVolume,
    toggleMute,
  } = useRadio();

  // Ocultar en páginas de emisoras individuales (ej: /radio/co/blu-radio)
  // Estas páginas tienen su propio reproductor integrado
  const isStationPage = pathname?.match(/^\/radio\/[a-z]{2}\/[^\/]+$/i);
  
  if (!currentStation || !currentCountryCode) return null;
  
  // No mostrar en páginas de emisoras individuales
  if (isStationPage) return null;

  const volumePercent = Math.round(volume * 100);
  const logoSrc = getLogoPath(currentStation.logo_local, currentCountryCode);

  const getVolumeIcon = () => {
    if (volume === 0) return 'fa-volume-mute';
    if (volume < 0.5) return 'fa-volume-down';
    return 'fa-volume-up';
  };

  return (
      <div 
        className={`fixed bottom-0 left-0 right-0 shadow-2xl border-t border-slate-700 z-50 transition-all duration-500 ease-in-out ${
          isExpanded ? 'bg-slate-900' : 'glass-effect'
        }`}
      >
        {/* Barra principal del reproductor (ARRIBA) */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* Izquierda: Logo, info y botón Ver más */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Logo pequeño */}
              <div className={`relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                isPlaying && !isLoading ? 'animate-music-pulse' : ''
              }`}>
                <div className={`absolute -inset-0.5 rounded-lg ${
                  isPlaying && !isLoading 
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-rotate opacity-100' 
                    : 'bg-slate-700 opacity-50'
                }`}></div>
                <div className="absolute inset-0.5 rounded-md overflow-hidden bg-slate-800 flex items-center justify-center">
                  <Image
                    src={logoSrc}
                    alt={currentStation.nombre}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <i className="fas fa-radio text-white text-lg absolute opacity-30"></i>
                </div>
              </div>
              
              {/* Info básica */}
              <div className="hidden sm:block min-w-0 max-w-[150px]">
                <p className="text-white font-bold text-sm truncate">{currentStation.nombre}</p>
                <div className="flex items-center gap-1">
                  <span className={`text-xs flex-shrink-0 ${error ? 'text-red-400' : isLoading ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
                    {error ? 'Error' : isLoading ? 'Conectando...' : 'En vivo'}
                  </span>
                </div>
              </div>

              {/* Botón Ver más */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-full text-slate-300 hover:text-white text-sm font-medium transition-all"
                title={isExpanded ? 'Ver menos' : 'Ver más información'}
              >
                <span className="hidden sm:inline">{isExpanded ? 'Ver menos' : 'Ver más'}</span>
                <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-sm transition-transform`}></i>
              </button>
            </div>

            {/* Centro: Espacio publicitario */}
            <div className="hidden lg:flex flex-1 justify-center px-4">
              <AdSpace 
                width="w-full max-w-md" 
                height="h-12" 
                label="Ad"
                className="opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Derecha: Controles de reproducción, ondas y volumen */}
            <div className="flex items-center gap-3 flex-shrink-0">
              
              {/* Botón Play/Pause */}
              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 disabled:opacity-50"
                title="Pausar/Reproducir (Espacio)"
              >
                {isLoading ? (
                  <i className="fas fa-spinner fa-spin text-lg"></i>
                ) : (
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-lg ${!isPlaying ? 'ml-0.5' : ''}`}></i>
                )}
              </button>

              {/* Animación de ondas de sonido */}
              {isPlaying && !isLoading && (
                <div className="hidden md:flex items-center gap-0.5 h-8 px-2">
                  <div className="wave-bar w-1 bg-blue-500 h-2 rounded-full animate-wave"></div>
                  <div className="wave-bar w-1 bg-blue-500 h-4 rounded-full animate-wave" style={{ animationDelay: '0.1s' }}></div>
                  <div className="wave-bar w-1 bg-blue-500 h-6 rounded-full animate-wave" style={{ animationDelay: '0.2s' }}></div>
                  <div className="wave-bar w-1 bg-blue-500 h-4 rounded-full animate-wave" style={{ animationDelay: '0.3s' }}></div>
                  <div className="wave-bar w-1 bg-blue-500 h-5 rounded-full animate-wave" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}

              {/* Control de volumen */}
              <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors"
                  title="Silenciar/Activar (M)"
                >
                  <i className={`fas ${getVolumeIcon()} text-sm`}></i>
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-16 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  title="Control de volumen"
                />
                <span className="text-slate-400 text-xs w-7 text-right">{volumePercent}%</span>
              </div>

              {/* Botón Cerrar */}
              <button
                onClick={stopPlayback}
                className="w-9 h-9 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all duration-300"
                title="Cerrar reproductor"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>

          </div>
        </div>

        {/* Panel expandido con información detallada (ABAJO) */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-[50vh] opacity-100 overflow-y-auto scrollbar-hide' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-6 pb-8 border-t border-slate-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Columna izquierda: Logo grande e info básica */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className={`relative w-32 h-32 rounded-xl overflow-hidden ${
                isPlaying && !isLoading ? 'animate-music-pulse' : ''
              }`}>
                <div className={`absolute -inset-1 rounded-xl ${
                  isPlaying && !isLoading 
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-rotate' 
                    : 'bg-slate-700'
                }`}></div>
                <div className="absolute inset-1 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
                  <Image
                    src={logoSrc}
                    alt={currentStation.nombre}
                    fill
                    className="object-cover"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <i className="fas fa-radio text-white text-4xl absolute opacity-30"></i>
                </div>
              </div>
              
              <div className="text-center lg:text-left">
                <h3 className="text-white font-bold text-xl">{currentStation.nombre}</h3>
                {currentStation.ciudad && (
                  <p className="text-slate-400 text-sm flex items-center gap-1 justify-center lg:justify-start mt-1">
                    <i className="fas fa-map-marker-alt text-blue-400"></i>
                    {currentStation.ciudad}
                  </p>
                )}
              </div>
            </div>

            {/* Columna central: Descripción y géneros */}
            <div className="flex flex-col gap-4">
              {currentStation.descripcion && (
                <div>
                  <h4 className="text-slate-300 font-semibold text-sm mb-2 flex items-center gap-2">
                    <i className="fas fa-info-circle text-blue-400"></i>
                    Descripción
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {currentStation.descripcion}
                  </p>
                </div>
              )}
              
              {currentStation.generos && currentStation.generos.length > 0 && (
                <div>
                  <h4 className="text-slate-300 font-semibold text-sm mb-2 flex items-center gap-2">
                    <i className="fas fa-music text-purple-400"></i>
                    Géneros
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStation.generos.map((genero, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full"
                      >
                        {genero}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna derecha: Redes sociales y sitio web */}
            <div className="flex flex-col gap-4">
              {currentStation.sitio_web && (
                <div>
                  <h4 className="text-slate-300 font-semibold text-sm mb-2 flex items-center gap-2">
                    <i className="fas fa-globe text-green-400"></i>
                    Sitio Web
                  </h4>
                  <a 
                    href={currentStation.sitio_web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm underline truncate block"
                  >
                    {currentStation.sitio_web}
                  </a>
                </div>
              )}
              
              {currentStation.redes_sociales && currentStation.redes_sociales.length > 0 && (
                <div>
                  <h4 className="text-slate-300 font-semibold text-sm mb-2 flex items-center gap-2">
                    <i className="fas fa-share-alt text-pink-400"></i>
                    Redes Sociales
                  </h4>
                  <div className="flex flex-col gap-2">
                    {currentStation.redes_sociales.map((red, idx) => (
                      <a 
                        key={idx}
                        href={red}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs truncate flex items-center gap-2"
                      >
                        <i className={`fab ${
                          red.includes('facebook') ? 'fa-facebook' :
                          red.includes('twitter') || red.includes('x.com') ? 'fa-twitter' :
                          red.includes('instagram') ? 'fa-instagram' :
                          red.includes('youtube') ? 'fa-youtube' :
                          red.includes('tiktok') ? 'fa-tiktok' :
                          'fa-link'
                        }`}></i>
                        {red}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Mensaje si no hay info adicional */}
              {!currentStation.descripcion && !currentStation.sitio_web && 
               (!currentStation.redes_sociales || currentStation.redes_sociales.length === 0) && (
                <div className="text-center py-4">
                  <i className="fas fa-info-circle text-slate-600 text-3xl mb-2"></i>
                  <p className="text-slate-500 text-sm">No hay información adicional disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
