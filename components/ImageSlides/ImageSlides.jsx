"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./ImageSlides.module.css";

const images = [
  { imageUrl: "/images/meals/burger.jpg", alt: "Burger" },
  { imageUrl: "/images/meals/curry.jpg", alt: "Curry" },
  { imageUrl: "/images/meals/dumplings.jpg", alt: "Dumplings" },
  { imageUrl: "/images/meals/macncheese.jpg", alt: "Mac and Cheese" },
  { imageUrl: "/images/meals/pizza.jpg", alt: "Pizza" },
  { imageUrl: "/images/meals/schnitzel.jpg", alt: "Schnitzel" },
  {
    imageUrl: "/images/meals/tomato-salad.jpg",
    alt: "Tomato Salad",
  },
];

export default () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slideshow}>
      {images.map((image, index) => (
        <Image
          src={image.imageUrl}
          className={index === currentImageIndex ? styles.active : undefined}
          width={800}
          height={800}
          alt={image.alt}
          key={index}
        />
      ))}
    </div>
  );
};
