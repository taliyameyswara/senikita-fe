import React from "react";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Tabs from "../../../components/Tabs";
import UserBiodata from "./UserBiodata";
import UserAlamat from "./UserAddress";

const UserProfile = ({ setProgress }) => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Profil", to: "/user/dashboard/profil" },
  ];

  const tabs = [
    {
      name: "biodata",
      label: "Data Pribadi",
      content: <UserBiodata setProgress={setProgress} />,
    },
    {
      name: "address",
      label: "Data Alamat",
      content: <UserAlamat setProgress={setProgress} />,
    },
  ];
  return (
    <UserDashboardLayout>
      <div className="flex flex-col gap-2 p-3 border rounded-xl">
        {/* Breadcrumb */}
        <div className="p-3 py-5 border rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold">Profil Anda</div>

          {/* Filter by Type */}
          <Tabs tabs={tabs} />
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default UserProfile;
