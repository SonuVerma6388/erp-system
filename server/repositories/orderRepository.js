import pool from "../config/db.js";

// Create Order
export const createOrder = async (
  client,
  {
    orderNumber,
    customerId,
    createdBy,
    subtotal,
    taxAmount,
    discountAmount,
    totalAmount,
    paymentMethod,
    paymentStatus,
  },
) => {
  const result = await client.query(
    `
    INSERT INTO orders
    (
      order_number,
      customer_id,
      created_by,
      subtotal,
      tax_amount,
      discount_amount,
      total_amount,
      payment_method,
      payment_status
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *
    `,
    [
      orderNumber,
      customerId,
      createdBy,
      subtotal,
      taxAmount,
      discountAmount,
      totalAmount,
      paymentMethod,
      paymentStatus,
    ],
  );

  return result.rows[0];
};

// Create Order Item
export const createOrderItem = async (
  client,
  { orderId, productId, quantity, unitPrice, taxPercent, subtotal },
) => {
  const result = await client.query(
    `
    INSERT INTO order_items
    (
      order_id,
      product_id,
      quantity,
      unit_price,
      tax_percent,
      subtotal
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [orderId, productId, quantity, unitPrice, taxPercent, subtotal],
  );

  return result.rows[0];
};

// Get Product
export const getProductById = async (client, productId) => {
  const result = await client.query(
    `
    SELECT *
    FROM products
    WHERE id = $1
    `,
    [productId],
  );

  return result.rows[0];
};

// Lock Inventory Row
export const getInventoryForUpdate = async (client, productId) => {
  const result = await client.query(
    `
      SELECT *
      FROM inventory
      WHERE product_id = $1
      FOR UPDATE
      `,
    [productId],
  );

  return result.rows[0];
};

// Update Inventory
export const updateInventory = async (client, productId, newQuantity) => {
  const result = await client.query(
    `
    UPDATE inventory
    SET
      quantity = $1,
      updated_at = NOW()
    WHERE product_id = $2
    RETURNING *
    `,
    [newQuantity, productId],
  );

  return result.rows[0];
};

// Create Stock Movement
export const createStockMovement = async (
  client,
  { productId, quantity, previousStock, newStock, userId, orderId },
) => {
  await client.query(
    `
      INSERT INTO stock_movements
      (
        product_id,
        reference_order_id,
        movement_type,
        quantity,
        previous_stock,
        new_stock,
        created_by
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      `,
    [productId, orderId, "SALE", quantity, previousStock, newStock, userId],
  );
};

// Get All Orders
export const getOrders = async () => {
  const result = await pool.query(`
    SELECT
      o.id,
      o.order_number,
      o.total_amount,
      o.payment_method,
      o.payment_status,
      o.order_status,
      o.created_at,

      CONCAT(
        c.first_name,
        ' ',
        c.last_name
      ) AS customer_name,

      CONCAT(
        u.first_name,
        ' ',
        u.last_name
      ) AS cashier_name

    FROM orders o

    LEFT JOIN customers c
      ON o.customer_id = c.id

    LEFT JOIN users u
      ON o.created_by = u.id

    ORDER BY o.created_at DESC
  `);

  return result.rows;
};

// Get Single Order
export const getOrderById = async (orderId) => {
  const result = await pool.query(
    `
    SELECT
      o.*,

      CONCAT(
        c.first_name,
        ' ',
        c.last_name
      ) AS customer_name,

      CONCAT(
        u.first_name,
        ' ',
        u.last_name
      ) AS cashier_name

    FROM orders o

    LEFT JOIN customers c
      ON o.customer_id = c.id

    LEFT JOIN users u
      ON o.created_by = u.id

    WHERE o.id = $1
    `,
    [orderId],
  );

  return result.rows[0];
};

export const getRecentOrders = async () => {
  const result = await pool.query(`
    SELECT
      id,
      order_number,
      total_amount,
      payment_status,
      created_at
    FROM orders
    ORDER BY created_at DESC
    LIMIT 5
  `);

  return result.rows;
};
