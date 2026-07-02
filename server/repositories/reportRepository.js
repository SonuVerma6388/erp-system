import pool from "../config/db.js";

// Dashboard Stats
export const getDashboardStats = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM products) AS total_products,

      (SELECT COUNT(*) FROM customers) AS total_customers,

      (SELECT COUNT(*) FROM orders) AS total_orders,

      (
        SELECT COALESCE(
          SUM(total_amount),
          0
        )
        FROM orders
        WHERE payment_status = 'paid'
      ) AS total_sales,

      (
        SELECT COUNT(*)
        FROM inventory
        WHERE quantity <= reorder_level
      ) AS low_stock_products
  `);

  return result.rows[0];
};

export const getSalesReport = async () => {
  const result = await pool.query(`
        SELECT
  TO_CHAR(
    created_at,
    'YYYY-MM-DD'
  ) AS sale_date,
  COUNT(*) AS orders,
  SUM(total_amount) AS sales
FROM orders
WHERE payment_status = 'paid'
GROUP BY
  TO_CHAR(created_at, 'YYYY-MM-DD')
ORDER BY sale_date DESC;
      `);

  return result.rows;
};

export const getInventoryReport = async () => {
  const result = await pool.query(`
        SELECT
          p.name,
          p.sku,
          i.quantity,
          i.reorder_level,
          p.cost_price,
          (
            i.quantity *
            p.cost_price
          ) AS inventory_value
        FROM inventory i
        JOIN products p
          ON i.product_id = p.id
        ORDER BY p.name
      `);

  return result.rows;
};

export const getTopCustomers = async () => {
  const result = await pool.query(`
    SELECT
      c.id,
      CONCAT(
        c.first_name,
        ' ',
        c.last_name
      ) AS customer_name,
      COUNT(o.id) AS total_orders,
      COALESCE(
        SUM(o.total_amount),
        0
      ) AS total_spent
    FROM customers c
    LEFT JOIN orders o
      ON c.id = o.customer_id
    GROUP BY
      c.id,
      c.first_name,
      c.last_name
    ORDER BY total_spent DESC
    LIMIT 10
  `);

  return result.rows;
};

export const getTopProducts = async () => {
  const result = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.sku,

      SUM(oi.quantity)
        AS units_sold,

      SUM(oi.subtotal)
        AS revenue

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    GROUP BY
      p.id,
      p.name,
      p.sku

    ORDER BY
      units_sold DESC

    LIMIT 10
  `);

  return result.rows;
};

export const getLowStockProducts = async () => {
  const result = await pool.query(`
    SELECT
      p.id,
      p.name,
      p.sku,
      i.quantity,
      i.reorder_level
    FROM inventory i
    JOIN products p
      ON i.product_id = p.id
    WHERE i.quantity <= i.reorder_level
    ORDER BY i.quantity ASC
  `);

  return result.rows;
};
