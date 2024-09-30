import { useState } from "react";
import CustomerAddress from "../../../components/orders/CustomerAddress";
import { IoAddOutline } from "react-icons/io5";

const UserAddress = () => {
  const [address, setAddress] = useState({
    label: "Rumah",
    name: "Mimoi",
    phone: "08123456789",
    street: "Jl. Kebon Jeruk No 7 Blok F",
    city: "Bandung",
    province: "Jawa Barat",
    note: "Rumah warna hijau pager oren",
  });
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Daftar Alamat</h1>
        <div className="flex gap-2">
          <div className="flex gap-2 items-center bg-primary text-white px-4 py-2 rounded-xl">
            <div className="">
              <IoAddOutline />
            </div>
            <div className="">
              <div className="">Tambah Alamat</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <CustomerAddress address={address} isOrder={false} />
      </div>
    </div>
  );
};

export default UserAddress;
