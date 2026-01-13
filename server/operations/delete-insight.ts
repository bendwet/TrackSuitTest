import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
  id: number;
};

export default (input: Input): boolean => {
  console.log(`Deleting insight for id=${input.id}`);

  const [existingRow] = input.db
    .sql`SELECT id FROM insights WHERE id = ${input.id} LIMIT 1`;

  if (!existingRow) {
    console.log("Insight not found, nothing to delete");
    return false;
  }

  input.db.exec(`DELETE FROM insights WHERE id = ${input.id}`);

  console.log("Insight deleted successfully");
  return true;
};
