import { expect } from "jsr:@std/expect";
import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import type { Insight } from "$models/insight.ts";
import { withDB } from "../testing.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting an insight from the database", () => {
  withDB((fixture) => {
    const insights: Insight[] = [
      { id: 1, brand: 0, createdAt: new Date(), text: "1" },
      { id: 2, brand: 0, createdAt: new Date(), text: "2" },
      { id: 3, brand: 1, createdAt: new Date(), text: "3" },
      { id: 4, brand: 4, createdAt: new Date(), text: "4" },
    ];

    let deleteResult: boolean;

    beforeAll(() => {
      fixture.insights.insert(
        insights.map((it) => ({
          ...it,
          createdAt: it.createdAt.toISOString(),
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
