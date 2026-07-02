import api from "../services/api";

const useCheckout = () => {
  const checkout = async ({ cart, customerId, paymentMethod }) => {
    const payload = {
      customer_id: customerId || null,
      payment_method: paymentMethod,

      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    const response = await api.post("/orders", payload);

    return response.data;
  };

  return {
    checkout,
  };
};

export default useCheckout;
