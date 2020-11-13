import { useEffect, useState } from "react";
import {
  AchievementsMap,
  UserAchievements,
} from "../lib/mapAchievementsToUsers";
import { useData } from "./data";

export function useGetAchievements(): {
  achievements: AchievementsMap;
  loading: boolean;
} {
  const { mappedAchievements, loading } = useData();

  return {
    achievements: mappedAchievements,
    loading,
  };
}

function transformData(
  allAchievements,
  username: string,
  loading: boolean
): UserAchievements {
  const data = allAchievements[username] ?? {
    username,
    achievements: [],
  };
  return {
    ...data,
    loading,
  };
}

export function useGetAchievementsFor(username: string): UserAchievements {
  const { achievements, loading } = useGetAchievements();
  const [data, setData] = useState(
    transformData(achievements, username, loading)
  );

  useEffect(() => {
    setData(transformData(achievements, username, loading));
  }, [achievements, username, loading]);

  return data;
}
