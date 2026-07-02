import { useState } from "react";
import api from "../services/api";

const useOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async (id) => {
    try {
      setLoading(true);

      const response = await api.get(`/orders/${id}`);

      setOrder(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearOrder = () => {
    setOrder(null);
  };

  return {
    order,
    loading,
    fetchOrder,
    clearOrder,
  };
};

export default useOrderDetails;
