import { useCallback, useEffect, useState } from "react";
import { toTitleCase } from "./toTitleCase";
import useDB from "./useDB";

const defaultBrands = [
  "Apotekarnes Årsmust",
  "Apotekarnes Bryggarmust",
  "Apotekarnes Julmust Sockerfri",
  "Apotekarnes Julmust",
  "Apotekarnes Vintermust",
  "Bjäre Julmust",
  "Coop Julmust",
  "Favorit God Julmust",
  "Freeway Julmust",
  "Hammars Julmust",
  "Herrljunga Klassisk Julmust",
  "ICA Julmust",
  "Naturfrisk Julmust",
  "Nyckelbryggerier Gammeldags Julmust",
  "Nygårda Calvadosfat",
  "Nygårda Ekfat",
  "Nygårda Julmust",
  "Nygårda Julmust Light",
  "Nygårda Portvinsfat",
  "Nygårda Romfat",
  "Vasa Julmust",
  "Zeunerts Julmust",
];

export function useBrands(): string[] {
  const { db } = useDB();
  const [brands, setBrands] = useState(defaultBrands);

  const queryUniqueBrands = useCallback(async () => {
    const data = await db.query("unique-brands", {
      group: true,
    });

    const res = data.rows.map((d) => toTitleCase(d.key));
    const uniques = Array.from(new Set([...defaultBrands, ...res])).sort();
    setBrands(uniques);
  }, [db]);

  useEffect(() => {
    queryUniqueBrands();
  }, [queryUniqueBrands]);

  useEffect(() => {
    const changes = db
      .changes({
        since: "now",
        live: true,
      })
      .on("change", async () => {
        await queryUniqueBrands();
      })
      .on("error", (error) => {
        // TODO Errorhandling
        console.error(error);
      });
    return () => {
      changes.cancel();
    };
  }, [db, queryUniqueBrands]);

  return brands;
}
