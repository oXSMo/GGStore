import express from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js"; // adjust the path to your project

const orderRoutes = express.Router();

orderRoutes.route("/").post(createOrder).get(getOrders);

orderRoutes
  .route("/:id")
  .get(getOrderById)
  .put(updateOrder)
  .delete(deleteOrder);

orderRoutes.patch("/:id/status", updateOrderStatus);

export default orderRoutes;
