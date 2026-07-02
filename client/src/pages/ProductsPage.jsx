import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductToolbar from "../components/products/ProductToolbar";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import ProductForm from "../components/products/ProductForm";
import api from "../services/api";

const ProductsPage = () => {
  const { products, loading, fetchProducts } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="text-white">Loading Products...</div>;
  }

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };
  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(`Delete ${product.name}?`);

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/products/${product.id}`);

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1
        className="
        text-3xl
        font-bold
        text-white
        mb-8
        ">
        Products
      </h1>

      <ProductToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => setOpenModal(true)}
      />

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ProductModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
        }}>
        <ProductForm
          product={selectedProduct}
          onSuccess={() => {
            setOpenModal(false);
            setSelectedProduct(null);
            fetchProducts();
          }}
        />
      </ProductModal>
    </div>
  );
};

export default ProductsPage;
