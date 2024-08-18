import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router();

// User endpoints for clothing thrift store
userRouter.post("/register", registerUser); // Register a new user
userRouter.post("/login", loginUser); // User login

export default userRouter;
