import { registerUser, loginUser } from "../services/authService.js";

import { findUserById } from "../repositories/authRepository.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.json(result);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
