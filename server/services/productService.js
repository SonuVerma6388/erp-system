import {
  insertProduct,
  createInventoryRecord,
  fetchProducts,
  fetchProductById,
  updateProductById,
  removeProductById,
} from "../repositories/productRepository.js";

export const createNewProduct = async (data, userId) => {
  const product = await insertProduct({
    ...data,
    created_by: userId,
  });

  // Create inventory automatically
  await createInventoryRecord(product.id);

  return product;
};

export const getAllProducts = async () => {
  return await fetchProducts();
};

export const getSingleProduct = async (id) => {
  const product = await fetchProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const editProduct = async (id, data) => {
  return await updateProductById(id, data);
};

export const deleteProductService = async (id) => {
  return await removeProductById(id);
};
