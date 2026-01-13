import { useEffect, useState } from "react";
import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import type { Insight } from "../schemas/insight.ts";

export const App = () => {
  const [insights, setInsights] = useState<Insight[]>([]);

  const fetchInsights = async () => {
    const response = await fetch("/api/insights");
    const data = await response.json();
    setInsights(
      data.map((insight: any) => ({
        ...insight,
        brandId: insight.brand,
        date: new Date(insight.createdAt),
      })),
    );
  };

  const createInsight = async (brand: number, text: string) => {
    await fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, text }),
    });
    await fetchInsights();
  };

  const deleteInsight = async (id: number) => {
    await fetch(`/api/insights/${id}`, { method: "DELETE" });
    await fetchInsights();
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <main className={styles.main}>
      <Header onAddInsight={createInsight} />
      <Insights
        className={styles.insights}
        insights={insights}
        onDeleteInsight={deleteInsight}
      />
    </main>
  );
};
