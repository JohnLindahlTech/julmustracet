import { GraphDataSeries } from "../types/GraphData";

type GridDataRow = {
  id: number | string;
  position: number;
  name: string;
  amount: number;
};

export default function mapGridData(data: GraphDataSeries[]): GridDataRow[] {
  const res = data.map((series) => ({
    id: series.name,
    name: series.name,
    amount: series.data[series.data.length - 1]?.value ?? 0,
  }));
  res.sort((a, b) => b.amount - a.amount);
  return res.map((item, index) => ({ ...item, position: index + 1 }));
}
