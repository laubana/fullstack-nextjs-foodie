import MealItem from "@components/MealItem/MealItem";
import styles from "./MealGrid.module.css";

export default ({ meals }) => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal, index) => (
        <li key={index}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
