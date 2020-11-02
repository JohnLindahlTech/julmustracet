import { useContext } from "react";
import DBContext from "./context";

const useDB = () => {
  const db = useContext(DBContext);
  return db;
};

export default useDB;
