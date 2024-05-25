import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateExamForm = ({ examDetails, updateExamDetailsLocally }) => {

    const { examID } = useParams();

    const [formData, setFormData] = useState({ ...examDetails });

    const dateInTimeStamp = new Date(formData.date)

    const [date, setDate] = useState(dateInTimeStamp.toISOString().slice(0, 10));
    const [time, setTime] = useState(dateInTimeStamp.toTimeString().slice(0, 5));

    const handleChange = (e) => {
        setFormData((prevData) => {
            return { ...prevData, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, subject, duration } = formData;

        const updatedExamDetails = {
            title,
            subject,
            duration,
            date: new Date(`${date} ${time}`)
        }

        const res = await fetch(`/exams/${examID}`, {
            headers: {
                "content-type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({ updatedExamDetails })
        })

        const resMsg = await res.json();

        if (res.ok) {
            toast.success(resMsg.message)
            updateExamDetailsLocally({ ...formData, date: new Date(`${date} ${time}`) })
            return
        }

        toast.error(resMsg.message)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white w-[50%] p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4 text-center">Update Exam Details</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="mb-2 block font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="border rounded p-2 w-full"
                            onChange={handleChange}
                            value={formData.title}
                        />
                    </div>
                    <div>
                        <label htmlFor="subject" className="mb-2 block font-medium">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="border rounded p-2 w-full"
                            onChange={handleChange}
                            value={formData.subject}
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="mb-2 block font-medium">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            className="border rounded p-2 w-full"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </div>
                    <div>
                        <label htmlFor="time" className="mb-2 block font-medium">
                            Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            className="border rounded p-2 w-full"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className="mb-2 block font-medium">
                            Duration (in minutes)
                        </label>
                        <input
                            type="text"
                            id="duration"
                            name="duration"
                            className="border rounded p-2 w-full"
                            onChange={handleChange}
                            value={formData.duration}
                        />
                    </div>
                    <div className="flex mt-6">

                        <button
                            className="px-8 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 mr-8"
                            onClick={handleSubmit}
                        >
                            Update
                        </button>

                        <button
                            onClick={() => updateExamDetailsLocally(formData)}
                            className="px-8 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                        >
                            Exit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateExamForm;
