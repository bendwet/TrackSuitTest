import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

describe("creating an insight in the database", () => {
  withDB((fixture) => {
    let result: Insight;

    const brand = 1;
    const text = "This is a test insight";

    beforeAll(() => {
      result = createInsight({ db: fixture.db, brand, insight: text });
    });

    it("returns the created insight", () => {
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.brand).toBe(brand);
      expect(result.text).toBe(text);
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it("persists the insight in the database", () => {
      const rows = fixture.db.sql`
        SELECT * FROM insights WHERE id = ${result.id}
      `;
      expect(rows.length).toBe(1);
      const row = rows[0];
      expect(row.id).toBe(result.id);
      expect(row.brand).toBe(brand);
      expect(row.text).toBe(text);
      expect(new Date(row.createdAt).toISOString()).toBe(
        result.createdAt.toISOString(),
      );
    });
  });
});
