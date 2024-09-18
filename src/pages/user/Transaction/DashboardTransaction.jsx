import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import DashboardLayout from "../../../layouts/DashboardLayout";

const DashboardTransaction = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
  ];

  return (
    <DashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content goes here */}
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, error
          ad minus id possimus, numquam laboriosam veniam tempora nemo
          consequatur, dolores voluptatibus incidunt dolor ratione maxime cum
          hic rerum quo?
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTransaction;
