import pool from "../config/db.js";

export const getInventoryByProductId = async (productId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM inventory
      WHERE product_id = $1
      `,
    [productId],
  );

  return result.rows[0];
};

export const updateInventoryQuantity = async (productId, newQuantity) => {
  const result = await pool.query(
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

export const insertStockMovement = async ({
  product_id,
  movement_type,
  quantity,
  previous_stock,
  new_stock,
  notes,
  created_by,
}) => {
  await pool.query(
    `
      INSERT INTO stock_movements
      (
        product_id,
        movement_type,
        quantity,
        previous_stock,
        new_stock,
        notes,
        created_by
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      `,
    [
      product_id,
      movement_type,
      quantity,
      previous_stock,
      new_stock,
      notes,
      created_by,
    ],
  );
};
