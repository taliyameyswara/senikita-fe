import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import ProductTransactionCard from "../../../components/transaction/ProductTransactionCard";
import { ProductData } from "../../../utils/ProductData";
import StatusDisplay from "../../../components/transaction/StatusDisplay";
import { formatNumber } from "../../../utils/formatNumber";

const TransactionDetail = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Dashboard", to: "/user/dashboard" },
    { label: "Daftar Transaksi", to: "/user/dashboard/transaction" },
    { label: "Detail Transaksi", to: "/user/dashboard/transaction/detail" },
  ];
  return (
    <UserDashboardLayout pageTitle="Dashboard | Detail Transaksi">
      <div className="flex flex-col gap-2 border p-3 rounded-xl">
        <div className="border p-3 py-5 rounded-xl bg-gray-50">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Content goes here */}
        <div className="flex flex-col gap-2 p-3">
          {/* Title */}
          <div className="text-xl font-semibold ">Detail Transaksi</div>

          <div className="">
            <div className="flex gap-2">
              <div className="font-semibold">Pesanan</div>
              <div className="">
                <StatusDisplay transactionStatus="diproses" />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-gray-500">
                <div className="">No. Invoice</div>
                <div className="">Tanggal Pembelian</div>
              </div>
              <div className="">
                <div className="font-nunito">INV982618638271</div>
                <div className="font-nunito">13 Agustus 2024, 09.45 WIB</div>
              </div>
            </div>
          </div>

          {/* Product Detail */}
          <div className="mt-2">
            <div className="font-semibold mb-1">Detail Produk</div>
            {ProductData.slice(0, 1).map((product, index) => (
              <ProductTransactionCard key={index} product={product} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {/* Shipping */}
            <div className="">
              <div className="font-semibold">Info Pengiriman</div>
              <div className="flex gap-8">
                <div className="text-gray-500">
                  <div className="">Kurir</div>
                  <div className="">No. Resi</div>
                  <div className="">Alamat</div>
                </div>
                <div className="">
                  <div className="">SiCepat - Reguler</div>
                  <div className="">TLJ8726438271231</div>
                  <div className="">
                    <div className="font-semibold">Nama Penerima</div>
                    <div className="">0887613472</div>
                    <div className="">
                      Jl. Imam Bonjol No.207, Pendrikan Kidul
                    </div>
                    <div className="">Kota Semarang, Jawa Tengah</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Detail */}
            <div className="mt-2">
              <div className="font-semibold">Rincian Pembayaran</div>
              <div className="flex gap-8">
                <div className="text-gray-500">
                  <div className="">Total Harga</div>
                  <div className="">Total Ongkos Kirim</div>
                  <div className="font-semibold text-primary">
                    Total Pembayaran
                  </div>
                </div>
                <div className="">
                  <div className="">{formatNumber(1500000)}</div>
                  <div className="">{formatNumber(10000)}</div>
                  <div className="font-semibold text-primary">
                    {formatNumber(1510000)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserDashboardLayout>
  );
};

export default TransactionDetail;
