import useOrders from "../hooks/useOrders";
import OrdersTable from "../components/orders/OrdersTable";
import useOrderDetails from "../hooks/useOrderDetails";
import OrderDetailsModal from "../components/orders/OrderDetailsModal";

const OrdersPage = () => {
  const {
    order,
    loading: orderLoading,
    fetchOrder,
    clearOrder,
  } = useOrderDetails();

  const {
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
  } = useOrders();

  if (loading) {
    return <div className="text-white text-xl">{orderLoading}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders</h1>

          <p className="text-slate-400 mt-1">Manage all sales orders</p>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="
          bg-slate-900/50
          backdrop-blur-xl
          border
          border-cyan-500/20
          rounded-2xl
          p-6
        ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search Order / Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              bg-slate-800
              border
              border-cyan-500/20
              rounded-xl
              px-4
              py-3
              text-white
            "
          />

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="
              bg-slate-800
              border
              border-cyan-500/20
              rounded-xl
              px-4
              py-3
              text-white
            ">
            <option value="">All Payments</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
            <option value="credit">Credit</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              bg-slate-800
              border
              border-cyan-500/20
              rounded-xl
              px-4
              py-3
              text-white
            ">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Placeholder for Table */}
      <OrdersTable orders={orders} onView={fetchOrder} />

      {/* Pagination */}
      <div className="flex justify-end gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            px-4
            py-2
            rounded-xl
            bg-slate-800
            text-white
            disabled:opacity-50
          ">
          Previous
        </button>

        <span className="text-white self-center">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
            px-4
            py-2
            rounded-xl
            bg-cyan-500
            text-black
            disabled:opacity-50
          ">
          Next
        </button>
      </div>
      {order && (
        <OrderDetailsModal
          order={order}
          onClose={clearOrder}
          onPrint={() => window.print()}
        />
      )}
    </div>
  );
};

export default OrdersPage;
