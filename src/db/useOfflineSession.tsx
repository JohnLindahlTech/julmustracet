import React, {
  FC,
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import { useSession } from "next-auth/client";
import { Session, useDbSession } from "./sessionDB";
import useNetworkStatus from "./useNetworkStatus";

const OfflineSessionContext = createContext(null);

export const OfflineSessionProvider: FC = (props) => {
  return (
    <OfflineSessionContext.Provider {...props} value={useOfflineSession()} />
  );
};

export default function useOfflineSession(): [Session, boolean] {
  const sessionData = useContext(OfflineSessionContext);
  if (sessionData == null) {
    return _useOfflineSession();
  }
  return sessionData;
}

const clientId =
  Math.random().toString(36).substring(2) + Date.now().toString(36);

const _sendMessage = (message) => {
  if (typeof localStorage !== "undefined") {
    const timestamp = Math.floor(new Date().getTime() / 1000);
    localStorage.setItem(
      "nextauth.message",
      JSON.stringify({ ...message, clientId, timestamp })
    ); // eslint-disable-line
  }
};

function _useOfflineSession(): [Session, boolean] {
  const [nextSession, nextLoading] = useSession();
  const [dbSession, setDbSession] = useDbSession();
  const [session, setSession] = useState(null);

  const onOnline = useCallback(() => {
    _sendMessage({ event: "session", data: { trigger: "isOnline" } });
  }, []);

  const { cancel } = useNetworkStatus({ onOnline });

  useEffect(() => {
    if (nextSession) {
      setSession(nextSession);
      setDbSession(nextSession);
    }
  }, [nextSession, setDbSession]);

  useEffect(() => {
    if (dbSession && !nextSession) {
      setSession(dbSession);
    }
  }, [dbSession, nextSession]);

  return [session, nextLoading];
}
