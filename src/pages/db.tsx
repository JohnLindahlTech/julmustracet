import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";
import useDB from "../db/useDB";

const DB = () => {
  const [docs, setDocs] = useState();
  const db = useDB();
  useEffect(() => {
    if (db) {
      const a = async () => {
        const d = await db.allDocs({
          include_docs: true,
        });
        setDocs(d);
      };
      a();
    }
  }, [db]);

  const onClickHandler = async () => {
    const res = await db.validatingPut(
      {
        _id: new Date().toJSON(),
        type: "drink",
        user: "john@example.com",
        time: new Date("2020-12-01").toJSON(),
        brand: "nygårda",
        amount: 1.5,
      },
      {
        userCtx: {
          db: "julmustracet",
          name: "john@example.com",
          roles: ["users"],
        },
      }
    );
  };
  return (
    <>
      <div>Kebeb</div>
      <Button onClick={onClickHandler}>Create</Button>
      <pre>
        <code>{JSON.stringify(docs, null, 2)}</code>
      </pre>
    </>
  );
};

export default DB;
