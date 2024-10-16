import React from "react";
import SenimanDashboardLayout from "../../../layouts/SenimanDashboardLayout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SenimanBiodata from "./SenimanBiodata";

const SenimanProfile = ({ setProgress }) => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Profil", to: "/user/dashboard/profil" },
  ];

  return (
    <SenimanDashboardLayout>
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        {/* Breadcrumb */}
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="mb-2 text-xl font-semibold">Profil Seniman</div>
          <SenimanBiodata setProgress={setProgress} />
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default SenimanProfile;
