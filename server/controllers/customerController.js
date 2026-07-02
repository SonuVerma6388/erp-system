import {
  createNewCustomer,
  getAllCustomers,
  getSingleCustomer,
  getCustomerPurchaseHistory,
} from "../services/customerService.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const createCustomer = asyncHandler(async (req, res) => {
  const customer = await createNewCustomer(req.body);

  res.status(201).json(customer);
});

export const getCustomers = asyncHandler(async (req, res) => {
  const customers = await getAllCustomers();

  res.json(customers);
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await getSingleCustomer(req.params.id);

  res.json(customer);
});

export const getCustomerOrders = asyncHandler(async (req, res) => {
  const orders = await getCustomerPurchaseHistory(req.params.id);

  res.json(orders);
});
