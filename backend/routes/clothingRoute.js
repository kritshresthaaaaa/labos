import express from "express";
import {
  addClothing,
  listClothing,
  removeClothing,
} from "../controllers/clothingController.js";
import multer from "multer";

const clothingRouter = express.Router();

// Image Storage Engine for clothing images
const storage = multer.diskStorage({
  destination: "uploads/clothing", // Store clothing images in a dedicated folder
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Clothing endpoints
clothingRouter.get("/list", listClothing); // List all clothing items
clothingRouter.post("/add", upload.single("image"), addClothing); // Add clothing item
clothingRouter.post("/remove", removeClothing); // Remove clothing item

export default clothingRouter;
