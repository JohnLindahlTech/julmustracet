import { useCallback, useState } from "react";
import useWindowEvents from "./useWindowEvents";

type ReturnType = {
  online: boolean;
  cancel: () => void;
  restart: () => void;
};

type Props = {
  onOnline?: () => void;
  onOffline?: () => void;
  initialStopped?: boolean;
};

export default function useNetworkStatus({
  onOnline,
  onOffline,
  initialStopped = false,
}: Props): ReturnType {
  const [online, setOnline] = useState(
    typeof window !== "undefined" ? window.navigator.onLine : false
  );

  const innerOnLine = useCallback(() => {
    if (onOnline) {
      onOnline();
    }
    setOnline(window.navigator.onLine);
  }, [onOnline]);

  const innerOffLine = useCallback(() => {
    if (onOffline) {
      onOffline();
    }
    setOnline(window.navigator.onLine);
  }, [onOffline]);

  const { cancel: onlineCancel, restart: onlineRestart } = useWindowEvents(
    "online",
    innerOnLine,
    initialStopped
  );
  const { cancel: offlineCancel, restart: offlineRestart } = useWindowEvents(
    "offline",
    innerOffLine,
    initialStopped
  );

  const cancel = useCallback(() => {
    onlineCancel();
    offlineCancel();
  }, [onlineCancel, offlineCancel]);

  const restart = useCallback(() => {
    onlineRestart();
    offlineRestart();
  }, [onlineRestart, offlineRestart]);

  return {
    online,
    cancel,
    restart,
  };
}
