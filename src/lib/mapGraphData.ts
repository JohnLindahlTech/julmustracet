import { GraphDataSeries } from "../types/GraphData";
import { Point } from "../types/point";
import { maxLimitDate, minLimitDate } from "./rules";

export const USER = "username";
export const BRAND = "brand";
type Mappable = "username" | "brand";

export default function mapGraphData(
  data: Point[],
  type: Mappable = USER
): GraphDataSeries[] {
  const dataMap = data.reduce((acc, cur) => {
    const key = cur[type];
    if (!acc[key]) {
      acc[key] = {
        name: key,
        data: [
          {
            time: minLimitDate.getTime(),
            value: 0,
          },
        ],
      };
    }
    const { data } = acc[key];
    data.push({
      time: new Date(cur.time).getTime(),
      value: (data?.[data.length - 1]?.value ?? 0) + cur.amount,
    });
    return acc;
  }, {});
  const done = Object.values(dataMap) as GraphDataSeries[];
  done.forEach((s) => {
    s.data.push({
      time: maxLimitDate.getTime(),
      value: s.data[s.data.length - 1]?.value,
    });
  });
  done.sort((a, b) => {
    return b.data[b.data.length - 1]?.value - a.data[a.data.length - 1]?.value;
  });
  return done;
}
