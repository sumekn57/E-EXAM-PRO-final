import React, { useState } from 'react';
import Footer from '../comps/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../comps/Navbar';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: '',
        oldPassword: '',
        newPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/users/change-password', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formData)
        })

        const responseData = await response.json();

        if (response.ok) {
            toast.success(responseData.message)
            setTimeout(() => {
                navigate("/login")
                localStorage.removeItem("userInfo")
            }, 3000)
            return;
        }

        toast.error(responseData.message);
    };

    return (
        <>
            <Navbar />
            <div className="p-10 flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-2">
                                Old Password
                            </label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                                value={formData.oldPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                required
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
}

export default ForgotPassword;
