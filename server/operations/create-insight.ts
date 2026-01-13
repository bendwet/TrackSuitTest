import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  text: string;
};

export default (input: Input): Insight => {
  console.log(`Creating insight for brand=${input.brand}`);

  const createdAt = new Date().toISOString();

  const item: insightsTable.Insert = {
    brand: input.brand,
    createdAt,
    text: input.text,
  };

  input.db.exec(insightsTable.insertStatement(item));

  const [row] = input.db
    .sql<
    insightsTable.Row
  >`SELECT * FROM insights WHERE brand = ${input.brand} AND text = ${input.text} AND createdAt = ${createdAt} LIMIT 1`;

  const result = { ...row, createdAt: new Date(row.createdAt) };
  console.log("Insight created:", result);
  return result;
};
