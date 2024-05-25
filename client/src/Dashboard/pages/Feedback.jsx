import React, { useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);


    const handleDelete = async (_id) => {
        const response = await fetch(`/feedbacks/${_id}`, {
            method: "DELETE"
        })
        const responseData = await response.json()
        toast(responseData.message)
        setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== _id));
    };

    // fetch api
    const feedbackDetails = async () => {
        const response = await fetch('/feedbacks')
        const responseData = await response.json()
        setFeedbacks(responseData.data)

    }

    useEffect(() => {
        feedbackDetails();
    }, [])




    return (
        <div>
            <div className="">
                <div className=" px-4 py-2 mb-3 bg-gray-800">
                    <h1 className="text-lg font-semibold text-white">
                        Feedback
                    </h1>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-4">Username</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Feedback Detail</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback._id}>

                                <td className="py-2 px-4">
                                    {
                                        feedback.userID ? feedback.userID.name : '-'
                                    }

                                </td>
                                <td className="py-2 px-4">
                                    {
                                        feedback.userID ? feedback.userID.email : '-'
                                    }
                                </td>
                                <td className="py-2 px-4">{feedback.content}</td>
                                <td className="py-2 px-4">
                                    <button
                                        className="text-red-600"
                                        onClick={() => handleDelete(feedback._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Feedback