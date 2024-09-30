import React from "react";

const OrderNotes = ({ notes = "Tidak ada catatan khusus" }) => {
  return (
    <div className="mb-2">
      <div className="font-semibold mb-1">Catatan</div>
      <div className="text-gray-500">{notes}</div>
    </div>
  );
};

export default OrderNotes;
