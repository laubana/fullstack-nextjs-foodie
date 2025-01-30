import styles from "./page.module.css";

import MealForm from "@/components/MealForm/MealForm";

export default () => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Share your <span className={styles.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={styles.main}>
        <MealForm />
      </main>
    </>
  );
};
