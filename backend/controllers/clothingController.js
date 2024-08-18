import clothingModel from "../models/clothingModel.js";
import fs from "fs";

// List all clothing items
const listClothing = async (req, res) => {
  try {
    const clothingItems = await clothingModel.find({});
    console.log(clothingItems);
    res.json({ success: true, data: clothingItems });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Add a clothing item
const addClothing = async (req, res) => {
  try {
    let imageFilename = `${req.file.filename}`;

    const clothing = new clothingModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: imageFilename,
    });

    await clothing.save();
    res.json({ success: true, message: "Clothing Item Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Delete a clothing item
const removeClothing = async (req, res) => {
  try {
    const clothing = await clothingModel.findById(req.body.id);
    fs.unlink(`uploads/${clothing.image}`, () => {});

    await clothingModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Clothing Item Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listClothing, addClothing, removeClothing };
