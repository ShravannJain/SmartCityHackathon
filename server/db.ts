import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      console.log("⚠️  No MONGO_URI found, skipping MongoDB connection");
      return false;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error("⚠️  DB Connection Failed:", (err as Error).message);
    console.log("📝 Using in-memory storage instead");
    return false;
  }
}
