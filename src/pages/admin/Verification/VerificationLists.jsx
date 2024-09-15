import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/admin/partials/Sidebar';
import Header from '../../../components/admin/partials/Header';
import { useAxiosInstance } from '../../../config/axiosConfig';

function VerificationLists() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState(''); // State untuk menyimpan input pencarian
    const axiosInstance = useAxiosInstance();


    const openModal = (user = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setIsDeleteModalOpen(false);
    };

    const refreshData = (page = 1) => {
        // setIsLoading(true);
        // axiosInstance.get('admin/users', {
        //     params: {
        //         page: page,
        //         search: search // Tambahkan parameter pencarian
        //     }
        // })
        //     .then(response => {
        //         const result = response.data;
        //         if (result.status === 'success') {
        //             setData(result.data.data);
        //             setCurrentPage(result.data.current_page);
        //             setTotalPages(result.data.last_page);
        //         } else {
        //             toast.error(result);
        //         }
        //     })
        //     .catch(error => {
        //         toast.error(error.message);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    };

    useEffect(() => {
        document.title = 'Dashboard | Verification';
        // refreshData(currentPage);
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
                        {/* Page header */}
                        <div className="mb-5 sm:flex sm:justify-between sm:items-center">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl font-bold md:text-3xl text-slate-800">Verification Shop 🛍️</h1>
                            </div>

                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default VerificationLists;
