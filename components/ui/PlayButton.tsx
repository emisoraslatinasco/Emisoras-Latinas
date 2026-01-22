'use client';

import { useRadio } from '@/context/RadioContext';
import { StationByCountry, CountryCode } from '@/data/stationsByCountry';

interface PlayButtonProps {
  station: StationByCountry;
  countryCode: CountryCode;
  label: string;
}

export default function PlayButton({ station, countryCode, label }: PlayButtonProps) {
  const { playStation, currentStation, isPlaying } = useRadio();
  
  const isCurrentStation = currentStation?.nombre === station.nombre;
  const isCurrentlyPlaying = isCurrentStation && isPlaying;
  
  const handlePlay = () => {
    playStation(station, countryCode);
  };
  
  return (
    <button
      onClick={handlePlay}
      className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl"
    >
      <i className={`fas ${isCurrentlyPlaying ? 'fa-pause' : 'fa-play'} text-2xl`}></i>
      <span>{isCurrentlyPlaying ? 'Reproduciendo' : label}</span>
    </button>
  );
}
