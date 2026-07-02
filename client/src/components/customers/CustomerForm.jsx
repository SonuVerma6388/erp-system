import { useState } from "react";
import api from "../../services/api";

const CustomerForm = ({ customer = null, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    phone: customer?.phone || "",
    email: customer?.email || "",
    address: customer?.address || "",
    city: customer?.city || "",
    state: customer?.state || "",
    postal_code: customer?.postal_code || "",
    gst_number: customer?.gst_number || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (customer) {
        await api.put(`/customers/${customer.id}`, formData);
      } else {
        await api.post("/customers", formData);
      }

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      ">
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
        className="input"
      />

      <input
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
        className="input"
      />

      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="input"
      />

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="input"
      />

      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        className="input"
      />

      <input
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
        className="input"
      />

      <input
        name="postal_code"
        value={formData.postal_code}
        onChange={handleChange}
        placeholder="Postal Code"
        className="input"
      />

      <input
        name="gst_number"
        value={formData.gst_number}
        onChange={handleChange}
        placeholder="GST Number"
        className="input"
      />

      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        rows="4"
        className="
          input
          md:col-span-2
        "
      />

      <button
        type="submit"
        className="
          md:col-span-2

          bg-cyan-500
          hover:bg-cyan-400

          text-black
          font-semibold

          py-3
          rounded-xl

          transition-all
        ">
        {customer ? "Update Customer" : "Create Customer"}
      </button>
    </form>
  );
};

export default CustomerForm;
