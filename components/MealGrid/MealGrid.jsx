import styles from "./MealGrid.module.css";

import MealItem from "@/components/MealItem/MealItem";

export default ({ meals }) => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.slug}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
