import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log("Connection error in MongoDB: ", error);
    process.exit(1);
  }
};
