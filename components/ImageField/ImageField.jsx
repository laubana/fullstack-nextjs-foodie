"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./ImageField.module.css";

export default ({ label, name }) => {
  const ref = useRef(null);
  const [image, setImage] = useState(null);

  const handleClick = () => {
    ref.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className={styles.picker}>
      <label htmlFor="image">{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {image ? <Image src={image} alt="input" fill /> : <p>No Image</p>}
        </div>
        <input
          ref={ref}
          className={styles.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleChange}
          required
        />
        <button className={styles.button} type="button" onClick={handleClick}>
          Pick and Image
        </button>
      </div>
    </div>
  );
};
