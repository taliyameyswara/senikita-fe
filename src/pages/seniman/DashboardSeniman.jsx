import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import SenimanDashboardLayout from "../../layouts/SenimanDashboardLayout";

const DashboardSeniman = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/seniman/dashboard" },
  ];

  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div>Ini dashboard seniman</div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default DashboardSeniman;
