import { useEffect, useState } from "react";
import mapGraphData, { BRAND, Mappable, USER } from "../lib/mapGraphData";
import mapGridData from "../lib/mapGridData";
import { useData } from "./data";

export function useGetDrinks(type: Mappable) {
  const { drinks, loading } = useData();
  const [graph, setGraph] = useState(mapGraphData(drinks));
  const [grid, setGrid] = useState(mapGridData(graph));

  useEffect(() => {
    const graphData = mapGraphData(drinks, type);
    const gridData = mapGridData(graphData);
    setGraph(graphData);
    setGrid(gridData);
  }, [drinks, type]);

  return {
    drinks,
    graph,
    grid,
    loading,
  };
}

function transformData(type, identity, raw, fullGraph, loading) {
  const otherType = type === USER ? BRAND : USER;
  const drinks = raw.filter((doc) => doc[type] === identity);
  const graph = fullGraph.filter((doc) => doc.name === identity);
  const top = mapGridData(mapGraphData(drinks, otherType));
  return {
    drinks,
    graph,
    top,
    loading,
  };
}

export function useGetDrinksFrom(type: Mappable, identity: string) {
  const { drinks, graph, grid, loading } = useGetDrinks(type);
  const [data, setData] = useState(
    transformData(type, identity, drinks, graph, loading)
  );

  useEffect(() => {
    setData(transformData(type, identity, drinks, graph, loading));
  }, [type, drinks, graph, grid, loading, identity]);

  return data;
}
