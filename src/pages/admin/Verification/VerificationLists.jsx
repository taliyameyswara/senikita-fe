import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/admin/partials/Sidebar';
import Header from '../../../components/admin/partials/Header';
import { useAxiosInstance } from '../../../config/axiosConfig';
import DataTable from '../../../components/admin/components/DataTable';
import LoadingTable from '../../../components/loading/LoadingTable';
import PaginationClassic from '../../../components/admin/components/PaginationClassic';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import ApproveModal from './ApproveModal';
import Breadcrumbs from "../../../components/Breadcrumbs";

function VerificationLists() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedData, setselectedData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(''); // State untuk menyimpan input pencarian
    const axiosInstance = useAxiosInstance();

    const breadcrumbItems = [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Verification Shop", to: "/dashboard/verification-shop" },
        { label: "Management Verification Shop", to: "/dashboard/verification-shop" },
    ];
    const openModal = (verification = null) => {
        setselectedData(verification);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setselectedData(null);
        setIsModalOpen(false);
    };


    const refreshData = (page = 1) => {
        setIsLoading(true);
        axiosInstance.get('admin/shop', {
            params: {
                page: page,
                search: search
            }
        })
            .then(response => {
                const result = response.data;
                if (result.status === 'success') {
                    setData(result.data.data);
                    setCurrentPage(result.data.current_page);
                    setTotalPages(result.data.last_page);
                } else {
                    toast.error(result);
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        document.title = 'Dashboard | Verification';
        refreshData(currentPage);
    }, [currentPage, search]); // Tambahkan search ke dalam dependensi

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className="flex h-screen overflow-hidden font-inter">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-grey-custom">
                {/* Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">
                        <Breadcrumbs items={breadcrumbItems} />

                        {/* Page header */}
                        <div className="mt-4 mb-5 sm:flex sm:justify-between sm:items-center">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl font-bold md:text-3xl text-slate-800">Verification Shop</h1>
                            </div>
                            <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={handleSearchChange}
                                    className="px-4 py-2 border rounded border-slate-300"
                                />

                            </div>
                        </div>
                        {/* Table */}
                        <DataTable
                            heads={['ID', 'Name', 'Deskripsi', 'Alamat', 'Status', 'Actions']}
                            isLoading={loading}
                            freezeTable={true}
                            name={'verifications'}
                        >
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-40 text-center">
                                        <LoadingTable />
                                    </td>
                                </tr>
                            ) : (
                                data.map(dt => (
                                    <tr key={dt.id}>
                                        <td className="px-4 py-2 border-b border-slate-200">{dt.id}</td>
                                        <td className="px-4 py-2 border-b border-slate-200">{dt.name}</td>
                                        <td className="px-4 py-2 border-b border-slate-200">{dt.desc}</td>
                                        <td className="px-4 py-2 border-b border-slate-200">{dt.address}</td>
                                        <td className={`px-4 py-2 border-b border-slate-200 ${dt.status === 1 ? "text-green-500" : "text-red-500"}`}>
                                            {dt.status === 1 ? "Verifikasi" : "Belum"}
                                        </td>
                                        <td className="px-4 py-2 border-b border-slate-200">
                                            {dt.status === 0
                                                ? <button onClick={() => openModal(dt)} className="rounded-full text-slate-400 hover:text-slate-500">
                                                    <span className="sr-only">Edit</span>
                                                    <IoIosCheckmarkCircleOutline className="w-8 h-8 fill-current hover:text-green-500" />
                                                </button>
                                                : "-"
                                            }


                                        </td>
                                    </tr>
                                ))
                            )}
                        </DataTable>
                        <div className="mt-8">
                            {/* Pagination */}
                            <PaginationClassic
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </main>
            </div >
            <ApproveModal
                isOpen={isModalOpen}
                onClose={closeModal}
                verification={selectedData}
                refreshData={refreshData}
            />
        </div >
    );
}

export default VerificationLists;
