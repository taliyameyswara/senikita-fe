import EmptyState from "../../../../components/EmptyState";
import { limitText } from "../../../../utils/limitText";
import { IoEyeOutline } from "react-icons/io5";
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    hour12: false,
  };
  const date = new Date(dateString);

  return date.toLocaleString("id-ID", options).replace(",", " WIB");
};

const ServiceOrderTable = ({ orders, onViewDetails }) => {
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
                  src={
                    order.service.thumbnail || "https://via.placeholder.com/100"
                  }
                  alt={order.service.thumbnail}
                  className="w-10 h-10 rounded-lg"
                />
                {limitText(order.service.name, 20)}
              </td>
              <td className="px-4 py-2 border-b">{order.name}</td>
              <td className="px-4 py-2 border-b">
                {formatDate(order.created_at)}
              </td>
              <td className="px-4 py-2 border-b">{order.price}</td>
              <td className="px-4 py-2 text-center border-b">
                {order.status === "pending" ? "Belum Dibayar" : "Lunas"}
              </td>
              <td className="px-4 py-2 text-center border-b">{order.qty}</td>
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

export default ServiceOrderTable;
