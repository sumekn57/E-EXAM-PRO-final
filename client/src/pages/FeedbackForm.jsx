import React, { useState } from 'react';
import Navbar from '../comps/Navbar';
import Footer from '../comps/Footer';
import { getUserDataFromLocalStorage } from '../utils/getUserDataFromLocalStorage';
import { ToastContainer, toast } from 'react-toastify';

const FeedbackForm = () => {

    const [feedback, setFeedback] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await fetch('/feedbacks', {
            "method": "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                content: feedback,
                userID: getUserDataFromLocalStorage()?.user._id
            })
        })

        const resMsg = await res.json();

        toast(resMsg.message);

        if (res.ok) {
            setFeedback("")
        }
    }

    return (
        <>
            <Navbar />

            <ToastContainer />

            <div className="container mx-auto p-8 md:p-10 max-w-[700px] bg-white rounded-lg border mt-6 mb-14">
                <h1 className="text-3xl font-semibold text-center mb-6">Give Us Your Feedback</h1>

                <div className="mb-6 text-center text-gray-700">
                    <p className="mb-2">We greatly appreciate your insights!</p>
                    <p className="mb-2">Help us improve by sharing your thoughts.</p>
                    <p>Your feedback drives our growth.</p>
                </div>

                <form className="space-y-6" onSubmit={submitHandler}>
                    <label className="block font-semibold text-gray-800" htmlFor="feedback">
                        Tell us what you think:
                    </label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        rows="6"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your feedback"
                        required
                        onChange={(e) => setFeedback(e.target.value)}
                        value={feedback}
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default FeedbackForm;
