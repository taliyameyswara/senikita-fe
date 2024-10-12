import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../layouts/SenimanDashboardLayout";
import Tabs from "../../../components/Tabs";
import DropdownFilter from "../../../components/DropdownFilter";
import KesenianProduct from "./product/KesenianProduct";
import KesenianService from "./service/KesenianService";

const DaftarKesenian = ({ setProgress }) => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Daftar Kesenian", to: "/seniman/dashboard/kesenian" },
  ];

  const tabs = [
    {
      name: "produk-kesenian",
      label: "Produk Kesenian",
      content: <KesenianProduct setProgress={setProgress} />,
    },
    {
      name: "jasa-kesenian",
      label: "Jasa Kesenian",
      content: <KesenianService setProgress={setProgress} />,
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const status = ["Semua Status", "Aktif", "Nonaktif"];

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
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
