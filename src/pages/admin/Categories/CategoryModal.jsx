import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../../config/axiosConfig';
import { useAxiosInstance } from '../../../config/axiosConfig';
import { toast } from 'react-toastify';

const CategoryModal = ({ isOpen, onClose, category, refreshData }) => {
    const axiosInstance = useAxiosInstance();
    const [formData, setFormData] = useState({
        name: '',
    });

    useEffect(() => {
        if (category) {
            setFormData({
                name: category.name
            });
        } else {
            setFormData({
                name: ''
            });
        }
    }, [category]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (category) {
                await axiosInstance.put(`admin/category/${category.id}`, formData)
                    .then(() => {
                        toast.success('Category updated successfully');
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                    });
            } else {
                await axiosInstance.post('admin/category', formData)
                    .then(() => {
                        toast.success('Category created successfully');
                    }).catch((error) => {
                        toast.error(error.response.data.message);
                    });
            }
            handleClose();
            refreshData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleClose = () => {
        setFormData({
            name: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-inter">

            <div className="w-full max-w-lg max-h-full overflow-auto bg-white rounded shadow-lg">
                <div className="px-5 pt-4 pb-1">
                    <div className="text-sm">
                        <div className="text-xl font-medium text-slate-800">
                            {category ? 'Edit Category' : 'Create Category'}

                        </div>
                    </div>
                </div>
                <hr></hr>

                <div className="px-5 py-2">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full form-input"
                                placeholder='Enter category name'
                                required
                            />
                        </div>

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
                                {category ? 'Update' : 'Create'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
