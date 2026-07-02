import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [payment, setPayment] = useState("");

  const [status, setStatus] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get("/orders", {
        params: {
          page,
          limit: 10,
          search,
          payment,
          status,
        },
      });

      setOrders(response.data.orders);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, search, payment, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,

    page,
    totalPages,

    setPage,

    search,
    setSearch,

    payment,
    setPayment,

    status,
    setStatus,

    fetchOrders,
  };
};

export default useOrders;
