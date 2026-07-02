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
export const getOrders = async (
  page = 1,
  limit = 10,
  search = "",
  payment = "",
  status = "",
) => {
  const offset = (page - 1) * limit;

  let whereClause = "WHERE 1=1";
  const values = [];
  let index = 1;

  if (search) {
    whereClause += `
      AND (
        o.order_number ILIKE $${index}
        OR CONCAT(c.first_name,' ',c.last_name)
        ILIKE $${index}
      )
    `;
    values.push(`%${search}%`);
    index++;
  }

  if (payment) {
    whereClause += `
      AND o.payment_method = $${index}
    `;
    values.push(payment);
    index++;
  }

  if (status) {
    whereClause += `
      AND o.order_status = $${index}
    `;
    values.push(status);
    index++;
  }

  values.push(limit);
  values.push(offset);

  const ordersResult = await pool.query(
    `
    SELECT
      o.id,
      o.order_number,
      o.total_amount,
      o.payment_method,
      o.payment_status,
      o.order_status,
      o.created_at,

      CONCAT(c.first_name,' ',c.last_name)
        AS customer_name,

      CONCAT(u.first_name,' ',u.last_name)
        AS cashier_name

    FROM orders o

    LEFT JOIN customers c
      ON o.customer_id = c.id

    LEFT JOIN users u
      ON o.created_by = u.id

    ${whereClause}

    ORDER BY o.created_at DESC

    LIMIT $${index}
    OFFSET $${index + 1}
    `,
    values,
  );

  const countValues = values.slice(0, values.length - 2);

  const countResult = await pool.query(
    `
    SELECT COUNT(*)::int AS total

    FROM orders o

    LEFT JOIN customers c
      ON o.customer_id = c.id

    ${whereClause}
    `,
    countValues,
  );

  return {
    orders: ordersResult.rows.map((order) => ({
      ...order,
      total_amount: Number(order.total_amount),
    })),
    total: countResult.rows[0].total,
    page,
    limit,
    totalPages: Math.ceil(countResult.rows[0].total / limit),
  };
};

// Get Single Order
export const getOrderById = async (orderId) => {
  const orderResult = await pool.query(
    `
    SELECT
      o.*,

      CONCAT(c.first_name,' ',c.last_name)
        AS customer_name,

      CONCAT(u.first_name,' ',u.last_name)
        AS cashier_name

    FROM orders o

    LEFT JOIN customers c
      ON o.customer_id = c.id

    LEFT JOIN users u
      ON o.created_by = u.id

    WHERE o.id = $1
    `,
    [orderId],
  );

  if (orderResult.rows.length === 0) {
    return null;
  }

  const itemsResult = await pool.query(
    `
    SELECT
      oi.id,
      oi.product_id,
      p.name AS product_name,
      p.sku,
      oi.quantity,
      oi.unit_price,
      oi.tax_percent,
      oi.subtotal

    FROM order_items oi

    INNER JOIN products p
      ON oi.product_id = p.id

    WHERE oi.order_id = $1

    ORDER BY p.name
    `,
    [orderId],
  );

  return {
    ...orderResult.rows[0],
    subtotal: Number(orderResult.rows[0].subtotal),
    tax_amount: Number(orderResult.rows[0].tax_amount),
    discount_amount: Number(orderResult.rows[0].discount_amount),
    total_amount: Number(orderResult.rows[0].total_amount),

    items: itemsResult.rows.map((item) => ({
      ...item,
      unit_price: Number(item.unit_price),
      subtotal: Number(item.subtotal),
      tax_percent: Number(item.tax_percent),
    })),
  };
};

// Update Order Status
export const updateOrderStatus = async (orderId, status) => {
  const result = await pool.query(
    `
    UPDATE orders
    SET
      order_status = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING *
    `,
    [status, orderId],
  );

  return result.rows[0];
};

// Delete Order
export const deleteOrder = async (orderId) => {
  const result = await pool.query(
    `
    DELETE FROM orders
    WHERE id = $1
    RETURNING *
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
