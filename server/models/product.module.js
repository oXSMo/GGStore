import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  priceBought: {
    type: Number,
    select: false,
  },
  quantity: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: {
    type: [String],
  },
});

export const Product = mongoose.model("Product", productSchema);
