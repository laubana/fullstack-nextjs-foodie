"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addMeal } from "./meals";

const isEmpty = (text) => {
  return !text || text.trim() === "";
};

// export const handleMeal = async (_, formData) => {
export const handleMeal = async (formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isEmpty(meal.title) ||
    isEmpty(meal.summary) ||
    isEmpty(meal.instructions) ||
    isEmpty(meal.creator) ||
    isEmpty(meal.creator_email) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { status: "error", message: "Invalid Input" };
  }

  await addMeal(meal);
  revalidatePath("/meals", "page");
  redirect("/meals");
};
