import Image from "next/image";

import styles from "./page.module.css";

export default () => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          One shared passion: <span className={styles.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={styles.main}>
        <h2>Community Perks</h2>
        <ul className={styles.perks}>
          <li>
            <Image src="/images/meal.png" width={800} height={800} alt="Meal" />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image
              src="/images/community.png"
              width={800}
              height={800}
              alt="Cooking People"
            />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image
              src="/images/events.png"
              width={800}
              height={800}
              alt="Cooking People"
            />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
};
