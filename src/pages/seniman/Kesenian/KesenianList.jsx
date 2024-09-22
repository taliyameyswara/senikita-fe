import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../layouts/SenimanDashboardLayout";
import Tabs from "../../../components/Tabs";
import DropdownFilter from "../../../components/DropdownFilter";
import KesenianProduct from "../../../components/kesenian/KesenianProduct";
import KesenianService from "../../../components/kesenian/KesenianService";

const DaftarKesenian = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
  ];

  const tabs = [
    {
      name: "produk-kesenian",
      label: "Produk Kesenian",
      content: <KesenianProduct />,
    },
    {
      name: "jasa-kesenian",
      label: "Jasa Kesenian",
      content: <KesenianService />,
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const status = ["Semua Status", "Aktif", "Nonaktif"];

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          {/* Title */}
          <div className="text-xl font-semibold">Daftar Kesenian</div>
          <DropdownFilter
            title={"Status"}
            options={status}
            selectedOption={selectedStatus}
            setSelectedOption={setSelectedStatus}
            label="Semua Status"
          />

          <Tabs tabs={tabs} />
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default DaftarKesenian;
