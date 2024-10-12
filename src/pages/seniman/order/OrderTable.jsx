import EmptyState from "../../../components/EmptyState";
import { limitText } from "../../../utils/limitText";
import { IoEyeOutline } from "react-icons/io5";

const OrderTable = ({ orders, onViewDetails }) => {
  if (orders.length === 0) {
    return <EmptyState message={"Data pesanan tidak tersedia"} />;
  }

  return (
    <div className="px-3 pt-1 overflow-x-auto border rounded-xl">
      <table className="min-w-full text-sm bg-white">
        <thead>
          <tr className="">
            <th className="p-4 border-b">Pesanan</th>
            <th className="p-4 border-b">Customer</th>
            <th className="p-4 border-b">Tanggal</th>
            <th className="p-4 border-b">Total</th>
            <th className="p-4 border-b">Pembayaran</th>
            <th className="p-4 border-b">Item</th>
            <th className="p-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="flex items-center gap-2 px-4 py-2 border-b">
                <img
                  src={order.image || "https://via.placeholder.com/100"}
                  alt={
                    order.type === "service"
                      ? order.service[0].name
                      : order.products[0].name
                  }
                  className="w-10 h-10 rounded-lg"
                />
                {limitText(
                  order.type === "service"
                    ? order.service[0].name
                    : order.products[0].name,
                  20
                )}
              </td>
              <td className="px-4 py-2 border-b">{order.customer}</td>
              <td className="px-4 py-2 border-b">{order.purchaseDate}</td>
              <td className="px-4 py-2 border-b">{order.total}</td>
              <td className="px-4 py-2 text-center border-b">
                {order.paymentStatus}
              </td>
              <td className="px-4 py-2 text-center border-b">{order.items}</td>
              <td className="px-4 py-2 text-center border-b">
                <button onClick={() => onViewDetails(order)}>
                  <IoEyeOutline className="text-lg text-gray-400" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
