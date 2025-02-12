import mongoose from "mongoose";

import "@/models/Meal";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error);

    console.error("Failed to connect to DB 🚨");
  }
};

export default { connect };
