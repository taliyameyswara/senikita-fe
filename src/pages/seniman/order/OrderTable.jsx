import { limitText } from "../../../utils/limitText";
import { IoEyeOutline } from "react-icons/io5";

const OrderTable = ({ orders, onViewDetails }) => {
  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-32">
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl px-3 pt-1 overflow-x-auto">
      <table className="min-w-full bg-white text-sm">
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
              <td className="py-2 px-4 border-b flex items-center gap-2">
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
              <td className="py-2 px-4 border-b">{order.customer}</td>
              <td className="py-2 px-4 border-b">{order.purchaseDate}</td>
              <td className="py-2 px-4 border-b">{order.total}</td>
              <td className="py-2 px-4 border-b text-center">
                {order.paymentStatus}
              </td>
              <td className="py-2 px-4 border-b text-center">{order.items}</td>
              <td className="py-2 px-4 border-b text-center">
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
