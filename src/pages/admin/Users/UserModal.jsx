import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAxiosInstance } from '../../../config/axiosConfig';
import '../../../css/additional-styles/dashboard.css'


const UserModal = ({ isOpen, onClose, user, refreshData }) => {
    const axiosInstance = useAxiosInstance();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                password: ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user) {
                await axiosInstance.put(`admin/users/${user.id}`, formData)
                    .then(() => {
                        toast.success('User updated successfully');
                    })
                    .catch((error) => {
                        toast.error(error.response.data.message);
                    });
            } else {
                await axiosInstance.post('admin/users', formData)
                    .then(() => {
                        toast.success('User created successfully');
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
            name: '',
            email: '',
            password: ''
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
                            {user ? 'Edit User' : 'Create User'}

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
                                placeholder='Enter your name'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full form-input"
                                placeholder='Enter your email'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full form-input"
                                required={!user}
                                placeholder={user ? 'Leave blank to keep the same' : 'Enter your password'}
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
                                {user ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
