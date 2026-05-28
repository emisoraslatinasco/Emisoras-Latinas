'use client';

import { useRadio } from '@/context/RadioContext';
import { fireBeacon } from '@/lib/vast';

// Segundos antes de habilitar el botón "Saltar". Estándar de la industria: 5s
// (suficiente para que el ad cuente como impresión y nos paguen).
const SKIP_AFTER_SECONDS = 5;

/**
 * Overlay que aparece encima del player cuando hay un audio pre-roll activo.
 * Muestra: nombre del anuncio, countdown, botón skip (tras 5s), y opción
 * de visitar al anunciante.
 *
 * Reutiliza el mismo elemento <audio> del context — no crea uno nuevo. La
 * lógica de fetch + tracking VAST vive en RadioContext.
 */
export default function PrerollOverlay() {
  const { preroll, prerollElapsed, skipPreroll, volume, setVolume } = useRadio();

  if (!preroll) return null;

  const remaining = Math.max(0, Math.ceil(preroll.duration - prerollElapsed));
  const canSkip = prerollElapsed >= SKIP_AFTER_SECONDS;
  const skipIn = Math.max(0, Math.ceil(SKIP_AFTER_SECONDS - prerollElapsed));

  const handleClickThrough = () => {
    if (!preroll.clickThroughUrl) return;
    fireBeacon(preroll.clickTrackingUrls);
    window.open(preroll.clickThroughUrl, '_blank', 'noopener,noreferrer');
  };

  const progressPercent = Math.min(100, (prerollElapsed / preroll.duration) * 100);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-br from-amber-900/30 via-orange-900/25 to-amber-800/30 border border-amber-500/40 animate-fade-in">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-bullhorn text-amber-400"></i>
            </div>
            <div className="min-w-0">
              <p className="text-amber-300 text-xs font-medium uppercase tracking-wide">
                Anuncio · Tu música arranca en {remaining}s
              </p>
              <p className="text-white text-sm font-semibold truncate">
                {preroll.adTitle}
              </p>
            </div>
          </div>

          {/* Volumen compartido con el player principal */}
          <button
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
            aria-label="Mute"
          >
            <i className={`fas ${volume === 0 ? 'fa-volume-xmark' : 'fa-volume-high'} text-lg`}></i>
          </button>
        </div>

        {/* Barra de progreso del ad */}
        <div className="relative w-full h-1.5 bg-slate-800/60 rounded-full overflow-hidden mb-3">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          {preroll.clickThroughUrl ? (
            <button
              onClick={handleClickThrough}
              className="text-xs md:text-sm text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1"
            >
              <i className="fas fa-external-link-alt"></i>
              Visitar anunciante
            </button>
          ) : (
            <span />
          )}

          <button
            onClick={skipPreroll}
            disabled={!canSkip}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              canSkip
                ? 'bg-slate-700 hover:bg-slate-600 text-white cursor-pointer'
                : 'bg-slate-800/60 text-slate-500 cursor-not-allowed'
            }`}
          >
            {canSkip ? (
              <>
                Saltar anuncio <i className="fas fa-forward ml-1"></i>
              </>
            ) : (
              <>Saltar en {skipIn}s</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
