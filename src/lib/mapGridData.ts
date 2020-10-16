import { GraphDataSeries } from "../types/GraphData";

type GridDataRow = {
  name: string;
  amount: number;
};

export default function mapGridData(data: GraphDataSeries[]): GridDataRow[] {
  const res = data.map((series) => ({
    name: series.name,
    amount: series.data[series.data.length - 1]?.value ?? 0,
  }));
  return res;
}
