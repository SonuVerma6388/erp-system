import pool from "../config/db.js";

export const insertProduct = async (product) => {
  const result = await pool.query(
    `
    INSERT INTO products
    (
      name,
      sku,
      barcode,
      description,
      category,
      brand,
      unit,
      cost_price,
      selling_price,
      tax_percent,
      created_by
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
    `,
    [
      product.name,
      product.sku,
      product.barcode,
      product.description,
      product.category,
      product.brand,
      product.unit,
      product.cost_price,
      product.selling_price,
      product.tax_percent,
      product.created_by,
    ],
  );

  return result.rows[0];
};

export const createInventoryRecord = async (productId) => {
  await pool.query(
    `
      INSERT INTO inventory
      (
        product_id,
        quantity
      )
      VALUES ($1, 0)
      `,
    [productId],
  );
};

export const fetchProducts = async () => {
  const result = await pool.query(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
    `);

  return result.rows;
};

export const fetchProductById = async (id) => {
  const result = await pool.query(
    `
      SELECT *
      FROM products
      WHERE id = $1
      `,
    [id],
  );

  return result.rows[0];
};

export const updateProductById = async (id, data) => {
  const result = await pool.query(
    `
      UPDATE products
      SET
        name = $1,
        category = $2,
        brand = $3,
        selling_price = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *
      `,
    [data.name, data.category, data.brand, data.selling_price, id],
  );

  return result.rows[0];
};

export const removeProductById = async (id) => {
  await pool.query(
    `
      DELETE FROM products
      WHERE id = $1
      `,
    [id],
  );
};
