import React, {
  FC,
  useContext,
  useRef,
  createContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import PouchDB from "pouchdb";
import { isBefore } from "date-fns";
import { errorMonitor } from "http-proxy";

const sessionDocumentId = "_local/session"; // TODO REMEMBER TO DESTROY on logout

export type Session = {
  _id?: string;
  _rev?: string;
  user: {
    name: string;
    email: string;
    image: string;
    picture?: string; // Something from next-auth might have this.
    username: string;
  };
  expires: string | Date;
};

export const SessionDBContext = createContext(null);

export const SessionDBProvider: FC<{ name: string; session: Session }> = ({
  name,
  session,
  children,
}) => {
  const sessionDb = useRef(
    name ? new PouchDB(name, { auto_compaction: true }) : null
  );

  return (
    <SessionDBContext.Provider value={sessionDb.current}>
      <HookProvider session={session}>{children}</HookProvider>
    </SessionDBContext.Provider>
  );
};

export const useSessionDB = (): PouchDB.Database =>
  useContext(SessionDBContext);

const HookContext = createContext(null);

const HookProvider = ({ children, session }) => {
  return (
    <HookContext.Provider value={useDbSession(session)}>
      {children}
    </HookContext.Provider>
  );
};

export function useDbSession(
  initialSession?: Session
): [Session, (session: Session) => Promise<void>] {
  const dbHookData = useContext(HookContext);

  if (dbHookData == null) {
    return _useDbSession(initialSession);
  }

  return dbHookData;
}

const _useDbSession = (
  initialSession?: Session
): [Session, (session: Session) => Promise<void>] => {
  const db = useSessionDB();
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    db.get(sessionDocumentId)
      .then((dbSesh) => {
        const { expires } = dbSesh as Session;
        if (expires && isBefore(new Date(expires), new Date())) {
          return null;
        }
        return dbSesh;
      })
      .then((dbSesh) => setSession(dbSesh as Session))
      .catch((err) => {
        if (err.name !== "not_found") {
          throw err;
        }
      })
      .catch((err) => console.error(err));
  }, [db]);

  useEffect(() => {
    if (initialSession) {
      saveSession(initialSession);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveSession = useCallback(
    async (sessionToSave: Session) => {
      if (
        sessionToSave.expires &&
        isBefore(new Date(sessionToSave.expires), new Date())
      ) {
        setSession(null);
        return;
      }
      setSession(sessionToSave);
      let dbSesh = {} as PouchDB.Core.GetMeta & Session;
      try {
        dbSesh = await db.get(sessionDocumentId);
      } catch (error) {
        if (error.name !== "not_found") {
          throw error;
        }
      }
      try {
        await db.put({
          _id: sessionDocumentId,
          _rev: dbSesh._rev,
          ...sessionToSave,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [db]
  );

  return [session, saveSession];
};
