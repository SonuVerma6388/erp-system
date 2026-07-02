import {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  getLatestOrders,
} from "../services/orderService.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await createNewOrder(req.body, req.user.id);

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrders();

  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await getSingleOrder(req.params.id);

  res.json(order);
});

export const getRecentOrdersController = asyncHandler(async (req, res) => {
  const orders = await getLatestOrders();

  res.json(orders);
});
