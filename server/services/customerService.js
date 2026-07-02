import {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
  getCustomerOrders,
} from "../repositories/customerRepository.js";

export const createNewCustomer = async (data) => {
  const existing = await getCustomerByPhone(data.phone);

  if (existing) {
    throw new Error("Customer already exists");
  }

  return await createCustomer(data);
};

export const getAllCustomers = async () => {
  return await getCustomers();
};

export const getSingleCustomer = async (id) => {
  const customer = await getCustomerById(id);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export const getCustomerPurchaseHistory = async (customerId) => {
  return await getCustomerOrders(customerId);
};
