export type GraphPoint = {
  time: string | Date;
  value: number;
};

export type GraphDataSeries = {
  name: string;
  data: GraphPoint[];
};
