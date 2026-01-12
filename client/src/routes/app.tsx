import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  const fetchInsights = useCallback(async () => {
    const res = await fetch(`/api/insights`);
    const data = await res.json();
    setInsights(data);
  }, []);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  const handleInsightAdded = useCallback(() => {
    fetchInsights();
  }, [fetchInsights]);

  // remove the insight from state without refetching
  const handleInsightDeleted = useCallback((id: number) => {
    setInsights((prev) => prev.filter((insight) => insight.id !== id));
  }, []);

  return (
    <main className={styles.main}>
      <Header onInsightAdded={handleInsightAdded} />
      <Insights
        className={styles.insights}
        insights={insights}
        onInsightDeleted={handleInsightDeleted}
      />
    </main>
  );
};
