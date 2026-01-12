import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  brand: number;
  insight: string;
};

export default (input: Input): Insight => {
  console.log("Creating insight");

  const createdAt = new Date().toISOString();

  const [row] = input.db
    .sql<
    insightsTable.Row
  >`INSERT INTO insights (brand, createdAt, text)
    VALUES (${input.brand}, ${createdAt}, ${input.insight})
    RETURNING *`;

  if (!row) {
    throw new Error("Failed to create insight");
  }

  const result: Insight = {
    ...row,
    createdAt: new Date(row.createdAt),
  };
  console.log("Insight created:", result);
  return result;
};
