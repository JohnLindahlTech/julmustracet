export type GraphPoint = {
  time: number;
  value: number;
};

export type GraphDataSeries = {
  name: string;
  data: GraphPoint[];
};
