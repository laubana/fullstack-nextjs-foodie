"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { addMeal } from "@/services/meals";

const isEmpty = (text) => {
  return !text || text.trim() === "";
};

export const handleMeal = async (_, formData) => {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    authorName: formData.get("name"),
    authorEmail: formData.get("email"),
  };

  if (
    isEmpty(meal.title) ||
    isEmpty(meal.summary) ||
    isEmpty(meal.instructions) ||
    isEmpty(meal.authorName) ||
    isEmpty(meal.authorEmail) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { status: "error", message: "Invalid Input" };
  }

  const newMeal = await addMeal(meal);

  if (!newMeal) {
    return { status: "error", message: "Server Error" };
  }

  revalidatePath("/meals", "page");
  redirect("/meals");
};
