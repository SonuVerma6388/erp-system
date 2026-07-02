import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
};

export const createUser = async ({
  role_id,
  first_name,
  last_name,
  email,
  password,
}) => {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      role_id,
      first_name,
      last_name,
      email,
      password
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [role_id, first_name, last_name, email, password],
  );

  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query(
    `
    SELECT
  users.*,
  roles.name AS role
FROM users
LEFT JOIN roles
ON users.role_id = roles.id
WHERE users.email = $1
    `,
    [id],
  );

  return result.rows[0];
};
