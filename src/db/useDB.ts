import { useContext } from "react";
import DBContext from "./context";

const useDB = () => {
  const { db, loading } = useContext(DBContext);
  return { db, loading };
};

export default useDB;
