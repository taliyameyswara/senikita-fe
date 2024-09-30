import React from "react";

const ShippingInfo = ({
  courier,
  trackingNumber,
  recipientName,
  phone,
  address,
  city,
  province,
}) => {
  return (
    <div className="">
      <div className="font-semibold mb-2">Info Pengiriman</div>
      <table className="w-full">
        <tbody>
          <tr className="align-top">
            <td className="text-gray-500">Kurir</td>
            <td>{courier}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">No. Resi</td>
            <td className="font-nunito font-light">{trackingNumber}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Alamat</td>
            <td>
              <div className="font-semibold">{recipientName}</div>
              <div className="font-nunito font-light">{phone}</div>
              <div>{address}</div>
              <div>
                {city}, <span>{province}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShippingInfo;
