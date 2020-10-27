import { useRef, useEffect } from "react";

const useCalculateActiveData = (data) => {
  const cache = useRef({});
  useEffect(() => {
    cache.current = {};
  }, [data]);

  const calculateActive = (d, t) => {
    return d.reduce((res, item) => {
      let i = item.data.length - 1;
      for (; i >= 0; i--) {
        if (item.data[i].time <= t) {
          res.push({ ...item.data[i], name: item.name });
          break;
        }
      }
      return res;
    }, []);
  };

  const calculateCachedActive = (time) => {
    if (!time) {
      return;
    }
    if (cache.current[time]) {
      return cache.current[time];
    }

    const res = calculateActive(data, time);
    cache.current[time] = res;
    return res;
  };
  return calculateCachedActive;
};

export default useCalculateActiveData;
