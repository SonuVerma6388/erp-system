import { useEffect, useState } from "react";
import api from "../services/api";

const useLowStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/reports/low-stock");

        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return products;
};

export default useLowStock;
