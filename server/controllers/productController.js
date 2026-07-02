import {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  editProduct,
  deleteProductService,
} from "../services/productService.js";

import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  const product = await createNewProduct(req.body, req.user.id);

  res.status(201).json(product);
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await getAllProducts();

  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await getSingleProduct(req.params.id);

  res.json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await editProduct(req.params.id, req.body);

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await deleteProductService(req.params.id);

  res.json({
    message: "Product deleted successfully",
  });
});
