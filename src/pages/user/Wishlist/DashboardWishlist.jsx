import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import UserDashboardLayout from "../../../layouts/UserDashboardLayout";
import ProductCard from "../../../components/card/ProductCard";
import { ProductData } from "../../../utils/ProductData";
import Tabs from "../../../components/Tabs";

const DashboardWishlist = () => {
    const breadcrumbItems = [
        { label: "Home", to: "/" },
        { label: "Dashboard", to: "/user/dashboard" },
        { label: "Daftar Wishlist", to: "/user/dashboard/transaction" },
    ];
    const products = ProductData;


    const ProductContent = () => (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <div key={index}>
                        <ProductCard product={product} type={"Product"} />
                    </div>
                ))}
            </div>
        </div>
    );

    const ServiceContent = () => (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <div key={index}>
                        <ProductCard product={product} type={"Service"} />
                    </div>
                ))}
            </div>
        </div>
    );

    const tabs = [
        {
            name: "produk-kesenian",
            label: "Produk Kesenian",
            content: <ProductContent />,
        },
        {
            name: "jasa-kesenian",
            label: "Jasa Kesenian",
            content: <ServiceContent />,
        },
    ];

    return (
        <UserDashboardLayout pageTitle="Dashboard | Wishlist">
            <div className="flex flex-col gap-2 p-3 border rounded-xl">
                {/* Breadcrumb */}
                <div className="p-3 py-5 border rounded-xl bg-gray-50">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 p-3">
                    {/* Title */}
                    <div className="text-xl font-semibold">Daftar Wishlist</div>

                    <Tabs tabs={tabs} />

                </div>
            </div>
        </UserDashboardLayout>
    );
};

export default DashboardWishlist;
