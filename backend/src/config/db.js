import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log("Error connecting to MONGODB", error);
  }
};
