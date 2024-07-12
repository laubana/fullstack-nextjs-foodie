"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const db = sql("data.db");

export const getMeals = async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );

  //   throw new Error("Error!");

  return db.prepare("SELECT * FROM meals").all();
};

export const getMeal = async (slug) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );

  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
};

export const addMeal = async (meal) => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000)
  );

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `foodie/images/${filename}`,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  meal.image = `${process.env.AWS_URL}/foodie/images/${filename}`;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES
      (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `
  ).run(meal);
};
