import {
  getInventoryByProductId,
  updateInventoryQuantity,
  insertStockMovement,
} from "../repositories/stockRepository.js";

export const adjustProductStock = async (productId, data, userId) => {
  const inventory = await getInventoryByProductId(productId);

  if (!inventory) {
    throw new Error("Inventory not found");
  }

  const previousStock = inventory.quantity;

  let newStock = previousStock;

  if (data.type === "PURCHASE") {
    newStock += data.quantity;
  } else if (data.type === "SALE") {
    newStock -= data.quantity;

    if (newStock < 0) {
      throw new Error("Insufficient stock");
    }
  } else {
    throw new Error("Invalid movement type");
  }

  const updatedInventory = await updateInventoryQuantity(productId, newStock);

  await insertStockMovement({
    product_id: productId,
    movement_type: data.type,
    quantity: data.quantity,
    previous_stock: previousStock,
    new_stock: newStock,
    notes: data.notes,
    created_by: userId,
  });

  return updatedInventory;
};
