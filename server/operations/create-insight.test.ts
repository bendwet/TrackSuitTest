import { beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { withDB } from "../testing.ts";
import type { Insight } from "$models/insight.ts";
import createInsight from "./create-insight.ts";

describe("creating insights in the database", () => {
  describe("empty DB", () => {
    withDB((fixture) => {
      let result: Insight;

      beforeAll(() => {
        result = createInsight({ ...fixture, brand: 1, text: "Test insight" });
      });

      it("returns created insight", () => {
        expect(result.brand).toEqual(1);
        expect(result.text).toEqual("Test insight");
        expect(result.id).toBeGreaterThan(0);
      });

      it("inserts insight into DB", () => {
        const insights = fixture.insights.selectAll();
        expect(insights.length).toEqual(1);
        expect(insights[0].brand).toEqual(1);
        expect(insights[0].text).toEqual("Test insight");
      });
    });
  });

  describe("populated DB", () => {
    withDB((fixture) => {
      const existingInsights: Insight[] = [
        { id: 1, brand: 0, createdAt: new Date(), text: "1" },
        { id: 2, brand: 0, createdAt: new Date(), text: "2" },
      ];

      let result: Insight;

      beforeAll(() => {
        fixture.insights.insert(
          existingInsights.map((it) => ({
            ...it,
            createdAt: it.createdAt.toISOString(),
          })),
        );
        result = createInsight({ ...fixture, brand: 3, text: "New insight" });
      });

      it("returns created insight with new ID", () => {
        expect(result.brand).toEqual(3);
        expect(result.text).toEqual("New insight");
        expect(result.id).toBeGreaterThan(2);
      });

      it("inserts insight into DB without affecting existing insights", () => {
        const insights = fixture.insights.selectAll();
        expect(insights.length).toEqual(3);
      });
    });
  });
});
