import { useState } from "react";

import useCustomers from "../hooks/useCustomers";

import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";

const CustomersPage = () => {
  const { customers, loading } = useCustomers();

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((c) =>
    `${c.first_name} ${c.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  if (loading) {
    return <div className="text-white">Loading Customers...</div>;
  }

  return (
    <div>
      <h1
        className="
        text-3xl
        font-bold
        text-white
        mb-8
        ">
        Customers
      </h1>

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        onAdd={() => console.log("Open Modal")}
      />

      <CustomerTable customers={filteredCustomers} />
    </div>
  );
};

export default CustomersPage;
