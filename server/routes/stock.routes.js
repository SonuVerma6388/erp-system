import express from "express";

import { adjustStock } from "../controllers/stockController.js";

import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id/adjust-stock", adjustStock);

export default router;
