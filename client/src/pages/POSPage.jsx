import { useState } from "react";
import ProductSearch from "../components/pos/ProductSearch";
import ProductGrid from "../components/pos/ProductGrid";
import CartPanel from "../components/pos/CartPanel";
import usePOSProducts from "../hooks/usePOSProducts";
import usePOS from "../hooks/usePOS";
import useCheckout from "../hooks/useCheckout";
import ReceiptModal from "../components/pos/ReceiptModal";

const POSPage = () => {
  const { products } = usePOSProducts();
  const { checkout } = useCheckout();
  const [search, setSearch] = useState("");
  const [receipt, setReceipt] = useState(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase()),
  );

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = usePOS();

  const handleCheckout = async (customerId, paymentMethod) => {
    try {
      const order = await checkout({
        cart,
        customerId,
        paymentMethod,
      });

      setReceipt(order);

      clearCart();
    } catch (error) {
      console.error(error);
      alert("Failed to create order");
    }
  };

  return (
    <>
      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
      ">
        <div className="xl:col-span-2">
          <ProductSearch search={search} setSearch={setSearch} />

          <div className="mt-6">
            <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
          </div>
        </div>

        <div>
          <CartPanel
            cart={cart}
            subtotal={subtotal}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
      {receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
      )}
    </>
  );
};

export default POSPage;
