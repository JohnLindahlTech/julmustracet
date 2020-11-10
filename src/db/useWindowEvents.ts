import { useCallback, useEffect, useState } from "react";

type ReturnType = {
  cancel: () => void;
  restart: () => void;
};

export default function useWindowEvents(
  eventType: string,
  handler: () => void,
  initialStopped = false
): ReturnType {
  const [stopped, setStopped] = useState(initialStopped);
  const cancel = useCallback(() => {
    setStopped(true);
  }, []);

  const restart = useCallback(() => {
    setStopped(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (stopped) {
        window.removeEventListener(eventType, handler);
      } else {
        window.addEventListener(eventType, handler);
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(eventType, handler);
      }
    };
  }, [eventType, handler, stopped]);

  return {
    cancel,
    restart,
  };
}
