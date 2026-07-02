import bcrypt from "bcrypt";

import { findUserByEmail, createUser } from "../repositories/authRepository.js";

import { generateAccessToken } from "../utils/generateTokens.js";

export const registerUser = async (data) => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  const token = generateAccessToken(user);

  return {
    user,
    token,
  };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateAccessToken(user);
  const { password: _, ...safeUser } = user;

  return {
    user: safeUser,
    token,
  };
};
