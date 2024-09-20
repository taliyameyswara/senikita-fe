import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import DropdownFilter from "../../../components/DropdownFilter";
import ProductTransactionCard from "../../../components/transaction/ProductTransactionCard";
import { ProductData } from "../../../utils/ProductData";
import CardHeader from "../../../components/transaction/CardHeader";
import CardButton from "../../../components/transaction/CardButton";

const DashboardTransaction = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
  ];

  const types = [...new Set(ProductData.map((product) => product.type))];

  const [selectedType, setSelectedType] = useState("");

  // Filter product data based on selected type
  const filterByType = ProductData.filter((product) => {
    return selectedType ? product.type === selectedType : true;
  });

  return (
    <UserDashboardLayout pageTitle="Dashboard | Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        {/* Breadcrumb */}
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold">Daftar Transaksi</div>

          {/* Filter by Type */}
          <div className="flex gap-2">
            <div className="">
              <DropdownFilter
                title={"Jenis Kesenian"}
                options={types}
                selectedOption={selectedType}
                setSelectedOption={setSelectedType}
                label="Semua Jenis Kesenian"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="mt-2">
            {filterByType.map((product, index) => {
              const transactionStatus = product.status || "diproses"; // Default status if undefined

              return (
                <ProductTransactionCard
                  key={index}
                  product={product}
                  header={
                    <CardHeader
                      product={product}
                      transactionStatus={transactionStatus}
                    />
                  }
                  button={
                    <CardButton
                      buttonLink={`/user/dashboard/transaction/details`}
                      buttonLabel="Lihat Detail Transaksi"
                    />
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default DashboardTransaction;
