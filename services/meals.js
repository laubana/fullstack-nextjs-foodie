import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import slugify from "slugify";
import xss from "xss";

import { connect } from "@/configs/db";
import Meal from "@/models/meal";

const s3 = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const getMeals = async () => {
  await connect();

  const existingMeals = await Meal.find().lean();

  return existingMeals;
};

export const getMeal = async (slug) => {
  await connect();

  const existingMeal = await Meal.findOne({ slug }).lean();

  return existingMeal;
};

export const addMeal = async (meal) => {
  await connect();

  meal.slug = slugify(meal.title, { lower: true });

  const existingMeal = await Meal.findOne({ slug: meal.slug }).lean();

  if (existingMeal) {
    return null;
  }

  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  meal.imageUrl = `${process.env.AWS_URL}/foodie/images/${filename}`;

  const newMeal = await Meal.create(meal);

  const bufferedImage = await meal.image.arrayBuffer();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `foodie/images/${filename}`,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  return newMeal;
};
