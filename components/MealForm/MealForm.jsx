"use client";

import { BeatLoader } from "react-spinners";
import { useFormState, useFormStatus } from "react-dom";

import styles from "./MealForm.module.css";

import ImageField from "@/components/ImageField/ImageField";
import { handleMeal } from "@/services/actions";

export default () => {
  const [state, action] = useFormState(handleMeal, {
    status: "ready",
    message: null,
  });
  const status = useFormStatus();

  return (
    <form className={styles.form} action={action}>
      <div className={styles.row}>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" />
        </p>
      </div>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" name="summary" required />
      </p>
      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" rows="10" required />
      </p>
      <ImageField label="Your image" name="image" />
      {state.status === "error" && <p>{state.message}</p>}
      <p className={styles.actions}>
        <button type="submit" disabled={status.pending}>
          {status.pending ? <BeatLoader color="#F9572A" /> : "Share Meal"}
        </button>
      </p>
    </form>
  );
};
