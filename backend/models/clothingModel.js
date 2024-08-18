import mongoose from "mongoose";

const clothingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const clothingModel =
  mongoose.models.clothing || mongoose.model("clothing", clothingSchema);
export default clothingModel;
