import { expect } from "@std/expect";
import { beforeAll, describe, it } from "@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting an insight from the database", () => {
  withDB((fixture) => {
    const insights: Insight[] = [
      { id: 1, brandId: 0, createdAt: new Date(), text: "1" },
      { id: 2, brandId: 0, createdAt: new Date(), text: "2" },
      { id: 3, brandId: 1, createdAt: new Date(), text: "3" },
      { id: 4, brandId: 4, createdAt: new Date(), text: "4" },
    ];

    let deleteResult: boolean;

    beforeAll(() => {
      fixture.insights.insert(
        insights.map((it) => ({
          id: it.id,
          brand: it.brandId,
          createdAt: it.createdAt.toISOString(),
          text: it.text,
        })),
      );
      deleteResult = deleteInsight({ db: fixture.db, id: 3 });
    });

    it("returns true when the insight is deleted", () => {
      expect(deleteResult).toBe(true);
    });

    it("removes the insight from the database", () => {
      const rows = fixture.db.sql`
        SELECT * FROM insights WHERE id = ${3}
      `;
      expect(rows.length).toBe(0);
    });

    it("should have 3 rows left in the database", () => {
      const rows = fixture.db.sql`
        SELECT * FROM insights
      `;
      expect(rows.length).toBe(3);
    });
  });
});
