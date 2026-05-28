// Frequency capping del audio pre-roll: 1 ad cada X minutos por usuario,
// para no quemar la experiencia cuando el user salta entre estaciones.

const STORAGE_KEY = "el_preroll_last";
const DEFAULT_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutos

export function canShowPreroll(cooldownMs: number = DEFAULT_COOLDOWN_MS): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const last = parseInt(raw, 10);
    if (Number.isNaN(last)) return true;
    return Date.now() - last >= cooldownMs;
  } catch {
    return false; // localStorage bloqueado — mejor no anunciar que crashear
  }
}

export function markPrerollShown(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, Date.now().toString());
  } catch {
    // Silent
  }
}
