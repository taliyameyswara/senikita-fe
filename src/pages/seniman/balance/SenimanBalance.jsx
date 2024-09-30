import React from "react";

const SenimanBalance = () => {
  return (
    <SenimanDashboardLayout pageTitle="Dashboard Seniman | Daftar Kesenian">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          {/* Title */}
          <div className="text-xl font-semibold">Saldo</div>
        </div>
      </div>
    </SenimanDashboardLayout>
  );
};

export default SenimanBalance;
