import type { HasDBClient } from "../shared.ts";
import type * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): boolean => {
  console.log("Deleting insight");

  if (input.id === undefined || input.id === null) {
    console.log("No id provided");
    return false;
  }

  const result = input.db.sql`
    DELETE FROM insights
    WHERE id = ${input.id}
    LIMIT 1
  `;

  const row = result[0];
  const deleted = !!row;
  if (deleted) {
    console.log("Insight deleted:", input.id);
  } else {
    console.log("No insight found with id:", input.id);
  }
  return deleted;
};
