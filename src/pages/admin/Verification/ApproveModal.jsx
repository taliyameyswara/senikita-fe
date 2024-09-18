import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAxiosInstance } from '../../../config/axiosConfig';

const ApproveModal = ({ isOpen, onClose, verification, refreshData }) => {
    const axiosInstance = useAxiosInstance();

    useEffect(() => {
        if (verification) {
            // Jika ada data verifikasi, Anda bisa melakukan sesuatu di sini
        }
    }, [verification]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!verification) {
            toast.error("No verification data selected.");
            return;
        }

        try {
            await axiosInstance.put(`admin/shop/verification/${verification.id}`, { status: 1 })
                .then(() => {
                    toast.success('Shop verification successfully updated.');
                    handleClose();
                    refreshData();
                })
                .catch((error) => {
                    toast.error('Failed to verify shop.');
                    console.error(error);
                });
        } catch (error) {
            console.error("Error during verification:", error);
            toast.error("An error occurred while processing the verification.");
        }
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-inter">
            <div className="w-full max-w-lg max-h-full overflow-auto bg-white rounded shadow-lg">
                <div className="px-5 pt-4 pb-1">
                    <div className="text-sm">
                        <div className="text-xl font-medium text-slate-800">
                            Verifikasi Shop
                        </div>
                    </div>
                </div>
                <hr />
                <div className="px-5 py-2">
                    {/* Pesan konfirmasi */}
                    <div className="mb-4 text-slate-800">
                        Apakah Anda yakin untuk verifikasi shop{' '}
                        <strong>{verification?.name}</strong>?
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap justify-end mb-2 space-x-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-white bg-indigo-500 btn-sm hover:bg-indigo-600"
                            >
                                Verify Shop
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApproveModal;
