import GlassCard from "../ui/GlassCard";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <GlassCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-cyan-500/20">
              <th className="py-4">Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="text-white border-b border-slate-800">
                <td className="py-4">{product.name}</td>

                <td>{product.sku}</td>

                <td>₹{Number(product.selling_price).toLocaleString()}</td>

                <td>{product.category}</td>

                <td>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="
                        text-cyan-400
                        hover:text-cyan-300
                      ">
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="
                        text-red-400
                        hover:text-red-300
                      ">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};

export default ProductTable;
