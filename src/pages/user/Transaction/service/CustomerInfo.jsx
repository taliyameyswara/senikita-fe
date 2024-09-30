import React from "react";

const CustomerInfo = ({ name, phoneNumber, address, city, province }) => {
  return (
    <div className="">
      <div className="font-semibold mb-1">Info Penanggung Jawab</div>
      <table className="w-full">
        <tbody>
          <tr className="align-top">
            <td className="text-gray-500">Nama</td>
            <td>{name}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Telepon</td>
            <td className="font-nunito font-light">{phoneNumber}</td>
          </tr>
          <tr className="align-top">
            <td className="text-gray-500">Alamat</td>
            <td>
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

export default CustomerInfo;
