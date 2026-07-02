import GlassCard from "../ui/GlassCard";

const TopProductsWidget = ({ products = [] }) => {
  return (
    <GlassCard>
      <h2
        className="
          text-xl
          font-semibold
          text-white
          mb-5
        ">
        Top Products
      </h2>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={product.id}>
            <div className="flex justify-between">
              <span className="text-white">
                {index + 1}. {product.name}
              </span>

              <span className="text-cyan-400">{product.units_sold}</span>
            </div>

            <div
              className="
                  h-2
                  bg-slate-800
                  rounded-full
                  mt-2
                ">
              <div
                className="
                    h-full
                    bg-cyan-400
                    rounded-full
                  "
                style={{
                  width: `${Math.min(product.units_sold * 10, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default TopProductsWidget;
