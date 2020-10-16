import { GraphDataSeries } from "../types/GraphData";
import { Point } from "../types/point";

export const USER = "user";
export const BRAND = "brand";
type Mappable = "user" | "brand";

export default function mapGraphData(
  data: Point[],
  type: Mappable = USER
): GraphDataSeries[] {
  const result = data.reduce((acc, cur) => {
    const key = cur[type];
    if (!acc[key]) {
      acc[key] = {
        name: key,
        data: [],
      };
    }
    const { data } = acc[key];
    data.push({
      time: cur.time,
      value: (data?.[data.length - 1]?.value ?? 0) + cur.amount,
    });
    return acc;
  }, {});
  return Object.values(result);
}
