import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserDataFromLocalStorage } from '../../utils/getUserDataFromLocalStorage';

const UpdateUserForm = ({ showUpdateForm, user, setUsersLists }) => {

    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateUser = async (e) => {
        e.preventDefault();

        const response = await fetch(`/users/${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                updatedData: formData,
            }),
        });

        const responseData = await response.json();

        if (response.ok) {
            toast.success(responseData.message);
            showUpdateForm();
            setUsersLists((prevLists) => [...prevLists.map((item) => {
                if (item.email === formData.email) {
                    return {
                        ...item, ...formData
                    }
                }
                return item;
            })])
        }

    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-2">Update User</h2>
                <form onSubmit={(e) => updateUser(e)}>

                    <div className="mb-4">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData?.name}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData?.phoneNumber}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData?.address}

                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex gap-x-3 mt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"

                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="text-white px-4 py-2 rounded bg-red-500"
                            onClick={() => showUpdateForm()}
                        >
                            Exit
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

const ViewUsers = () => {
    // creating state to store the data for view table
    const [usersLists, setUsersLists] = useState([])
    const [openUpdateFormForUser, setOpenUpdateFormForUser] = useState(null);

    const showUpdateForm = (email) => {
        setOpenUpdateFormForUser(email);
    };

    const fetchUserData = async () => {
        // Fetch the updated list of users after creating a new user
        const userListResponse = await fetch('/users');
        const userListData = await userListResponse.json();
        setUsersLists(userListData.data);
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    const deleteUser = (email) => {
        return async () => {
            const response = await fetch(`/users/${email}`, {
                method: "DELETE",
            })

            const responseData = await response.json();

            const deleteUserState = usersLists.filter((item) => item.email !== email)
            setUsersLists(deleteUserState)

            toast(responseData.message)

        }
    }

    const isAdmin = getUserDataFromLocalStorage()?.user?.role === 'admin';


    return (
        <div className='relative'>

            {/* view section */}
            <div className=''>
                <div className=" px-4 py-2 mb-3 bg-gray-800">
                    <h1 className="text-lg font-semibold text-white">
                        View user
                    </h1>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-3 font-bold text-left text-gray-800 border border-gray-300">
                                Name
                            </th>
                            <th className="p-3 font-bold text-left text-gray-800 border border-gray-300">
                                E-mail
                            </th>
                            <th className="p-3 font-bold text-left text-gray-800 border border-gray-300">
                                Role
                            </th>
                            <th className="p-3 font-bold text-left text-gray-800 border border-gray-300">
                                Phone Number
                            </th>
                            <th className="p-3 font-bold text-left text-gray-800 border border-gray-300">
                                Address
                            </th>

                            {
                                isAdmin && (
                                    <th className="p-3 font-bold text-left text-gray-800 border border-gray-300">

                                    </th>
                                )

                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            usersLists.map((user, index) => {
                                return (
                                    (
                                        <tr key={index}>
                                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                                {user?.name}
                                            </td>
                                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                                {user?.email}
                                            </td>
                                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                                {user?.role}
                                            </td>
                                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                                {user?.phoneNumber}
                                            </td>
                                            <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                                {user?.address}
                                            </td>

                                            {
                                                isAdmin && (
                                                    <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                                                        <button className="px-2 py-1 bg-blue-600 text-white rounded-md mr-2" onClick={() => showUpdateForm(user.email)}>
                                                            Update
                                                        </button>
                                                        {
                                                            user?.role === 'admin' ? (
                                                                <button className="px-2 py-1 bg-red-400 text-white rounded-md" disabled>
                                                                    Delete
                                                                </button>
                                                            ) : (
                                                                <button className="px-2 py-1 bg-red-600 text-white rounded-md" onClick={deleteUser(user.email)}>
                                                                    Delete
                                                                </button>
                                                            )
                                                        }
                                                    </td>
                                                )
                                            }


                                            {
                                                openUpdateFormForUser === user.email && (

                                                    <UpdateUserForm
                                                        showUpdateForm={showUpdateForm}
                                                        setUsersLists={setUsersLists}
                                                        user={{
                                                            "address": user.address,
                                                            "name": user.name,
                                                            "phoneNumber": user.phoneNumber,
                                                            "email": user.email
                                                        }}
                                                    />
                                                )
                                            }
                                        </tr>

                                    ))
                            })
                        }

                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </div>
    )
}

export default ViewUsers

