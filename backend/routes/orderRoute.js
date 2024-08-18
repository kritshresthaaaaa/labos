import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
  placeOrderCod,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Order endpoints for clothing thrift store
orderRouter.get("/list", listOrders); // List all orders
orderRouter.post("/userorders", authMiddleware, userOrders); // Get orders for a user
orderRouter.post("/place", authMiddleware, placeOrder); // Place an order for clothing
orderRouter.post("/status", updateStatus); // Update order status
orderRouter.post("/verify", verifyOrder); // Verify order payment
orderRouter.post("/placecod", authMiddleware, placeOrderCod); // Place an order using cash on delivery

export default orderRouter;
