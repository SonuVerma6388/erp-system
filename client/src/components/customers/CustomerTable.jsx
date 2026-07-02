import GlassCard from "../ui/GlassCard";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const CustomerTable = ({ customers, onEdit, onDelete, onViewHistory }) => {
  return (
    <GlassCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20 text-left">
              <th className="py-4">Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Loyalty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="text-white border-b border-slate-800">
                <td className="py-4 ">
                  {customer.first_name} {customer.last_name}
                </td>

                <td>{customer.phone}</td>

                <td>{customer.email}</td>

                <td>{customer.loyalty_points}</td>

                <td>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onViewHistory(customer)}
                      className="text-green-400">
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit(customer)}
                      className="text-cyan-400">
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onDelete(customer)}
                      className="text-red-400">
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

export default CustomerTable;
