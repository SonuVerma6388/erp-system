import { useEffect, useState } from "react";
import api from "../services/api";

const useCustomerInsights = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/reports/customers");

      setCustomers(res.data);
    };

    fetchData();
  }, []);

  return customers;
};

export default useCustomerInsights;
