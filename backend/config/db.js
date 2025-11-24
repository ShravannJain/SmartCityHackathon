import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Attempting MongoDB connection...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.error("⚠️  MongoDB Connection Failed - Running without database");
    console.error("Error:", err.message);
    console.error("\n💡 To fix: Add your IP address to MongoDB Atlas whitelist");
    console.error("   Visit: https://cloud.mongodb.com/ -> Network Access\n");
    return false;
  }
};

export default connectDB;

