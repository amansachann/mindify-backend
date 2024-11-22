import mongoose from "mongoose";

async function connectDB(): Promise<void> {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`[DB] MongoDB Connection Successful!!`);
    console.log(`[DB] Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("[DB] MongoDB Connection Failed!!");
    console.error(error);
  }
}

export default connectDB;
