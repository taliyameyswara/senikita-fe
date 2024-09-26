import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../../layouts/SenimanDashboardLayout";

const SenimanOrder = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
    { label: "Pesanan", to: "/seniman/dashboard/order" },
  ];
  return (
    <SenimanDashboardLayout pageTitle="Pesanan">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div>Ini pesanan seniman</div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default SenimanOrder;
