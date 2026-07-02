import pool from "../config/db.js";

// Create Customer
export const createCustomer = async (data) => {
  const result = await pool.query(
    `
    INSERT INTO customers
    (
      first_name,
      last_name,
      phone,
      email,
      address,
      city,
      state,
      postal_code,
      gst_number
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING *
    `,
    [
      data.first_name,
      data.last_name,
      data.phone,
      data.email,
      data.address,
      data.city,
      data.state,
      data.postal_code,
      data.gst_number,
    ],
  );

  return result.rows[0];
};

// Get All Customers
export const getCustomers = async () => {
  const result = await pool.query(`
    SELECT *
    FROM customers
    ORDER BY created_at DESC
  `);

  return result.rows;
};

// Get Customer By ID
export const getCustomerById = async (id) => {
  const result = await pool.query(
    `
    SELECT *
    FROM customers
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

// Find Customer By Phone
export const getCustomerByPhone = async (phone) => {
  const result = await pool.query(
    `
      SELECT *
      FROM customers
      WHERE phone = $1
      `,
    [phone],
  );

  return result.rows[0];
};

// Get Customer Orders
export const getCustomerOrders = async (customerId) => {
  const result = await pool.query(
    `
      SELECT
        id,
        order_number,
        total_amount,
        payment_status,
        created_at
      FROM orders
      WHERE customer_id = $1
      ORDER BY created_at DESC
      `,
    [customerId],
  );

  return result.rows;
};
