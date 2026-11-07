import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  adress: { type: String },
  status: { type: Boolean, default: null },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
  },
  totalPrice: { type: Number, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
