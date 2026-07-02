import GlassCard from "../ui/GlassCard";

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-4
      ">
      {products.map((product) => (
        <GlassCard key={product.id}>
          <h3
            className="
              text-white
              font-semibold
            ">
            {product.name}
          </h3>

          <p className="text-slate-400">{product.sku}</p>

          <p
            className="
              mt-2
              text-cyan-400
              font-bold
            ">
            ₹{Number(product.selling_price).toLocaleString()}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="
    mt-4
    w-full
    bg-cyan-500
    text-black
    font-semibold
    rounded-xl
    py-2
  ">
            Add To Cart
          </button>
        </GlassCard>
      ))}
    </div>
  );
};

export default ProductGrid;
