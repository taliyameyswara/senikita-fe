import React from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import UserDashboardLayout from "../../layouts/UserDashboardLayout";

const DashboardUser = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
  ];

  return (
    <UserDashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div>Ini dashboard user</div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardUser;
