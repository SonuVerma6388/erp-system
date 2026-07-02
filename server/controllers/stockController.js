import { adjustProductStock } from "../services/stockService.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const adjustStock = asyncHandler(async (req, res) => {
  const result = await adjustProductStock(req.params.id, req.body, req.user.id);

  res.json(result);
});
