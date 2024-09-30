import React from "react";
import SenimanDashboardLayout from "../../../layouts/SenimanDashboardLayout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SenimanBiodata from "./SenimanBiodata";

const SenimanProfile = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Profil", to: "/user/dashboard/profil" },
  ];

  return (
    <SenimanDashboardLayout>
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        {/* Breadcrumb */}
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold mb-2">Profil Seniman</div>
          <SenimanBiodata />
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default SenimanProfile;
