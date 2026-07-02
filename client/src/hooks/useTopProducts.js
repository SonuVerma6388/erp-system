import { useEffect, useState } from "react";
import api from "../services/api";

const useTopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/reports/top-products");

      setProducts(res.data);
    };

    fetchData();
  }, []);

  return products;
};

export default useTopProducts;
