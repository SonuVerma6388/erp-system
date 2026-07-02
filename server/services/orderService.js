import crypto from "crypto";

import { withTransaction } from "../config/db.js";

import {
  createOrder,
  createOrderItem,
  getProductById,
  getInventoryForUpdate,
  updateInventory,
  createStockMovement,
  getOrders,
  getOrderById,
  getRecentOrders,
  updateOrderStatus,
  deleteOrder,
} from "../repositories/orderRepository.js";

// Generate Order Number
const generateOrderNumber = () => {
  return "ORD-" + Date.now() + "-" + crypto.randomBytes(3).toString("hex");
};

// Create Order
export const createNewOrder = async (data, userId) => {
  return await withTransaction(async (client) => {
    // Validate items
    if (!data.items || data.items.length === 0) {
      throw new Error("Order must contain at least one item");
    }

    let subtotal = 0;
    let taxAmount = 0;

    const discountAmount = Number(data.discount_amount || 0);
    const paymentStatus = data.payment_method === "credit" ? "pending" : "paid";

    const orderItems = [];

    // Validate products and calculate totals
    for (const item of data.items) {
      if (!item.quantity || item.quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
      }

      const product = await getProductById(client, item.product_id);

      if (!product) {
        throw new Error(`Product not found: ${item.product_id}`);
      }

      const inventory = await getInventoryForUpdate(client, item.product_id);

      if (!inventory) {
        throw new Error(`Inventory not found for ${product.name}`);
      }

      if (inventory.quantity < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemSubtotal = Number(product.selling_price) * item.quantity;

      const itemTax = (itemSubtotal * Number(product.tax_percent || 0)) / 100;

      subtotal += itemSubtotal;
      taxAmount += itemTax;

      orderItems.push({
        product,
        inventory,
        quantity: item.quantity,
        subtotal: itemSubtotal,
        tax: itemTax,
      });
    }

    const totalAmount = subtotal + taxAmount - discountAmount;

    // Create Order
    const order = await createOrder(client, {
      orderNumber: generateOrderNumber(),
      customerId: data.customer_id || null,
      createdBy: userId,
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      paymentMethod: data.payment_method,
      paymentStatus,
    });

    // Process Order Items
    for (const item of orderItems) {
      await createOrderItem(client, {
        orderId: order.id,
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.selling_price,
        taxPercent: item.product.tax_percent,
        subtotal: item.subtotal,
      });

      const previousStock = item.inventory.quantity;

      const newStock = previousStock - item.quantity;

      await updateInventory(client, item.product.id, newStock);

      await createStockMovement(client, {
        productId: item.product.id,
        quantity: item.quantity,
        previousStock,
        newStock,
        userId,
        orderId: order.id,
      });
    }

    return {
      order: {
        id: order.id,
        order_number: order.order_number,
        total_amount: Number(order.total_amount),
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        order_status: order.order_status,
        created_at: order.created_at,
      },

      summary: {
        subtotal,
        tax_amount: taxAmount,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        total_items: orderItems.length,
      },

      items: orderItems.map((item) => ({
        product_id: item.product.id,
        product_name: item.product.name,
        sku: item.product.sku,
        quantity: item.quantity,
        unit_price: Number(item.product.selling_price),
        subtotal: item.subtotal,
        tax: item.tax,
      })),
    };
  });
};

// Get All Orders
export const getAllOrders = async (page, limit, search, payment, status) => {
  return await getOrders(page, limit, search, payment, status);
};

// Get Single Order
export const getSingleOrder = async (id) => {
  const order = await getOrderById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

export const getLatestOrders = async () => {
  return await getRecentOrders();
};

// Update Status
export const changeOrderStatus = async (id, status) => {
  const order = await updateOrderStatus(id, status);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

// Delete Order
export const removeOrder = async (id) => {
  const order = await deleteOrder(id);

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};
