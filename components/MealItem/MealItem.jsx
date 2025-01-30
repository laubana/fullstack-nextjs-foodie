import Image from "next/image";
import Link from "next/link";

import styles from "./MealItem.module.css";

export default ({ title, slug, imageUrl, summary, authorName }) => {
  return (
    <article className={styles.meal}>
      <header>
        <div className={styles.image}>
          <Image src={imageUrl} alt={title} fill />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>by {authorName}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
};
