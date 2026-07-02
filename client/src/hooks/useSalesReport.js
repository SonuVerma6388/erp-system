import { useEffect, useState } from "react";
import api from "../services/api";

const useSalesReport = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get("/reports/sales");

        setSales(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return {
    sales,
    loading,
  };
};

export default useSalesReport;
