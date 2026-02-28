import { useId, useEffect, useCallback } from "react";

const EVENT_NAME = "single-media-play-request";

/**
 * Coordina la riproduzione: un solo player alla volta.
 * Quando un player inizia, gli altri ricevono l'evento e si mettono in pausa.
 * @param onPausedByOther - chiamato quando un altro player ha avviato la riproduzione (mettere in pausa e aggiornare stato)
 * @returns requestPlay - chiamare prima di .play() per notificare gli altri player
 */
export function useSingleMediaPlayer(onPausedByOther: () => void) {
  const playerId = useId();

  const requestPlay = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent(EVENT_NAME, { detail: { playerId } })
    );
  }, [playerId]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { playerId: startedId } = (e as CustomEvent<{ playerId: string }>).detail;
      if (startedId === playerId) return;
      onPausedByOther();
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, [playerId, onPausedByOther]);

  return { requestPlay };
}
