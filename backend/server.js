import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import clothingRouter from "./routes/clothingRoute.js"; // Change to clothing route
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/clothing", clothingRouter); // Updated to clothing route
app.use("/images", express.static("uploads/clothing")); // Serve clothing images
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Basic endpoint for checking server status
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
