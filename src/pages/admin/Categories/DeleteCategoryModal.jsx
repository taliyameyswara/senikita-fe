import React from 'react';
import { useAxiosInstance } from '../../../config/axiosConfig';
import { toast } from 'react-toastify';
import '../../../css/additional-styles/dashboard.css'


function DeleteCategoryModal({ isOpen, onClose, category, refreshData }) {
    const axiosInstance = useAxiosInstance();
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`admin/category/${category.id}`);
            toast.success('Category deleted successfully');
            refreshData();  // Refresh the list after deleting
            onClose();  // Close the modal

        } catch (error) {
            console.error("Error deleting category:", error);
            alert('Failed to delete the category');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-semibold">Delete Category</h2>
                <p className="mb-4">Are you sure you want to delete category <strong>{category.name}</strong>?</p>
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

export default DeleteCategoryModal;
