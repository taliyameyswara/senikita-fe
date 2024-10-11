import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import Tabs from "../../../components/Tabs";
import ProductTransaction from "../transaction/product/ProductTransaction";
import ServiceTransaction from "./service/ServiceTransaction";
import { ProductData } from "../../../utils/ProductData";

const DashboardTransaction = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
  ];

  const types = [...new Set(ProductData.map((product) => product.type))];

  const [selectedType, setSelectedType] = useState("");

  const filterByType = ProductData.filter((product) => {
    return selectedType ? product.type === selectedType : true;
  });

  const tabs = [
    {
      name: "produk-kesenian",
      label: "Produk Kesenian",
      content: <ProductTransaction />,
    },
    {
      name: "jasa-kesenian",
      label: "Jasa Kesenian",
      content: <ServiceTransaction />,
    },
  ];

  return (
    <UserDashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        {/* Breadcrumb */}
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold">Daftar Transaksi</div>

          {/* Tabs untuk Produk dan Jasa */}
          <div className="flex gap-2">
            <div className="w-full">
              <Tabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardTransaction;
