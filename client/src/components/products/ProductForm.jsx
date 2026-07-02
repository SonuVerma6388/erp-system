import { useState } from "react";
import api from "../../services/api";

const ProductForm = ({ product = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    sku: product?.sku || "",
    category: product?.category || "",
    brand: product?.brand || "",
    cost_price: product?.cost_price || "",
    selling_price: product?.selling_price || "",
    tax_percent: product?.tax_percent || 18,
    unit: product?.unit || "pcs",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product) {
        await api.put(`/products/${product.id}`, formData);
      } else {
        await api.post("/products", formData);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-4
      ">
      <input
        name="name"
        value={formData.name}
        placeholder="Product Name"
        onChange={handleChange}
        className="input"
      />

      <input
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
        className="input"
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="input"
      />

      <input
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        className="input"
      />

      <input
        name="cost_price"
        placeholder="Cost Price"
        value={formData.cost_price}
        onChange={handleChange}
        className="input"
      />

      <input
        name="selling_price"
        placeholder="Selling Price"
        value={formData.selling_price}
        onChange={handleChange}
        className="input"
      />

      <button
        type="submit"
        className="
        mt-4

        bg-cyan-500
        text-black

        font-semibold

        rounded-xl

        py-3
        ">
        {product ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
