import slugify from "slugify";
import xss from "xss";

import dbConfig from "@/configs/dbConfig";
import Meal from "@/models/Meal";
import { uploadImage } from "@/helpers/s3";

export const getMeals = async () => {
  await dbConfig.connect();

  const existingMeals = await Meal.find().lean();

  return existingMeals;
};

export const getMeal = async (slug) => {
  await dbConfig.connect();

  const existingMeal = await Meal.findOne({ slug }).lean();

  return existingMeal;
};

export const addMeal = async (meal) => {
  await dbConfig.connect();

  meal.slug = slugify(meal.title, { lower: true });

  const existingMeal = await Meal.findOne({ slug: meal.slug }).lean();

  if (existingMeal) {
    return null;
  }

  meal.instructions = xss(meal.instructions);

  const imageUrl = await uploadImage(meal.image);

  meal.imageUrl = imageUrl;

  const newMeal = await Meal.create(meal);

  return newMeal;
};
