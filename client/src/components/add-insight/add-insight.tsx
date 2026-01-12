import { useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const [brand, setBrand] = useState<number>(1);
  const [insight, setInsight] = useState<string>("");

  const addInsight = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/insights/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, insight }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(`Error: ${errorData.message || "Failed to add insight."}`);
      } else {
        globalThis.location.reload();
      }
    } catch (error) {
      console.error("Error adding insight:", error);
    }
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={addInsight}>
        <label className={styles.field}>
          <select
            className={styles["field-input"]}
            value={brand}
            onChange={(event) => setBrand(Number(event.target.value))}
          >
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            value={insight}
            onChange={(e) => setInsight(e.target.value)}
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
