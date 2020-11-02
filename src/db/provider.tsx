import React, { useEffect, useRef } from "react";
import PouchDB from "pouchdb";
import Validation from "./validate";
import DBContext from "./context";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
PouchDB.plugin(Validation);

const DBProvider = ({ remote, local, children }) => {
  const remoteDb = useRef(new PouchDB(remote, { skip_setup: true }));
  const localDb = useRef(new PouchDB(local));
  const replication = useRef(null);

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
    if (remoteDb.current && localDb.current) {
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

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        })
        .on("active", function (info) {
          console.log("active", info);
          // replication was resumed
        })
        .on("error", function (err) {
          console.error("error", err);
          // totally unhandled error (shouldn't happen)
        });
    }
    return () => {
      console.log("Canceling");
      if (replication?.current) {
        replication.current.cancel();
      }
    };
  }, [remote, local]);

  return (
    <DBContext.Provider value={localDb.current}>{children}</DBContext.Provider>
  );
};

export default DBProvider;
