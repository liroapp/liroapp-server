import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Databse connected successfully...");
  } catch (error) {
    console.log("Database connection failed:...", error.message);
  }
}
