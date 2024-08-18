import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

// Cart endpoints for clothing thrift store
cartRouter.post("/get", authMiddleware, getCart); // Get user's cart
cartRouter.post("/add", authMiddleware, addToCart); // Add clothing item to cart
cartRouter.post("/remove", authMiddleware, removeFromCart); // Remove clothing item from cart

export default cartRouter;
