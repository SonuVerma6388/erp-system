import { useEffect, useState } from "react";

import api from "../services/api";

const useInventoryReport = () => {
  const [inventory, setInventory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get("/reports/inventory");

        setInventory(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return {
    inventory,
    loading,
  };
};

export default useInventoryReport;
