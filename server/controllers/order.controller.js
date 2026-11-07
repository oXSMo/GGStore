import mongoose from "mongoose";
import { Order } from "../models/order.module.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

//! POST /orders
export const createOrder = async (req, res) => {
  try {
    const { phone, adress, products, totalPrice } = req.body;

    if (!phone || totalPrice === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "phone and totalPrice are required" });
    }

    if (products && !Array.isArray(products)) {
      return res
        .status(400)
        .json({ success: false, message: "products must be an array of IDs" });
    }

    if (products && !products.every(isValidId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID in products" });
    }

    const order = await Order.create({
      phone,
      adress,
      products,
      totalPrice,
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//! GET /orders?status=true|false|null
export const getOrders = async (req, res) => {
  try {
    const filter = {};

    if (req.query.status !== undefined) {
      if (req.query.status === "null") filter.status = null;
      else if (req.query.status === "true") filter.status = true;
      else if (req.query.status === "false") filter.status = false;
    }

    const orders = await Order.find(filter).populate("products");

    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//! GET /orders/:id
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const order = await Order.findById(id).populate("products");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//! PUT /orders/:id
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    // Only allow these fields to be updated
    const allowed = ["phone", "adress", "products", "totalPrice", "status"];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const order = await Order.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("products");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//! PATCH /orders/:id/status   body: { "status": true | false | null }
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    if (status !== true && status !== false && status !== null) {
      return res.status(400).json({
        success: false,
        message: "status must be true, false or null",
      });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//! DELETE /orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
