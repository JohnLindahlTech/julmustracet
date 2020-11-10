import React, { useCallback, useEffect, useRef } from "react";
import PouchDB from "pouchdb";
import Validation from "./validate";
import DBContext from "./context";
import useNetworkStatus from "./useNetworkStatus";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
PouchDB.plugin(Validation);

const DBProvider = ({ remote, local, children }) => {
  const remoteDb = useRef(new PouchDB(remote, { skip_setup: true }));
  const localDb = useRef(local ? new PouchDB(local) : null);
  const replication = useRef(null);

  const onOnline = useCallback(() => {
    if (remoteDb.current && localDb.current) {
      if (replication.current) {
        return;
      }
      console.warn("Sync!");
      replication.current = localDb.current
        .sync(remoteDb.current, {
          live: true,
          retry: true,
        })
        .on("change", function (change) {
          console.log("change", change);
          // yo, something changed!
        })
        .on("paused", function (info) {
          console.log("paused", info);
          // replication was paused, usually because of a lost connection
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .on("active", function (info) {
          console.log("active", info);
          // replication was resumed
        })
        .on("error", function (err) {
          console.error("error", err);
          // totally unhandled error (shouldn't happen)
        });
    }
  }, []);

  const onOffline = useCallback(() => {
    if (replication?.current) {
      replication.current.cancel();
      replication.current = null;
    }
  }, []);

  const { online } = useNetworkStatus({ onOnline, onOffline });

  useEffect(() => {
    if (replication?.current) {
      replication.current.cancel();
    }
    if (remote) {
      remoteDb.current = new PouchDB(remote, { skip_setup: true });
    } else {
      remoteDb.current = null;
    }

    if (local) {
      localDb.current = new PouchDB(local, {});
    } else {
      localDb.current = null;
    }
    if (online) {
      onOnline();
    }
    return () => {
      console.log("Canceling");
      onOffline();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote, local, onOnline, onOffline]);

  return (
    <DBContext.Provider
      value={localDb.current ? localDb.current : remoteDb.current}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBProvider;
