// VAST (Video Ad Serving Template) parser para audio pre-roll.
// AdMixer Audio (y casi cualquier ad network de audio) sirve un XML VAST 2/3/4
// con un <MediaFile> tipo audio. Esto extrae lo mínimo que necesitamos.

export interface VastAd {
  audioUrl: string;
  duration: number; // segundos
  impressionUrls: string[];
  trackingEvents: {
    start: string[];
    firstQuartile: string[];
    midpoint: string[];
    thirdQuartile: string[];
    complete: string[];
    skip: string[];
  };
  clickThroughUrl: string | null;
  clickTrackingUrls: string[];
  adTitle: string;
}

/**
 * Hace fetch de un tag VAST y devuelve el ad parseado, o null si no hay
 * (no fill, error de red, AdBlocker, XML inválido).
 */
export async function fetchVastAd(vastUrl: string): Promise<VastAd | null> {
  if (!vastUrl) return null;
  try {
    // Cache busting para que el ad server elija un ad nuevo cada vez
    const url = vastUrl.includes("?")
      ? `${vastUrl}&_cb=${Date.now()}`
      : `${vastUrl}?_cb=${Date.now()}`;
    const res = await fetch(url, { credentials: "omit" });
    if (!res.ok) return null;
    const xml = await res.text();
    return parseVastXml(xml);
  } catch {
    return null;
  }
}

function parseVastXml(xml: string): VastAd | null {
  try {
    const doc = new DOMParser().parseFromString(xml, "text/xml");
    if (doc.querySelector("parsererror")) return null;

    // <MediaFile type="audio/...">URL</MediaFile> — preferimos audio/mpeg
    const mediaFiles = Array.from(doc.querySelectorAll("MediaFile"));
    const audioMedia =
      mediaFiles.find((m) => (m.getAttribute("type") || "").startsWith("audio")) ||
      mediaFiles[0];
    if (!audioMedia) return null;
    const audioUrl = (audioMedia.textContent || "").trim();
    if (!audioUrl) return null;

    const durationText = (doc.querySelector("Duration")?.textContent || "").trim();
    const duration = parseHmsDuration(durationText) || 15;

    const impressionUrls = Array.from(doc.querySelectorAll("Impression"))
      .map((n) => (n.textContent || "").trim())
      .filter(Boolean);

    const trackingByEvent = (event: string): string[] =>
      Array.from(doc.querySelectorAll(`Tracking[event="${event}"]`))
        .map((n) => (n.textContent || "").trim())
        .filter(Boolean);

    const clickThroughUrl =
      (doc.querySelector("ClickThrough")?.textContent || "").trim() || null;

    const clickTrackingUrls = Array.from(doc.querySelectorAll("ClickTracking"))
      .map((n) => (n.textContent || "").trim())
      .filter(Boolean);

    const adTitle =
      (doc.querySelector("AdTitle")?.textContent || "").trim() || "Audio Ad";

    return {
      audioUrl,
      duration,
      impressionUrls,
      trackingEvents: {
        start: trackingByEvent("start"),
        firstQuartile: trackingByEvent("firstQuartile"),
        midpoint: trackingByEvent("midpoint"),
        thirdQuartile: trackingByEvent("thirdQuartile"),
        complete: trackingByEvent("complete"),
        skip: trackingByEvent("skip"),
      },
      clickThroughUrl,
      clickTrackingUrls,
      adTitle,
    };
  } catch {
    return null;
  }
}

function parseHmsDuration(s: string): number {
  // Formato VAST estándar: "HH:MM:SS" o "HH:MM:SS.mmm"
  const m = s.match(/^(\d+):(\d+):(\d+)(?:\.\d+)?$/);
  if (!m) return 0;
  const [, h, mi, sec] = m;
  return parseInt(h, 10) * 3600 + parseInt(mi, 10) * 60 + parseInt(sec, 10);
}

/**
 * Dispara un beacon de tracking (impression, quartile, etc.). VAST usa pixel
 * tracking simple — un GET a la URL es suficiente para registrar el evento.
 */
export function fireBeacon(urls: string | string[]): void {
  const list = Array.isArray(urls) ? urls : [urls];
  list.forEach((u) => {
    if (!u) return;
    try {
      // navigator.sendBeacon es ideal pero algunos endpoints VAST sólo aceptan GET.
      // <img> es el patrón universal y funciona en background.
      const img = new Image();
      img.referrerPolicy = "no-referrer-when-downgrade";
      img.src = u;
    } catch {
      // Silent
    }
  });
}
