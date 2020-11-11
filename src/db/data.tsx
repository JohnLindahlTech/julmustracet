import React, {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import useDB from "./useDB";
import useLoadAchievements from "./useLoadAchievements";
import useLoadDrinks from "./useLoadDrinks";

const DataContext = createContext(null);

export const DataProvider: FC = (props) => {
  return <DataContext.Provider value={useData()} {...props} />;
};

export const useData = () => {
  const data = useContext(DataContext);

  if (!data) {
    return _useData();
  }

  return data;
};

const _useData = () => {
  const { loadDrinks, drinks, loading: drinksLoading } = useLoadDrinks();
  const {
    loadAchievements,
    achievements,
    mappedAchievements,
    loading: achievementsLoading,
  } = useLoadAchievements();
  const [loading, setLoading] = useState(true);
  const db = useDB();

  useEffect(() => {
    loadDrinks();
    loadAchievements();
  }, [loadDrinks, loadAchievements]);

  useEffect(() => {
    setLoading(drinksLoading || achievementsLoading);
  }, [drinksLoading, achievementsLoading]);

  useEffect(() => {
    const changes = db
      .changes({
        live: true,
        since: "now",
      })
      .on("change", () => {
        loadDrinks();
        loadAchievements();
      });
    return () => {
      changes.cancel();
    };
  }, [db, loadDrinks, loadAchievements]);
  return {
    drinks,
    achievements,
    mappedAchievements,
    loading,
  };
};
