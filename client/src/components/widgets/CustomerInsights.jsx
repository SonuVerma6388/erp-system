import GlassCard from "../ui/GlassCard";

const CustomerInsights = ({ customers = [] }) => {
  return (
    <GlassCard>
      <h2
        className="
          text-xl
          font-semibold
          text-white
          mb-5
        ">
        Top Customers
      </h2>

      <div className="space-y-4">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="
                p-3
                rounded-xl
                bg-cyan-500/5
                border
                border-cyan-500/10
              ">
            <p className="text-white">{customer.customer_name}</p>

            <p className="text-cyan-400">
              ₹{Number(customer.total_spent).toLocaleString()}
            </p>

            <p className="text-xs text-slate-400">
              Orders: {customer.total_orders}
            </p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default CustomerInsights;
