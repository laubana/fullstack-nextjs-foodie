import mongoose from "mongoose";

import "@/models/meal";

export const connect = async () => {
  try {
    if (process.env.DB_URI) {
      await mongoose.connect(process.env.DB_URI);
    } else {
      console.error("DB not connected.");
    }
  } catch (error) {
    console.error(error);
  }
};
