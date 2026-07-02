import { useEffect, useState } from "react";
import api from "../../services/api";

const CustomerSelector = ({ customerId, setCustomerId }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <label
        className="
          block
          text-sm
          text-slate-400
          mb-2
        ">
        Customer
      </label>

      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        className="
          w-full
          bg-slate-900
          border
          border-cyan-500/20
          rounded-xl
          px-4
          py-3
          text-white
        ">
        <option value="">Walk-in Customer</option>

        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.first_name} {customer.last_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerSelector;
