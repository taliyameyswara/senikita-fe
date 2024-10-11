import { limitText } from "../../../../utils/limitText";
import { IoEyeOutline } from "react-icons/io5";
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta', hour12: false };
  const date = new Date(dateString);

  return date.toLocaleString('id-ID', options).replace(',', ' WIB');
};

const ProductOrderTable = ({ orders, onViewDetails }) => {
  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
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
                  src={order.product[0].thumbnail || "https://via.placeholder.com/100"}
                  alt={
                    order.product[0].thumbnail
                  }
                  className="w-10 h-10 rounded-lg"
                />
                {limitText(
                  order.product[0].name,
                  20
                )}
              </td>
              <td className="px-4 py-2 border-b">{order.address.name}</td>
              <td className="px-4 py-2 border-b">{formatDate(order.created_at)}</td>
              <td className="px-4 py-2 border-b">{order.total_price}</td>
              <td className="px-4 py-2 text-center border-b">
                {order.status === "pending" ? "Belum Dibayar" : "Lunas"}
              </td>
              <td className="px-4 py-2 text-center border-b">{order.product[0].pivot.qty}</td>
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

export default ProductOrderTable;
