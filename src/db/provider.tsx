import React, { useCallback, useEffect, useRef, useState } from "react";
import PouchDB from "pouchdb";
import * as Sentry from "@sentry/node";
import Validation from "./validate";
import DBContext from "./context";
import useNetworkStatus from "./useNetworkStatus";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
PouchDB.plugin(Validation);

const DBProvider = ({ remote, local, children }) => {
  const remoteDb = useRef(new PouchDB(remote, { skip_setup: true }));
  const localDb = useRef(local ? new PouchDB(local) : null);
  const [loading, setLoading] = useState(true);
  const replication = useRef(null);

  // db.replicate.from(url).on('complete', function(info) {
  //   // then two-way, continuous, retriable sync
  //   db.sync(url, opts)
  //     .on('change', onSyncChange)
  //     .on('paused', onSyncPaused)
  //     .on('error', onSyncError);
  // }).on('error', onSyncError);

  const onOnline = useCallback(() => {
    if (remoteDb.current && localDb.current) {
      if (replication.current) {
        return;
      }

      localDb.current.replicate
        .from(remoteDb.current)
        .on("complete", () => {
          setLoading(false);
          replication.current = localDb.current
            .sync(remoteDb.current, {
              live: true,
              retry: true,
            })
            .on("error", function (err) {
              Sentry.captureException(err);
              console.error("error", err);
              // totally unhandled error (shouldn't happen)
            });
        })
        .on("error", function (err) {
          Sentry.captureException(err);
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
      onOffline();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remote, local, onOnline, onOffline]);

  return (
    <DBContext.Provider
      value={{
        db: localDb.current ? localDb.current : remoteDb.current,
        loading,
      }}
    >
      {children}
    </DBContext.Provider>
  );
};

export default DBProvider;
