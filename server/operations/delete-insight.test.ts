import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";

describe("deleting insights from the database", () => {
  describe("insight not in DB", () => {
    withDB((fixture) => {
      let result: boolean;

      beforeAll(() => {
        result = deleteInsight({ ...fixture, id: 999 });
      });

      it("returns false", () => {
        expect(result).toEqual(false);
      });
    });
  });

  describe("insight exists in DB", () => {
    withDB((fixture) => {
      const insights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
        { id: 3, brand: 1, createdAt: new Date(), text: "3" },
      ];

      let result: boolean;

      beforeAll(() => {
        fixture.insights.insert(
          insights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        result = deleteInsight({ ...fixture, id: 2 });
      });

      it("returns true", () => {
        expect(result).toEqual(true);
      });

      it("removes insight from DB", () => {
        const remaining = fixture.insights.selectAll();
        expect(remaining.length).toEqual(2);
        expect(remaining.find((it) => it.id === 2)).toBeUndefined();
      });

      it("does not affect other insights", () => {
        const remaining = fixture.insights.selectAll();
        expect(remaining.find((it) => it.id === 1)).toBeDefined();
        expect(remaining.find((it) => it.id === 3)).toBeDefined();
      });
    });
  });
});
