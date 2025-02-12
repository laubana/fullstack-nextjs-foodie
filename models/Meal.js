import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    instructions: { type: String, required: true },
    imageUrl: { type: String, required: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models["Meal"] || mongoose.model("Meal", mealSchema);
