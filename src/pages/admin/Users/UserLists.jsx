import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/admin/partials/Sidebar';
import Header from '../../../components/admin/partials/Header';
import DataTable from '../../../components/admin/components/DataTable';
import PaginationClassic from '../../../components/admin/components/PaginationClassic';
import { useAxiosInstance } from '../../../config/axiosConfig';
import UserModal from './UserModal';
import DeleteUserModal from './DeleteUserModal';
import LoadingTable from '../../../components/loading/LoadingTable';
import { toast } from 'react-toastify';

function UserLists() {
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
        setIsLoading(true);
        axiosInstance.get('admin/users', {
            params: {
                page: page,
                search: search // Tambahkan parameter pencarian
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
        document.title = 'Dashboard | Users';
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
                        {/* Page header */}
                        <div className="mb-5 sm:flex sm:justify-between sm:items-center">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-2xl font-bold md:text-3xl text-slate-800">Users </h1>
                            </div>
                            <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={handleSearchChange}
                                    className="px-4 py-2 border rounded border-slate-300"
                                />
                                <button
                                    className="text-white bg-indigo-500 btn hover:bg-indigo-600"
                                    onClick={() => openModal()}
                                >
                                    <svg className="w-4 h-4 opacity-50 fill-current shrink-0" viewBox="0 0 16 16">
                                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                    </svg>
                                    <span className="hidden ml-2 md:block">Create User</span>
                                </button>
                            </div>
                        </div>
                        {/* Table */}
                        <DataTable
                            heads={['ID', 'Name', 'Email', 'Role', 'Actions']}
                            isLoading={loading}
                            freezeTable={true}
                            name={'Users'}
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
                                        <td className="px-4 py-2 border-b border-slate-200">{dt.email}</td>
                                        <td className="px-4 py-2 border-b border-slate-200">{dt.role === 1 ? "Admin" : "User"}</td>
                                        <td className="px-4 py-2 border-b border-slate-200">
                                            <button onClick={() => openModal(dt)} className="rounded-full text-slate-400 hover:text-slate-500">
                                                <span className="sr-only">Edit</span>
                                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                    <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                                                </svg>
                                            </button>
                                            <button onClick={() => openDeleteModal(dt)} className="rounded-full text-rose-500 hover:text-rose-600">
                                                <span className="sr-only">Delete</span>
                                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                    <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                                    <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                                </svg>
                                            </button>
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
            </div>
            {/* User modal */}
            <UserModal
                isOpen={isModalOpen}
                onClose={closeModal}
                user={selectedUser}
                refreshData={refreshData}
            />
            {/* Delete User modal */}
            <DeleteUserModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                user={selectedUser}
                refreshData={refreshData}
            />
        </div>
    );
}

export default UserLists;
