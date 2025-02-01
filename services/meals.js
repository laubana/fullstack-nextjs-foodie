import slugify from "slugify";
import xss from "xss";

import { connect } from "@/configs/db";
import Meal from "@/models/meal";
import { uploadImage } from "@/helpers/s3";

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

  const imageUrl = await uploadImage(meal.image);

  meal.imageUrl = imageUrl;

  const newMeal = await Meal.create(meal);

  return newMeal;
};
