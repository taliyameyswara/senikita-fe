import React from 'react';
import { useAxiosInstance } from '../../../config/axiosConfig';
import { toast } from 'react-toastify';
import '../../../css/additional-styles/dashboard.css'

function DeleteUserModal({ isOpen, onClose, user, refreshData }) {
    const axiosInstance = useAxiosInstance();
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`admin/users/${user.id}`);
            toast.success('User deleted successfully');
            refreshData();
            onClose();
        } catch (error) {
            // console.error("Error deleting user:", error);
            // alert('Failed to delete the user');
            toast.error(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Delete User</h2>
                <p className="mb-4">Are you sure you want to delete user <strong>{user.name}</strong>?</p>
                <div className="flex justify-end">
                    <button
                        className="mr-2 text-white bg-rose-500 hover:bg-rose-600 btn-sm"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        className="text-gray-600 hover:text-gray-800 btn-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteUserModal;
