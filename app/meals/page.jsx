import Link from "next/link";
import { Suspense } from "react";

import styles from "./page.module.css";

import Loader from "@/components/Loader/Loader";
import MealGrid from "@/components/MealGrid/MealGrid";
import { getMeals } from "@/services/meals";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

const Meals = async () => {
  const meals = await getMeals();

  return <MealGrid meals={meals} />;
};

export default () => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, create{" "}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<Loader />}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};
