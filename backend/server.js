import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config(); // Load .env

const app = express();

// DB CONNECT
connectDB();

// Middleware
app.use(express.json());

// Routes
// app.use("/api/something", someRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

