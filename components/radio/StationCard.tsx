'use client';

import { Station } from '@/data/stations';
import { useRadio } from '@/context/RadioContext';
import Image from 'next/image';

interface StationCardProps {
  station: Station;
  index: number;
}

export default function StationCard({ station, index }: StationCardProps) {
  const { currentStation, isPlaying, playStation } = useRadio();
  const isCurrentlyPlaying = currentStation?.id === station.id && isPlaying;

  return (
    <article
      onClick={() => playStation(station)}
      className="station-card group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-800/40 hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20"
      style={{ animationDelay: `${index * 0.05}s` }}
      itemScope
      itemType="https://schema.org/RadioStation"
      aria-label={`Reproducir ${station.name}`}
    >
      <div className="relative aspect-square w-full">
        {/* Logo de la emisora */}
        <div className={`absolute inset-0 logo-container flex items-center justify-center ${isCurrentlyPlaying ? 'ring-4 ring-blue-500' : ''} bg-slate-900`}>
          <Image
            src={station.logoUrl}
            alt={station.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback icon si la imagen no carga */}
          <div className="fallback-icon hidden w-full h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <i className={`fas fa-radio text-white ${isCurrentlyPlaying ? 'text-6xl' : 'text-7xl'} opacity-90`} aria-hidden="true"></i>
          </div>

          {/* Icono de Play que aparece al hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
              <i className={`fas ${isCurrentlyPlaying ? 'fa-pause' : 'fa-play'} text-white text-2xl ${isCurrentlyPlaying ? '' : 'ml-1'}`} aria-hidden="true"></i>
            </div>
          </div>

          {/* Indicador de reproducción activa */}
          {isCurrentlyPlaying && (
            <div className="absolute bottom-2 right-2 z-20">
              <div className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-full shadow-lg">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-white animate-pulse"></div>
                  <div className="w-0.5 h-4 bg-white animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-0.5 h-3 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-white text-xs font-semibold ml-1">EN VIVO</span>
              </div>
            </div>
          )}
        </div>

        {/* Nombre de la emisora */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10">
          <h2 
            className="text-white font-semibold text-sm truncate drop-shadow-lg"
            style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}
            itemProp="name"
          >
            {station.name}
          </h2>
          <p 
            className="text-slate-400 text-xs truncate mt-0.5 drop-shadow-md"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}
            itemProp="genre"
          >
            {station.category}
          </p>
        </div>
      </div>
    </article>
  );
}
