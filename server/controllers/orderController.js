import {
  createNewOrder,
  getAllOrders,
  getSingleOrder,
  getLatestOrders,
  changeOrderStatus,
  removeOrder,
} from "../services/orderService.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const createOrder = asyncHandler(async (req, res) => {
  const order = await createNewOrder(req.body, req.user.id);

  res.status(201).json(order);
});

export const getOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const search = req.query.search || "";
  const payment = req.query.payment || "";
  const status = req.query.status || "";

  const orders = await getAllOrders(page, limit, search, payment, status);

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

export const updateOrderStatusController = asyncHandler(async (req, res) => {
  const order = await changeOrderStatus(req.params.id, req.body.status);

  res.json(order);
});

export const deleteOrderController = asyncHandler(async (req, res) => {
  await removeOrder(req.params.id);

  res.json({
    message: "Order deleted successfully",
  });
});
